import { motion } from "framer-motion";
import heroImage from "@/assets/hero-coffee.jpg";

const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img
        src={heroImage}
        alt="Espresso extraction at Hangen Caffè"
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
        Specialty Coffee · Erzincan
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream font-medium leading-tight mb-6"
      >
        Where Coffee
        <br />
        <em className="italic">Becomes Craft.</em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-cream/80 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        Specialty brews. Scandinavian soul. Erzincan's refined coffee experience.
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
          View Our Menu
        </a>
        <a
          href="#visit"
          className="border border-cream/40 text-cream px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-cream/10 transition-colors"
        >
          Visit Us Today
        </a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="text-cream/50 text-sm mt-10 tracking-wide"
      >
        ⭐ 5-Star Rated Local Favorite
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

export default HeroSection;
