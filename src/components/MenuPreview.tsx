import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { CloudSnow } from "lucide-react";

const MenuPreview = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const categories = [
    {
      title: t("menu.categories.espresso"),
      items: [
        { name: t("menu.items.espresso.name"), note: t("menu.items.espresso.note") },
        { name: t("menu.items.americano.name"), note: t("menu.items.americano.note") },
        { name: t("menu.items.flatWhite.name"), note: t("menu.items.flatWhite.note") },
        { name: t("menu.items.cortado.name"), note: t("menu.items.cortado.note") },
        { name: t("menu.items.cappuccino.name"), note: t("menu.items.cappuccino.note") },
      ],
    },
    {
      title: t("menu.categories.filter"),
      items: [
        { name: t("menu.items.v60.name"), note: t("menu.items.v60.note") },
        { name: t("menu.items.aeropress.name"), note: t("menu.items.aeropress.note") },
        { name: t("menu.items.batchBrew.name"), note: t("menu.items.batchBrew.note") },
      ],
    },
    {
      title: t("menu.categories.cold"),
      items: [
        { name: t("menu.items.coldBrew.name"), note: t("menu.items.coldBrew.note") },
        { name: t("menu.items.icedLatte.name"), note: t("menu.items.icedLatte.note") },
        { name: t("menu.items.icedAmericano.name"), note: t("menu.items.icedAmericano.note") },
      ],
    },
    {
      title: t("menu.categories.signature"),
      items: [
        { name: t("menu.items.hangenSpecial.name"), note: t("menu.items.hangenSpecial.note") },
        { name: t("menu.items.seasonalLatte.name"), note: t("menu.items.seasonalLatte.note") },
        { name: t("menu.items.dirtyChai.name"), note: t("menu.items.dirtyChai.note") },
      ],
    },
  ];

  return (
    <section id="menu" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16 relative">
          {theme === 'winter' && (
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none">
                <CloudSnow className="w-12 h-12 text-sky-400 animate-pulse drop-shadow-lg" />
                <div className="absolute top-8 left-2 w-1.5 h-1.5 bg-sky-500 rounded-full animate-[fall_2s_linear_infinite]" />
                <div className="absolute top-8 left-6 w-1.5 h-1.5 bg-sky-500 rounded-full animate-[fall_2.5s_linear_infinite_delay-300]" />
                <div className="absolute top-8 left-10 w-1.5 h-1.5 bg-sky-500 rounded-full animate-[fall_1.8s_linear_infinite_delay-700]" />
             </div>
          )}
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
            {t("menu.label")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            {t("menu.title")} <em className="italic">{t("menu.subtitle")}</em>
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {categories.map((cat, ci) => (
            <AnimatedSection key={cat.title} delay={ci * 0.1}>
              <h3 className="font-serif text-2xl text-foreground mb-6 pb-3 border-b border-border">
                {cat.title}
              </h3>
              <ul className="space-y-4">
                {cat.items.map((item) => (
                  <li key={item.name} className="flex items-baseline justify-between">
                    <span className="font-sans font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="text-sm text-muted-foreground font-sans ml-4">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;
