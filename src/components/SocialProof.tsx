import { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const SocialProof = () => {
  const { language, t } = useLanguage();
  const [active, setActive] = useState(0);
  const currentTestimonials = translations[language].socialProof.testimonials;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % currentTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentTestimonials.length]);

  return (
    <section className="bg-secondary section-padding-sm">
      <AnimatedSection className="max-w-4xl mx-auto text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
          {t("socialProof.rating")}
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
          {t("socialProof.heading")}
        </h2>

        <div className="relative h-20 flex items-center justify-center">
          {currentTestimonials.map((text, i) => (
            <p
              key={i}
              className={`absolute inset-x-0 font-serif italic text-xl md:text-2xl text-foreground/80 transition-all duration-700 ${
                i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              "{text}"
            </p>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {currentTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === active ? "bg-accent w-6" : "bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};

export default SocialProof;
