'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const cards = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/mafia/page_${i + 1}.png`
}))

export default function MafiaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  return (
    <div className="relative w-full h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      
      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-md h-[60vh] flex items-center justify-center perspective-[1000px]">
        <AnimatePresence initial={false} mode="popLayout">
          {cards.map((card, idx) => {
            // Calculate relative position
            let offset = idx - currentIndex
            if (offset < -cards.length / 2) offset += cards.length
            if (offset > cards.length / 2) offset -= cards.length

            if (Math.abs(offset) > 2) return null // Only show a few cards

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.8, x: offset > 0 ? 200 : -200 }}
                animate={{
                  opacity: 1 - Math.abs(offset) * 0.3,
                  scale: 1 - Math.abs(offset) * 0.15,
                  x: offset * 120,
                  zIndex: 10 - Math.abs(offset),
                  rotateY: offset * -15, // Fun 3D tilt
                }}
                exit={{ opacity: 0, scale: 0.8, x: offset > 0 ? 200 : -200 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full h-full max-w-[320px] md:max-w-[400px] aspect-[3/4] shadow-2xl shadow-blood/20 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => {
                  if (offset === 0) {
                    // Do something if clicked the center card? Maybe open full screen.
                  } else if (offset > 0) {
                    handleNext()
                  } else {
                    handlePrev()
                  }
                }}
              >
                <Image
                  src={card.src}
                  alt={`Meat Mafia Offer ${card.id}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-8 mt-8">
        <button 
          onClick={handlePrev}
          className="w-12 h-12 rounded-full border border-amber text-amber flex items-center justify-center hover:bg-amber hover:text-pitch transition-colors"
        >
          ←
        </button>
        <button 
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-amber text-amber flex items-center justify-center hover:bg-amber hover:text-pitch transition-colors"
        >
          →
        </button>
      </div>
      
      <p className="mt-6 text-cream/70 text-label tracking-widest text-center">
        CLICK ON A CARD TO NAVIGATE
      </p>

    </div>
  )
}
