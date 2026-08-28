"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    gsap.fromTo(
      section.querySelectorAll(".gsap-reveal-contact"),
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

  const contactItems = [
    {
      icon: <FiMapPin size={22} />,
      label: "Morada",
      value: SITE.address,
      href: SITE.mapsUrl,
    },
    {
      icon: <FiPhone size={22} />,
      label: "Telefone",
      value: SITE.phoneFormatted,
      href: `tel:${SITE.phone}`,
    },
    {
      icon: <FiMail size={22} />,
      label: "Email",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: <FiClock size={22} />,
      label: "Horário",
      value: SITE.hours,
    },
  ];

  return (
    <section
      id="contactos"
      ref={sectionRef}
      className="py-20 md:py-28 relative"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gsap-reveal-contact">
          <SectionTitle
            subtitle="Contactos"
            title="Visite-nos"
            description="Estamos localizados no Condomínio Zenith Towers, Talatona. Será um prazer recebê-lo."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            {contactItems.map((item, i) => (
              <div key={i} className="gsap-reveal-contact">
                <ContactCard item={item} />
              </div>
            ))}

            {/* Map placeholder */}
            <div className="gsap-reveal-contact glass rounded-2xl overflow-hidden h-64">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d${SITE.coordinates.lng}!3d${SITE.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNTQnMDkuMCJTIDEzwzAxJzIwLjIiRQ!5e0!3m2!1spt!2sao!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.6) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Restaurante"
              />
            </div>
          </div>

          {/* Right side - Quick actions */}
          <div className="space-y-6">
            <div className="gsap-reveal-contact glass rounded-2xl p-8">
              <h3 className="font-display text-2xl font-bold text-white mb-6">
                Contacto Rápido
              </h3>

              <div className="space-y-4">
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg
                      viewBox="0 0 24 24"
                      fill="#25D366"
                      className="w-6 h-6"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">WhatsApp</p>
                    <p className="text-[#25D366] text-sm">
                      Mensagem directa
                    </p>
                  </div>
                  <FiExternalLink className="text-[#25D366] group-hover:translate-x-1 transition-transform" size={16} />
                </a>

                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gold/10 border border-gold/20 hover:bg-gold/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FiPhone size={22} className="text-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">Ligar Agora</p>
                    <p className="text-gold text-sm">{SITE.phoneFormatted}</p>
                  </div>
                </a>

                <a
                  href={SITE.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FiMapPin size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold">
                      Abrir no Google Maps
                    </p>
                    <p className="text-text-secondary text-sm">
                      {SITE.what3words}
                    </p>
                  </div>
                  <FiExternalLink className="text-white/50 group-hover:translate-x-1 transition-transform" size={16} />
                </a>
              </div>
            </div>

            {/* Hours detail */}
            <div className="gsap-reveal-contact glass rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-white mb-4">
                Horário de Funcionamento
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Segunda - Sexta", hours: "11:30 - 23:30" },
                  { day: "Sábado", hours: "11:30 - 00:00" },
                  { day: "Domingo", hours: "11:30 - 23:00" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="text-text-secondary text-sm">
                      {item.day}
                    </span>
                    <span className="text-white font-medium text-sm">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-gold/10 border border-gold/20">
                <p className="text-gold text-sm font-medium text-center">
                  Aberto agora · Fecha às 23:30
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  item,
}: {
  item: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
  };
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      x: 8,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const Content = item.href ? "a" : "div";

  return (
    <div ref={cardRef}>
      <Content
        {...(item.href
          ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="flex items-center gap-4 p-5 glass rounded-xl hover:border-gold/20 transition-colors duration-300 cursor-pointer"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
          <span className="text-gold">{item.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-text-secondary text-sm">{item.label}</p>
          <p className="text-white font-medium truncate">{item.value}</p>
        </div>
        {item.href && (
          <FiExternalLink className="text-text-muted group-hover:text-gold transition-colors flex-shrink-0" size={16} />
        )}
      </Content>
    </div>
  );
}
