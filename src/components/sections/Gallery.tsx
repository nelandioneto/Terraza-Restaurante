"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "@/lib/constants";
import { GalleryImage } from "@/lib/types";
import SectionTitle from "@/components/ui/SectionTitle";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredImages =
    activeCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback(
    (index: number) => {
      setLightbox({ open: true, index });
      document.body.style.overflow = "hidden";
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, index: 0 });
    document.body.style.overflow = "";
  }, []);

  const nextImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % filteredImages.length,
    }));
  }, [filteredImages.length]);

  const prevImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + filteredImages.length) % filteredImages.length,
    }));
  }, [filteredImages.length]);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll(".gallery-item");
    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, [activeCategory]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    gsap.fromTo(
      section.querySelectorAll(".gsap-reveal-gallery"),
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox.open, closeLightbox, nextImage, prevImage]);

  return (
    <section id="galeria" ref={sectionRef} className="py-20 md:py-28 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gsap-reveal-gallery">
          <SectionTitle
            subtitle="Galeria"
            title="Momentos de Sabor"
            description="Imagens que contam a história de cada prato e cada experiência no Terraza Talatona."
          />
        </div>

        {/* Category filters */}
        <div className="gsap-reveal-gallery flex flex-wrap justify-center gap-3 mb-12">
          {GALLERY_CATEGORIES.map((cat) => (
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

        {/* Gallery grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredImages.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightbox.index}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
}

function GalleryItem({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleHover = () => {
    if (!itemRef.current) return;
    gsap.to(itemRef.current.querySelector(".gallery-overlay"), {
      opacity: 1,
      duration: 0.3,
    });
    gsap.to(itemRef.current.querySelector(".gallery-img"), {
      scale: 1.08,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    if (!itemRef.current) return;
    gsap.to(itemRef.current.querySelector(".gallery-overlay"), {
      opacity: 0,
      duration: 0.3,
    });
    gsap.to(itemRef.current.querySelector(".gallery-img"), {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={itemRef}
      className={`gallery-item relative rounded-xl overflow-hidden cursor-pointer group ${
        index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
      }`}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div
        className={`gallery-img aspect-square bg-cover bg-center ${
          index === 0 || index === 5 ? "md:aspect-auto md:h-full" : ""
        }`}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-${
            index === 0
              ? "1414235077428-338989a2e8c0"
              : index === 1
              ? "1517248135467-4c7edcad34c4"
              : index === 2
              ? "1504674900247-0877df9cc836"
              : index === 3
              ? "1559339352-11d035aa65de"
              : index === 4
              ? "1551218808-94e220e084d2"
              : index === 5
              ? "1550966871-3ed3cdb51f3a"
              : index === 6
              ? "1476224203421-9ac39bcb3327"
              : index === 7
              ? "1540541338287-41700207dee6"
              : index === 8
              ? "1473093295043-cdd812d0e601"
              : "1551024506-0bccd828d307"
          }?w=800&q=80')`,
        }}
      />
      <div className="gallery-overlay absolute inset-0 bg-dark/60 opacity-0 flex items-center justify-center transition-opacity">
        <div className="text-center">
          <p className="text-gold font-display text-lg font-semibold">{image.alt}</p>
          <p className="text-white/60 text-sm capitalize mt-1">{image.category}</p>
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-dark/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-gold transition-colors z-10"
      >
        <FiX size={28} />
      </button>

      {/* Nav */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 md:left-8 text-white/70 hover:text-gold transition-colors z-10"
      >
        <FiChevronLeft size={36} />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 md:right-8 text-white/70 hover:text-gold transition-colors z-10"
      >
        <FiChevronRight size={36} />
      </button>

      {/* Image */}
      <div
        className="max-w-5xl max-h-[85vh] px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full h-[70vh] bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-${
              currentIndex === 0
                ? "1414235077428-338989a2e8c0"
                : currentIndex === 1
                ? "1517248135467-4c7edcad34c4"
                : currentIndex === 2
                ? "1504674900247-0877df9cc836"
                : currentIndex === 3
                ? "1559339352-11d035aa65de"
                : currentIndex === 4
                ? "1551218808-94e220e084d2"
                : currentIndex === 5
                ? "1550966871-3ed3cdb51f3a"
                : currentIndex === 6
                ? "1476224203421-9ac39bcb3327"
                : currentIndex === 7
                ? "1540541338287-41700207dee6"
                : currentIndex === 8
                ? "1473093295043-cdd812d0e601"
                : "1551024506-0bccd828d307"
            }?w=1200&q=80')`,
          }}
        />
        <div className="text-center mt-4">
          <p className="text-gold font-display text-lg">{images[currentIndex]?.alt}</p>
          <p className="text-text-secondary text-sm mt-1">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
