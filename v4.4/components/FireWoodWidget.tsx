'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const woods = [
  {
    id: 'oak',
    name: 'WHITE OAK',
    intensity: 'Medium',
    burn: 'Slow & Hot',
    profile: 'The backbone of our grill. A clean, balanced smoke that doesn’t overpower the natural flavor of the beef. It provides a steady, reliable bed of coals.',
    pairing: 'Ribeye, Tenderloin',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=85&w=1200&auto=format&fit=crop',
    color: '#a98467'
  },
  {
    id: 'hickory',
    name: 'HICKORY',
    intensity: 'High',
    burn: 'Intense',
    profile: 'Aggressive, sweet, and heavy. We use it sparingly to build a thick crust and deliver that undeniable, nostalgic campfire punch.',
    pairing: 'Brisket, Pork Belly',
    image: 'https://images.unsplash.com/photo-1542838686-37ed7a9ef387?q=85&w=1200&auto=format&fit=crop',
    color: '#6c584c'
  },
  {
    id: 'apple',
    name: 'APPLEWOOD',
    intensity: 'Mild',
    burn: 'Slow',
    profile: 'Sweet, subtle, and mildly fruity. Perfect for cutting through dense pork fats without leaving any bitter, over-smoked aftertaste.',
    pairing: 'Pork Ribs, Porchetta',
    image: 'https://images.unsplash.com/photo-1506514333682-1c0722cc269b?q=85&w=1200&auto=format&fit=crop',
    color: '#adc178'
  },
  {
    id: 'mesquite',
    name: 'MESQUITE',
    intensity: 'Extreme',
    burn: 'Fast & Scorching',
    profile: 'The hottest burning wood on the planet. We use it exclusively for flash-searing steaks to lock in the juices under a brittle, charred crust.',
    pairing: 'Blue Rare Cuts',
    image: 'https://images.unsplash.com/photo-1581404095400-0199e8432a9a?q=85&w=1200&auto=format&fit=crop',
    color: '#ef233c'
  }
]

export default function FireWoodWidget() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = woods[activeIdx]

  return (
    <section className="relative w-full h-auto min-h-[500px] md:h-[900px] py-16 md:py-0 bg-obsidian border-y border-white/5 overflow-hidden flex items-center justify-center">
      
      {/* Background Image transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.3, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={current.image}
            alt={current.name}
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/50 to-transparent z-10" />

      <div className="max-w-[1440px] w-full px-6 md:px-12 relative z-20 flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Left: The Selector */}
        <div className="w-full md:w-5/12 flex flex-col justify-center">
          <span className="text-label tracking-superwide text-oxblood font-bold mb-6">FUEL & SMOKE</span>
          <h2 className="font-display text-display-sm text-bone leading-[0.9] uppercase tracking-tighter mb-12">
            CHOOSE YOUR<br />
            <span className="italic text-bone/60 font-light">WEAPON.</span>
          </h2>

          <div className="flex flex-col gap-2">
            {woods.map((wood, idx) => (
              <div 
                key={wood.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                className="group cursor-pointer py-4 border-b border-white/10 flex items-center justify-between transition-colors"
              >
                <span className={`font-display text-2xl md:text-3xl transition-colors duration-500 ${idx === activeIdx ? 'text-bone' : 'text-bone/30 group-hover:text-bone/60'}`}>
                  {wood.name}
                </span>
                {idx === activeIdx && (
                  <motion.div 
                    layoutId="wood-indicator"
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: wood.color }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: The Profile */}
        <div className="w-full md:w-7/12 flex flex-col justify-center mt-12 md:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-charcoal/80 backdrop-blur-md p-10 md:p-16 border border-white/10"
            >
              <div className="grid grid-cols-2 gap-8 mb-10 font-mono text-sm tracking-widest uppercase">
                <div>
                  <span className="block text-bone/40 mb-2">INTENSITY</span>
                  <span className="text-bone" style={{ color: current.color }}>{current.intensity}</span>
                </div>
                <div>
                  <span className="block text-bone/40 mb-2">BURN RATE</span>
                  <span className="text-bone">{current.burn}</span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-bone/10 mb-10" />

              <p className="text-body-lg text-bone/90 font-light leading-relaxed mb-10">
                {current.profile}
              </p>

              <div>
                <span className="block text-label tracking-widest text-bone/40 mb-3">BEST PAIRED WITH</span>
                <span className="font-display text-2xl tracking-wide text-bone uppercase">{current.pairing}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
