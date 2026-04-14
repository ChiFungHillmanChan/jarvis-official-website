import Image from "next/image";
import { PreviewCorners } from "./PreviewCorners";
import { PreviewLabels } from "./PreviewLabels";
import { PreviewScanlines } from "./PreviewScanlines";
import { PreviewRecIndicator } from "./PreviewRecIndicator";

export function PreviewFrame() {
  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl">
      <PreviewLabels />
      <div
        className="absolute inset-0 rounded-[2px] shadow-[0_0_90px_rgba(0,180,255,0.22)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,180,255,0.12) 0%, rgba(0,180,255,0.02) 50%, rgba(0,180,255,0.1) 100%)",
          padding: "1px",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2px] border border-[var(--accent-cyan-20)] bg-[var(--bg-void)]">
          <Image
            src="/jarvis-demo-screenshot.webp"
            alt="JARVIS macOS application showing the holographic data sphere, voice panel, and morning briefing."
            fill
            sizes="(min-width: 1280px) 960px, 100vw"
            className="object-cover"
          />
          <PreviewScanlines />
          <PreviewRecIndicator />
          <PreviewCorners />
        </div>
      </div>
    </div>
  );
}
