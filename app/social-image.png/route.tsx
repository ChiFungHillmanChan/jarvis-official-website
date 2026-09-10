import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 74px", background: "#f3f7f6", color: "#182022", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 17 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: 48, height: 48, background: "#182022", borderRadius: 13, color: "white", fontSize: 32 }}>J</div>
        <span style={{ fontSize: 28, fontWeight: 600 }}>JARVIS</span>
      </div>
      <div style={{ display: "flex", marginTop: 55, fontSize: 23, color: "#006b68" }}>Your AI assistant for Mac</div>
      <div style={{ display: "flex", marginTop: 20, fontSize: 73, lineHeight: 1.05, letterSpacing: -3, fontWeight: 600 }}>A little less busywork.</div>
      <div style={{ display: "flex", fontSize: 73, lineHeight: 1.05, letterSpacing: -3, fontWeight: 600 }}>A lot more headspace.</div>
      <div style={{ display: "flex", marginTop: "auto", paddingTop: 30, alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #d3e0dd", fontSize: 22, color: "#596269" }}>
        <span>Email, calendar and your next steps. Together.</span>
        <span style={{ color: "#006b68", fontSize: 18 }}>Private beta for macOS</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
