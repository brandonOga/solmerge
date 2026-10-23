import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/site";

// The preview card shown when the site is shared on WhatsApp, LinkedIn, X,
// Facebook etc. Also used as the Twitter card image (see layout metadata).
export const alt = `${SITE.name}: Finance, IT and Actuarial Services in Harare`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori can't read woff2, so the image uses the .ttf build of Satoshi
const satoshi = await readFile(
  join(process.cwd(), "src/fonts/Satoshi Medium/Satoshi Medium.ttf"),
);
const logo = await readFile(join(process.cwd(), "public", SITE.logo));
const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          borderTop: "16px solid #0b1f3f",
          borderBottom: "16px solid #d4af4a",
          padding: "64px 80px",
          fontFamily: "Satoshi",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={476} height={202} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 58,
            lineHeight: 1.2,
            color: "#0b1f3f",
            maxWidth: 1000,
          }}
        >
          Navigate complexity with clarity for smarter, sustainable growth.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#a87d16" }}>
          Finance · Actuarial · IT Services · Harare, Zimbabwe
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Satoshi", data: satoshi, style: "normal", weight: 500 }],
    },
  );
}
