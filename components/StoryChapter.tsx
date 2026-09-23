'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StoryChapter() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} id="story" className="relative z-20 w-full bg-bone py-24 md:py-40 px-6 md:px-12 flex flex-col items-center justify-center border-t border-obsidian/10">
      <div className="max-w-[1440px] w-full grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <div className="md:col-span-8 flex flex-col justify-center">
          <motion.h2 
            style={{ y }}
            className="font-display text-display-md text-obsidian leading-[0.9] uppercase tracking-tighter mb-8"
          >
            IT STARTED<br />WITH A GRILL.<br />
            <span className="text-obsidian/60 italic font-light">THEN CAME THE OBSESSION.</span>
          </motion.h2>
          <motion.p style={{ y }} className="text-body-lg text-obsidian/80 max-w-2xl leading-relaxed font-light">
            Porca & Vaca was born from one straightforward conviction: that pork and beef, done right, are among the most satisfying things you can eat. The name says it all — <span className="font-bold">Porca</span> (pig) and <span className="font-bold">Vaca</span> (cow). Two animals. Endless possibilities. Every plate here is built for people who take their flavour seriously.
          </motion.p>
        </div>

        <div className="md:col-span-4 flex flex-col gap-12 border-l border-obsidian/20 pl-8 justify-center">
          <div>
             <span className="text-label text-oxblood font-bold tracking-widest uppercase block mb-2">01 / GENESIS</span>
             <p className="text-obsidian font-display text-2xl uppercase">Alwarpet, Chennai</p>
          </div>
          <div>
             <span className="text-label text-oxblood font-bold tracking-widest uppercase block mb-2">02 / FOCUS</span>
             <p className="text-obsidian font-display text-2xl uppercase">Pure Meat & Fire</p>
          </div>
          <div>
             <span className="text-label text-oxblood font-bold tracking-widest uppercase block mb-2">03 / PROMISE</span>
             <p className="text-obsidian font-display text-2xl uppercase">No shortcuts</p>
          </div>
        </div>
      </div>
    </section>
  )
}
