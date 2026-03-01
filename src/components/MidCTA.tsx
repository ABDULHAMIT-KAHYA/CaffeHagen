import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";

const MidCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding-sm bg-background">
      <AnimatedSection className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
          {t("midCta.title")} <em className="italic">{t("midCta.subtitle")}</em>{" "}
          {t("midCta.suffix")}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://maps.google.com/?q=Caffe+Hangen+Erzincan"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-foreground text-primary-foreground px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-accent transition-colors font-sans"
          >
            {t("midCta.directions")}
          </a>
          <a
            href="#menu"
            className="border border-foreground text-foreground px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-foreground hover:text-primary-foreground transition-colors font-sans"
          >
            {t("midCta.brews")}
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default MidCTA;
