import { motion } from "framer-motion";
import heroImage from "@/assets/hero-coffee.jpg";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Moon, Snowflake, Gift } from "lucide-react";

const HeroSection = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Theme Ambient Effects */}
      {theme === 'winter' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          <Snowflake className="absolute top-1/4 left-1/4 text-sky-300 w-8 h-8 opacity-40 animate-pulse" />
          <Snowflake className="absolute top-1/3 right-1/4 text-sky-300 w-12 h-12 opacity-30 animate-pulse delay-700" />
          <Snowflake className="absolute bottom-1/4 left-1/3 text-sky-300 w-6 h-6 opacity-50 animate-pulse delay-300" />
          {/* Unique Winter Decoration: Large Frosty Snowflake */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 opacity-80">
             <Snowflake className="w-20 h-20 text-sky-400 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)] animate-[spin_10s_linear_infinite]" />
          </div>
        </motion.div>
      )}

      {theme === 'ramadan' && (
         <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1, duration: 1.5 }}
           className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 text-accent/60 z-20"
         >
           <Moon size={64} className="drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]" />
         </motion.div>
      )}

      {theme === 'christmas' && (
         <motion.div 
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 1, duration: 1.5 }}
           className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 text-red-500/80 z-20"
         >
           <Gift size={64} className="drop-shadow-[0_0_20px_rgba(220,38,38,0.3)] animate-bounce" />
         </motion.div>
      )}

    {/* Background image */}
    <div className="absolute inset-0">
      <img
        src={heroImage}
        alt="Espresso extraction at Caffè Hangen"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-warm-black/60" />
    </div>

    {/* Content */}
    <div className="relative z-10 text-center px-6 max-w-4xl">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-cream/70 text-sm tracking-[0.3em] uppercase mb-6 font-sans"
      >
        {t("hero.location")}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-medium leading-tight mb-6"
      >
        {t("hero.title")}
        <br />
        <em className="italic">{t("hero.subtitle")}</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-cream/80 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        {t("hero.description")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <a
          href="#menu"
          className="bg-cream text-foreground px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-beige transition-colors"
        >
          {t("hero.viewMenu")}
        </a>
        <a
          href="#visit"
          className="border border-cream/40 text-cream px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-cream/10 transition-colors"
        >
          {t("hero.visitUs")}
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-cream/50 text-sm mt-10 tracking-wide"
      >
        {t("hero.rating")}
      </motion.p>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <div className="w-px h-16 bg-gradient-to-b from-cream/0 to-cream/40" />
    </motion.div>
  </section>
  );
};

export default HeroSection;
