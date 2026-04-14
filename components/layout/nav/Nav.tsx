import { Wordmark } from "@/components/ui/Wordmark";
import { NavLinks } from "./NavLinks";
import { NavCta } from "./NavCta";
import { MobileMenu } from "./MobileMenu";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--grid-line)] bg-[color:rgba(6,10,20,0.6)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <Wordmark />
        <NavLinks />
        <div className="hidden md:block">
          <NavCta />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
