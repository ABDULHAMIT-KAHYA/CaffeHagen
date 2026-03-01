import AnimatedSection from "./AnimatedSection";
import pouroverImg from "@/assets/pourover.jpg";
import aeropressImg from "@/assets/aeropress.jpg";
import espressoImg from "@/assets/espresso.jpg";
import coldbrewImg from "@/assets/coldbrew.jpg";
import latteArtImg from "@/assets/latte-art.jpg";

const methods = [
  {
    name: "V60 Pour Over",
    desc: "Delicate, bright, and layered. Single-origin beans unveiled through patient precision.",
    img: pouroverImg,
  },
  {
    name: "Aeropress",
    desc: "Full-bodied clarity. A clean, immersive cup for the curious palate.",
    img: aeropressImg,
  },
  {
    name: "Espresso",
    desc: "Bold, velvety, and exact. The heart of every specialty bar, perfected.",
    img: espressoImg,
  },
  {
    name: "Cold Brew",
    desc: "Slow-steeped overnight. Smooth, naturally sweet, impossibly refreshing.",
    img: coldbrewImg,
  },
  {
    name: "Signature Lattes",
    desc: "Artful milk textures meet specialty espresso. Every cup, a small masterpiece.",
    img: latteArtImg,
  },
];

const CraftSection = () => (
  <section id="craft" className="bg-espresso section-padding">
    <div className="max-w-7xl mx-auto">
      <AnimatedSection className="text-center mb-16">
        <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
          Our Methods
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-espresso-foreground leading-tight">
          The Craft Behind
          <br />
          <em className="italic">Every Cup.</em>
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {methods.map((m, i) => (
          <AnimatedSection
            key={m.name}
            delay={i * 0.1}
            className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
          >
            <div className="group relative overflow-hidden cursor-pointer h-[400px]">
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black/90 via-warm-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl text-cream mb-2">{m.name}</h3>
                <p className="text-cream/70 text-sm font-sans leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.3} className="text-center mt-12">
        <p className="text-cream/50 text-sm font-sans tracking-wide">
          Freshly ground beans · Quality sourcing · Precision techniques
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default CraftSection;
