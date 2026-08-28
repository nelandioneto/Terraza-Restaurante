"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
      },
    });

    // Logo reveal
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Line animation
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: "power3.inOut" },
      "-=0.3"
    );

    // Fade out
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-dark flex flex-col items-center justify-center"
    >
      <div ref={logoRef} className="text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold gold-gradient-text tracking-[0.2em]">
          TERRAZA
        </h1>
        <p className="text-gold/60 tracking-[0.5em] uppercase text-xs mt-2">
          Talatona
        </p>
      </div>
      <div
        ref={lineRef}
        className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mt-6 origin-center"
      />
    </div>
  );
}
