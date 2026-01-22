import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Jeevanantham M";
    const subtitle = searchParams.get("subtitle") || "Full-Stack Engineer";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f172a",
            backgroundImage:
              "linear-gradient(to bottom right, #1e293b 0%, #0f172a 50%, #1e3a8a 100%)",
          }}
        >
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(37, 99, 235, 0.1) 0%, transparent 50%)",
            }}
          />

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px",
              textAlign: "center",
            }}
          >
            {/* Name */}
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "700",
                color: "#ffffff",
                margin: "0 0 24px 0",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "32px",
                fontWeight: "400",
                color: "#94a3b8",
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              {subtitle}
            </p>

            {/* Accent line */}
            <div
              style={{
                width: "120px",
                height: "4px",
                background: "linear-gradient(to right, #2563eb, #7c3aed, #10b981)",
                marginTop: "40px",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Bottom gradient */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "200px",
              background:
                "linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 100%)",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const error = e instanceof Error ? e.message : "Unknown error";
    console.error("OG image generation error:", error);
    return new Response(`Failed to generate image: ${error}`, { status: 500 });
  }
}
