"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { MENU_ITEMS, MENU_CATEGORIES, formatPrice, SITE } from "@/lib/constants";
import { MenuItem, MenuCategory } from "@/lib/types";
import SectionTitle from "@/components/ui/SectionTitle";
import { FiStar } from "react-icons/fi";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredItems =
    activeCategory === "all"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".menu-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, [activeCategory]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    gsap.fromTo(
      section.querySelectorAll(".gsap-reveal-menu"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="py-20 md:py-28 relative">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gsap-reveal-menu">
          <SectionTitle
            subtitle="A Nossa Carta"
            title="Sabores que Encantam"
            description="Ingredientes frescos, receitas tradicionais e uma pitada de inovação. Cada prato é uma experiência."
          />
        </div>

        {/* Category filters */}
        <div className="gsap-reveal-menu flex flex-wrap justify-center gap-3 mb-12">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gold text-dark shadow-[0_0_20px_rgba(197,165,90,0.3)]"
                  : "bg-dark-card text-text-secondary hover:text-gold border border-white/10 hover:border-gold/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="gsap-reveal-menu text-center mt-12">
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold/40 text-gold px-8 py-3 rounded-full font-semibold hover:bg-gold/10 transition-all duration-300"
          >
            Ver Menu Completo
          </a>
        </div>
      </div>
    </section>
  );
}

function MenuCard({ item }: { item: MenuItem }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="menu-card group relative bg-dark-card rounded-2xl border border-white/5 p-6 hover:border-gold/20 transition-colors duration-300 cursor-pointer overflow-hidden"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Badges */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {item.isPopular && (
            <span className="inline-flex items-center gap-1 bg-gold/15 text-gold px-3 py-1 rounded-full text-xs font-semibold">
              <FiStar size={10} /> Popular
            </span>
          )}
          {item.isChefChoice && (
            <span className="inline-flex items-center gap-1 bg-gold-dark/20 text-gold-pale px-3 py-1 rounded-full text-xs font-semibold">
              Chef Recomenda
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="font-display text-xl font-semibold text-white mb-2 group-hover:text-gold transition-colors">
          {item.name}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="gold-gradient-text font-display text-lg font-bold">
            {formatPrice(item.price)}
          </span>
          <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-gold text-lg">+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
