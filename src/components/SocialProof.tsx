import { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";

const testimonials = [
  "You feel at home the moment you walk in.",
  "The most knowledgeable barista in town.",
  "Atmosphere, music, coffee — perfect.",
  "True specialty coffee experience.",
  "Scandinavian vibes, Turkish warmth.",
  "Every cup is a conversation starter.",
];

const SocialProof = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-secondary section-padding-sm">
      <AnimatedSection className="max-w-4xl mx-auto text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-sans">
          ⭐⭐⭐⭐⭐ Google Rated
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
          Erzincan's Most Loved Specialty Coffee Spot
        </h2>

        <div className="relative h-20 flex items-center justify-center">
          {testimonials.map((t, i) => (
            <p
              key={i}
              className={`absolute inset-x-0 font-serif italic text-xl md:text-2xl text-foreground/80 transition-all duration-700 ${
                i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              "{t}"
            </p>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
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
