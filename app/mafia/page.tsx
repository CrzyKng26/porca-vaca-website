import React from 'react'
import Link from 'next/link'
import MafiaLuckyDraw from '@/components/mafia/MafiaLuckyDraw'
import MafiaReels from '@/components/mafia/MafiaReels'
import MafiaEventsStory from '@/components/mafia/MafiaEventsStory'
export default function MafiaPage() {
  return (
    <main className="min-h-screen bg-[#0D0B0A] text-bone flex flex-col relative overflow-hidden">

      {/* Fixed ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(139,30,30,0.14)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(201,125,62,0.06)_0%,transparent_70%)]" />
      </div>

      {/* Nav */}
      <nav className="relative z-50 w-full px-6 md:px-12 py-6 flex justify-between items-center border-b border-white/5">
        <Link href="/" className="font-display text-2xl tracking-tighter hover:text-amber transition-colors duration-300">
          PORCA & VACA.
        </Link>
        <div className="flex items-center gap-6">
          <span className="hidden md:block text-xs tracking-superwide text-bone/30 uppercase">The Inner Circle</span>
          <Link
            href="/"
            className="text-xs tracking-superwide text-bone/50 hover:text-amber transition-colors duration-300 flex items-center gap-2"
          >
            <span className="w-4 h-px bg-current" />
            BACK TO HOUSE
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-24 pb-16 px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-blood/60" />
          <span className="text-xs tracking-superwide text-blood/80 uppercase font-bold">Members Only</span>
          <div className="w-8 h-px bg-blood/60" />
        </div>

        <h1 className="font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] tracking-tight text-bone mb-6">
          THE<br />
          <span className="text-blood drop-shadow-[0_0_40px_rgba(139,30,30,0.6)]">MEAT</span><br />
          MAFIA
        </h1>

        <p className="text-body text-bone/50 max-w-md mx-auto leading-relaxed mt-6">
          Welcome to the inner circle. Come hungry, let the cards decide your fate,
          and walk away with something worth talking about.
        </p>

        <div className="flex items-center gap-3 mt-10">
          <div className="w-16 h-px bg-bone/10" />
          <span className="text-xs tracking-superwide text-bone/20 uppercase">Draw Your Card Below</span>
          <div className="w-16 h-px bg-bone/10" />
        </div>
      </section>

      {/* Story Events */}
      <section className="relative z-10 w-full flex justify-center px-4 mt-12 mb-24">
        <MafiaEventsStory />
      </section>

      {/* Lucky Draw */}
      <section className="relative z-10 w-full pb-8">
        <MafiaLuckyDraw />
      </section>

      {/* Divider */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 my-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blood/30 to-transparent" />
      </div>

      {/* Reels */}
      <section className="relative z-10">
        <MafiaReels />
      </section>

      {/* Footer cta */}
      <div className="relative z-10 w-full text-center py-20 px-6 border-t border-white/5">
        <p className="text-xs tracking-superwide text-bone/20 uppercase mb-6">Part of the house</p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-sm tracking-widest text-bone/40 hover:text-amber transition-colors duration-500"
        >
          <span className="w-6 h-px bg-current transition-all group-hover:w-12" />
          RETURN TO PORCA & VACA
          <span className="w-6 h-px bg-current" />
        </Link>
      </div>

    </main>
  )
}
