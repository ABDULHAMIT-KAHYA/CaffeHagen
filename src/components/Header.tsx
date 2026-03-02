import { useState, useEffect } from "react";
import { Menu, X, Snowflake } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.craft"), href: "#craft" },
    { label: t("nav.menu"), href: "#menu" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.visit"), href: "#visit" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || menuOpen
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex items-center justify-between px-6 md:px-12 lg:px-24">
        <a href="#" className="font-serif text-2xl md:text-3xl font-semibold tracking-wide relative group">
          {/* Theme Decorations */}
          {theme === "winter" && (
            <>
              {/* Left Snowflake */}
              <Snowflake 
                className="absolute -top-1 -left-6 md:-left-8 text-sky-400 animate-pulse drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" 
                size={24} 
              />
              {/* Right Snowflake */}
              <Snowflake 
                className="absolute -top-1 -right-6 md:-right-8 text-sky-400 animate-pulse delay-700 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" 
                size={24} 
              />
            </>
          )}
          
          {theme === "ramadan" && (
            <>
              {/* Left Lantern */}
              <div className="absolute -top-12 -left-12 flex flex-col items-center pointer-events-none">
                <div className="w-[1.5px] h-12 bg-amber-400/60 origin-top animate-[swing_3s_ease-in-out_infinite]" />
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-amber-400 animate-bounce" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l-2 4h4l-2-4z" fill="currentColor" fillOpacity="0.2" />
                  <rect x="10" y="6" width="4" height="10" rx="1" />
                  <path d="M12 6v10" />
                  <path d="M10 11h4" />
                  <path d="M12 16v2" />
                  <circle cx="12" cy="19" r="1" fill="currentColor" />
                </svg>
              </div>
              {/* Right Lantern */}
              <div className="absolute -top-12 -right-12 flex flex-col items-center pointer-events-none">
                <div className="w-[1.5px] h-12 bg-amber-400/60 origin-top animate-[swing_3.5s_ease-in-out_infinite_delay-75]" />
                <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-amber-400 animate-bounce delay-100" stroke="currentColor" strokeWidth="1.5">
                   <path d="M12 2l-2 4h4l-2-4z" fill="currentColor" fillOpacity="0.2" />
                   <rect x="10" y="6" width="4" height="8" rx="1" />
                   <path d="M12 6v8" />
                   <path d="M12 14v2" />
                   <circle cx="12" cy="17" r="1" fill="currentColor" />
                </svg>
              </div>
            </>
          )}

          {theme === "christmas" && (
            <div className="absolute -top-6 -left-3 -rotate-12 pointer-events-none drop-shadow-md">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 22C4 22 8 12 16 8C20 6 24 18 24 22" fill="#EF4444" />
                <circle cx="24" cy="22" r="3" fill="white" />
                <rect x="2" y="20" width="18" height="6" rx="3" fill="white" />
              </svg>
            </div>
          )}

          <span className={scrolled || menuOpen ? "text-foreground" : "text-cream"}>
            Caffè Hangen
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          <ThemeToggle scrolled={scrolled || menuOpen} />
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-accent ${
                scrolled || menuOpen ? "text-foreground" : "text-cream"
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className={`ml-2 pl-6 border-l ${scrolled || menuOpen ? "border-foreground/20" : "border-white/20"}`}>
            <LanguageToggle scrolled={scrolled || menuOpen} />
          </div>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden ${scrolled || menuOpen ? "text-foreground" : "text-cream"}`}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <nav className="flex flex-col px-6 py-6 gap-6">
            <div className="flex justify-between items-center">
              <ThemeToggle scrolled={true} />
              <LanguageToggle scrolled={true} />
            </div>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium tracking-widest uppercase text-foreground hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
