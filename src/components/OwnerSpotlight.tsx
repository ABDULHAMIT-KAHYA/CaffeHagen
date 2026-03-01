import AnimatedSection from "./AnimatedSection";
import ownerImg from "@/assets/owner.jpg";

const OwnerSpotlight = () => (
  <section className="section-padding">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
      <AnimatedSection delay={0.1} className="order-2 md:order-1">
        <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
          The Heart
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
          Craft Led by
          <br />
          <em className="italic">Knowledge.</em>
        </h2>
        <div className="space-y-5 text-muted-foreground font-sans leading-relaxed">
          <p>
            Behind every cup at Hangen Caffè is Burak Bey — a coffee specialist
            whose dedication goes beyond technique. His approach is personal: every
            recommendation, every brew, carries genuine care.
          </p>
          <p>
            He knows origin profiles. He understands extraction science. But more
            than anything, he understands people. That's what turns a good café into
            a neighborhood anchor.
          </p>
          <p>
            Walk in. Ask questions. Stay curious. This is a space where knowledge
            flows as freely as coffee.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="order-1 md:order-2">
        <div className="overflow-hidden">
          <img
            src={ownerImg}
            alt="Burak Bey, founder of Hangen Caffè"
            className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default OwnerSpotlight;
