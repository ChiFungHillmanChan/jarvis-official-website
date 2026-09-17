import Image from "next/image";

export function BrandIcon({ size = 32 }: { size?: number }) {
  return (
    <Image
      src="/icon-192x192.png"
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-[22%]"
    />
  );
}
