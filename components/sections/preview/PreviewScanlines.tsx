export function PreviewScanlines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,180,255,0.12) 0px, rgba(0,180,255,0.12) 1px, transparent 1px, transparent 3px)",
      }}
      aria-hidden="true"
    />
  );
}
