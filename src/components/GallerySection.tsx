import AnimatedSection from "./AnimatedSection";
import latteArt from "@/assets/latte-art.jpg";
import pourover from "@/assets/pourover.jpg";
import interior from "@/assets/interior.jpg";
import barista from "@/assets/gallery-barista.jpg";
import evening from "@/assets/gallery-evening.jpg";
import espresso from "@/assets/espresso.jpg";

const images = [
  { src: latteArt, alt: "Latte art close-up", span: "row-span-1" },
  { src: barista, alt: "Barista at work", span: "row-span-2" },
  { src: interior, alt: "Interior ambiance", span: "row-span-1" },
  { src: pourover, alt: "Pour-over brewing", span: "row-span-2" },
  { src: evening, alt: "Evening atmosphere", span: "row-span-1" },
  { src: espresso, alt: "Espresso shot", span: "row-span-1" },
];

const GallerySection = () => (
  <section id="gallery" className="section-padding bg-secondary">
    <div className="max-w-7xl mx-auto">
      <AnimatedSection className="text-center mb-16">
        <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
          @hangencaffe
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground">
          <em className="italic">Moments</em> Worth Sharing.
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {images.map((img, i) => (
          <AnimatedSection key={i} delay={i * 0.08} className={`overflow-hidden ${img.span}`}>
            <div className="group w-full h-full overflow-hidden cursor-pointer">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
