"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    const subtitleEl = ref.current.querySelector(".section-subtitle");
    const lineEl = ref.current.querySelector(".section-line");
    const titleEl = ref.current.querySelector(".section-title");
    const descEl = ref.current.querySelector(".section-desc");

    if (subtitleEl) {
      tl.fromTo(subtitleEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
    }
    if (lineEl) {
      tl.fromTo(lineEl, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, "-=0.3");
    }
    if (titleEl) {
      tl.fromTo(titleEl, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
    }
    if (descEl) {
      tl.fromTo(descEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {subtitle && (
        <p className="section-subtitle text-gold font-medium tracking-[0.3em] uppercase text-sm mb-4">
          {subtitle}
        </p>
      )}
      <div
        className={`section-line h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mb-6 origin-center ${align === "center" ? "mx-auto w-24" : "w-24"}`}
      />
      <h2
        className={`section-title font-display text-3xl md:text-4xl lg:text-5xl font-bold ${light ? "text-dark" : "text-white"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`section-desc mt-4 max-w-2xl mx-auto text-base md:text-lg ${light ? "text-gray-600" : "text-text-secondary"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
