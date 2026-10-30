export default function Loading() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 3,
        background: "linear-gradient(90deg, #d4a853 0%, #f6e0a4 50%, #d4a853 100%)",
        backgroundSize: "200% 100%",
        animation: "tathaastu-nav-progress 0.9s ease-in-out infinite",
        pointerEvents: "none",
      }}
    >
      <style>{`
        @keyframes tathaastu-nav-progress {
          0% { background-position: 100% 0; opacity: 0.55; }
          50% { opacity: 1; }
          100% { background-position: -100% 0; opacity: 0.55; }
        }
      `}</style>
    </div>
  );
}
