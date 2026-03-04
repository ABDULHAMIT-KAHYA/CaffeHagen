import React, { useRef, useEffect, useState, useMemo } from 'react';

// --- CONFIGURATION ---
const BASE_URL = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const getFramePath = (index: number) => `${BASE_URL}frames/${String(index).padStart(5, '0')}.jpg`;

// --- TYPES ---
interface ScrollFrameSectionProps {
  startFrame: number;
  endFrame: number;
  height?: string; // e.g. "100vh"
  children?: React.ReactNode;
}

interface CoffeeStoryProps {
  children: React.ReactElement<ScrollFrameSectionProps> | React.ReactElement<ScrollFrameSectionProps>[];
}

// --- CHILD COMPONENT: ScrollFrameSection ---
// This component acts as a "marker" for a scroll section.
// It renders its children inside a container of the specified height.
export const ScrollFrameSection: React.FC<ScrollFrameSectionProps> = ({ 
  height = "100vh", 
  children 
}) => {
  return (
    <div className="relative w-full z-10 pointer-events-none flex flex-col items-center justify-center" style={{ height }}>
       <div className="pointer-events-auto">
          {children}
       </div>
    </div>
  );
};

// --- PARENT COMPONENT: CoffeeStory ---
export const CoffeeStory: React.FC<CoffeeStoryProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<(HTMLImageElement | null)[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(true);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const lastScrollTime = useRef(0);
  
  // Extract sections from children to build the timeline
  const sections = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return null;
      return child.props as ScrollFrameSectionProps;
    })?.filter(Boolean) || [];
  }, [children]);

  // Determine total frames needed
  const totalFrames = useMemo(() => {
    if (sections.length === 0) return 0;
    return Math.max(...sections.map(s => s.endFrame));
  }, [sections]);

  // --- LOADING LOGIC ---
  useEffect(() => {
    if (totalFrames === 0) return;

    // Initialize image array
    const imgs = new Array(totalFrames).fill(null);
    let loadedCount = 0;
    let hasLoggedReady = false;

    // Helper to load a specific range
    const loadRange = (start: number, end: number, priority: boolean = false) => {
      for (let i = start; i <= end; i++) {
        if (imgs[i - 1]) continue; // Already loading/loaded

        const img = new Image();
        img.src = getFramePath(i);
        
        const onFinish = () => {
          loadedCount++;
          // Simple "ready" logic: if we have the first section loaded, show it
          if (!hasLoggedReady && loadedCount > 20) { // Arbitrary threshold for "start now"
             hasLoggedReady = true;
             setIsReady(true);
          }
        };

        img.onload = () => {
          imgs[i - 1] = img;
          onFinish();
        };
        img.onerror = () => {
          console.warn(`[CoffeeStory] Failed to load frame ${i}`);
          imgs[i - 1] = null; // Mark as null but processed
          onFinish();
        };
      }
    };

    // 1. Load the first section immediately (High Priority)
    if (sections.length > 0) {
      loadRange(sections[0].startFrame, sections[0].endFrame, true);
    }

    // 2. Load the rest in background with a slight delay
    const timeout = setTimeout(() => {
      if (sections.length > 1) {
        // Load remaining sections
        const lastFrame = sections[sections.length - 1].endFrame;
        // Start from end of first section + 1
        const startRest = sections[0].endFrame + 1;
        loadRange(startRest, lastFrame, false);
      }
    }, 1000);

    // Safety timeout to force show content
    const safety = setTimeout(() => {
        if (!hasLoggedReady) {
            console.warn("[CoffeeStory] Loader safety timeout.");
            setIsReady(true);
        }
    }, 4000);

    setImages(imgs);

    return () => {
      clearTimeout(timeout);
      clearTimeout(safety);
    };
  }, [totalFrames, sections]);

  // --- SCROLL LOCK & ANIMATION LOGIC ---
  useEffect(() => {
    // We only need to control scroll if we are locked.
    // However, if we are unlocked, we should allow normal scroll.
    
    // Logic:
    // If locked: preventDefault on wheel/touchmove.
    // Detect direction.
    // If down -> advance section (0 -> 1 -> 2).
    // If at 2 and down -> unlock.
    // If up -> go back (2 -> 1 -> 0).
    // If at 0 and up -> do nothing (or bounce).
    
    const handleScroll = (e: WheelEvent | TouchEvent) => {
        if (!scrollLocked) {
             // If we are unlocked, we only care if we are scrolling UP from the top?
             // Or maybe we re-lock if we scroll up to the top?
             // For now, simple requirement: "After Stage 3... release lock... continue normally"
             // Implies one-way lock release.
             
             // Optional: Re-lock if user scrolls back to top?
             if (window.scrollY === 0 && activeSection === 2) {
                 // Check direction
                 let deltaY = 0;
                 if (e instanceof WheelEvent) deltaY = e.deltaY;
                 // Touch logic omitted for brevity in this specific check for now
                 
                 if (deltaY < 0) {
                     // Scrolling up at the top -> Re-lock?
                     // Let's stick to the prompt: "After... scrolls again... released".
                     // If they scroll back up, maybe we re-enter stage 2?
                     // User didn't specify, but good UX suggests re-locking if we go back to top.
                     setScrollLocked(true);
                     e.preventDefault();
                 }
             }
             return;
        }

        e.preventDefault();
        
        // Throttle
        const now = Date.now();
        if (now - lastScrollTime.current < 1000) return; // 1 second throttle per step
        
        let deltaY = 0;
        if (e instanceof WheelEvent) {
            deltaY = e.deltaY;
        } else if (e instanceof TouchEvent) {
            // Touch logic requires tracking start/end. 
            // Simplified: we'll use a separate handler for touch logic or assume simple swipes?
            // For robust touch, we need touchstart/touchmove.
            // Let's stick to wheel for desktop base, add touch if needed.
            // But we must prevent default for touchmove to stop scroll.
            return; 
        }

        if (Math.abs(deltaY) < 10) return; // Ignore small movements
        
        lastScrollTime.current = now;

        if (deltaY > 0) {
            // Down
            if (activeSection < sections.length - 1) {
                // Advance
                setActiveSection(prev => prev + 1);
            } else {
                // At end (Stage 3 / Index 2) -> Unlock
                setScrollLocked(false);
                // Allow the scroll to propagate? No, this event was consumed to unlock.
                // Next scroll will move page.
            }
        } else {
            // Up
            if (activeSection > 0) {
                setActiveSection(prev => prev - 1);
            }
        }
    };
    
    // Touch handling
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
        if (!scrollLocked) return;
        e.preventDefault(); // Lock scroll
        
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY; // Up is positive (scroll down)
        
        const now = Date.now();
        if (now - lastScrollTime.current < 1000) return;
        
        if (Math.abs(deltaY) > 50) { // Threshold
            lastScrollTime.current = now;
            if (deltaY > 0) { // Swipe Up (Scroll Down)
                if (activeSection < sections.length - 1) {
                    setActiveSection(prev => prev + 1);
                } else {
                    setScrollLocked(false);
                }
            } else { // Swipe Down (Scroll Up)
                 if (activeSection > 0) {
                    setActiveSection(prev => prev - 1);
                }
            }
        }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
        window.removeEventListener('wheel', handleScroll);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollLocked, activeSection, sections.length]);

  // --- FRAME ANIMATION LOOP ---
  useEffect(() => {
      // Update target frame based on active section
      if (sections.length > 0 && activeSection < sections.length) {
          // If activeSection is 0 -> target is section[0].endFrame?
          // User said: Stage 1 = Start Frame. Stage 2 = Transition. Stage 3 = Final.
          // Let's assume:
          // Section 0 (Stage 1) -> Show start frame (e.g. 1)
          // Section 1 (Stage 2) -> Show middle frame (e.g. 96)
          // Section 2 (Stage 3) -> Show end frame (e.g. 192)
          
          // Wait, "Show the transition frame" might mean "Play the transition".
          // If we go 0 -> 1, we should play from 1 to 96.
          // If we go 1 -> 2, we should play from 96 to 192.
          
          // Let's use the sections prop to define these keyframes.
          // Section 0: startFrame..endFrame. Target = endFrame?
          // Or StartFrame?
          
          // Let's assume the "Steady State" for each stage is the END of that section's range.
          // Stage 0: Target = Section[0].endFrame
          // Stage 1: Target = Section[1].endFrame
          // Stage 2: Target = Section[2].endFrame
          
          const target = sections[activeSection].endFrame;
          targetFrameRef.current = target;
      }
  }, [activeSection, sections]);

  // --- RENDER LOOP ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || sections.length === 0) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let animationFrameId: number;
    let lastTime = 0;
    const fpsInterval = 1000 / 25; // 30 FPS

    const render = (time: number) => {
      const delta = time - lastTime;
      
      if (delta >= fpsInterval) {
          lastTime = time - (delta % fpsInterval);

          // Smoothly interpolate currentFrame towards targetFrame
          // We want a "play" effect, not just a snap.
          const diff = targetFrameRef.current - currentFrameRef.current;
          
          if (Math.abs(diff) > 0.5) {
              // Move towards target. Speed proportional to distance? 
              // Or constant speed? "Smooth transitions".
              // Let's use a simple ease-out or constant speed.
              // Constant speed looks more like a video playing.
              // Adjusted speed factor for 30 FPS (0.2 instead of 0.1) to maintain responsiveness
              const speed = Math.max(1, Math.abs(diff) * 0.2); 
              currentFrameRef.current += Math.sign(diff) * speed;
          } else {
              currentFrameRef.current = targetFrameRef.current;
          }
          
          const frameIndex = Math.round(currentFrameRef.current);
          
          // Draw
          const img = images[frameIndex - 1];
          
          const dpr = window.devicePixelRatio || 1;
          const width = window.innerWidth;
          const height = window.innerHeight;

          // Resize if needed
          if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            context.scale(dpr, dpr);
          }

          // Draw Logic
          if (img) {
             // "Cover" algorithm
             const scale = Math.max(width / img.width, height / img.height);
             const x = (width - img.width * scale) / 2;
             const y = (height - img.height * scale) / 2;
     
             context.clearRect(0, 0, width, height);
             context.drawImage(img, x, y, img.width * scale, img.height * scale);
          } else if (frameIndex > 1) {
              // Search backward for a valid frame if current is missing
              let found = false;
              for (let i = frameIndex - 1; i >= 1; i--) {
                  if (images[i - 1]) {
                      const fallback = images[i - 1];
                      if (fallback) {
                        const scale = Math.max(width / fallback.width, height / fallback.height);
                        const x = (width - fallback.width * scale) / 2;
                        const y = (height - fallback.height * scale) / 2;
                        context.clearRect(0, 0, width, height);
                        context.drawImage(fallback, x, y, fallback.width * scale, fallback.height * scale);
                        found = true;
                        break;
                      }
                  }
              }
              if (!found) context.clearRect(0, 0, width, height);
          } else {
             context.clearRect(0, 0, width, height);
          }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [sections, images, isReady]); // Removed activeSection dependency, using refs

  return (
    <div ref={containerRef} className="relative w-full bg-black h-screen">
      {/* 1. Sticky Container
          This holds BOTH the canvas and the content.
          It stays pinned to the top of the viewport for the entire duration of the scroll.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        
        {/* A. Canvas Layer (Background) */}
        <canvas 
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* B. Content Layer (Foreground) */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
           {sections.map((section, index) => {
               return (
                 <div 
                    key={index} 
                    className="absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-1000 ease-in-out"
                    style={{ 
                        opacity: activeSection === index ? 1 : 0,
                        pointerEvents: activeSection === index ? 'auto' : 'none'
                    }}
                 >
                    {React.Children.toArray(children)[index]}
                 </div>
               );
           })}
        </div>
        
        {/* C. Indicators (Dots) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
            {sections.map((_, idx) => (
                <div 
                    key={idx}
                    className={`w-3 h-3 rounded-full border border-cream transition-all duration-500 ${
                        idx === activeSection ? 'bg-cream scale-125' : 'bg-transparent opacity-50'
                    }`}
                />
            ))}
        </div>

        {/* Global Loader Overlay */}
        {!isReady && (
            <div className="absolute inset-0 bg-black z-50 flex items-center justify-center">
                <span className="text-white font-serif animate-pulse tracking-widest">BREWING...</span>
            </div>
        )}
      </div>
      
      {/* Ghost Scroll Track - Removed since we are locking scroll */}
      {/* We don't need height anymore if we hijack scroll. 
          But we need the parent to allow us to be 'sticky' if we were using sticky.
          Actually, since we lock scroll at top, 'h-screen' is enough.
      */}
    </div>
  );
};
