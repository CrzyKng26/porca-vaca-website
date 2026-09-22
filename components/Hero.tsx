import React from 'react'
import Link from 'next/link'
import Embers from '@/components/Embers'

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] min-h-[700px] flex flex-col justify-end p-6 md:p-12 overflow-hidden animate-fade-in">
      {/* Background Image - Cinematic Fire/Meat */}
      <div className="absolute inset-0 z-0 bg-charcoal">
        <div className="absolute inset-0 animate-scale-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/house/interior.png"
            alt="Porca & Vaca Alwarpet Fire"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-60"
          />
        </div>
        {/* Soft Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
        {/* Particle System */}
        <Embers />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
        
        {/* Left Side: Typography */}
        <div className="flex flex-col animate-slide-up">
          <p className="text-label tracking-widest text-bone/60 mb-6 uppercase">
            BUILT AROUND MEAT / ALWARPET CHENNAI
          </p>
          <h1 className="font-display text-display-lg leading-[0.85] text-bone">
            PORCA<br />
            &<br />
            <span className="italic text-bone/90">VACA.</span>
          </h1>
        </div>

        {/* Right Side: CTAs */}
        <div className="flex flex-col items-start lg:items-end gap-6 animate-fade-in-delayed">
          {/* Mafia Entry (Bold and prominent) */}
          <Link 
            href="/mafia"
            className="w-full lg:w-auto text-center bg-blood hover:bg-amber text-bone px-8 py-3 text-label-lg tracking-superwide transition-colors duration-500 uppercase font-bold animate-pulse"
          >
            JOIN THE MEAT MAFIA ↗
          </Link>

          {/* Main CTAs */}
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
            <a href="#menu" className="w-full lg:w-auto text-center border border-bone/20 hover:border-bone/60 bg-transparent text-bone px-8 py-4 text-label-lg tracking-widest transition-colors duration-500">
              EXPLORE THE MENU
            </a>
            <a href="#reservation" className="w-full lg:w-auto text-center bg-bone hover:bg-bone/90 text-obsidian px-8 py-4 text-label-lg tracking-widest transition-colors duration-500">
              BOOK A TABLE
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
