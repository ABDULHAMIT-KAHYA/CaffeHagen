import AnimatedSection from "./AnimatedSection";
import heroCoffee from "@/assets/hero-coffee.jpg";

const FinalCTA = () => (
  <section id="visit" className="relative py-28 md:py-36 overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroCoffee} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-warm-black/80" />
    </div>

    <AnimatedSection className="relative z-10 max-w-4xl mx-auto text-center px-6">
      <h2 className="font-serif text-4xl md:text-6xl text-cream mb-6 leading-tight">
        Step Inside. Slow Down.
        <br />
        <em className="italic">Sip Better.</em>
      </h2>

      <a
        href="https://maps.google.com/?q=Hangen+Caffe+Erzincan"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-cream text-foreground px-10 py-5 text-sm tracking-widest uppercase font-medium hover:bg-beige transition-colors font-sans mt-4"
      >
        Visit Hangen Caffè
      </a>

      <div className="grid sm:grid-cols-3 gap-8 mt-16 text-cream/80 font-sans text-sm">
        <div>
          <p className="text-cream font-medium mb-2 tracking-widest uppercase text-xs">
            Location
          </p>
          <p>Erzincan, Turkey</p>
        </div>
        <div>
          <p className="text-cream font-medium mb-2 tracking-widest uppercase text-xs">
            Hours
          </p>
          <p>Mon – Sat: 09:00 – 22:00</p>
          <p>Sunday: 10:00 – 21:00</p>
        </div>
        <div>
          <p className="text-cream font-medium mb-2 tracking-widest uppercase text-xs">
            Contact
          </p>
          <a href="tel:+90000000000" className="hover:text-accent transition-colors">
            Call Us
          </a>
        </div>
      </div>
    </AnimatedSection>
  </section>
);

export default FinalCTA;
