import { createContext, useContext, useEffect, useState } from "react";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Check local storage or default to "en"
    const savedLang = localStorage.getItem("hangen-lang") as Language;
    return savedLang || "en";
  });

  useEffect(() => {
    localStorage.setItem("hangen-lang", language);
    // Update html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Translation function to access nested keys
  const t = (path: string): string => {
    const keys = path.split(".");
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current === undefined) return path;
      current = current[key];
    }
    
    return typeof current === "string" ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
