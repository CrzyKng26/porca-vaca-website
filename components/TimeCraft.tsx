'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const agingStages = [
  {
    days: 0,
    title: 'FRESH CUT',
    moisture: '100%',
    flavor: 'Mild & Metallic',
    description: 'Bright cherry red. The meat is tender but lacks the deep, concentrated beef flavor that only time can develop.',
    color: '#ef233c' // Vivid red
  },
  {
    days: 14,
    title: 'THE BREAKDOWN',
    moisture: '88%',
    flavor: 'Developing Umami',
    description: 'Enzymes have begun breaking down muscle fibers. The meat is noticeably more tender, and the flavor profile is starting to transition from metallic to savory.',
    color: '#8a2be2' // Deep purple
  },
  {
    days: 30,
    title: 'THE SWEET SPOT',
    moisture: '82%',
    flavor: 'Nutty & Earthy',
    description: 'The industry gold standard. A perfect balance of supreme tenderness and intense, roasted-nut beefiness. The fat has transformed, taking on a creamy texture.',
    color: '#f77f00' // Amber/Orange
  },
  {
    days: 45,
    title: 'THE FUNK',
    moisture: '75%',
    flavor: 'Blue Cheese & Mushroom',
    description: 'For the aficionado. The crust is thick and hard, while the interior has developed distinct funky, fermented notes reminiscent of aged cheese or truffles.',
    color: '#386641' // Deep earthy green
  },
  {
    days: 60,
    title: 'THE RESERVE',
    moisture: '68%',
    flavor: 'Pure Concentration',
    description: 'Extreme intensity. Moisture loss is severe, resulting in a wildly concentrated, highly savory profile. A rare, challenging, and profoundly rewarding experience.',
    color: '#d4af37' // Gold
  }
]

export default function TimeCraft() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  })
  const { scrollYProgress: parallaxProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(parallaxProgress, [0, 1], [70, -70]);

  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Map 0-1 progress to 0-4 index
      const steps = agingStages.length
      const stepSize = 1 / steps
      const newIdx = Math.min(
        Math.floor(latest / stepSize),
        steps - 1
      )
      setActiveIdx(newIdx)
    })
  }, [scrollYProgress])

  const stage = agingStages[activeIdx]

  const bgOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.04, 0.06, 0.06, 0.04])

  return (
    <>
      {/* --- DESKTOP LAYOUT (Cinematic Scroll) --- */}
      <div
        ref={sectionRef}
        style={{ height: `${agingStages.length * 100}vh` }}
        className="relative hidden md:block"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian flex flex-col items-center justify-center">

          {/* Ghost day-number watermark */}
          <motion.span
            key={stage.days}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="absolute font-display text-[28vw] leading-none pointer-events-none select-none"
            style={{ opacity: bgOpacity, color: stage.color }}
            aria-hidden="true"
          >
            {stage.days}
          </motion.span>

          {/* Per-stage radial glow */}
          <motion.div
            key={`glow-${stage.days}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 80% 50%, ${stage.color}18 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />

          {/* Side timeline strip */}
          <div className="absolute left-14 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            {agingStages.map((s, idx) => (
              <div key={s.days} className="flex items-center gap-3">
                <div
                  className="w-1 rounded-full transition-all duration-500"
                  style={{
                    height: idx === activeIdx ? '40px' : '10px',
                    background: idx === activeIdx ? stage.color : 'rgba(255,255,255,0.15)',
                  }}
                />
                <span
                  className="text-xs tracking-widest font-mono transition-all duration-500"
                  style={{
                    color: idx === activeIdx ? stage.color : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {s.days}D
                </span>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
            animate={{ opacity: activeIdx === 0 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs tracking-superwide text-bone/40 uppercase">Scroll to age</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8 bg-bone/20"
            />
          </motion.div>

          {/* Main content */}
          <div className="relative z-10 w-full max-w-[1300px] px-12 flex flex-row gap-16 items-center">

            {/* Left: stage list */}
            <div className="w-[38%] flex flex-col gap-7">
              <div className="mb-20">
                <span className="text-label tracking-superwide text-oxblood font-bold block mb-4">
                  THE DRY AGING PROCESS
                </span>
                <h2 className="font-display text-display-sm text-bone leading-[0.9]">
                  TIME DOES<br />
                  <span className="italic text-bone/50">THE WORK.</span>
                </h2>
              </div>

              <div className="border-l border-bone/10 pl-6 flex flex-col gap-5">
                {agingStages.map((s, idx) => (
                  <div
                    key={s.days}
                    className="relative transition-all duration-500"
                    style={{ opacity: idx === activeIdx ? 1 : 0.28 }}
                  >
                    {idx === activeIdx && (
                      <motion.div
                        layoutId="stage-indicator"
                        className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-[2px] h-full rounded"
                        style={{ background: stage.color }}
                      />
                    )}
                    <span
                      className="block font-mono text-xs tracking-widest mb-0.5 transition-colors duration-500"
                      style={{ color: idx === activeIdx ? stage.color : 'rgba(255,255,255,0.3)' }}
                    >
                      {s.days} DAYS
                    </span>
                    <h3 className="font-display text-3xl text-bone">{s.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: content card */}
            <div className="w-[62%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage.days}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                  className="bg-charcoal/60 backdrop-blur-sm p-16 border border-white/5 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 w-1 h-full transition-colors duration-700"
                    style={{ background: stage.color }}
                  />
                  <span
                    className="absolute -bottom-8 -right-6 font-display text-[160px] leading-none pointer-events-none select-none"
                    style={{ color: 'rgba(255,255,255,0.03)' }}
                    aria-hidden="true"
                  >
                    {stage.days}
                  </span>

                  <div className="relative z-10">
                    <div className="flex flex-wrap gap-10 mb-12">
                      <div>
                        <span className="block text-label tracking-widest text-bone/40 mb-2">MOISTURE RETENTION</span>
                        <span className="font-mono text-3xl text-bone">{stage.moisture}</span>
                      </div>
                      <div>
                        <span className="block text-label tracking-widest text-bone/40 mb-2">FLAVOR PROFILE</span>
                        <span className="font-mono text-3xl text-bone">{stage.flavor}</span>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-bone/10 mb-12" />

                    <div className="flex gap-1.5 mt-12">
                      {agingStages.map((s, idx) => (
                        <div
                          key={s.days}
                          className="h-[2px] flex-1 rounded-full transition-all duration-700"
                          style={{
                            background: idx <= activeIdx ? stage.color : 'rgba(255,255,255,0.1)',
                            opacity: idx <= activeIdx ? 1 : 0.5,
                          }}
                        />
                      ))}
                    </div>

                    <p className="text-body-lg text-bone/80 font-light leading-relaxed mt-8">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE LAYOUT (Stacked, no scrolljacking) --- */}
      <div className="block md:hidden w-full bg-obsidian py-20 px-6 overflow-hidden">
        <motion.div 
          style={{ y: parallaxY }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[10px] tracking-superwide text-oxblood font-bold block mb-3">
            THE DRY AGING PROCESS
          </span>
          <h2 className="font-display text-4xl text-bone leading-[1]">
            TIME DOES<br />
            <span className="italic text-bone/50">THE WORK.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-12">
          {agingStages.map((s, idx) => (
            <motion.div 
              key={s.days}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="relative"
            >
              {/* Day header */}
              <div className="flex items-center gap-4 mb-4">
                <span 
                  className="font-display text-5xl leading-none" 
                  style={{ color: s.color }}
                >
                  {s.days}
                </span>
                <div>
                  <span className="block text-[10px] tracking-widest font-mono text-bone/50 mb-1">DAYS</span>
                  <h3 className="font-display text-2xl text-bone uppercase tracking-wide">{s.title}</h3>
                </div>
              </div>

              {/* Day Card */}
              <div className="bg-charcoal/80 border border-white/5 p-6 relative overflow-hidden">
                {/* Left accent */}
                <div className="absolute top-0 left-0 w-1 h-full" style={{ background: s.color }} />
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="block text-[9px] tracking-widest text-bone/40 mb-1 uppercase">Moisture</span>
                    <span className="font-mono text-lg text-bone">{s.moisture}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] tracking-widest text-bone/40 mb-1 uppercase">Flavor</span>
                    <span className="font-mono text-lg text-bone">{s.flavor}</span>
                  </div>
                </div>

                <div className="w-full h-px bg-white/5 mb-6" />

                <p className="text-sm text-bone/80 font-light leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
