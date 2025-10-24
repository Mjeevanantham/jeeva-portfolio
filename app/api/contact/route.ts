import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.enum(["Project Inquiry", "Job Opportunity", "Collaboration", "General"], {
    required_error: "Subject is required",
    invalid_type_error: "Subject is required",
  }),
  message: z.string().min(10, "Message should be at least 10 characters"),
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

function adminEmailHtml(data: z.infer<typeof ContactSchema>) {
  return `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>New portfolio contact</title>
  </head>
  <body style="margin:0; padding:0; background:#0b1220; color:#e2e8f0; font-family: Inter, ui-sans-serif, system-ui;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0b1220 0%,#111827 100%); padding:32px 0;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:16px;">
            <tr>
              <td style="padding:24px 24px 8px; text-align:center;">
                <div style="display:inline-block; padding:10px 14px; border-radius:9999px; background:linear-gradient(90deg,#2563eb,#7c3aed); color:#fff; font-weight:600;">New contact</div>
                <h1 style="margin:16px 0 4px; font-size:22px; color:#fff;">Portfolio contact submission</h1>
                <p style="margin:0; color:#cbd5e1; font-size:14px;">You received a new message via the website form.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 24px 24px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0 8px;">
                  <tr>
                    <td style="width:140px; background:#0f172a; color:#94a3b8; padding:10px 12px; border-radius:8px 0 0 8px;">Name</td>
                    <td style="background:#0b1220; color:#e2e8f0; padding:10px 12px; border-radius:0 8px 8px 0;">${escapeHtml(data.name)}</td>
                  </tr>
                  <tr>
                    <td style="width:140px; background:#0f172a; color:#94a3b8; padding:10px 12px; border-radius:8px 0 0 8px;">Email</td>
                    <td style="background:#0b1220; color:#e2e8f0; padding:10px 12px; border-radius:0 8px 8px 0;">${escapeHtml(data.email)}</td>
                  </tr>
                  <tr>
                    <td style="width:140px; background:#0f172a; color:#94a3b8; padding:10px 12px; border-radius:8px 0 0 8px;">Subject</td>
                    <td style="background:#0b1220; color:#e2e8f0; padding:10px 12px; border-radius:0 8px 8px 0;">${escapeHtml(data.subject)}</td>
                  </tr>
                  <tr>
                    <td style="width:140px; background:#0f172a; color:#94a3b8; padding:10px 12px; border-radius:8px 0 0 8px; vertical-align:top;">Message</td>
                    <td style="background:#0b1220; color:#e2e8f0; padding:10px 12px; border-radius:0 8px 8px 0;"><pre style="white-space:pre-wrap; font: inherit; margin:0">${escapeHtml(data.message)}</pre></td>
                  </tr>
                </table>
                <div style="height:1px; background:linear-gradient(90deg, rgba(37,99,235,0), rgba(37,99,235,0.5), rgba(124,58,237,0)); margin:20px 0;"></div>
                <p style="margin:0; color:#94a3b8; font-size:12px;">Tip: reply directly to this email to respond to the sender.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}

function userConfirmationHtml(name: string) {
  return `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <title>We received your message</title>
  </head>
  <body style="margin:0; padding:0; background:#0b1220; color:#e2e8f0; font-family: Inter, ui-sans-serif, system-ui;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0b1220 0%,#111827 100%); padding:32px 0;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:16px; backdrop-filter: blur(8px);">
            <tr>
              <td style="padding:32px; text-align:center;">
                <div style="display:inline-block; padding:12px 16px; border-radius:9999px; background:linear-gradient(90deg,#2563eb,#7c3aed); color:white; font-weight:600;">Jeevanantham Mahalingam</div>
                <h1 style="margin:24px 0 8px; font-size:24px; color:#fff;">Thanks, ${escapeHtml(
                  name
                )}! We received your message.</h1>
                <p style="margin:0 0 24px; color:#cbd5e1;">I'll get back to you shortly. In the meantime, feel free to reply to this email with any additional details.</p>
                <div style="height:1px; background:linear-gradient(90deg, rgba(37,99,235,0), rgba(37,99,235,0.5), rgba(124,58,237,0)); margin:24px 0;"></div>
                <p style="margin:0; color:#94a3b8; font-size:12px;">Sent from my portfolio website • Available 24/7</p>
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
    const parsed = ContactSchema.safeParse(json);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { success: false, error: first?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const transporter = createTransporter();
    const toOwner = {
      from: `Portfolio Contact <${process.env.GMAIL_USER}>`,
      to: "mjeevanantham04@gmail.com",
      subject: `New contact: ${data.subject}`,
      replyTo: data.email,
      text: `New contact submission\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
      html: adminEmailHtml(data),
    };

    const toUser = {
      from: `Jeevanantham Mahalingam <${process.env.GMAIL_USER}>`,
      to: data.email,
      subject: "Thanks for reaching out!",
      html: userConfirmationHtml(data.name),
      text: `Thanks, ${data.name}! We received your message and will get back to you shortly.`,
    };

    await Promise.all([
      transporter.sendMail(toOwner),
      transporter.sendMail(toUser),
    ]);

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("/api/contact error", err);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
