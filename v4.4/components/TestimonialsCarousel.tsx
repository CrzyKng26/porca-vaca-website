'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    quote: "The 60-day dry-aged ribeye was unlike anything I've had in Chennai. Period.",
    author: "Vikram R.",
    role: "Food Critic, Bangalore"
  },
  {
    quote: "Brisket so good I almost missed my flight back to Bombay. Almost.",
    author: "Ananya S.",
    role: "Regular, Mumbai"
  },
  {
    quote: "The Meat Mafia membership is the best free thing I've ever signed up for.",
    author: "Rajan K.",
    role: "Member #019, Chennai"
  },
  {
    quote: "They refused to serve my steak well-done. I argued. I was wrong. I respect that.",
    author: "Priya M.",
    role: "Convert, Chennai"
  },
  {
    quote: "The Pit Calculator on the website made me plan my visit three days in advance. Worth every minute.",
    author: "Arjun D.",
    role: "First Visit, Hyderabad"
  },
  {
    quote: "12-hour smoked brisket at midnight pickup. The pitmaster waved from the kitchen. Peak Chennai.",
    author: "Saanvi T.",
    role: "Mafia Member, Alwarpet"
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const goTo = useCallback((idx: number, dir: 1 | -1) => {
    setDirection(dir)
    setCurrent(idx)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length, -1)
  }, [current, goTo])

  useEffect(() => {
    const id = setInterval(next, 6000)
    return () => clearInterval(id)
  }, [next])

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
  }

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x
    if (swipe < -50) {
      next()
    } else if (swipe > 50) {
      prev()
    }
  }

  return (
    <section className="relative w-full bg-obsidian py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/5 blur-[180px] rounded-full pointer-events-none" />

      {/* Decorative marks */}
      <div className="absolute top-10 left-10 w-12 h-12 border-t border-l border-ember/20 pointer-events-none" />
      <div className="absolute top-10 right-10 w-12 h-12 border-t border-r border-ember/20 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-ember/20 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-ember/20 pointer-events-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-8 flex flex-col items-center">

        {/* Kicker */}
        <span className="text-label tracking-widest uppercase text-ember mb-12">
          What the Mafia Says
        </span>

        {/* Quote area */}
        <div className="relative w-full min-h-[220px] flex items-center justify-center">
          {/* Open quote mark */}
          <div className="absolute -top-6 left-0 font-display text-[8rem] leading-none text-bone/5 select-none pointer-events-none">
            "
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="text-center w-full cursor-grab active:cursor-grabbing"
            >
              <blockquote className="font-display text-2xl md:text-4xl lg:text-5xl text-bone leading-[1.1] italic tracking-tight max-w-[800px] mx-auto pointer-events-none">
                "{testimonials[current].quote}"
              </blockquote>
              <div className="mt-8 flex flex-col items-center gap-1 pointer-events-none">
                <div className="w-8 h-[1px] bg-ember mb-4" />
                <span className="text-body-sm text-bone font-medium">{testimonials[current].author}</span>
                <span className="text-label tracking-widest uppercase text-bone/40">{testimonials[current].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-16 flex items-center gap-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-12 h-12 border border-bone/20 flex items-center justify-center text-bone/50 hover:border-bone hover:text-bone transition-all duration-300"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`transition-all duration-500 ${
                  i === current
                    ? 'w-8 h-[3px] bg-ember'
                    : 'w-3 h-[3px] bg-bone/20 hover:bg-bone/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-12 h-12 border border-bone/20 flex items-center justify-center text-bone/50 hover:border-bone hover:text-bone transition-all duration-300"
          >
            →
          </button>
        </div>

        {/* Attribution note */}
        <p className="mt-12 text-label tracking-widest uppercase text-bone/20">
          {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')} — Real guests. Honest opinions.
        </p>
      </div>
    </section>
  )
}
