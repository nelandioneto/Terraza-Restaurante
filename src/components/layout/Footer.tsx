"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE, NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { FiInstagram, FiFacebook, FiPhone, FiMail, FiMapPin, FiArrowUp } from "react-icons/fi";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current.querySelectorAll(".footer-reveal"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative pt-20 pb-6 bg-dark-secondary">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="footer-reveal">
            <h3 className="font-display text-2xl font-bold gold-gradient-text mb-3">
              TERRAZA
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              A melhor experiência gastronómica em Talatona. Marisqueira,
              pratos principais e sobremesas artesanais num ambiente
              sofisticado.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-300"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-300"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-300"
              >
                <FiPhone size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-reveal">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-secondary text-sm hover:text-gold transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-reveal">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contactos
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-gold mt-0.5 flex-shrink-0" size={14} />
                <span className="text-text-secondary text-sm">
                  {SITE.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-3 text-text-secondary text-sm hover:text-gold transition-colors"
                >
                  <FiPhone className="text-gold flex-shrink-0" size={14} />
                  {SITE.phoneFormatted}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-text-secondary text-sm hover:text-gold transition-colors"
                >
                  <FiMail className="text-gold flex-shrink-0" size={14} />
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-reveal">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Horário
            </h4>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li className="flex justify-between">
                <span>Seg - Sex</span>
                <span className="text-white">11:30 - 23:30</span>
              </li>
              <li className="flex justify-between">
                <span>Sábado</span>
                <span className="text-white">11:30 - 00:00</span>
              </li>
              <li className="flex justify-between">
                <span>Domingo</span>
                <span className="text-white">11:30 - 23:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-reveal border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Terraza Talatona. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold/10 transition-all duration-300"
            aria-label="Voltar ao topo"
          >
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
