import { promises as fs } from 'fs';
import path from 'path';

export interface ResumeRequest {
  id: string;
  email: string;
  timestamp: string;
  status: 'pending' | 'sent' | 'failed';
  ipAddress?: string;
}

export interface ResumeRequestsData {
  requests: ResumeRequest[];
}

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'resume-requests.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE_PATH);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read resume requests from JSON file
export async function getResumeRequests(): Promise<ResumeRequestsData> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (_error) {
    // If file doesn't exist or is invalid, return empty structure
    return { requests: [] };
  }
}

// Write resume requests to JSON file
async function saveResumeRequests(data: ResumeRequestsData): Promise<void> {
  await ensureDataDirectory();
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Add a new resume request
export async function addResumeRequest(
  email: string,
  ipAddress?: string
): Promise<ResumeRequest> {
  const data = await getResumeRequests();
  
  const newRequest: ResumeRequest = {
    id: generateId(),
    email: email.toLowerCase().trim(),
    timestamp: new Date().toISOString(),
    status: 'pending',
    ipAddress,
  };

  data.requests.push(newRequest);
  await saveResumeRequests(data);
  
  return newRequest;
}

// Check if email has already requested recently (within 24 hours)
export async function hasRecentRequest(email: string): Promise<boolean> {
  const data = await getResumeRequests();
  const normalizedEmail = email.toLowerCase().trim();
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  return data.requests.some(
    (request) =>
      request.email === normalizedEmail &&
      new Date(request.timestamp) > twentyFourHoursAgo
  );
}

// Update request status
export async function updateRequestStatus(
  id: string,
  status: ResumeRequest['status']
): Promise<void> {
  const data = await getResumeRequests();
  const request = data.requests.find((r) => r.id === id);
  
  if (request) {
    request.status = status;
    await saveResumeRequests(data);
  }
}

// Generate a simple unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get request statistics
export async function getRequestStats(): Promise<{
  total: number;
  pending: number;
  sent: number;
  failed: number;
  today: number;
}> {
  const data = await getResumeRequests();
  const today = new Date().toDateString();
  
  return {
    total: data.requests.length,
    pending: data.requests.filter((r) => r.status === 'pending').length,
    sent: data.requests.filter((r) => r.status === 'sent').length,
    failed: data.requests.filter((r) => r.status === 'failed').length,
    today: data.requests.filter(
      (r) => new Date(r.timestamp).toDateString() === today
    ).length,
  };
}
