'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const donenessLevels = [
  {
    id: 'blue',
    name: 'BLUE',
    temp: '115\u00B0F',
    crust: 'Flash Seared',
    center: 'Cool, raw center',
    description: 'A very quick sear on an intensely hot grill, leaving the inside entirely raw and cool. For the absolute purists.',
    recommendation: 'Not recommended for beginners.',
    accent: '#3a0ca3', // Deep blueish purple
  },
  {
    id: 'rare',
    name: 'RARE',
    temp: '125\u00B0F',
    crust: 'Charred crust',
    center: 'Cool, red center',
    description: 'The meat is warm through the very outer edges, but remains cool and vividly red in the center.',
    recommendation: 'Great for lean cuts, but may be too soft for beginners.',
    accent: '#d90429', // Vivid red
  },
  {
    id: 'med-rare',
    name: 'MED-RARE',
    temp: '135\u00B0F',
    crust: 'Caramelized char',
    center: 'Warm, red center',
    description: 'The absolute sweet spot. The fat has begun to melt, carrying immense flavor, while the meat remains extremely tender and juicy.',
    recommendation: '[ RECOMMENDED ] Best texture and flavor.',
    accent: '#ef233c', // Warm bright red
  },
  {
    id: 'medium',
    name: 'MEDIUM',
    temp: '145\u00B0F',
    crust: 'Hard char',
    center: 'Warm, pink center',
    description: 'A firm texture with a thick band of pink in the middle. The meat has lost a little juice but gains a firmer bite.',
    recommendation: 'A safe, very tasty choice for beginners who prefer less red.',
    accent: '#f77f00', // Orange
  },
  {
    id: 'med-well',
    name: 'MED-WELL',
    temp: '155\u00B0F',
    crust: 'Deep crust',
    center: 'Slight pink line',
    description: 'Mostly cooked through with just a hint of pale pink in the center. The meat is noticeably firmer.',
    recommendation: 'Not recommended. You begin to lose the premium texture of the cut.',
    accent: '#7f5539', // Brown
  },
  {
    id: 'well',
    name: 'WELL DONE',
    temp: '165\u00B0F+',
    crust: 'Heavy char',
    center: 'Brown throughout',
    description: 'Cooked entirely through. The meat is very firm and has lost most of its natural juices.',
    recommendation: 'We strictly advise against this for our premium cuts. It destroys the flavor profile.',
    accent: '#2b2b2b', // Dark Charcoal
  }
]

export default function DonenessWidget() {
  const [currentIndex, setCurrentIndex] = useState(2) // Default to Med-Rare
  const current = donenessLevels[currentIndex]

  return (
    <div className="w-full bg-charcoal py-4 md:py-8 px-6 md:px-12 border-y border-white/5">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-8 md:gap-24 items-center">
        
        {/* Left: The Interactive Selector */}
        <div className="w-full md:w-1/2 flex flex-col">
          <span className="text-[10px] md:text-label tracking-superwide text-oxblood font-bold mb-4 md:mb-6">THE SCIENCE OF FIRE</span>
          <h2 className="font-display text-3xl md:text-display-sm text-bone leading-[0.9] uppercase tracking-tighter mb-8 md:mb-12">
            HOW DO YOU <br />
            <span className="italic text-bone/60 font-light">WANT IT?</span>
          </h2>

          {/* Slider Input */}
          <div className="w-full relative mb-4 md:mb-16">
            <input 
              type="range" 
              min="0" 
              max={donenessLevels.length - 1} 
              value={currentIndex}
              onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
              className="w-full h-2 bg-obsidian/40 appearance-none outline-none rounded-full cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${current.accent} ${(currentIndex / (donenessLevels.length - 1)) * 100}%, rgba(0,0,0,0.5) ${(currentIndex / (donenessLevels.length - 1)) * 100}%)`
              }}
            />
            {/* Custom Slider Thumb Styles are handled in global CSS, but we can fake an indicator */}
            <div className="flex justify-between mt-6 px-1">
              {donenessLevels.map((level, idx) => (
                <div 
                  key={level.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`cursor-pointer transition-all duration-300 ${idx === currentIndex ? 'text-bone font-bold scale-110' : 'text-bone/40 hover:text-bone/70'}`}
                >
                  <div 
                    className="w-3 h-3 rounded-full mx-auto mb-2 transition-all duration-300"
                    style={{ backgroundColor: idx === currentIndex ? level.accent : 'transparent', border: `1px solid ${idx === currentIndex ? level.accent : '#555'}` }}
                  />
                </div>
              ))}
            </div>
            {/* Labels below nodes */}
             <div className="flex justify-between mt-2 px-1 text-[10px] md:text-xs font-mono tracking-widest text-bone/40">
                <span>BLUE</span>
                <span>WELL</span>
             </div>
          </div>
        </div>

        {/* Right: The Data Display */}
        <div className="w-full md:w-1/2 relative bg-obsidian text-bone p-6 md:p-16 border border-obsidian/20 shadow-2xl overflow-hidden min-h-[auto] md:min-h-[450px] flex flex-col justify-center">
          {/* Animated Background color hint */}
          <motion.div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            animate={{ backgroundColor: current.accent }}
            transition={{ duration: 0.5 }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 flex flex-col h-full"
            >
              <div className="flex items-end justify-between mb-6 md:mb-8 border-b border-bone/20 pb-4 md:pb-6">
                <h3 className="font-display text-3xl md:text-5xl uppercase tracking-tighter" style={{ color: current.accent }}>
                  {current.name}
                </h3>
                <span className="font-mono text-xl md:text-2xl text-bone/60">{current.temp}</span>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8 font-mono text-sm tracking-widest uppercase">
                <div>
                  <span className="block text-bone/40 mb-1">CRUST</span>
                  <span className="text-bone">{current.crust}</span>
                </div>
                <div>
                  <span className="block text-bone/40 mb-1">CENTER</span>
                  <span className="text-bone">{current.center}</span>
                </div>
              </div>

              <p className="text-body-lg text-bone/80 font-light leading-relaxed mb-8">
                {current.description}
              </p>

              <div className="mt-auto p-4 border border-bone/20 bg-bone/5">
                <span className="block text-xs font-mono tracking-widest text-bone/50 uppercase mb-2">Verdict</span>
                <p className={`text-sm md:text-base ${currentIndex === 2 ? 'font-bold text-bone' : 'text-bone/80'}`}>
                  {current.recommendation}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
