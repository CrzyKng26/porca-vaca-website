'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useAudio } from '../AudioProvider'
import { MAFIA_CARDS, MafiaCard } from '@/data/mafiaCards'

// Prize cards are cards 2 through 11
const prizeCards = MAFIA_CARDS.filter(c => c.id >= 2 && c.id <= 11)

export default function MafiaLuckyDraw() {
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawnCard, setDrawnCard] = useState<MafiaCard | null>(null)
  const [shuffleIndex, setShuffleIndex] = useState(0)
  const { playHover, playThud } = useAudio()

  useEffect(() => {
    if (!isDrawing) return

    const interval = setInterval(() => {
      setShuffleIndex(Math.floor(Math.random() * prizeCards.length))
      playHover()
    }, 80)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setIsDrawing(false)
      const finalCard = prizeCards[Math.floor(Math.random() * prizeCards.length)]
      setDrawnCard(finalCard)
      playThud()
    }, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isDrawing, playHover, playThud])

  const startDraw = () => {
    setDrawnCard(null)
    setIsDrawing(true)
    playThud()
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center py-8 px-4 min-h-[85vh]">

      {/* Blood glow behind card */}
      <AnimatePresence>
        {drawnCard && !isDrawing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-blood/20 blur-[120px] rounded-full pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      {/* Instruction text — hidden after drawing */}
      <AnimatePresence>
        {!drawnCard && !isDrawing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center mb-8 z-10"
          >
            <p className="text-xs tracking-superwide text-bone/30 uppercase">Your fate awaits</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card area */}
      <div className="relative z-10 w-full max-w-[340px] aspect-[3/4]">

        {/* State 1 — Initial */}
        {!isDrawing && !drawnCard && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full border border-blood/30 bg-[#1a1614] flex flex-col items-center justify-center cursor-pointer hover:border-blood/60 transition-all duration-500 shadow-[0_0_60px_rgba(139,30,30,0.1)] group"
            onClick={startDraw}
          >
            <span
              className="font-display text-[9rem] leading-none text-blood/20 group-hover:text-blood/40 transition-colors duration-500 select-none"
              aria-hidden="true"
            >
              ?
            </span>
            <div className="mt-4 flex flex-col items-center gap-2">
              <p className="text-xs tracking-superwide text-bone/40 uppercase group-hover:text-bone/70 transition-colors duration-300">
                Click to draw
              </p>
              <div className="w-8 h-px bg-blood/30 group-hover:w-16 group-hover:bg-blood/60 transition-all duration-500" />
            </div>
          </motion.div>
        )}

        {/* State 2 — Shuffling */}
        {isDrawing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 overflow-hidden shadow-2xl"
          >
            <Image
              src={prizeCards[shuffleIndex].image}
              alt="Shuffling..."
              fill
              unoptimized
              className="object-cover blur-sm brightness-125 saturate-0 contrast-125"
            />
            <div className="absolute inset-0 bg-blood/15 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        )}

        {/* State 3 — Reveal */}
        <AnimatePresence>
          {drawnCard && !isDrawing && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ type: 'spring', damping: 18, stiffness: 120 }}
              className="absolute inset-0 overflow-hidden shadow-[0_0_80px_rgba(139,30,30,0.35)] border border-blood/50"
            >
              <Image
                src={drawnCard.image}
                alt={drawnCard.title}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Result + CTA */}
      <AnimatePresence>
        {drawnCard && !isDrawing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col items-center gap-3 mt-8 z-10"
          >
            {/* Reward badge */}
            <div className="flex items-center gap-3 bg-blood/20 border border-blood/40 px-6 py-2.5 backdrop-blur-md shadow-lg shadow-blood/10">
              <div className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse" />
              <span className="text-xs tracking-superwide text-bone font-bold uppercase">
                {drawnCard.reward}
              </span>
            </div>

            {drawnCard.terms && (
              <p className="text-[10px] text-bone/30 tracking-wider max-w-xs text-center">
                *{drawnCard.terms}
              </p>
            )}

            <button
              onClick={startDraw}
              className="mt-4 text-xs tracking-superwide text-bone/40 hover:text-amber border border-bone/10 hover:border-amber/40 px-8 py-3 transition-all duration-300 uppercase"
            >
              Draw Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
