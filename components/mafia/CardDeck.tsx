'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'

const CARDS = [
  {
    id: 1,
    series: 'SERIES 01',
    category: 'VACA',
    title: 'THE BRISKET',
    copy: 'SMOKE. TIME. FIRE. 12-hour wood-smoked beef brisket that rewrites expectations.',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=85&w=800&auto=format&fit=crop',
    rotation: -1,
  },
  {
    id: 2,
    series: 'SERIES 02',
    category: 'PORCA',
    title: 'THE RIBS',
    copy: 'Fall-off-the-bone baby back ribs, dry-rubbed and glazed with house BBQ.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=800&auto=format&fit=crop',
    rotation: 1.5,
  },
  {
    id: 3,
    series: 'SERIES 03',
    category: 'HOUSE',
    title: 'THE SMASH',
    copy: 'Double smash patty, house cheese, caramelised onion. The regular’s favourite.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=85&w=800&auto=format&fit=crop',
    rotation: -0.5,
  },
  {
    id: 4,
    series: 'SERIES 04',
    category: 'FIRE',
    title: 'THE PIZZA',
    copy: 'Wood-fired. Pulled pork, salami, smoked bacon. No apologies.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=85&w=800&auto=format&fit=crop',
    rotation: 0.8,
  },
]

export default function CardDeck() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0 to 1) to active card index
    const cardsLength = CARDS.length
    const index = Math.min(Math.floor(latest * cardsLength), cardsLength - 1)
    setActiveIndex(index)
  })

  return (
    <section ref={containerRef} className="relative w-full" style={{ height: '400vh' }}>
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Navigation Indicator */}
        <div className="absolute top-12 md:top-24 left-6 md:left-12 z-50">
          <p className="text-label tracking-widest text-bone/60">
            0{activeIndex + 1} — 0{CARDS.length}
          </p>
        </div>

        <div className="relative w-auto max-w-[85vw] md:max-w-none h-[75vh] md:h-[65vh] aspect-[4/5] perspective-1000">
          {CARDS.map((card, index) => {
            const isActive = index === activeIndex
            const isPast = index < activeIndex
            const diff = index - activeIndex

            // If it's a past card, it flies away up/left and fades out
            const yOffset = isPast ? -200 : diff * 40 // Stack downwards slightly
            const scale = isPast ? 0.9 : 1 - diff * 0.05
            const zIndex = 100 - index
            const opacity = isPast ? 0 : 1 - diff * 0.2
            
            // Limit visible future cards to ~3 behind
            if (diff > 3) return null

            return (
              <motion.div
                key={card.id}
                initial={false}
                animate={{
                  y: yOffset,
                  scale: scale,
                  rotate: isPast ? -5 : card.rotation,
                  opacity: opacity,
                  z: isPast ? 100 : -diff * 50,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-charcoal border border-white/10 shadow-2xl p-4 md:p-6 flex flex-col"
                style={{ zIndex, transformStyle: 'preserve-3d' }}
              >
                {/* Series Top Label */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-label text-bone/50 tracking-superwide">{card.series}</span>
                  <span className="text-label text-oxblood tracking-widest">{card.category}</span>
                </div>

                {/* Image */}
                <div className="relative w-full flex-1 min-h-0 mb-4 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                {/* Typography */}
                <h3 className="font-display text-3xl md:text-4xl text-bone mb-2">{card.title}</h3>
                <p className="text-body-sm text-bone/60 leading-relaxed max-w-sm line-clamp-2 md:line-clamp-none">
                  {card.copy}
                </p>

                {/* Brand Mark */}
                <div className="mt-auto pt-4 flex justify-between items-center opacity-30">
                  <span className="text-[10px] uppercase tracking-widest">P&V</span>
                  <span className="text-[10px] uppercase tracking-widest">PRIVATE</span>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Helper instruction */}
        <div className="absolute bottom-12 md:bottom-24 w-full text-center z-50">
          <p className="text-label text-bone/40 uppercase tracking-widest animate-pulse">
            Scroll to advance
          </p>
        </div>
      </div>
    </section>
  )
}
