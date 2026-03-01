import AnimatedSection from "./AnimatedSection";
import latteArt from "@/assets/latte-art.jpg";
import pourover from "@/assets/pourover.jpg";
import interior from "@/assets/interior.jpg";
import barista from "@/assets/gallery-barista.jpg";
import evening from "@/assets/gallery-evening.jpg";
import espresso from "@/assets/espresso.jpg";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

const staticImages = [
  { src: latteArt, span: "row-span-1" },
  { src: barista, span: "row-span-2" },
  { src: interior, span: "row-span-1" },
  { src: pourover, span: "row-span-2" },
  { src: evening, span: "row-span-1" },
  { src: espresso, span: "row-span-1" },
];

const GallerySection = () => {
  const { language, t } = useLanguage();
  const alts = translations[language].gallery.alts;
  
  const images = staticImages.map((img, i) => ({
    ...img,
    alt: alts[i]
  }));

  return (
    <section id="gallery" className="section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
            {t("gallery.label")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            <em className="italic">{t("gallery.title")}</em> {t("gallery.suffix")}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((img, i) => (
            <AnimatedSection key={i} delay={i * 0.08} className={`overflow-hidden ${img.span}`}>
              <div className="group w-full h-full overflow-hidden cursor-pointer">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
