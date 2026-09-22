'use client'

import React from 'react'
import Image from 'next/image'

export default function FireSection() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-oxblood">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=85&w=1920&auto=format&fit=crop"
          alt="The Fire in the open kitchen"
          fill
          className="object-cover object-center opacity-40 mix-blend-multiply filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-oxblood via-transparent to-oxblood opacity-50" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <h2 className="font-display text-display-huge text-bone leading-[0.8] mb-8 mix-blend-overlay">
          THE<br />
          <span className="italic">FIRE.</span>
        </h2>
        <div className="w-px h-16 bg-bone/50 mb-8" />
        <p className="text-label-lg tracking-superwide text-bone font-bold uppercase">
          NEVER GOES OUT
        </p>
      </div>
    </section>
  )
}
