'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function TheHouse() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [130, -130])

  return (
    <section ref={ref} id="house" className="relative w-full bg-bone py-16 md:py-48 px-6 md:px-12 border-t border-obsidian/10 overflow-hidden">
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          style={{ y }}
          initial={{ opacity: 0, filter: 'blur(10px) brightness(2)', scale: 0.9 }}
          whileInView={{ opacity: 1, filter: 'blur(0px) brightness(1)', scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-24 md:mb-40"
        >
          <span className="text-label tracking-superwide text-oxblood font-bold mb-6">ALWARPET</span>
          <h2 className="font-display text-display-md text-obsidian leading-[0.9] uppercase tracking-tighter">
            THE<br />
            <span className="italic text-obsidian/60 font-light">HOUSE</span>
          </h2>
        </motion.div>

        {/* Editorial Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Main Large Image (Interior) */}
          <div className="md:col-span-8 relative aspect-video md:aspect-[16/10] overflow-hidden group">
            <Image
              src="/house/interior.png"
              alt="Porca & Vaca Interior"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </div>

          {/* Round Sign */}
          <div className="md:col-span-4 relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden group">
            <Image
              src="/house/sign_round.png"
              alt="Deliciously Different Sign"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </div>

          {/* Straight Sign */}
          <div className="md:col-span-4 relative aspect-[4/5] overflow-hidden group">
            <Image
              src="/house/sign_straight.png"
              alt="Porca & Vaca Exterior Sign"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </div>

          {/* Rib */}
          <div className="md:col-span-4 relative aspect-[4/5] overflow-hidden group">
            <Image
              src="/house/rib.png"
              alt="Beef Lovers Must Try"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </div>

          {/* Lights */}
          <div className="md:col-span-4 relative aspect-[4/5] overflow-hidden group">
            <Image
              src="/house/lights.png"
              alt="One visit isn't enough"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </div>

          {/* Text Block */}
          <div className="md:col-span-12 md:col-start-3 md:col-end-11 text-center mt-12 md:mt-24">
            <p className="text-body-lg text-obsidian/80 font-light leading-relaxed">
              This is a place to stay. Warm amber illumination, charcoal surfaces, and the sound of the open kitchen. We built the house to reflect what's on the plate — zero pretense, total focus.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

