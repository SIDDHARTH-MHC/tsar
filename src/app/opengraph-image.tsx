import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "TSAR Darbaar - Scent Branding & Commercial Fragrance Solutions India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "#131936",
          color: "#F7F3EC",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            letterSpacing: "-0.02em",
            textTransform: "lowercase",
          }}
        >
          tsar{" "}
          <span style={{ color: "#B8925B", marginLeft: 16 }}>darbaar</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            maxWidth: 820,
            lineHeight: 1.35,
            color: "rgba(247,243,236,0.78)",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          We don&apos;t fragrance spaces. We create signature atmospheres that
          become part of your brand.
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 16,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#B8925B",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Scent branding by TSAR Perfumes · Made in Bharat
        </div>
      </div>
    ),
    { ...size },
  );
}
