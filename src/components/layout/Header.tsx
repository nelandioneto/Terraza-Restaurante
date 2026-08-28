"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import { FiMenu, FiX, FiPhone } from "react-icons/fi";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      const items = mobileMenuRef.current.querySelectorAll(".mobile-nav-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div ref={logoRef} className="flex flex-col">
            <Link href="#inicio" className="group" onClick={() => handleNavClick("#inicio")}>
              <h1 className="font-display text-xl md:text-2xl font-bold tracking-wider">
                <span className="gold-gradient-text">TERRAZA</span>
              </h1>
              <p className="text-[10px] tracking-[0.35em] uppercase text-gold/70 -mt-1">
                Talatona
              </p>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="relative text-sm font-medium text-white/80 hover:text-gold transition-colors duration-300 tracking-wide group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-gold text-dark px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,165,90,0.3)]"
            >
              <FiPhone size={14} />
              Reservar
            </a>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-white hover:text-gold transition-colors"
              aria-label="Menu"
            >
              {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-dark/98 backdrop-blur-xl flex flex-col justify-center items-center gap-8"
        style={{ transform: "translateX(100%)" }}
      >
        {NAV_ITEMS.map((item, i) => (
          <div key={item.href} className="mobile-nav-item">
            <Link
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="font-display text-3xl md:text-4xl font-semibold text-white hover:text-gold transition-colors"
            >
              {item.label}
            </Link>
          </div>
        ))}
        <div className="mobile-nav-item mt-8">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-3 rounded-full text-lg font-semibold"
          >
            Reservar Mesa
          </a>
        </div>
      </div>
    </>
  );
}
