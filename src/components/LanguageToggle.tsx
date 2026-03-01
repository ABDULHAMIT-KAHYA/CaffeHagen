import { useLanguage } from "@/context/LanguageContext";

interface LanguageToggleProps {
  scrolled?: boolean;
}

export function LanguageToggle({ scrolled }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "tr" : "en")}
      className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-accent ml-6 ${
        scrolled ? "text-foreground" : "text-cream"
      }`}
      aria-label="Toggle Language"
    >
      {language === "en" ? "TR" : "EN"}
    </button>
  );
}
