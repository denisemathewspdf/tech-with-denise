import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

/**
 * Dynamic OG image generation for guides.
 *
 * URL: /og?title=Guide+Title&emoji=☕&topic=JavaScript
 *
 * Generates a 1200x630 pastel gradient image with the guide info
 * and "Tech with Denise" branding.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "Tech with Denise";
  const emoji = searchParams.get("emoji") || "✦";
  const topic = searchParams.get("topic") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // Pastel gradient background
          background: "linear-gradient(135deg, #FCDCE5, #E8E1F5, #D4ECF5)",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "#C4B8E8",
            opacity: 0.2,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "#F4A7BB",
            opacity: 0.2,
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {/* Emoji */}
          <span style={{ fontSize: 80, marginBottom: 20, display: "flex" }}>
            {emoji}
          </span>

          {/* Title */}
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#4A3B52",
              lineHeight: 1.2,
              marginBottom: 20,
              display: "flex",
            }}
          >
            {title}
          </h1>

          {/* Topic badge */}
          {topic && (
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: "#8878A8",
                background: "rgba(255,255,255,0.6)",
                padding: "8px 24px",
                borderRadius: 50,
                marginBottom: 30,
                display: "flex",
              }}
            >
              {topic}
            </span>
          )}

          {/* Branding */}
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#7B6B88",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            tech with denise
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
