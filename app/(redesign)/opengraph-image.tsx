import { ImageResponse } from "next/og";

import { BRAND_COLOR, INK_COLOR, SITE_NAME } from "@/config/site";

export const alt =
  "Omanga — travel money wallet and holiday insurance for Africa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 44,
            fontWeight: 600,
            color: BRAND_COLOR,
          }}
        >
          {SITE_NAME}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.15,
            color: INK_COLOR,
            maxWidth: 900,
          }}
        >
          Travel money wallet and holiday insurance for Africa
        </div>

        <div
          style={{
            display: "flex",
            height: 12,
            width: 200,
            backgroundColor: BRAND_COLOR,
          }}
        />
      </div>
    ),
    size,
  );
}
