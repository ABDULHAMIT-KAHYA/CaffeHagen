import { Instagram, Gift, Snowflake } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <footer className="bg-foreground section-padding-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <p className="font-serif text-2xl text-primary-foreground">{t("footer.brand")}</p>
              {theme === 'winter' && <Snowflake className="text-sky-400 animate-[spin_8s_linear_infinite]" size={24} />}
              {theme === 'christmas' && <Gift className="text-red-500 animate-pulse" size={24} />}
            </div>
            <p className="text-primary-foreground/50 text-sm font-sans mt-1">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex items-center gap-8 text-sm font-sans text-primary-foreground/60">
            <span>{t("footer.hours.weekdays")}</span>
            <span>{t("footer.hours.sunday")}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/hangencaffe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/60 hover:text-accent transition-colors"
            >
              <Instagram size={20} />
            </a>
            <span className="text-primary-foreground/40 text-xs font-sans">
              {t("footer.rating")}
            </span>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/30 text-xs font-sans">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
