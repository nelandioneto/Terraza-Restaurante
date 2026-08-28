"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { TIME_SLOTS, SITE } from "@/lib/constants";
import { ReservationData } from "@/lib/types";
import SectionTitle from "@/components/ui/SectionTitle";
import { FiCalendar, FiClock, FiUsers, FiPhone, FiMail, FiUser, FiCheck } from "react-icons/fi";

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ReservationData>({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "",
    time: "",
    serviceType: "local",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    gsap.fromTo(
      section.querySelectorAll(".gsap-reveal-reservation"),
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
    if (isSubmitted) {
      gsap.fromTo(
        ".success-animation",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    }
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // ignore error
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="reservas"
      ref={sectionRef}
      className="py-20 md:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-secondary/50 to-dark" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="gsap-reveal-reservation">
          <SectionTitle
            subtitle="Reservas"
            title="Reserve a Sua Mesa"
            description="Garanta o melhor lugar para uma experiência gastronómica inesquecível."
          />
        </div>

        {isSubmitted ? (
          <div className="success-animation glass rounded-2xl p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <FiCheck size={40} className="text-gold" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Reserva Confirmada!
            </h3>
            <p className="text-text-secondary mb-6">
              Obrigado, {formData.name}! A sua reserva para {formData.guests} pessoa(s) no dia{" "}
              {new Date(formData.date).toLocaleDateString("pt-AO")} às {formData.time} foi recebida.
              Entraremos em contato para confirmação.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold text-dark px-6 py-3 rounded-full font-semibold hover:bg-gold-light transition-all"
              >
                Confirmar via WhatsApp
              </a>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    guests: 2,
                    date: "",
                    time: "",
                    serviceType: "local",
                    message: "",
                  });
                }}
                className="border border-gold/30 text-gold px-6 py-3 rounded-full font-semibold hover:bg-gold/10 transition-all"
              >
                Nova Reserva
              </button>
            </div>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="gsap-reveal-reservation glass rounded-2xl p-6 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gold mb-2">
                  Nome Completo *
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="O seu nome"
                    className="w-full bg-dark-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-text-muted text-sm focus:border-gold transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gold mb-2">
                  Email *
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="email@exemplo.com"
                    className="w-full bg-dark-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-text-muted text-sm focus:border-gold transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gold mb-2">
                  Telefone *
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="9XX XXX XXX"
                    className="w-full bg-dark-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-text-muted text-sm focus:border-gold transition-colors"
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-sm font-medium text-gold mb-2">
                  Número de Pessoas *
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-dark-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-gold transition-colors appearance-none cursor-pointer"
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? "pessoa" : "pessoas"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gold mb-2">
                  Data *
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-dark-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-gold transition-colors"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gold mb-2">
                  Hora *
                </label>
                <div className="relative">
                  <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-card border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-gold transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Selecionar hora</option>
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Service type */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gold mb-3">
                Tipo de Serviço
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, serviceType: "local" })
                  }
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${
                    formData.serviceType === "local"
                      ? "bg-gold text-dark border-gold"
                      : "bg-dark-card text-text-secondary border-white/10 hover:border-gold/30"
                  }`}
                >
                  Comer no Local
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, serviceType: "takeaway" })
                  }
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${
                    formData.serviceType === "takeaway"
                      ? "bg-gold text-dark border-gold"
                      : "bg-dark-card text-text-secondary border-white/10 hover:border-gold/30"
                  }`}
                >
                  Takeaway
                </button>
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gold mb-2">
                Mensagem (Opcional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Algum pedido especial, alergias, ocasião especial..."
                className="w-full bg-dark-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-text-muted text-sm focus:border-gold transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 bg-gold text-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_40px_rgba(197,165,90,0.3)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                    A processar...
                  </>
                ) : (
                  "Confirmar Reserva"
                )}
              </button>
              <p className="text-text-muted text-xs mt-4">
                Entraremos em contato para confirmar a sua reserva
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
