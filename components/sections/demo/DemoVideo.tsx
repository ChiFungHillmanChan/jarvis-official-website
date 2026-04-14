export function DemoVideo() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--grid-line)] bg-[var(--bg-panel)] shadow-[var(--shadow-soft)]">
      <video
        className="h-auto w-full"
        autoPlay
        controls
        loop
        muted
        preload="metadata"
        poster="/jarvis-demo-poster.jpg"
        playsInline
      >
        <source src="/jarvis-demo.mp4" type="video/mp4" />
        <track kind="captions" src="/jarvis-demo.vtt" srcLang="en" label="English" />
        Your browser does not support video.
      </video>
    </div>
  );
}
