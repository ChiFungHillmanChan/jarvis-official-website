export function DemoVideo() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-[var(--accent-cyan-20)]">
      <video
        className="h-auto w-full"
        controls
        preload="none"
        poster="/jarvis-demo-poster.jpg"
        playsInline
      >
        <source src="/jarvis-demo.mp4" type="video/mp4" />
        <track kind="captions" src="/jarvis-demo.vtt" srcLang="en" label="English" default />
        Your browser does not support video.
      </video>
    </div>
  );
}
