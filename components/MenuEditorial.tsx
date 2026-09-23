"use client";

import { useState } from "react";
import { useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MenuCategory, MenuItem } from "@/data/menu";

export default function MenuEditorial({ 
  categories, 
  items 
}: { 
  categories: MenuCategory[], 
  items: MenuItem[] 
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const [activeCat, setActiveCat] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Determine dietary/meat types based on name and description
  const isVeg = (desc: string) => desc.toLowerCase().includes('(veg)');
  const isVaca = (name: string, desc: string) => /(beef|steak|wagyu|brisket|marrow|cheeseburger)/i.test(name + desc);
  const isPorca = (name: string, desc: string) => /(pork|bacon|porchetta|peperoni|diavola)/i.test(name + desc);

  const filteredItems = items.filter((item) => {
    if (activeCat !== "all" && item.category?.slug !== activeCat) return false;
    
    // Quick filter logic mapping old frontend tags to new schema
    if (activeFilter === "veg" && !isVeg(item.description)) return false;
    if (activeFilter === "signature" && !item.is_signature) return false;
    if (activeFilter === "vaca" && !isVaca(item.name, item.description)) return false;
    if (activeFilter === "porca" && !isPorca(item.name, item.description)) return false;
    
    return true;
  });

  return (
    <section ref={ref} id="menu" className="relative w-full bg-obsidian py-24 md:py-32">
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <motion.div style={{ y }} className="mb-6 md:mb-0">
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
        </motion.div>
        
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
          
          {categories.filter(c => c.slug !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.slug)}
              className={`group min-w-max lg:min-w-0 px-6 py-4 lg:py-6 border-b lg:border-l-2 lg:border-b-0 border-bone/10 text-left transition-all duration-300 ease-mafia relative ${
                activeCat === cat.slug ? "text-ember border-b-ember lg:border-l-ember" : "text-bone/60 hover:text-bone"
              }`}
            >
              <h3 className="font-display text-2xl uppercase leading-none">{cat.name}</h3>
              <p className="font-mono text-[9px] tracking-widest uppercase opacity-60 hidden lg:block mt-2">{cat.slug.toUpperCase()}</p>
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
                key={item.id}
                className="bg-charcoal p-8 hover:bg-charcoal/80 transition-colors duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h4 className="font-display text-2xl uppercase leading-tight max-w-[80%] text-bone">
                      {item.name}
                    </h4>
                    <span className="font-display text-xl text-ember">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-body-sm text-bone/70 leading-relaxed font-light max-w-[95%]">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.is_signature && (
                    <span className="inline-block px-2.5 py-1 bg-ember/10 border border-ember/30 rounded-full font-mono text-[8px] tracking-widest uppercase text-ember">
                      ★ Signature
                    </span>
                  )}
                  {isVeg(item.description) && (
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
