import { ImageResponse } from "next/og";
import { getBrandLogoDataUrl } from "@/lib/brand-logo";

export const alt = "Family Music Academy — Classical Piano Lessons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoSrc = await getBrandLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "linear-gradient(165deg, #151515 0%, #0a0a0a 55%, #121212 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={440} height={314} alt="" />
        <p
          style={{
            margin: 0,
            fontSize: 34,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Classical Piano Lessons · Glenview, IL
        </p>
      </div>
    ),
    { ...size },
  );
}
