export function HeroHudBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,180,255,0.08) 0%, rgba(0,180,255,0.02) 35%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,180,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-30 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden="true"
      />
    </>
  );
}
