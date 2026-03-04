import React, { useRef, useEffect, useState } from "react";

// -----------------------------
// CONFIGURATION SECTION
// -----------------------------
const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const CONFIG = {
  frameCount: 192, // 00001.jpg ... 00192.jpg
  framePath: (index1Based: number) => `${BASE_URL}frames/${String(index1Based).padStart(5, "0")}.jpg`,
  scrollHeight: "500vh",
  batchSize: 12, // quick first paint
  loaderTimeout: 3000,
  backgroundLoadDelay: 700,
};
// -----------------------------

interface CoffeeScrollAnimationProps {
  children?: React.ReactNode;
}

type FrameStatus = "idle" | "loading" | "loaded" | "error";

const CoffeeScrollAnimation: React.FC<CoffeeScrollAnimationProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const statusRef = useRef<FrameStatus[]>([]);

  const [isReady, setIsReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // -----------------------------
  // PRELOAD FRAMES (robust)
  // -----------------------------
  useEffect(() => {
    if (imagesRef.current.length !== CONFIG.frameCount) {
      imagesRef.current = new Array(CONFIG.frameCount).fill(null);
    }
    if (statusRef.current.length !== CONFIG.frameCount) {
      statusRef.current = new Array(CONFIG.frameCount).fill("idle");
    }

    let processed = 0;
    let readyFired = false;
    let cancelled = false;

    const markProcessed = () => {
      if (cancelled) return;

      processed += 1;
      setLoadingProgress(Math.min(100, Math.round((processed / CONFIG.frameCount) * 100)));

      if (!readyFired && processed >= Math.min(CONFIG.batchSize, CONFIG.frameCount)) {
        readyFired = true;
        setIsReady(true);
      }
    };

    const loadFrame = (index0Based: number) => {
      if (cancelled) return;
      if (statusRef.current[index0Based] !== "idle") return;

      statusRef.current[index0Based] = "loading";
      const img = new Image();

      // IMPORTANT: handlers BEFORE src (fixes cache race)
      img.onload = () => {
        if (cancelled) return;
        imagesRef.current[index0Based] = img;
        statusRef.current[index0Based] = "loaded";
        markProcessed();
      };

      img.onerror = () => {
        if (cancelled) return;
        const path = CONFIG.framePath(index0Based + 1);
        console.warn(`[CoffeeScrollAnimation] Missing frame: ${path}`);
        imagesRef.current[index0Based] = null;
        statusRef.current[index0Based] = "error";
        markProcessed();
      };

      img.src = CONFIG.framePath(index0Based + 1);
    };

    // 1) initial batch (fast start)
    const first = Math.min(CONFIG.batchSize, CONFIG.frameCount);
    for (let i = 0; i < first; i++) loadFrame(i);

    // 2) rest in background
    const bgTimer = window.setTimeout(() => {
      for (let i = first; i < CONFIG.frameCount; i++) loadFrame(i);
    }, CONFIG.backgroundLoadDelay);

    // 3) safety timeout (never block UI)
    const safety = window.setTimeout(() => {
      if (cancelled) return;
      if (!readyFired) {
        console.warn("[CoffeeScrollAnimation] Loader timeout reached. Forcing display.");
        readyFired = true;
        setIsReady(true);
      }
    }, CONFIG.loaderTimeout);

    return () => {
      cancelled = true;
      window.clearTimeout(bgTimer);
      window.clearTimeout(safety);
    };
  }, []);

  // -----------------------------
  // CANVAS RENDER LOOP
  // -----------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // alpha:true so your page background can show if needed
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let lastIndex = -1;

    const resizeIfNeeded = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      const tw = Math.floor(w * dpr);
      const th = Math.floor(h * dpr);

      if (canvas.width !== tw || canvas.height !== th) {
        canvas.width = tw;
        canvas.height = th;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        // IMPORTANT: reset transform so scale doesn't accumulate
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      return { w, h };
    };

    const getBestAvailableFrame = (target: number): HTMLImageElement | null => {
      // exact
      const exact = imagesRef.current[target];
      if (exact) return exact;

      // backward search
      for (let i = target - 1; i >= 0; i--) {
        const img = imagesRef.current[i];
        if (img) return img;
      }

      // forward search
      for (let i = target + 1; i < CONFIG.frameCount; i++) {
        const img = imagesRef.current[i];
        if (img) return img;
      }

      return null;
    };

    const drawCover = (img: HTMLImageElement, w: number, h: number) => {
      const scale = Math.max(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (w - dw) / 2;
      const dy = (h - dh) / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const render = () => {
      const { w, h } = resizeIfNeeded();

      const rect = container.getBoundingClientRect();
      const scrollDistance = -rect.top;
      const maxScroll = container.offsetHeight - window.innerHeight;

      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollDistance / maxScroll)) : 0;
      const targetIndex = Math.min(CONFIG.frameCount - 1, Math.floor(progress * (CONFIG.frameCount - 1)));

      // redraw only if index changed
      if (targetIndex !== lastIndex) {
        const img = getBestAvailableFrame(targetIndex);
        if (img) {
          lastIndex = targetIndex;
          drawCover(img, w, h);
        } else {
          // nothing ready yet
          ctx.clearRect(0, 0, w, h);
        }
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: CONFIG.scrollHeight }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />

        {/* Content Overlay */}
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>

        {/* Loader */}
        <div
          className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
            isReady ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <div className="mb-4 animate-pulse font-serif text-xl tracking-widest text-cream/80">
            BREWING
          </div>

          <div className="h-1 w-48 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-cream transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>

          <div className="mt-2 font-mono text-xs text-white/40">{loadingProgress}%</div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeScrollAnimation;