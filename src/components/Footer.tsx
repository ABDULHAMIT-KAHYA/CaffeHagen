import { Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground section-padding-sm">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-serif text-2xl text-primary-foreground">Hangen Caffè</p>
          <p className="text-primary-foreground/50 text-sm font-sans mt-1">
            Specialty Coffee · Erzincan
          </p>
        </div>

        <div className="flex items-center gap-8 text-sm font-sans text-primary-foreground/60">
          <span>Mon–Sat 09–22</span>
          <span>Sun 10–21</span>
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
            ⭐ 5.0 on Google
          </span>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center">
        <p className="text-primary-foreground/30 text-xs font-sans">
          © 2026 Hangen Caffè. Crafted with care.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
