import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  const icon = await readFile(join(process.cwd(), "public/icon-192x192.png"));
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "54px 64px", background: "#060d18", color: "#f1f7fb", fontFamily: "sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        {/* ImageResponse renders a raster image, so next/image is not used here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} width={40} height={40} alt="" style={{ borderRadius: 9 }} />
        <span style={{ fontSize: 25, fontWeight: 600, letterSpacing: 4 }}>JARVIS</span>
      </div>

      <div style={{ display: "flex", position: "absolute", right: -80, top: 82, width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, #173e51 0%, #0b1b2c 44%, #060d18 70%)" }} />
      <div style={{ display: "flex", position: "absolute", right: 0, top: 148, width: 315, height: 315, border: "2px solid #517b8b", borderRadius: "50%", transform: "rotate(-25deg) scaleX(0.55)" }} />
      <div style={{ display: "flex", position: "absolute", right: 0, top: 148, width: 315, height: 315, border: "2px solid #a2e9ee", borderRadius: "50%", transform: "rotate(42deg) scaleX(0.45)" }} />
      <div style={{ display: "flex", position: "absolute", right: 0, top: 148, width: 315, height: 315, border: "1px solid #59899f", borderRadius: "50%", transform: "rotate(90deg) scaleX(0.4)" }} />
      <div style={{ display: "flex", position: "absolute", right: 145, top: 293, width: 24, height: 24, borderRadius: "50%", background: "#c7fcff", boxShadow: "0 0 50px #a2e9ee" }} />

      <div style={{ display: "flex", flexDirection: "column", marginTop: 79 }}>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 1.04, letterSpacing: -4, fontWeight: 600 }}>Your inbox.</div>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 1.04, letterSpacing: -4, fontWeight: 600, color: "#a2e9ee" }}>Understood.</div>
        <div style={{ display: "flex", marginTop: 26, fontSize: 26, color: "#b5c6d5" }}>Personal AI email workspace for Mac</div>
      </div>

      <div style={{ display: "flex", marginTop: "auto", paddingTop: 24, alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #263545", fontSize: 18, color: "#9aafc2" }}>
        <span>Multiple Gmail accounts. Your context. Clear next steps.</span>
        <span style={{ color: "#a2e9ee", fontSize: 16 }}>Beta for macOS</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
