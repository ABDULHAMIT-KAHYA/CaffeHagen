import AnimatedSection from "./AnimatedSection";
import ownerImg from "@/assets/owner.jpg";
import { useLanguage } from "@/context/LanguageContext";

const OwnerSpotlight = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <AnimatedSection delay={0.1} className="order-2 md:order-1">
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
            {t("owner.label")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            {t("owner.title")}
            <br />
            <em className="italic">{t("owner.subtitle")}</em>
          </h2>
          <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
            <p>{t("owner.p1")}</p>
            <p>{t("owner.p2")}</p>
            <p>{t("owner.p3")}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="order-1 md:order-2">
          <div className="overflow-hidden">
            <img
              src={ownerImg}
              alt={t("owner.imageAlt")}
              className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default OwnerSpotlight;
