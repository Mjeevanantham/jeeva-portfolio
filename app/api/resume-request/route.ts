import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { 
  addResumeRequest, 
  hasRecentRequest, 
  updateRequestStatus,
  type ResumeRequest 
} from "@/lib/resume-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ResumeRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

function createTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.GMAIL_PASS;

  if (!user || !pass) {
    throw new Error(
      "Missing Gmail SMTP credentials. Set GMAIL_USER and GMAIL_APP_PASSWORD in env."
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  return transporter;
}

function adminNotificationHtml(request: ResumeRequest) {
  return `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>New Resume Request</title>
  </head>
  <body style="margin:0; padding:0; background:#0b1220; color:#e2e8f0; font-family: Inter, ui-sans-serif, system-ui;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0b1220 0%,#111827 100%); padding:32px 0;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:16px;">
            <tr>
              <td style="padding:24px 24px 8px; text-align:center;">
                <div style="display:inline-block; padding:10px 14px; border-radius:9999px; background:linear-gradient(90deg,#16a34a,#059669); color:#fff; font-weight:600;">📄 Resume Request</div>
                <h1 style="margin:16px 0 4px; font-size:22px; color:#fff;">New Resume Request</h1>
                <p style="margin:0; color:#cbd5e1; font-size:14px;">Someone has requested your resume through the portfolio website.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0 8px;">
                  <tr>
                    <td style="width:140px; background:#0f172a; color:#94a3b8; padding:10px 12px; border-radius:8px 0 0 8px;">Email</td>
                    <td style="background:#0b1220; color:#e2e8f0; padding:10px 12px; border-radius:0 8px 8px 0;">${escapeHtml(request.email)}</td>
                  </tr>
                  <tr>
                    <td style="width:140px; background:#0f172a; color:#94a3b8; padding:10px 12px; border-radius:8px 0 0 8px;">Request ID</td>
                    <td style="background:#0b1220; color:#e2e8f0; padding:10px 12px; border-radius:0 8px 8px 0;">${escapeHtml(request.id)}</td>
                  </tr>
                  <tr>
                    <td style="width:140px; background:#0f172a; color:#94a3b8; padding:10px 12px; border-radius:8px 0 0 8px;">Timestamp</td>
                    <td style="background:#0b1220; color:#e2e8f0; padding:10px 12px; border-radius:0 8px 8px 0;">${new Date(request.timestamp).toLocaleString()}</td>
                  </tr>
                  ${request.ipAddress ? `
                  <tr>
                    <td style="width:140px; background:#0f172a; color:#94a3b8; padding:10px 12px; border-radius:8px 0 0 8px;">IP Address</td>
                    <td style="background:#0b1220; color:#e2e8f0; padding:10px 12px; border-radius:0 8px 8px 0;">${escapeHtml(request.ipAddress)}</td>
                  </tr>
                  ` : ''}
                </table>
                <div style="height:1px; background:linear-gradient(90deg, rgba(22,163,74,0), rgba(22,163,74,0.5), rgba(5,150,105,0)); margin:20px 0;"></div>
                <p style="margin:0; color:#94a3b8; font-size:12px;">
                  <strong>Action Required:</strong> Please verify this email address and send your resume manually within 24 hours.
                  <br>Reply directly to this email to respond to the requester.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

function userConfirmationHtml(_email: string) {
  return `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>Resume Request Received</title>
  </head>
  <body style="margin:0; padding:0; background:#0b1220; color:#e2e8f0; font-family: Inter, ui-sans-serif, system-ui;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0b1220 0%,#111827 100%); padding:32px 0;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:16px; backdrop-filter: blur(8px);">
            <tr>
              <td style="padding:32px; text-align:center;">
                <div style="display:inline-block; padding:12px 16px; border-radius:9999px; background:linear-gradient(90deg,#16a34a,#059669); color:white; font-weight:600;">✅ Request Submitted</div>
                <h1 style="margin:24px 0 8px; font-size:24px; color:#fff;">Resume Request Received!</h1>
                <p style="margin:0 0 16px; color:#cbd5e1; font-size:16px;">Thank you for your interest in my work.</p>
                
                <div style="background:rgba(22,163,74,0.1); border:1px solid rgba(22,163,74,0.3); border-radius:12px; padding:20px; margin:24px 0; text-align:left;">
                  <h3 style="margin:0 0 12px; color:#22c55e; font-size:16px;">📋 What happens next:</h3>
                  <ul style="margin:0; padding-left:20px; color:#cbd5e1; line-height:1.6;">
                    <li>Your request is currently <strong>under review</strong></li>
                    <li>I will <strong>manually verify</strong> your email address</li>
                    <li>You will receive my resume within <strong>24 hours</strong></li>
                    <li>Please be patient while I process your request</li>
                  </ul>
                </div>

                <p style="margin:16px 0; color:#94a3b8; font-size:14px;">
                  If you have any questions or need immediate assistance, feel free to reply to this email.
                </p>
                
                <div style="height:1px; background:linear-gradient(90deg, rgba(22,163,74,0), rgba(22,163,74,0.5), rgba(5,150,105,0)); margin:24px 0;"></div>
                <p style="margin:0; color:#94a3b8; font-size:12px;">
                  Best regards,<br>
                  <strong>Jeevanantham Mahalingam</strong><br>
                  Full Stack Developer
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getClientIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return "unknown";
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { success: false, error: "Invalid content type" },
        { status: 415 }
      );
    }

    const json = await req.json();
    const parsed = ResumeRequestSchema.safeParse(json);
    
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { success: false, error: first?.message || "Invalid email address" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Check if this email has already requested recently
    const hasRecent = await hasRecentRequest(email);
    if (hasRecent) {
      return NextResponse.json(
        { 
          success: false, 
          error: "You have already requested a resume recently. Please wait 24 hours before requesting again." 
        },
        { status: 429 }
      );
    }

    // Get client IP for tracking
    const clientIP = getClientIP(req);

    // Store the request
    const request = await addResumeRequest(email, clientIP);

    try {
      const transporter = createTransporter();

      // Email to admin (you)
      const adminEmail = {
        from: `Portfolio Resume Request <${process.env.GMAIL_USER}>`,
        to: "mjeevanantham04@gmail.com",
        subject: `📄 New Resume Request from ${email}`,
        replyTo: email,
        text: `New resume request received\n\nEmail: ${email}\nRequest ID: ${request.id}\nTimestamp: ${new Date(request.timestamp).toLocaleString()}\nIP: ${clientIP}\n\nPlease verify this email and send your resume manually within 24 hours.`,
        html: adminNotificationHtml(request),
      };

      // Confirmation email to user
      const userEmail = {
        from: `Jeevanantham Mahalingam <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Resume Request Received - Under Review",
        html: userConfirmationHtml(email),
        text: `Resume Request Received!\n\nThank you for your interest in my work.\n\nWhat happens next:\n- Your request is currently under review\n- I will manually verify your email address\n- You will receive my resume within 24 hours\n- Please be patient while I process your request\n\nIf you have any questions, feel free to reply to this email.\n\nBest regards,\nJeevanantham Mahalingam`,
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(adminEmail),
        transporter.sendMail(userEmail),
      ]);

      // Update status to indicate emails were sent successfully
      await updateRequestStatus(request.id, 'sent');

      return NextResponse.json({ 
        success: true, 
        message: "Your resume request has been submitted successfully! Please check your email for confirmation." 
      });

    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      
      // Update status to failed
      await updateRequestStatus(request.id, 'failed');
      
      return NextResponse.json(
        { 
          success: false, 
          error: "Your request was saved but we couldn't send the confirmation email. Please try again or contact us directly." 
        },
        { status: 500 }
      );
    }

  } catch (err: unknown) {
    console.error("/api/resume-request error", err);
    return NextResponse.json(
      { success: false, error: "Failed to process resume request. Please try again." },
      { status: 500 }
    );
  }
}
