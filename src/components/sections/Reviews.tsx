"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { REVIEWS, SITE } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import { FiStar, FiExternalLink, FiMessageCircle } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    gsap.fromTo(
      section.querySelectorAll(".gsap-reveal-reviews"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
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
    <section
      id="criticas"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-secondary/30 to-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="gsap-reveal-reviews">
          <SectionTitle
            subtitle="Críticas"
            title="O que Dizem os Nossos Clientes"
            description="Avaliações reais de quem já viveu a experiência Terraza Talatona."
          />
        </div>

        {/* Rating summary */}
        <div className="gsap-reveal-reviews glass rounded-2xl p-6 md:p-8 max-w-2xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center">
              <div className="font-display text-5xl font-bold gold-gradient-text">4.3</div>
              <div className="flex gap-1 mt-2 justify-center">
                {[1, 2, 3, 4].map((i) => (
                  <FiStar key={i} size={16} className="text-gold fill-gold" />
                ))}
                <FiStar size={16} className="text-gold/40" />
              </div>
            </div>
            <div className="h-12 w-[1px] bg-gold/20 hidden sm:block" />
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold text-lg">222 avaliações</p>
              <p className="text-text-secondary text-sm">no Google Maps</p>
            </div>
            <div className="sm:ml-auto">
              <a
                href={SITE.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium"
              >
                Ver no Google <FiExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Reviews slider */}
        <div className="gsap-reveal-reviews">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop
            className="pb-16"
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* CTA */}
        <div className="gsap-reveal-reviews text-center mt-4">
          <a
            href={SITE.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold/30 text-gold px-6 py-3 rounded-full font-semibold hover:bg-gold/10 transition-all duration-300"
          >
            <FiMessageCircle size={16} />
            Deixar Avaliação
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: "0 20px 60px rgba(197, 165, 90, 0.15)",
      duration: 0.3,
    });
  };

  const handleLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "none",
      duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      className="bg-dark-card border border-white/5 rounded-2xl p-6 h-full hover:border-gold/15 transition-colors duration-300"
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0">
          <span className="text-dark font-bold text-lg">
            {review.author.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white truncate">{review.author}</h4>
          {review.role && (
            <p className="text-text-secondary text-xs">{review.role}</p>
          )}
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            size={14}
            className={i < review.rating ? "text-gold fill-gold" : "text-gold/20"}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-5">
        {review.text}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-text-muted text-xs">{review.date}</span>
        {review.photos && (
          <span className="text-text-muted text-xs">
            {review.photos} fotos
          </span>
        )}
      </div>
    </div>
  );
}
