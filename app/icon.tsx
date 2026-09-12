import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "512px",
          height: "512px",
          background: "#1B2320",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "96px",
            height: "96px",
            background: "#B8402F",
          }}
        />
      </div>
    ),
    size,
  );
}
