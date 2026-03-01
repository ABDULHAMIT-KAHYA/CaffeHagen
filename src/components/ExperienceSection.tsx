import AnimatedSection from "./AnimatedSection";
import interiorImage from "@/assets/interior.jpg";
import { useLanguage } from "@/context/LanguageContext";

const ExperienceSection = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <AnimatedSection>
          <div className="overflow-hidden">
            <img
              src={interiorImage}
              alt={t("experience.imageAlt")}
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
            {t("experience.label")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            {t("experience.title")}
            <br />
            <em className="italic">{t("experience.subtitle")}</em>
          </h2>
          <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
            <p>{t("experience.p1")}</p>
            <p>{t("experience.p2")}</p>
            <p>{t("experience.p3")}</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ExperienceSection;
