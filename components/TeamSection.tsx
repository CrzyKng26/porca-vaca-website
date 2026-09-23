'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TeamMember } from '@/data/team'

export default function TeamSection({ initialTeam }: { initialTeam: TeamMember[] }) {
  const team = initialTeam || []
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [130, -130])

  return (
    <section ref={ref} id="team" className="w-full bg-cream text-pitch py-24">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Header */}
        <motion.div style={{ y }} className="flex flex-col gap-4">
          <span className="text-label tracking-widest text-amber uppercase">
            THE PEOPLE BEHIND PORCA & VACA.
          </span>
          <h2 className="font-display text-display-md leading-none max-w-2xl">
            Meet the syndicate.
          </h2>
          <p className="text-body-lg text-pitch/70 font-light mt-2">
            One kitchen, many hands – the people who bring the fire to life.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="flex flex-col gap-4">
              <div className="relative w-full aspect-square overflow-hidden bg-coal">
                <Image
                  src={member.image_url}
                  alt={member.role}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-label-lg tracking-widest text-amber uppercase font-bold">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

