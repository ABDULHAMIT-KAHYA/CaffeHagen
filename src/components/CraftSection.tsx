import AnimatedSection from "./AnimatedSection";
import pouroverImg from "@/assets/pourover.jpg";
import aeropressImg from "@/assets/aeropress.jpg";
import espressoImg from "@/assets/espresso.jpg";
import coldbrewImg from "@/assets/coldbrew.jpg";
import latteArtImg from "@/assets/latte-art.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useTheme } from "@/context/ThemeContext";
import { Sparkles, Snowflake } from "lucide-react";

const methodImages = [pouroverImg, aeropressImg, espressoImg, coldbrewImg, latteArtImg];

const CraftSection = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();
  const currentMethods = translations[language].craft.methods.map((m, i) => ({
    ...m,
    img: methodImages[i],
  }));

  return (
    <section id="craft" className="bg-espresso section-padding">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16 relative">
          {theme === 'winter' && (
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none">
                <Snowflake className="w-10 h-10 text-sky-500 animate-bounce drop-shadow-md" />
                <div className="absolute top-0 -left-12 w-8 h-8 rounded-full bg-sky-200/40 blur-xl animate-pulse" />
                <div className="absolute top-0 -right-12 w-8 h-8 rounded-full bg-sky-200/40 blur-xl animate-pulse delay-500" />
             </div>
          )}
          {theme === 'christmas' && (
            <>
              {/* Elf Hat */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 -rotate-12 pointer-events-none drop-shadow-md z-10 animate-bounce">
                 <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 22C4 22 8 12 16 8C20 6 24 18 24 22" fill="#16a34a" />
                    <circle cx="24" cy="22" r="3" fill="#dc2626" />
                    <rect x="2" y="20" width="18" height="6" rx="3" fill="#dc2626" />
                 </svg>
              </div>
              
              {/* Christmas Spirits (Sparkles) */}
              <Sparkles className="absolute -top-4 left-[40%] text-yellow-400 w-6 h-6 animate-pulse" />
              <Sparkles className="absolute top-0 right-[40%] text-yellow-400 w-5 h-5 animate-pulse delay-700" />
              <Sparkles className="absolute -bottom-2 left-[45%] text-yellow-400 w-4 h-4 animate-pulse delay-300" />
            </>
          )}
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
            {t("craft.label")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-espresso-foreground leading-tight">
            {t("craft.title")}
            <br />
            <em className="italic">{t("craft.subtitle")}</em>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMethods.map((m, i) => (
            <AnimatedSection
              key={m.name}
              delay={i * 0.1}
              className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <div className="group relative overflow-hidden cursor-pointer h-[400px]">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-2xl text-cream mb-2">{m.name}</h3>
                  <p className="text-cream/70 text-sm font-sans leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="text-center mt-12">
          <p className="text-cream/50 text-sm font-sans tracking-wide">
            {t("craft.footer")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CraftSection;
