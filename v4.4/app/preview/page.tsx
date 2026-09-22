'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Data for Cut Compass
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
    description: 'Dense intramuscular marbling with a signature central eye of fat. As it renders on the coals, it bastes itself from the inside out.',
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
    description: 'Alternating layers of sweet, nutty pork fat and tender flesh, crowned with glass-shattering bubbly blistered skin.',
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
    description: 'Thick bone-in prime cut with a generous fat cap that caramelizes deeply over live embers.',
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

export default function PreviewV23() {
  const [animal, setAnimal] = useState<AnimalType>('vaca')
  const [selectedCutId, setSelectedCutId] = useState<string>('ribeye')
  const [activeSection, setActiveSection] = useState<string>('all')

  const activeCuts = animal === 'vaca' ? vacaCuts : porcaCuts
  const currentCut = activeCuts.find(c => c.id === selectedCutId) || activeCuts[0]

  const showHero = activeSection === 'all' || activeSection === 'hero'
  const showStory = activeSection === 'all' || activeSection === 'story'
  const showCompass = activeSection === 'all' || activeSection === 'cut-compass'
  const showFire = activeSection === 'all' || activeSection === 'fire'
  const showHouse = activeSection === 'all' || activeSection === 'house'
  const showRes = activeSection === 'all' || activeSection === 'reservation'

  return (
    <div className="w-full min-h-screen bg-[#0D0B0A] text-[#F2E8D5] font-sans selection:bg-[#C97D3E] selection:text-[#0D0B0A]">
      
      {/* =========================================================================
          PREVIEW BANNER & PALETTE OVERVIEW BAR
      ========================================================================= */}
      <div className="bg-[#1C1916] border-b border-[#C97D3E]/30 px-6 py-4 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-[#C97D3E] text-[#0D0B0A] text-[11px] font-bold tracking-widest uppercase rounded-sm">
                V2.3 PROTOTYPE
              </span>
              <h1 className="text-base font-bold tracking-tight text-[#F2E8D5]">
                PORCA & VACA — SECTION ARCHITECTURE PREVIEW
              </h1>
            </div>
            <p className="text-[11px] text-[#D4C5A9]/70 mt-0.5">
              Pitch Black (#0D0B0A) · Golden Cream (#F2E8D5) · Warm Amber (#C97D3E)
            </p>
          </div>

          {/* Section Quick Switcher Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All View' },
              { id: 'hero', label: '01. Hero' },
              { id: 'story', label: '02. Story' },
              { id: 'cut-compass', label: '03. Cut Compass' },
              { id: 'fire', label: '04. Fire' },
              { id: 'house', label: '05. The House' },
              { id: 'reservation', label: '06. Reservation' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveSection(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono tracking-wider rounded transition-all ${
                  activeSection === tab.id
                    ? 'bg-[#C97D3E] text-[#0D0B0A] font-bold'
                    : 'bg-[#0D0B0A] text-[#D4C5A9]/70 border border-[#2E2820] hover:text-[#F2E8D5]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: HERO PREVIEW */}
      {showHero && (
        <section id="preview-hero" className="relative w-full min-h-[85vh] flex flex-col justify-end p-6 md:p-16 overflow-hidden bg-[#0D0B0A]">
          {/* Section Label */}
          <div className="absolute top-8 left-8 z-30 bg-[#0D0B0A]/80 border border-[#C97D3E]/40 px-3 py-1 rounded text-xs font-mono text-[#C97D3E]">
            SECTION 01: HERO [Theme: Pitch #0D0B0A + Amber #C97D3E]
          </div>

          {/* Ambient Warm Vignette & Cinematic Backing */}
          <div className="absolute inset-0 z-0 opacity-45">
            <Image
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=85&w=1920&auto=format&fit=crop"
              alt="Fire Grill"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B0A] via-transparent to-[#0D0B0A]/80" />
          </div>

          {/* Ambient warm fire glow */}
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C97D3E]/20 blur-[140px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-[1440px] w-full mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#C97D3E] animate-pulse" />
                <span className="text-xs font-mono tracking-[0.3em] text-[#C97D3E] uppercase font-semibold">
                  ALWARPET, CHENNAI — OPEN WOOD FIRE KITCHEN
                </span>
              </div>
              <h1 className="font-serif text-[clamp(4.5rem,10vw,9.5rem)] leading-[0.85] text-[#F2E8D5] tracking-tight">
                PORCA<br />
                <span className="italic text-[#C97D3E]">&</span><br />
                VACA.
              </h1>
            </div>

            <div className="flex flex-col gap-6 max-w-sm">
              <p className="text-[#D4C5A9] text-base leading-relaxed font-light">
                Pork and beef, stripped of polite excuses. Live wood flames, whole primal cuts, and time doing the heavy lifting.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <button className="bg-[#C97D3E] hover:bg-[#b56e34] text-[#0D0B0A] font-bold text-xs tracking-widest uppercase px-7 py-4 transition-all duration-300 shadow-lg shadow-[#C97D3E]/20">
                  EXPLORE MENU
                </button>
                <button className="border border-[#F2E8D5]/30 hover:border-[#C97D3E] text-[#F2E8D5] hover:text-[#C97D3E] font-medium text-xs tracking-widest uppercase px-7 py-4 transition-all duration-300">
                  BOOK TABLE
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: STORY CHAPTER */}
      {showStory && (
        <section id="preview-story" className="relative w-full bg-[#F2E8D5] text-[#0D0B0A] py-28 md:py-36 px-6 md:px-16 border-t border-[#0D0B0A]/10">
          <div className="absolute top-8 left-8 z-30 bg-[#0D0B0A] text-[#F2E8D5] px-3 py-1 rounded text-xs font-mono">
            SECTION 02: STORY CHAPTER [Theme: Golden Cream #F2E8D5 + Pitch Typography]
          </div>

          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#C97D3E] uppercase block mb-6">
                THE DOCTRINE
              </span>
              <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.92] tracking-tight uppercase mb-8">
                IT STARTED WITH A GRILL.<br />
                <span className="italic font-normal text-[#0D0B0A]/70">THEN CAME THE OBSESSION.</span>
              </h2>
              <p className="text-lg md:text-xl text-[#0D0B0A]/85 font-light leading-relaxed max-w-2xl">
                Porca & Vaca was born from one straightforward conviction: that pork and beef, done right, are among the most satisfying things you can eat. The name says it all — <strong className="font-semibold text-[#0D0B0A]">Porca</strong> (pig) and <strong className="font-semibold text-[#0D0B0A]">Vaca</strong> (cow). Two animals. Endless possibilities.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8 border-l border-[#0D0B0A]/20 pl-8 md:pl-12">
              <div>
                <span className="text-xs font-mono font-bold text-[#C97D3E] tracking-widest uppercase block mb-1">
                  01 / GENESIS
                </span>
                <h3 className="font-serif text-2xl uppercase">Sriram Colony, Alwarpet</h3>
                <p className="text-sm text-[#0D0B0A]/70 mt-1 font-light">Rooted in Chennai’s most vibrant culinary enclave.</p>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#C97D3E] tracking-widest uppercase block mb-1">
                  02 / PHILOSOPHY
                </span>
                <h3 className="font-serif text-2xl uppercase">Whole Cut Firecraft</h3>
                <p className="text-sm text-[#0D0B0A]/70 mt-1 font-light">No electric ovens. White oak and seasoned hickory only.</p>
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#C97D3E] tracking-widest uppercase block mb-1">
                  03 / THE MEAT MAFIA
                </span>
                <h3 className="font-serif text-2xl uppercase">Pure Loyalty Secret Club</h3>
                <p className="text-sm text-[#0D0B0A]/70 mt-1 font-light">An underground society for true carnivores.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: THE CUT COMPASS */}
      {showCompass && (
        <section id="preview-cut-compass" className="relative w-full bg-[#0D0B0A] py-28 md:py-36 px-6 md:px-16 border-t border-[#C97D3E]/30 overflow-hidden">
          <div className="absolute top-8 left-8 z-30 bg-[#C97D3E] text-[#0D0B0A] px-3 py-1 rounded text-xs font-mono font-bold">
            SECTION 03: THE CUT COMPASS [Interactive Butcher Widget]
          </div>

          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#C97D3E]/10 blur-[180px] rounded-full pointer-events-none" />

          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-mono tracking-[0.3em] text-[#C97D3E] font-bold uppercase block mb-3">
                  INTERACTIVE BUTCHER'S GUIDE
                </span>
                <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] text-[#F2E8D5] uppercase tracking-tight">
                  THE CUT <span className="italic text-[#C97D3E]">COMPASS.</span>
                </h2>
              </div>
              <p className="text-sm text-[#D4C5A9]/70 max-w-md font-light leading-relaxed">
                Understand the anatomy of what sits on your plate. Select an animal, explore prime primal zones, and find your ideal marbling and fire technique.
              </p>
            </div>

            {/* Animal Selector Toggle */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => { setAnimal('vaca'); setSelectedCutId(vacaCuts[0].id); }}
                className={`flex items-center gap-3 px-8 py-3.5 font-mono text-xs tracking-widest uppercase transition-all duration-300 border ${
                  animal === 'vaca'
                    ? 'bg-[#C97D3E] text-[#0D0B0A] border-[#C97D3E] font-bold shadow-lg shadow-[#C97D3E]/20'
                    : 'bg-[#1C1916] text-[#D4C5A9] border-[#2E2820] hover:border-[#C97D3E]/50'
                }`}
              >
                <span className="text-base">🐄</span>
                <span>VACA (THE STEER)</span>
              </button>
              <button
                onClick={() => { setAnimal('porca'); setSelectedCutId(porcaCuts[0].id); }}
                className={`flex items-center gap-3 px-8 py-3.5 font-mono text-xs tracking-widest uppercase transition-all duration-300 border ${
                  animal === 'porca'
                    ? 'bg-[#C97D3E] text-[#0D0B0A] border-[#C97D3E] font-bold shadow-lg shadow-[#C97D3E]/20'
                    : 'bg-[#1C1916] text-[#D4C5A9] border-[#2E2820] hover:border-[#C97D3E]/50'
                }`}
              >
                <span className="text-base">🐖</span>
                <span>PORCA (THE HOG)</span>
              </button>
            </div>

            {/* Main Interactive Widget Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#1C1916] border border-[#2E2820] p-8 md:p-10 relative">
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-[#D4C5A9]/50 uppercase block mb-4">
                    SELECT PRIMAL CUT — {animal === 'vaca' ? '5 RESERVE CUTS' : '4 RESERVE CUTS'}
                  </span>
                  <div className="flex flex-col gap-2.5">
                    {activeCuts.map((cut) => {
                      const isSelected = cut.id === currentCut.id
                      return (
                        <button
                          key={cut.id}
                          onClick={() => setSelectedCutId(cut.id)}
                          className={`text-left p-3.5 rounded transition-all duration-300 border flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#2E2820] border-[#C97D3E] text-[#F2E8D5] translate-x-1 shadow-md'
                              : 'bg-[#0D0B0A]/60 border-[#2E2820] text-[#D4C5A9]/70 hover:border-[#C97D3E]/40 hover:text-[#F2E8D5]'
                          }`}
                        >
                          <div>
                            <div className="font-serif text-lg tracking-wide uppercase">{cut.name}</div>
                            <div className="text-[11px] font-mono text-[#D4C5A9]/50">{cut.zone}</div>
                          </div>
                          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#C97D3E]' : 'bg-white/20'}`} />
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#2E2820] flex items-center justify-between text-xs font-mono text-[#D4C5A9]/60">
                  <span>ANIMAL: {animal.toUpperCase()}</span>
                  <span>ORIGIN: CHENNAI BUTCHERY</span>
                </div>
              </div>

              <div className="lg:col-span-7 bg-[#0D0B0A] border border-[#2E2820] p-8 md:p-10 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCut.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-xs font-mono tracking-widest text-[#C97D3E] font-bold uppercase">
                          ANATOMICAL DOSSIER
                        </span>
                        {currentCut.recommendedDoneness && (
                          <span className="text-xs font-mono bg-[#C97D3E]/15 border border-[#C97D3E]/40 text-[#C97D3E] px-2.5 py-1 rounded-sm">
                            TARGET: {currentCut.recommendedDoneness}
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-[#F2E8D5]">
                        {currentCut.name}
                      </h3>
                      <p className="text-xs font-mono text-[#D4C5A9]/60 mt-1">{currentCut.zone}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6 bg-[#1C1916] p-4 border border-[#2E2820]">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#D4C5A9]/60 uppercase block mb-2">
                          MARBLING / FAT RATIO
                        </span>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((lvl) => (
                            <div
                              key={lvl}
                              className={`h-2 flex-1 rounded-sm ${
                                lvl <= currentCut.fatLevel ? 'bg-[#C97D3E]' : 'bg-[#2E2820]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#D4C5A9]/60 uppercase block mb-2">
                          TENDERNESS SCORE
                        </span>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((lvl) => (
                            <div
                              key={lvl}
                              className={`h-2 flex-1 rounded-sm ${
                                lvl <= currentCut.tenderness ? 'bg-[#F2E8D5]' : 'bg-[#2E2820]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-base text-[#D4C5A9] font-light leading-relaxed">
                      {currentCut.description}
                    </p>

                    <div className="border-l-2 border-[#C97D3E] pl-4 py-1">
                      <span className="text-[10px] font-mono tracking-widest text-[#C97D3E] uppercase block mb-1">
                        OPTIMAL FIRE TECHNIQUE
                      </span>
                      <span className="text-sm font-serif text-[#F2E8D5] uppercase tracking-wide">
                        {currentCut.cookMethod}
                      </span>
                    </div>

                    <div className="bg-[#2E2820]/60 p-4 border border-[#2E2820] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#D4C5A9]/60 uppercase block">
                          SERVED ON OUR ALWARPET MENU AS
                        </span>
                        <span className="font-serif text-base text-[#C97D3E] font-medium">
                          {currentCut.menuDish}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#F2E8D5] tracking-wider uppercase">
                        RESERVE CUT →
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: FIRE SECTION */}
      {showFire && (
        <section id="preview-fire" className="relative w-full bg-[#1C1916] py-28 md:py-36 px-6 md:px-16 border-t border-[#2E2820] overflow-hidden">
          <div className="absolute top-8 left-8 z-30 bg-[#C97D3E] text-[#0D0B0A] px-3 py-1 rounded text-xs font-mono font-bold">
            SECTION 04: FIRE [Warm Amber #C97D3E Replaces Cold Oxblood]
          </div>

          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] border border-[#2E2820] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=1200&auto=format&fit=crop"
                alt="Live wood flames and beef grilling"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-transparent to-transparent opacity-80" />
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <span className="text-xs font-mono tracking-[0.3em] text-[#C97D3E] font-bold uppercase block mb-4">
                THE ELEMENTS
              </span>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] text-[#F2E8D5] uppercase tracking-tight mb-8">
                WOOD.<br />
                COAL.<br />
                <span className="italic text-[#C97D3E]">FIRE.</span>
              </h2>
              <p className="text-[#D4C5A9] text-base md:text-lg font-light leading-relaxed mb-8">
                No gas burners. No electric griddles. Everything that leaves our pass has been touched by real smoke, high heat, and wood embers. The char isn’t a garnish — it is the seasoning.
              </p>
              <div className="flex gap-4">
                <div className="bg-[#0D0B0A] p-4 border border-[#2E2820] flex-1">
                  <span className="text-2xl font-mono text-[#C97D3E] font-bold block">800°F</span>
                  <span className="text-xs font-mono text-[#D4C5A9]/60 uppercase">Ember Core Temp</span>
                </div>
                <div className="bg-[#0D0B0A] p-4 border border-[#2E2820] flex-1">
                  <span className="text-2xl font-mono text-[#F2E8D5] font-bold block">100%</span>
                  <span className="text-xs font-mono text-[#D4C5A9]/60 uppercase">Hardwood Only</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: THE HOUSE */}
      {showHouse && (
        <section id="preview-house" className="relative w-full bg-[#F2E8D5] text-[#0D0B0A] py-28 md:py-36 px-6 md:px-16 border-t border-[#0D0B0A]/10">
          <div className="absolute top-8 left-8 z-30 bg-[#0D0B0A] text-[#F2E8D5] px-3 py-1 rounded text-xs font-mono">
            SECTION 05: THE HOUSE [Theme: Warm Golden Cream #F2E8D5 Interior]
          </div>

          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col items-center text-center mb-16">
              <span className="text-xs font-mono tracking-[0.3em] text-[#C97D3E] font-bold uppercase mb-4">
                42 SRIRAM COLONY, ALWARPET
              </span>
              <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] uppercase tracking-tight">
                THE <span className="italic text-[#0D0B0A]/70 font-light">HOUSE.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 relative aspect-[16/10] border border-[#0D0B0A]/10 overflow-hidden shadow-2xl">
                <Image
                  src="/wall-art.png"
                  alt="Porca & Vaca Interior Wall"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="relative aspect-square border border-[#0D0B0A]/10 overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=85&w=800&auto=format&fit=crop"
                    alt="Atmosphere"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-[#0D0B0A]/80 font-light leading-relaxed">
                  Charred wood paneling, amber incandescent filament bulbs, and the immediate scent of hickory smoke upon entry. Built for long dinners.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: RESERVATION CTA */}
      {showRes && (
        <section id="preview-reservation" className="relative w-full bg-[#C97D3E] text-[#0D0B0A] py-28 md:py-36 px-6 md:px-16 overflow-hidden">
          <div className="absolute top-8 left-8 z-30 bg-[#0D0B0A] text-[#F2E8D5] px-3 py-1 rounded text-xs font-mono">
            SECTION 06: RESERVATION [Theme: Warm Amber #C97D3E Full Bleed]
          </div>

          <div className="max-w-[1000px] mx-auto text-center flex flex-col items-center">
            <span className="text-xs font-mono tracking-[0.3em] text-[#0D0B0A] font-bold uppercase mb-6">
              LIMITED SEATING EACH EVENING
            </span>
            <h2 className="font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.88] uppercase tracking-tight mb-10 text-[#0D0B0A]">
              YOUR TABLE<br />
              <span className="italic font-light text-[#0D0B0A]/75">IS WAITING.</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <button className="flex-1 bg-[#0D0B0A] hover:bg-[#1C1916] text-[#F2E8D5] px-8 py-5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-xl">
                BOOK A TABLE
              </button>
              <button className="flex-1 border-2 border-[#0D0B0A] hover:bg-[#0D0B0A]/10 text-[#0D0B0A] px-8 py-5 text-xs font-bold tracking-widest uppercase transition-all duration-300">
                ORDER ONLINE
              </button>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
