import AnimatedSection from "./AnimatedSection";
import interiorImage from "@/assets/interior.jpg";

const ExperienceSection = () => (
  <section id="experience" className="section-padding">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <AnimatedSection>
        <div className="overflow-hidden">
          <img
            src={interiorImage}
            alt="Warm Scandinavian interior of Hangen Caffè"
            className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
          The Space
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
          More Than
          <br />
          <em className="italic">Coffee.</em>
        </h2>
        <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
          <p>
            Step inside and the world slows down. Warm wood, soft light, the quiet
            hum of conversation — this is a space designed for presence.
          </p>
          <p>
            Every detail is considered. The Scandinavian warmth of natural materials.
            The calm rhythm of carefully curated music. Seating that invites you to
            linger, not rush.
          </p>
          <p>
            No cold corners. No generic chain atmosphere. Just a genuine place where
            coffee, craft, and comfort come together.
          </p>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default ExperienceSection;
