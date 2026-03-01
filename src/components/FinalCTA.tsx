import AnimatedSection from "./AnimatedSection";
import heroCoffee from "@/assets/hero-coffee.jpg";
import { useLanguage } from "@/context/LanguageContext";

const FinalCTA = () => {
  const { t } = useLanguage();

  return (
    <section id="visit" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroCoffee} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-warm-black/80" />
      </div>

      <AnimatedSection className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <h2 className="font-serif text-4xl md:text-6xl text-cream mb-6 leading-tight">
          {t("finalCta.title")}
          <br />
          <em className="italic">{t("finalCta.subtitle")}</em>
        </h2>

        <a
          href="https://maps.google.com/?q=Caffe+Hangen+Erzincan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-cream text-foreground px-10 py-5 text-sm tracking-widest uppercase font-medium hover:bg-beige transition-colors font-sans mt-4"
        >
          {t("finalCta.button")}
        </a>

        <div className="grid sm:grid-cols-3 gap-8 mt-16 text-cream/80 font-sans text-sm">
          <div>
            <p className="text-cream font-medium mb-2 tracking-widest uppercase text-xs">
              {t("finalCta.location.label")}
            </p>
            <p>{t("finalCta.location.value")}</p>
          </div>
          <div>
            <p className="text-cream font-medium mb-2 tracking-widest uppercase text-xs">
              {t("finalCta.hours.label")}
            </p>
            <p>{t("finalCta.hours.weekdays")}</p>
            <p>{t("finalCta.hours.sunday")}</p>
          </div>
          <div>
            <p className="text-cream font-medium mb-2 tracking-widest uppercase text-xs">
              {t("finalCta.contact.label")}
            </p>
            <a href="tel:+90000000000" className="hover:text-accent transition-colors">
              {t("finalCta.contact.button")}
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default FinalCTA;
