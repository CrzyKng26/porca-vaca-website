"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuData = {
  veloute: { name: "VELOUTÉ", desc: "Soups • Chowder" },
  passport: { name: "PASSPORT PLATES", desc: "Fresh • Bold • Starters" },
  global: { name: "GLOBAL COMFORT", desc: "Mains • Culinary Craft" },
  pizzas: { name: "NEAPOLITAN PIZZAS", desc: "Blistered • Artisanal" },
  burgers: { name: "BURGERS", desc: "Smashed • Smoked" }
};

const menuItems = [
  { cat: "veloute", name: "Chicken Velouté Soup", desc: "A silky, slow-simmered chicken broth thickened with roux, finished with cream and a whisper of nutmeg.", tags: [] },
  { cat: "veloute", name: "Mixed Seafood Chowder", desc: "A luscious cream-based chowder brimming with shrimp, cuttlefish, squid, and crab.", tags: [] },
  { cat: "veloute", name: "Cream of Mushroom with Truffle Oil", desc: "Velvety mushroom soup with a drizzle of truffle oil, served with artisan bread.", tags: ["veg"] },
  
  { cat: "passport", name: "Watermelon & Feta Salad", desc: "Chilled cubes of sweet watermelon and crumbly feta, tossed with mint leaves, balsamic glaze.", tags: ["veg"] },
  { cat: "passport", name: "Mongolian Stir-Fry Beef", desc: "Wok-seared flank steak glazed in a sweet soy reduction, tossed with ginger, garlic, and bell peppers.", tags: ["vaca"] },
  { cat: "passport", name: "Spiced Kerala Beef Paratha Bites", desc: "Crisp paratha stuffed with tender beef, pan-fried to perfection.", tags: ["vaca"] },
  { cat: "passport", name: "Roast Beef Vol-au-Vent", desc: "Delicate puff pastry cups filled with slow-roasted beef, caramelised onions, and a rich brandy glaze.", tags: ["vaca"] },
  { cat: "passport", name: "Spicy Thai basil Pork Belly", desc: "Succulent pork belly slow-roasted and tossed with soy, and ginger, hoisin glaze, scallions, and toasted sesame.", tags: ["porca"] },
  { cat: "passport", name: "Rangoon Chicken Pockets", desc: "Cream cheese and chicken tucked inside golden wrappers.", tags: [] },
  { cat: "passport", name: "Eggplant Parmesan", desc: "Golden strips of eggplant coated in Parmesan and breadcrumbs, served with roasted garlic aioli.", tags: ["veg"] },
  { cat: "passport", name: "Chili Oil Prawns", desc: "Fresh sea caught prawns tossed in aromatic chili oil, garlic, and scallions.", tags: [] },

  { cat: "global", name: "Roast Barbecue Pork Ribs", desc: "Slow-roasted pork ribs glazed in smoky barbecue sauce, served with mashed potatoes and buttered veggies.", badge: "Signature", tags: ["porca", "signature"] },
  { cat: "global", name: "Wet Aged Filet Mignon with Red Wine Jus", desc: "A luxurious cut of tenderloin steak, pan-seared to a golden crust and finished to medium rare. Served with a velvety red wine jus.", badge: "Signature", tags: ["vaca", "signature"] },
  { cat: "global", name: "Beef Bolognese", desc: "Al dente spaghetti served with minced beef slow simmered with onions, carrots, celery, garlic, and tomatoes. Enriched with red wine.", tags: ["vaca"] },
  { cat: "global", name: "Classic British Fish and Chips", desc: "Golden, beer-battered fillets white fish fried until crisp and served with thick-cut potato chips. Accompanied by mushy peas, lemon wedges, and creamy tartar sauce.", tags: [] },
  { cat: "global", name: "Smoked Chicken Red Pesto Pasta", desc: "Smoked chicken strips tangled in al dente penne, drenched in a molten red pesto made from sun-dried tomatoes, roasted garlic, and wild basil.", tags: [] },

  { cat: "pizzas", name: "Smoked Chicken Neapolitan Pizza", desc: "A Neapolitan crust—thin, chewy, and blistered to perfection.", tags: [] },
  { cat: "pizzas", name: "Pizza Diavola", desc: "A Neapolitan-style pizza that brings the heat and the flavour. Topped with slices of Sicilian Peperoni, fresh mozzarella, and thinly sliced chili peppers.", tags: ["porca"] },
  { cat: "pizzas", name: "Truffle Burrata Mushroom Pizza", desc: "A golden, hand-stretched crust brushed with truffle oil and layered with sautéed mushrooms, melted Parmesan and a touch of garlic. Crowned with creamy burrata.", badge: "Signature", tags: ["veg", "signature"] },
  { cat: "pizzas", name: "Kerala Beef Neapolitan Pizza", desc: "A Neapolitan-style crust, layered with coconut oil and parmesan base. Topped with tender Kerala-style beef fry alongside fresh mozzarella.", tags: ["vaca"] },
  { cat: "pizzas", name: "Neapolitan Veg Pizza", desc: "A Neapolitan-style crust layered with a classic tomato sauce. Topped with creamy fresh mozzarella, grilled mushrooms, broccoli, black olives.", tags: ["veg"] },

  { cat: "burgers", name: "Smash Cheeseburger", desc: "Ground beef smashed onto a sizzling hot griddle, creating a crisp, caramelised crust. Topped with a slice of melting cheese in a toasted bun.", tags: ["vaca"] },
  { cat: "burgers", name: "Honey BBQ Pulled Pork Burger", desc: "Slow-roasted pork shoulder, pulled to perfection and glazed in a rich honey BBQ sauce. Nestled on buttered sliders.", tags: ["porca"] },
  { cat: "burgers", name: "Smoked Beef Brisket", desc: "16-hours oak-smoked brisket, crusted in black pepper and garlic, slow-bathed in its own juices. Served with red wine caramelised onions.", badge: "Signature", tags: ["vaca", "signature"] },
  { cat: "burgers", name: "Nashville Fried Chicken Burger", desc: "Crispy buttermilk chicken thigh, drenched in devil-red cayenne oil, stacked with jalapeño, honey drizzle, all hugged by a charcoal bun.", tags: [] }
];


export default function MenuEditorial() {
  const [activeCat, setActiveCat] = useState<"all" | "veloute" | "passport" | "global" | "pizzas" | "burgers">("all");
  const [activeFilter, setActiveFilter] = useState<"all" | "vaca" | "porca" | "signature" | "veg">("all");

  const filteredItems = menuItems.filter((item) => {
    if (activeCat !== "all" && item.cat !== activeCat) return false;
    if (activeFilter !== "all" && !item.tags.includes(activeFilter)) return false;
    return true;
  });

  return (
    <section id="menu" className="relative w-full bg-obsidian py-24 md:py-32">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[0.85] tracking-tight uppercase text-bone">
            The <i className="italic font-light text-ember">Menu</i>
          </h2>
          <a
            href="/PorcaVaca_Menu.pdf"
            download="PorcaVaca_Menu.pdf"
            className="inline-flex mt-6 px-6 py-3 border border-ember/30 bg-ember/10 text-ember hover:bg-ember hover:text-obsidian hover:border-ember transition-colors duration-300 font-mono text-[10px] tracking-widest uppercase items-center gap-2"
          >
            <span>↓</span> Download as PDF
          </a>
        </div>
        
        {/* Diet / Special Filters */}
        <div className="flex flex-wrap gap-2">
          {(["all", "vaca", "porca", "signature", "veg"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 border rounded-full font-mono text-[9px] tracking-widest uppercase transition-colors duration-300 ${
                activeFilter === filter 
                  ? "bg-bone text-obsidian border-bone" 
                  : "bg-transparent text-bone/60 border-bone/20 hover:border-bone/60"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stage */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-16">
        
        {/* Compact Categories Sidebar */}
        <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-1 lg:sticky lg:top-[120px] lg:self-start scrollbar-none pb-4 lg:pb-0">
          
          <button
            onClick={() => setActiveCat("all")}
            className={`group min-w-max lg:min-w-0 px-6 py-4 lg:py-6 border-b lg:border-l-2 lg:border-b-0 border-bone/10 text-left transition-all duration-300 ease-mafia relative ${
              activeCat === "all" ? "text-ember border-b-ember lg:border-l-ember" : "text-bone/60 hover:text-bone"
            }`}
          >
            <h3 className="font-display text-2xl uppercase leading-none">All Cuts</h3>
            <p className="font-mono text-[9px] tracking-widest uppercase opacity-60 hidden lg:block mt-2">Complete offering</p>
          </button>
          
          {(["veloute", "passport", "global", "pizzas", "burgers"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`group min-w-max lg:min-w-0 px-6 py-4 lg:py-6 border-b lg:border-l-2 lg:border-b-0 border-bone/10 text-left transition-all duration-300 ease-mafia relative ${
                activeCat === cat ? "text-ember border-b-ember lg:border-l-ember" : "text-bone/60 hover:text-bone"
              }`}
            >
              <h3 className="font-display text-2xl uppercase leading-none">{menuData[cat].name}</h3>
              <p className="font-mono text-[9px] tracking-widest uppercase opacity-60 hidden lg:block mt-2">{menuData[cat].desc}</p>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-bone/10 border border-bone/10 self-start">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                key={item.name}
                className="bg-charcoal p-8 hover:bg-charcoal/80 transition-colors duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h4 className="font-display text-2xl uppercase leading-tight max-w-[80%] text-bone">
                      {item.name}
                    </h4>
                  </div>
                  <p className="text-body-sm text-bone/70 leading-relaxed font-light max-w-[95%]">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.badge && (
                    <span className="inline-block px-2.5 py-1 bg-ember/10 border border-ember/30 rounded-full font-mono text-[8px] tracking-widest uppercase text-ember">
                      ★ {item.badge}
                    </span>
                  )}
                  {item.tags.includes('veg') && (
                    <span className="inline-block px-2.5 py-1 border border-green-500/30 rounded-full font-mono text-[8px] tracking-widest uppercase text-green-400">
                      VEG
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredItems.length === 0 && (
            <div className="col-span-1 md:col-span-2 bg-charcoal p-12 text-center text-bone/60 font-mono text-xs tracking-widest uppercase">
              No offerings found for this selection.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
