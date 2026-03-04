import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { Moon, Snowflake, Gift } from "lucide-react";
import { CoffeeStory, ScrollFrameSection } from "./CoffeeStory";

const HeroSection = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Helper for Theme Icons
  const ThemeIcon = () => (
    <>
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
    </>
  );

  return (
    <CoffeeStory>
      {/* STAGE 1: START FRAME (Static Bean) - Frame 1 */}
      <ScrollFrameSection startFrame={1} endFrame={1}>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <ThemeIcon />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-cream/70 text-sm tracking-[0.3em] uppercase mb-6 font-sans"
          >
            {t("hero.location")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-medium leading-tight mb-6"
          >
            {t("hero.title")}
            <br />
            <em className="italic">{t("hero.subtitle")}</em>
          </motion.h1>
        </div>
      </ScrollFrameSection>

      {/* STAGE 2: TRANSITION FRAME (Swirl/Cup Forming) - Target Frame 96 */}
      <ScrollFrameSection startFrame={2} endFrame={96}>
        <div className="relative z-10 text-center px-6 max-w-2xl bg-black/30 p-8 rounded-xl backdrop-blur-sm border border-white/10">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-cream/90 text-xl md:text-2xl font-serif font-light leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>
        </div>
      </ScrollFrameSection>

      {/* STAGE 3: FINAL FRAME (Latte Art) - Target Frame 192 */}
      <ScrollFrameSection startFrame={97} endFrame={192}>
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#menu"
              className="px-8 py-4 bg-cream text-warm-black font-sans font-bold tracking-widest hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {t("hero.viewMenu")}
            </a>
            <a
              href="#craft"
              className="px-8 py-4 border border-cream text-cream font-sans font-bold tracking-widest hover:bg-cream hover:text-warm-black transition-all duration-300"
            >
              {t("hero.visitUs")}
            </a>
          </motion.div>
        </div>
      </ScrollFrameSection>
    </CoffeeStory>
  );
};

export default HeroSection;
