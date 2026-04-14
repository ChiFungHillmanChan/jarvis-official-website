const corner =
  "pointer-events-none absolute h-5 w-5 border-[color:var(--accent-cyan)] shadow-[0_0_12px_rgba(0,180,255,0.45)]";

export function PreviewCorners() {
  return (
    <>
      <span className={`${corner} -left-px -top-px border-l-[1.5px] border-t-[1.5px]`} aria-hidden="true" />
      <span className={`${corner} -right-px -top-px border-r-[1.5px] border-t-[1.5px]`} aria-hidden="true" />
      <span className={`${corner} -bottom-px -left-px border-b-[1.5px] border-l-[1.5px]`} aria-hidden="true" />
      <span className={`${corner} -bottom-px -right-px border-b-[1.5px] border-r-[1.5px]`} aria-hidden="true" />
    </>
  );
}
