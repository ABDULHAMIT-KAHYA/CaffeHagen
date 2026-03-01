import AnimatedSection from "./AnimatedSection";

const categories = [
  {
    title: "Espresso Based",
    items: [
      { name: "Espresso", note: "Single origin, rotating" },
      { name: "Americano", note: "Long black, clean" },
      { name: "Flat White", note: "Silky micro-foam" },
      { name: "Cortado", note: "Equal parts, balanced" },
      { name: "Cappuccino", note: "Classic proportions" },
    ],
  },
  {
    title: "Filter Coffee",
    items: [
      { name: "V60 Pour Over", note: "Single origin" },
      { name: "Aeropress", note: "Full immersion" },
      { name: "Batch Brew", note: "Today's selection" },
    ],
  },
  {
    title: "Cold Drinks",
    items: [
      { name: "Cold Brew", note: "16hr steep" },
      { name: "Iced Latte", note: "Espresso over ice" },
      { name: "Iced Americano", note: "Refreshing, clean" },
    ],
  },
  {
    title: "Signature Drinks",
    items: [
      { name: "Hangen Special", note: "Ask your barista" },
      { name: "Seasonal Latte", note: "Rotating flavors" },
      { name: "Dirty Chai", note: "Espresso meets spice" },
    ],
  },
];

const MenuPreview = () => (
  <section id="menu" className="section-padding">
    <div className="max-w-5xl mx-auto">
      <AnimatedSection className="text-center mb-16">
        <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4 font-sans">
          What We Brew
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground">
          The <em className="italic">Menu.</em>
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {categories.map((cat, ci) => (
          <AnimatedSection key={cat.title} delay={ci * 0.1}>
            <h3 className="font-serif text-2xl text-foreground mb-6 pb-3 border-b border-border">
              {cat.title}
            </h3>
            <ul className="space-y-4">
              {cat.items.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between">
                  <span className="font-sans font-medium text-foreground">
                    {item.name}
                  </span>
                  <span className="text-sm text-muted-foreground font-sans ml-4">
                    {item.note}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default MenuPreview;
