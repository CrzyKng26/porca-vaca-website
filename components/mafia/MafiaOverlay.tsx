'use client'

import React from 'react'
import { useMafia } from './MafiaContext'
import { motion, AnimatePresence } from 'framer-motion'
import MafiaHero from './MafiaHero'
import MafiaEventsStory from './MafiaEventsStory'
import CardDeck from './CardDeck'
import SeriesArchive from './SeriesArchive'

export default function MafiaOverlay() {
  const { isMafiaActive, exitMafia } = useMafia()

  // Prevent background scrolling when overlay is active
  React.useEffect(() => {
    if (isMafiaActive) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMafiaActive])

  return (
    <AnimatePresence>
      {isMafiaActive && (
        <motion.div
          key="mafia-overlay"
          initial={{ opacity: 0, backgroundColor: 'rgba(17, 16, 15, 0)' }}
          animate={{ opacity: 1, backgroundColor: 'rgba(17, 16, 15, 1)' }}
          exit={{ opacity: 0, backgroundColor: 'rgba(17, 16, 15, 0)' }}
          transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[9990] overflow-y-auto overflow-x-hidden bg-obsidian text-bone"
        >
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            className="relative min-h-screen flex flex-col"
          >
            {/* Fixed Exit Button */}
            <button
              onClick={exitMafia}
              className="fixed top-6 right-6 md:top-12 md:right-12 z-[9999] group flex items-center gap-3 text-label tracking-widest text-bone/60 hover:text-bone transition-colors duration-300"
            >
              <span>CLOSE</span>
              <div className="w-8 h-[1px] bg-bone/30 group-hover:bg-bone transition-colors duration-300" />
            </button>

            <MafiaHero />

            {/* The New Story Events UI */}
            <div className="w-full flex justify-center px-4 mt-12 mb-24">
              <MafiaEventsStory />
            </div>

            <CardDeck />
            <SeriesArchive />

            {/* Exit Control */}
            <div className="mt-32 pb-24 text-center">
              <button
                onClick={exitMafia}
                className="group inline-flex items-center gap-4 text-label-lg tracking-superwide text-bone/50 hover:text-bone transition-colors duration-500"
              >
                <span className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                  ←
                </span>
                RETURN TO PORCA & VACA
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
