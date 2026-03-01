import { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "winter" | "ramadan" | "bayram" | "christmas";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check local storage or default to "default"
    const savedTheme = localStorage.getItem("hangen-theme") as Theme;
    return savedTheme || "default";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all previous theme classes
    root.classList.remove("theme-winter", "theme-ramadan", "theme-christmas");
    
    // Add the new theme class if it's not default
    if (theme !== "default") {
      root.classList.add(`theme-${theme}`);
    }
    
    // Save to local storage
    localStorage.setItem("hangen-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
