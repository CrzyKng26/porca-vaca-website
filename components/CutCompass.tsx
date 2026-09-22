'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AnimalType = 'vaca' | 'porca'

interface CutInfo {
  id: string
  name: string
  zone: string
  fatLevel: number // 1 to 5
  tenderness: number // 1 to 5
  cookMethod: string
  description: string
  menuDish: string
  recommendedDoneness?: string
}

const vacaCuts: CutInfo[] = [
  {
    id: 'ribeye',
    name: 'PRIME RIBEYE',
    zone: 'Upper Rib Cage (Ribs 6-12)',
    fatLevel: 5,
    tenderness: 5,
    cookMethod: 'High Heat Wood Fire Sear',
    description: 'Dense intramuscular marbling with a signature central eye of fat. As it renders on the live white oak coals, it bastes itself from the inside out.',
    menuDish: 'Wood-Fired Ribeye Reserve (400g)',
    recommendedDoneness: 'Medium-Rare (135°F)'
  },
  {
    id: 'tenderloin',
    name: 'FILET MIGNON',
    zone: 'Short Loin / Beneath Ribs',
    fatLevel: 2,
    tenderness: 5,
    cookMethod: 'Quick Cast Iron Crust & Butter Baste',
    description: 'The least exercised muscle on the steer. Velvety, melt-in-mouth texture with a delicate, clean beef sweetness.',
    menuDish: 'Porca & Vaca Chateaubriand',
    recommendedDoneness: 'Rare to Med-Rare (125°-130°F)'
  },
  {
    id: 'brisket',
    name: 'POINT & FLAT BRISKET',
    zone: 'Lower Chest / Pectoral',
    fatLevel: 4,
    tenderness: 4,
    cookMethod: '14-Hour Low & Slow Oak Smoke',
    description: 'Heavily worked connective collagen that transforms into gelatinous richness after half a day over white oak coals.',
    menuDish: '14-Hr Smoked Beef Brisket Sliders',
    recommendedDoneness: 'Pull-apart Smoked (203°F)'
  },
  {
    id: 'flank',
    name: 'FLANK & SKIRT',
    zone: 'Abdominal Wall',
    fatLevel: 2,
    tenderness: 3,
    cookMethod: 'Flash-Grilled on Hard Char, Thin Slice',
    description: 'Long distinct muscle grains packed with deep, iron-rich umami. Essential to slice strictly against the grain.',
    menuDish: 'Charred Skirt with Chimichurri',
    recommendedDoneness: 'Medium-Rare (132°F)'
  },
  {
    id: 'short-rib',
    name: 'ASADO SHORT RIBS',
    zone: 'Lower Rib Plate',
    fatLevel: 5,
    tenderness: 4,
    cookMethod: 'Slow Braise or Cross-Cut Charcoal Grill',
    description: 'Sublime fat ribbons marbled between bone-clinging muscle. Unmatched beef intensity.',
    menuDish: 'Slow-Glazed Beef Short Rib Plate',
    recommendedDoneness: 'Fall-off-the-bone'
  }
]

const porcaCuts: CutInfo[] = [
  {
    id: 'belly',
    name: 'PORK BELLY',
    zone: 'Underside Belly & Rib Flank',
    fatLevel: 5,
    tenderness: 5,
    cookMethod: 'Triple-Cook: Steam, Slow Roast, Crackle Finish',
    description: 'Alternating layers of sweet, nutty pork fat and tender flesh, crowned with glass-shattering bubbly blistered crackling skin.',
    menuDish: 'Crispy Crackling Pork Belly Block',
    recommendedDoneness: 'Fully Rendered Tender'
  },
  {
    id: 'loin',
    name: 'TOMAHAWK PORK CHOP',
    zone: 'Back Spine / Rib Loin',
    fatLevel: 3,
    tenderness: 4,
    cookMethod: 'Hard Ember Sear with Applewood Smoke',
    description: 'Thick bone-in prime cut with a generous fat cap that caramelizes deeply over live applewood embers.',
    menuDish: 'Live-Fire Bone-In Pork Chop (350g)',
    recommendedDoneness: 'Juicy Medium (145°F)'
  },
  {
    id: 'shoulder',
    name: 'BOSTON BUTT / COLLAR',
    zone: 'Upper Shoulder & Neck',
    fatLevel: 4,
    tenderness: 5,
    cookMethod: 'Hickory Smoke & Confit Braise',
    description: 'Intricately marbled shoulder meat packed with rich connective tissue. Yields succulent, juicy shredded shreds.',
    menuDish: 'Pulled Pork Shoulder with Smoked Jus',
    recommendedDoneness: 'Tender Pulled (200°F)'
  },
  {
    id: 'ribs',
    name: 'ST. LOUIS SPARE RIBS',
    zone: 'Mid-Rib Cage Below Loin',
    fatLevel: 4,
    tenderness: 4,
    cookMethod: '3-2-1 Smoke & Dark Molasses Glaze',
    description: 'Meat-heavy rib bones bathed in fruitwood smoke, tender with an unmistakable toothsome bite rather than mush.',
    menuDish: 'Sticky Glazed Porca Spare Ribs',
    recommendedDoneness: 'Clean Bone Bite'
  }
]

export default function CutCompass() {
  const [animal, setAnimal] = useState<AnimalType>('vaca')
  const [selectedCutId, setSelectedCutId] = useState<string>('ribeye')

  const activeCuts = animal === 'vaca' ? vacaCuts : porcaCuts
  const currentCut = activeCuts.find(c => c.id === selectedCutId) || activeCuts[0]

  return (
    <section id="cut-compass" className="relative w-full bg-pitch py-16 md:py-44 px-6 md:px-16 border-t border-amber/20 overflow-hidden">
      {/* Ambient subtle glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-amber/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-amber font-bold uppercase block mb-3">
              THE CUT'S ANATOMY
            </span>
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.9] text-cream uppercase tracking-tight">
              THE CUT <span className="italic text-amber">COMPASS.</span>
            </h2>
          </div>
          <p className="text-sm text-linen/70 max-w-md font-light leading-relaxed">
            Understand the anatomy of what sits on your plate. Toggle between Porca & Vaca, explore primal muscle zones, and uncover exact marbling levels and fire techniques.
          </p>
        </div>

        {/* Animal Selector Toggle */}
        <div className="flex w-full md:w-auto md:inline-flex mb-8 md:mb-10 border border-coal bg-smoke rounded overflow-hidden">
          <button
            onClick={() => { setAnimal('vaca'); setSelectedCutId(vacaCuts[0].id); }}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-3.5 font-mono text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 ${
              animal === 'vaca'
                ? 'bg-amber text-pitch font-bold shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]'
                : 'text-linen/70 hover:bg-coal/30'
            }`}
          >
            <span>VACA (STEER)</span>
          </button>
          <div className="w-px bg-coal" />
          <button
            onClick={() => { setAnimal('porca'); setSelectedCutId(porcaCuts[0].id); }}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 md:px-8 py-3 md:py-3.5 font-mono text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 ${
              animal === 'porca'
                ? 'bg-amber text-pitch font-bold shadow-[inset_0_-2px_0_rgba(0,0,0,0.2)]'
                : 'text-linen/70 hover:bg-coal/30'
            }`}
          >
            <span>PORCA (HOG)</span>
          </button>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-stretch bg-smoke border border-coal p-4 md:p-10 relative">
          
          {/* Left: Cut Selector */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="w-full overflow-hidden">
              <span className="text-[10px] md:text-[11px] font-mono tracking-widest text-linen/50 uppercase block mb-3 md:mb-4">
                SELECT PRIMAL ZONE — {animal === 'vaca' ? '5 BEEF CUTS' : '4 PORK CUTS'}
              </span>
              
              {/* Horizontal scroll on mobile, vertical stack on desktop */}
              <div className="flex flex-row lg:flex-col gap-2 md:gap-2.5 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
                {activeCuts.map((cut) => {
                  const isSelected = cut.id === currentCut.id
                  return (
                    <button
                      key={cut.id}
                      onClick={() => setSelectedCutId(cut.id)}
                      className={`text-left p-3 md:p-4 min-w-[200px] lg:min-w-0 snap-center rounded transition-all duration-300 border flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-0 ${
                        isSelected
                          ? 'bg-coal border-amber text-cream lg:translate-x-1 shadow-md'
                          : 'bg-pitch/60 border-coal text-linen/70 hover:border-amber/40 hover:text-cream'
                      }`}
                    >
                      <div>
                        <div className="font-serif text-base md:text-lg tracking-wide uppercase truncate">{cut.name}</div>
                        <div className="text-[10px] md:text-[11px] font-mono text-linen/50 mt-0.5 truncate">{cut.zone}</div>
                      </div>
                      <span className={`hidden lg:block w-2 h-2 rounded-full flex-shrink-0 ${isSelected ? 'bg-amber' : 'bg-white/20'}`} />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-4 lg:mt-8 pt-4 border-t border-coal flex items-center justify-between text-[10px] md:text-xs font-mono text-linen/60">
              <span>ANIMAL: {animal.toUpperCase()}</span>
            </div>
          </div>

          {/* Right: Primal Cut Dossier */}
          <div className="lg:col-span-7 bg-pitch border border-coal p-5 md:p-10 flex flex-col justify-between mt-2 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCut.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 md:space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 md:gap-4 mb-2 flex-wrap">
                    <span className="text-[10px] md:text-xs font-mono tracking-widest text-amber font-bold uppercase">
                      ANATOMICAL DOSSIER
                    </span>
                    {currentCut.recommendedDoneness && (
                      <span className="text-[10px] md:text-xs font-mono bg-amber/15 border border-amber/40 text-amber px-2 py-0.5 md:py-1 rounded-sm">
                        TARGET: {currentCut.recommendedDoneness}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl md:text-4xl uppercase tracking-tight text-cream">
                    {currentCut.name}
                  </h3>
                  <p className="text-[10px] md:text-xs font-mono text-linen/60 mt-1">{currentCut.zone}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 bg-smoke p-3 md:p-4 border border-coal">
                  <div>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-linen/60 uppercase block mb-2">
                      MARBLING / FAT RATIO
                    </span>
                    <div className="flex gap-1 md:gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`h-1.5 md:h-2 flex-1 rounded-sm ${
                            lvl <= currentCut.fatLevel ? 'bg-amber' : 'bg-coal'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-linen/60 uppercase block mb-2">
                      TENDERNESS SCORE
                    </span>
                    <div className="flex gap-1 md:gap-1.5">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`h-1.5 md:h-2 flex-1 rounded-sm ${
                            lvl <= currentCut.tenderness ? 'bg-cream' : 'bg-coal'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm md:text-base text-linen font-light leading-relaxed">
                  {currentCut.description}
                </p>

                <div className="border-l-2 border-amber pl-3 md:pl-4 py-1">
                  <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-amber uppercase block mb-1">
                    OPTIMAL FIRE TECHNIQUE
                  </span>
                  <span className="text-xs md:text-sm font-serif text-cream uppercase tracking-wide">
                    {currentCut.cookMethod}
                  </span>
                </div>

                <div className="bg-coal/60 p-3 md:p-4 border border-coal flex items-center justify-between flex-wrap gap-2 md:gap-4">
                  <div>
                    <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-linen/60 uppercase block mb-0.5">
                      SERVED ON OUR MENU AS
                    </span>
                    <span className="font-serif text-sm md:text-base text-amber font-medium">
                      {currentCut.menuDish}
                    </span>
                  </div>
                  <a
                    href="#menu"
                    className="text-[10px] md:text-xs font-mono text-cream hover:text-amber underline underline-offset-4 tracking-wider uppercase transition-colors"
                  >
                    VIEW MENU
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

