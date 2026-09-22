'use client'

import React from 'react'
import Image from 'next/image'

export default function MafiaHero() {
  return (
    <section className="relative w-full h-[100dvh] flex flex-col justify-between p-6 md:p-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mafia-characters.jpg"
          alt="Porca & Vaca Meat Mafia"
          fill
          className="object-cover object-center opacity-40 mix-blend-luminosity"
          priority
        />
        {/* Dark Vignette / Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-obsidian/95" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-start">
        <p className="text-label tracking-superwide text-bone/60">
          A PORCA & VACA SERIES
        </p>
        <p className="text-label tracking-superwide text-bone/60 text-right">
          PRIVATE<br />
          ALWARPET
        </p>
      </div>

      {/* Huge Title */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-display-huge leading-[0.85] text-bone">
          MEAT<br />
          <span className="italic text-oxblood">MAFIA</span>
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <p className="text-label text-bone/40 uppercase tracking-widest">
          Enter The Deck
        </p>
      </div>
    </section>
  )
}
