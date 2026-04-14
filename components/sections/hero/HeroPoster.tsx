import Image from "next/image";

export function HeroPoster() {
  return (
    <div className="absolute inset-0 -z-20 opacity-40">
      <Image
        src="/jarvis-demo-screenshot.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:rgba(6,10,20,0.5)] via-transparent to-[color:var(--bg-void)]" />
    </div>
  );
}
