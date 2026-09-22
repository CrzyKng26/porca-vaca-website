'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useAnimationFrame, useMotionValue, wrap } from 'framer-motion'
import type { SignatureImage } from '@/data/signature'

interface SignatureCarouselProps {
  initialImages: SignatureImage[];
}

export default function SignatureCarousel({ initialImages }: SignatureCarouselProps) {
  const baseX = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const [trackWidth, setTrackWidth] = useState(0)

  // Duplicating items enough times to fill the screen safely
  const repeatedItems = [...initialImages, ...initialImages, ...initialImages]

  // Measure the width of one set of carousel items (1/3 of the repeated array)
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        // The track contains 3 copies. We want the width of exactly 1 copy to wrap seamlessly.
        setTrackWidth(trackRef.current.scrollWidth / 3)
      }
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [initialImages])

  useAnimationFrame((t, delta) => {
    if (!trackWidth) return
    if (isDragging) return
    
    let moveBy = 0.3 * delta // Base speed (0.3 px per ms)
    if (isHovered) {
      moveBy = 0.1 * delta // Slow down on hover (0.1 px per ms)
    }
    
    let currentX = baseX.get() - moveBy

    // Wrapping logic in pixels
    if (currentX <= -trackWidth) {
      currentX += trackWidth
    } else if (currentX > 0) {
      currentX -= trackWidth
    }

    baseX.set(currentX)
  })

  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden bg-charcoal flex flex-col justify-center"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[140%] bg-obsidian/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[120%] bg-oxblood/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
        <span className="font-display text-[20vw] leading-none whitespace-nowrap text-bone">SIGNATURE</span>
      </div>

      <div className="mb-16 px-6 md:px-12 text-center relative z-10">
        <h2 className="font-display text-4xl md:text-5xl text-bone mb-4">SIGNATURE RESERVE</h2>
        <p className="text-label tracking-widest text-bone/50 uppercase">The inner circle</p>
        <p className="mt-3 text-[10px] tracking-widest uppercase text-bone/30">← Swipe or drag to explore →</p>
      </div>

      <div 
        className="relative flex overflow-hidden cursor-grab active:cursor-grabbing px-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          ref={trackRef}
          className="flex gap-4 lg:gap-8 w-max"
          style={{ x: baseX }}
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }} // Infinite drag constraint
          dragElastic={1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onDrag={(e, info) => {
             // Let framer-motion modify `baseX` directly since it's now in pixels.
             // We just need to wrap it if the user drags it too far.
             if (trackWidth) {
               let currentX = baseX.get()
               if (currentX <= -trackWidth) {
                 baseX.set(currentX + trackWidth)
               } else if (currentX > 0) {
                 baseX.set(currentX - trackWidth)
               }
             }
          }}
        >
          {repeatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-[75vw] md:w-[400px] lg:w-[480px] aspect-[4/5] flex-shrink-0 group/card overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={item.alt_text || 'Signature Image'}
                loading="lazy"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] group-hover/card:scale-105 opacity-75 lg:opacity-60 group-hover/card:opacity-100 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-90 group-hover/card:opacity-60 transition-opacity duration-[400ms] pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8 flex flex-col items-center lg:transform lg:translate-y-4 lg:group-hover/card:translate-y-0 transition-transform duration-[400ms] pointer-events-none">
                <div className="text-[10px] tracking-widest uppercase text-ember mb-2 lg:mb-3">SIGNATURE</div>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-bone mb-2 text-center group-hover/card:text-white transition-colors">
                  {item.alt_text || 'Premium Cut'}
                </h3>
                <div className="w-12 h-[1px] bg-oxblood lg:scale-x-0 lg:group-hover/card:scale-x-100 transition-transform duration-[400ms] origin-center mt-3" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
