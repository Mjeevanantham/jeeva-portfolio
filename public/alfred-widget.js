/**
 * Alfred Bot Widget - Standalone Integration Script
 * 
 * This script automatically injects a floating chat widget into any webpage.
 * Just include this script tag in your HTML and the bot will appear automatically.
 * 
 * Usage:
 * <script 
 *     data-tenant-id="your-tenant-id" 
 *     data-server-url="http://localhost:3000/"
 *     src="alfred-widget.js">
 * </script>
 */

(function() {
    'use strict';

    // Configuration with defaults
    const CONFIG = {
        tenantId: '68e68ff44d3939b192d9e216',
        serverUrl: 'http://localhost:3000',
        position: 'bottom-right',
        theme: 'dark',
        pulse: true,
        autoOpen: false
    };

    // Get configuration from script tag data attributes
    const scriptTag = document.currentScript;
    if (scriptTag) {
        CONFIG.tenantId = scriptTag.getAttribute('data-tenant-id') || CONFIG.tenantId;
        CONFIG.serverUrl = scriptTag.getAttribute('data-server-url') || CONFIG.serverUrl;
        CONFIG.position = scriptTag.getAttribute('data-position') || CONFIG.position;
        CONFIG.theme = scriptTag.getAttribute('data-theme') || CONFIG.theme;
        CONFIG.pulse = scriptTag.getAttribute('data-pulse') !== 'false';
        CONFIG.autoOpen = scriptTag.getAttribute('data-auto-open') === 'true';
    }

    // State management
    let isOpen = CONFIG.autoOpen;
    let isConnected = false;
    let messages = [];
    let socket = null;
    let isTyping = false;

    // Position classes
    const POSITION_CLASSES = {
        'bottom-right': 'alfred-bottom-right',
        'bottom-left': 'alfred-bottom-left',
        'top-right': 'alfred-top-right',
        'top-left': 'alfred-top-left'
    };

    // Inject CSS styles
    function injectStyles() {
        const styles = `
            /* Alfred Bot Widget Styles */
            .alfred-widget-container {
                position: fixed;
                z-index: 9999;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }

            .alfred-widget-container.alfred-bottom-right {
                bottom: 20px;
                right: 20px;
            }

            .alfred-widget-container.alfred-bottom-left {
                bottom: 20px;
                left: 20px;
            }

            .alfred-widget-container.alfred-top-right {
                top: 20px;
                right: 20px;
            }

            .alfred-widget-container.alfred-top-left {
                top: 20px;
                left: 20px;
            }

            .alfred-floating-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                color: white;
                position: relative;
            }

            .alfred-floating-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 25px rgba(59, 130, 246, 0.6);
            }

            .alfred-floating-button.alfred-pulse {
                animation: alfred-pulse 2s infinite;
            }

            @keyframes alfred-pulse {
                0% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4); }
                50% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.8), 0 0 0 10px rgba(59, 130, 246, 0.1); }
                100% { box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4); }
            }

            .alfred-chat-panel {
                position: absolute;
                width: 350px;
                height: 500px;
                background: ${CONFIG.theme === 'dark' ? '#1e293b' : '#ffffff'};
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                transform: scale(0);
                opacity: 0;
                transition: all 0.3s ease;
                border: 1px solid ${CONFIG.theme === 'dark' ? '#334155' : '#e2e8f0'};
            }

            .alfred-chat-panel.alfred-open {
                transform: scale(1);
                opacity: 1;
            }

            .alfred-chat-panel.alfred-bottom-right {
                bottom: 80px;
                right: 0;
            }

            .alfred-chat-panel.alfred-bottom-left {
                bottom: 80px;
                left: 0;
            }

            .alfred-chat-panel.alfred-top-right {
                top: 80px;
                right: 0;
            }

            .alfred-chat-panel.alfred-top-left {
                top: 80px;
                left: 0;
            }

            .alfred-chat-header {
                padding: 20px;
                background: ${CONFIG.theme === 'dark' ? '#0f172a' : '#f8fafc'};
                border-bottom: 1px solid ${CONFIG.theme === 'dark' ? '#334155' : '#e2e8f0'};
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .alfred-chat-header-left {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .alfred-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 16px;
            }

            .alfred-header-info h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: ${CONFIG.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
            }

            .alfred-connection-status {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 12px;
                color: ${CONFIG.theme === 'dark' ? '#94a3b8' : '#64748b'};
            }

            .alfred-status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #ef4444;
            }

            .alfred-status-dot.alfred-connected {
                background: #10b981;
            }

            .alfred-close-button {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                color: ${CONFIG.theme === 'dark' ? '#94a3b8' : '#64748b'};
                padding: 4px;
                border-radius: 4px;
                transition: all 0.2s ease;
            }

            .alfred-close-button:hover {
                background: ${CONFIG.theme === 'dark' ? '#334155' : '#f1f5f9'};
                color: ${CONFIG.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
            }

            .alfred-messages-container {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            .alfred-message {
                display: flex;
                max-width: 80%;
            }

            .alfred-message.alfred-bot {
                justify-content: flex-start;
            }

            .alfred-message.alfred-user {
                justify-content: flex-end;
            }

            .alfred-message-content {
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
                word-wrap: break-word;
            }

            .alfred-message.alfred-bot .alfred-message-content {
                background: ${CONFIG.theme === 'dark' ? '#334155' : '#f1f5f9'};
                color: ${CONFIG.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
            }

            .alfred-message.alfred-user .alfred-message-content {
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                color: white;
            }

            .alfred-message-time {
                font-size: 11px;
                opacity: 0.6;
                margin-top: 4px;
            }

            .alfred-typing-indicator {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 16px;
            }

            .alfred-typing-content {
                background: ${CONFIG.theme === 'dark' ? '#334155' : '#f1f5f9'};
                padding: 12px 16px;
                border-radius: 18px;
                display: flex;
                gap: 4px;
            }

            .alfred-typing-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: ${CONFIG.theme === 'dark' ? '#94a3b8' : '#64748b'};
                animation: alfred-typing 1.4s infinite ease-in-out;
            }

            .alfred-typing-dot:nth-child(2) {
                animation-delay: 0.2s;
            }

            .alfred-typing-dot:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes alfred-typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-10px);
                }
            }

            .alfred-input-container {
                padding: 20px;
                border-top: 1px solid ${CONFIG.theme === 'dark' ? '#334155' : '#e2e8f0'};
                display: flex;
                gap: 12px;
                align-items: center;
            }

            .alfred-input {
                flex: 1;
                padding: 12px 16px;
                border: 1px solid ${CONFIG.theme === 'dark' ? '#334155' : '#e2e8f0'};
                border-radius: 24px;
                background: ${CONFIG.theme === 'dark' ? '#1e293b' : '#ffffff'};
                color: ${CONFIG.theme === 'dark' ? '#f1f5f9' : '#1e293b'};
                font-size: 14px;
                outline: none;
                transition: all 0.2s ease;
            }

            .alfred-input:focus {
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }

            .alfred-input:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .alfred-send-button {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                border: none;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                font-size: 16px;
            }

            .alfred-send-button:hover:not(:disabled) {
                transform: scale(1.05);
            }

            .alfred-send-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }

            .alfred-welcome-message {
                text-align: center;
                padding: 20px;
                color: ${CONFIG.theme === 'dark' ? '#94a3b8' : '#64748b'};
                font-size: 14px;
                line-height: 1.5;
            }

            /* Responsive design */
            @media (max-width: 480px) {
                .alfred-chat-panel {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 100px);
                    position: fixed;
                    top: 50px;
                    left: 20px;
                    right: 20px;
                    bottom: auto;
                }

                .alfred-chat-panel.alfred-bottom-right,
                .alfred-chat-panel.alfred-bottom-left,
                .alfred-chat-panel.alfred-top-right,
                .alfred-chat-panel.alfred-top-left {
                    top: 50px;
                    left: 20px;
                    right: 20px;
                    bottom: auto;
                }
            }

            /* Scrollbar styling */
            .alfred-messages-container::-webkit-scrollbar {
                width: 6px;
            }

            .alfred-messages-container::-webkit-scrollbar-track {
                background: transparent;
            }

            .alfred-messages-container::-webkit-scrollbar-thumb {
                background: ${CONFIG.theme === 'dark' ? '#475569' : '#cbd5e1'};
                border-radius: 3px;
            }

            .alfred-messages-container::-webkit-scrollbar-thumb:hover {
                background: ${CONFIG.theme === 'dark' ? '#64748b' : '#94a3b8'};
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Load external dependencies
    function loadDependencies() {
        // Load Google Fonts
        if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
            const fontLink = document.createElement('link');
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
        }

        // Load Font Awesome
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const faLink = document.createElement('link');
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            faLink.rel = 'stylesheet';
            document.head.appendChild(faLink);
        }
    }

    // Initialize WebSocket connection
    function initSocket() {
        try {
            const wsUrl = CONFIG.serverUrl.replace('http', 'ws');
            socket = new WebSocket(`${wsUrl}/socket.io/?EIO=4&transport=websocket`);
            
            socket.onopen = function() {
                isConnected = true;
                updateConnectionStatus();
                console.log('Alfred Bot: Connected to server');
            };

            socket.onclose = function() {
                isConnected = false;
                updateConnectionStatus();
                console.log('Alfred Bot: Disconnected from server');
                // Attempt to reconnect after 3 seconds
                setTimeout(initSocket, 3000);
            };

            socket.onerror = function(error) {
                console.error('Alfred Bot: WebSocket error:', error);
                isConnected = false;
                updateConnectionStatus();
            };

            socket.onmessage = function(event) {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'message' && data.text) {
                        addMessage(data.text, true);
                    }
                } catch (e) {
                    console.error('Alfred Bot: Error parsing message:', e);
                }
            };
        } catch (error) {
            console.error('Alfred Bot: Failed to initialize socket:', error);
            isConnected = false;
            updateConnectionStatus();
        }
    }

    // Update connection status indicator
    function updateConnectionStatus() {
        const statusDot = document.querySelector('.alfred-status-dot');
        const statusText = document.querySelector('.alfred-connection-status span');
        
        if (statusDot && statusText) {
            if (isConnected) {
                statusDot.classList.add('alfred-connected');
                statusText.textContent = 'Online';
            } else {
                statusDot.classList.remove('alfred-connected');
                statusText.textContent = 'Offline';
            }
        }
    }

    // Add message to chat
    function addMessage(text, isBot = false) {
        const message = {
            id: Date.now() + Math.random(),
            text: text,
            isBot: isBot,
            timestamp: new Date()
        };
        
        messages.push(message);
        renderMessages();
    }

    // Render all messages
    function renderMessages() {
        const container = document.querySelector('.alfred-messages-container');
        if (!container) return;

        container.innerHTML = '';
        
        messages.forEach(message => {
            const messageEl = document.createElement('div');
            messageEl.className = `alfred-message ${message.isBot ? 'alfred-bot' : 'alfred-user'}`;
            
            messageEl.innerHTML = `
                <div class="alfred-message-content">
                    ${message.text}
                    <div class="alfred-message-time">
                        ${message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            `;
            
            container.appendChild(messageEl);
        });
        
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    }

    // Show typing indicator
    function showTyping() {
        const container = document.querySelector('.alfred-messages-container');
        if (!container) return;

        const typingEl = document.createElement('div');
        typingEl.className = 'alfred-typing-indicator';
        typingEl.innerHTML = `
            <div class="alfred-typing-content">
                <div class="alfred-typing-dot"></div>
                <div class="alfred-typing-dot"></div>
                <div class="alfred-typing-dot"></div>
            </div>
        `;
        
        container.appendChild(typingEl);
        container.scrollTop = container.scrollHeight;
    }

    // Hide typing indicator
    function hideTyping() {
        const typingEl = document.querySelector('.alfred-typing-indicator');
        if (typingEl) {
            typingEl.remove();
        }
    }

    // Send message
    async function sendMessage(text) {
        if (!text.trim()) return;

        // Add user message
        addMessage(text, false);
        
        // Show typing indicator
        isTyping = true;
        showTyping();

        try {
            // Try WebSocket first
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                    type: 'message',
                    text: text
                }));
            } else {
                // Fallback to HTTP request
                const response = await fetch(`${CONFIG.serverUrl}/api/chat`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: text }),
                });

                if (response.ok) {
                    const data = await response.json();
                    hideTyping();
                    addMessage(data.response || "I'm sorry, I couldn't process that request.", true);
                } else {
                    throw new Error('Failed to get response');
                }
            }
        } catch (error) {
            console.error('Alfred Bot: Error sending message:', error);
            hideTyping();
            addMessage("I'm sorry, I'm having trouble connecting right now. Please try again later.", true);
        } finally {
            isTyping = false;
        }
    }

    // Create widget HTML
    function createWidget() {
        const container = document.createElement('div');
        container.className = `alfred-widget-container ${POSITION_CLASSES[CONFIG.position]}`;
        
        container.innerHTML = `
            <!-- Floating Button -->
            <button class="alfred-floating-button ${CONFIG.pulse ? 'alfred-pulse' : ''}" id="alfred-toggle">
                🤖
            </button>
            
            <!-- Chat Panel -->
            <div class="alfred-chat-panel ${POSITION_CLASSES[CONFIG.position]} ${isOpen ? 'alfred-open' : ''}" id="alfred-panel">
                <!-- Header -->
                <div class="alfred-chat-header">
                    <div class="alfred-chat-header-left">
                        <div class="alfred-avatar">A</div>
                        <div class="alfred-header-info">
                            <h3>Alfred Bot</h3>
                            <div class="alfred-connection-status">
                                <div class="alfred-status-dot"></div>
                                <span>Offline</span>
                            </div>
                        </div>
                    </div>
                    <button class="alfred-close-button" id="alfred-close">×</button>
                </div>
                
                <!-- Messages -->
                <div class="alfred-messages-container" id="alfred-messages">
                    <div class="alfred-welcome-message">
                        Hi! I'm Alfred, your AI assistant. I can help you learn about Jeevanantham's work, projects, and experience. What would you like to know?
                    </div>
                </div>
                
                <!-- Input -->
                <div class="alfred-input-container">
                    <input type="text" class="alfred-input" id="alfred-input" placeholder="Ask me anything about Jeeva's work..." disabled>
                    <button class="alfred-send-button" id="alfred-send" disabled>
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(container);
        
        // Add event listeners
        setupEventListeners();
        
        // Add welcome message
        addMessage("Hi! I'm Alfred, your AI assistant. I can help you learn about Jeevanantham's work, projects, and experience. What would you like to know?", true);
    }

    // Setup event listeners
    function setupEventListeners() {
        const toggleBtn = document.getElementById('alfred-toggle');
        const closeBtn = document.getElementById('alfred-close');
        const input = document.getElementById('alfred-input');
        const sendBtn = document.getElementById('alfred-send');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                isOpen = !isOpen;
                const panel = document.getElementById('alfred-panel');
                if (panel) {
                    panel.classList.toggle('alfred-open', isOpen);
                }
                
                if (isOpen && input) {
                    input.focus();
                }
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                isOpen = false;
                const panel = document.getElementById('alfred-panel');
                if (panel) {
                    panel.classList.remove('alfred-open');
                }
            });
        }
        
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const text = input.value.trim();
                    if (text) {
                        sendMessage(text);
                        input.value = '';
                    }
                }
            });
            
            input.addEventListener('input', function() {
                const hasText = input.value.trim().length > 0;
                if (sendBtn) {
                    sendBtn.disabled = !hasText || !isConnected;
                }
                input.disabled = !isConnected;
            });
        }
        
        if (sendBtn) {
            sendBtn.addEventListener('click', function() {
                const text = input.value.trim();
                if (text) {
                    sendMessage(text);
                    input.value = '';
                }
            });
        }
    }

    // Initialize the widget
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        // Load dependencies
        loadDependencies();
        
        // Inject styles
        injectStyles();
        
        // Create widget
        createWidget();
        
        // Initialize socket connection
        initSocket();
        
        // Auto-open if configured
        if (CONFIG.autoOpen) {
            setTimeout(() => {
                isOpen = true;
                const panel = document.getElementById('alfred-panel');
                if (panel) {
                    panel.classList.add('alfred-open');
                }
            }, 1000);
        }
        
        console.log('Alfred Bot Widget initialized successfully');
    }

    // Start initialization
    init();

})();
