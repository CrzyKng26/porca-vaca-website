'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMafia } from './MafiaContext'

export default function MafiaEventsStory() {
  const { storyEvents } = useMafia()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  
  const STORY_DURATION = 5000; // 5 seconds per story

  const nextStory = useCallback(() => {
    if (currentIndex < storyEvents.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setProgress(0)
    } else {
      // Reached the end, maybe reset or loop? Let's stay on last for now or loop.
      setCurrentIndex(0)
      setProgress(0)
    }
  }, [currentIndex, storyEvents.length])

  const prevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setProgress(0)
    }
  }

  useEffect(() => {
    if (storyEvents.length === 0) return;
    
    let animationFrameId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (!isPaused) {
        const newProgress = (elapsed / STORY_DURATION) * 100;
        
        if (newProgress >= 100) {
          nextStory();
        } else {
          setProgress(newProgress);
        }
      } else {
        // if paused, we need to shift the start time so it doesn't jump when unpaused
        startTime = timestamp - (progress / 100) * STORY_DURATION;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [currentIndex, isPaused, nextStory, progress, storyEvents.length])

  if (storyEvents.length === 0) {
    return null;
  }

  const currentEvent = storyEvents[currentIndex];

  return (
    <div className="relative w-full h-full max-w-lg mx-auto bg-obsidian rounded-xl overflow-hidden shadow-2xl">
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 w-full z-20 flex gap-1 p-4 bg-gradient-to-b from-black/60 to-transparent">
        {storyEvents.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-white transition-all duration-75 ease-linear"
              style={{ 
                width: idx === currentIndex ? `${progress}%` : (idx < currentIndex ? '100%' : '0%') 
              }}
            />
          </div>
        ))}
      </div>

      {/* Interactive Overlay (Tap left to go back, Tap right to go forward, hold to pause) */}
      <div 
        className="absolute inset-0 z-10 flex"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="w-1/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); prevStory(); }} />
        <div className="w-2/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); nextStory(); }} />
      </div>

      {/* Story Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-[600px] md:h-[700px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={currentEvent.image_url || 'https://images.unsplash.com/photo-1544025162-811114b03cc1?q=60&w=800&auto=format&fit=crop'} 
            alt={currentEvent.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 text-left z-20 pointer-events-none">
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-display text-3xl md:text-4xl text-bone mb-3"
            >
              {currentEvent.title}
            </motion.h3>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-sans text-bone/80 text-sm md:text-base leading-relaxed"
            >
              {currentEvent.description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
