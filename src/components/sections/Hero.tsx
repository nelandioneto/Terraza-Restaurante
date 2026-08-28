"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE } from "@/lib/constants";
import { FiChevronDown } from "react-icons/fi";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Background zoom in
    if (overlayRef.current) {
      tl.fromTo(
        overlayRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      );
    }

    // Title animation
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll(".hero-word");
      tl.fromTo(
        words,
        { opacity: 0, y: 80, rotationX: -40 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=1.5"
      );
    }

    // Subtitle
    if (subtitleRef.current) {
      const line = subtitleRef.current.querySelector(".hero-line");
      const text = subtitleRef.current.querySelector(".hero-text");
      if (line) {
        tl.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
          "-=0.5"
        );
      }
      if (text) {
        tl.fromTo(
          text,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );
      }
    }

    // CTA buttons
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll("a");
      tl.fromTo(
        buttons,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }

    // Scroll indicator
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.3"
      );
      gsap.to(scrollRef.current.querySelector(".scroll-arrow"), {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Parallax on scroll
    gsap.to(titleRef.current, {
      yPercent: -30,
      opacity: 0.3,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToMenu = () => {
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        <div className="overflow-hidden mb-2">
          <p className="text-gold/80 tracking-[0.4em] uppercase text-xs sm:text-sm font-medium">
            Restaurante Marisqueira
          </p>
        </div>

        <h1 ref={titleRef} className="font-display font-bold mb-6 perspective-[1000px]">
          <span className="hero-word inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl gold-gradient-text leading-tight">
            TERRAZA
          </span>
          <br />
          <span className="hero-word inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight">
            TALATONA
          </span>
        </h1>

        <div ref={subtitleRef} className="mb-10">
          <div className="hero-line h-[1px] w-24 bg-gold mx-auto mb-6 origin-center" />
          <p className="hero-text text-text-secondary text-lg sm:text-xl md:text-2xl font-light tracking-wider">
            {SITE.tagline}
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-gold text-dark px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(197,165,90,0.4)]"
          >
            <span className="relative z-10">Reservar Mesa</span>
            <div className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <button
            onClick={scrollToMenu}
            className="group border border-gold/40 text-gold px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold/10 transition-all duration-300"
          >
            Ver Menu
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToMenu}
      >
        <span className="text-xs tracking-[0.3em] uppercase text-gold/60">
          Descubra
        </span>
        <FiChevronDown className="scroll-arrow text-gold/60" size={20} />
      </div>
    </section>
  );
}
