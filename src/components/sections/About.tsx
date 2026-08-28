"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGsapCounter } from "@/hooks/useGsap";
import { STATS, SITE } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import { FiAward, FiHeart, FiStar, FiUsers } from "react-icons/fi";

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const counterRef = useGsapCounter(value, 2.5);
  const icons: Record<string, React.ReactNode> = {
    "Anos de Experiência": <FiAward className="text-gold" size={28} />,
    "Críticas Positivas": <FiStar className="text-gold" size={28} />,
    "Pratos Únicos": <FiHeart className="text-gold" size={28} />,
    "Avaliação Google": <FiUsers className="text-gold" size={28} />,
  };

  return (
    <div className="text-center group">
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
          {icons[label] || <FiStar className="text-gold" size={28} />}
        </div>
      </div>
      <div className="font-display text-4xl md:text-5xl font-bold gold-gradient-text mb-2">
        <span ref={counterRef}>0</span>
        {suffix}
      </div>
      <p className="text-text-secondary text-sm tracking-wider uppercase">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    // Image reveal
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    // Text reveal
    if (textRef.current) {
      const items = textRef.current.querySelectorAll(".about-text-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-secondary/50 to-dark" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold/3 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionTitle
          subtitle="Sobre Nós"
          title="Uma História de Paixão"
          description="Conheça a história por trás do Terraza Talatona e a nossa dedicação à excelência gastronómica."
        />

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Image side */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="aspect-[4/5] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 glass rounded-2xl p-5 shadow-2xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <FiAward className="text-gold" size={24} />
                </div>
                <div>
                  <p className="gold-gradient-text font-display text-2xl font-bold">8+</p>
                  <p className="text-text-secondary text-xs">Anos de Excelência</p>
                </div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl" />
          </div>

          {/* Text side */}
          <div ref={textRef}>
            <div className="about-text-item">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                Elegância, Sabor e{" "}
                <span className="gold-gradient-text">Tradição</span>
              </h3>
            </div>

            <div className="about-text-item space-y-4 text-text-secondary leading-relaxed">
              <p>
                O Terraza Talatona nasceu da paixão por cozinhar e da vontade de criar um espaço onde
                cada refeição se transforma numa experiência memorável. Localizado no coração do
                Condomínio Zenith Towers, em Talatona, somos o destino perfeito para quem procura
                qualidade e sofisticação.
              </p>
              <p>
                A nossa carta é uma celebração dos sabores de Portugal e Angola, cuidadosamente
                elaborada com ingredientes frescos e de qualidade. Desde pratos de marisqueira
                até às nossas especialidades de carne, cada prato é preparado com atenção aos
                detalhes.
              </p>
              <p>
                Venha descobrir porque somos o restaurante mais bem avaliado da zona de Talatona.
                A nossa equipa está pronta para o receber com um atendimento cordial e profissional.
              </p>
            </div>

            <div className="about-text-item mt-8 flex flex-wrap gap-4">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-dark px-6 py-3 rounded-full font-semibold hover:bg-gold-light transition-all duration-300"
              >
                Reservar Experiência
              </a>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 border border-gold/30 text-gold px-6 py-3 rounded-full font-semibold hover:bg-gold/10 transition-all duration-300"
              >
                Ver Menu
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
