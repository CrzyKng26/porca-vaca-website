'use client'

import React from 'react'
import { Play } from 'lucide-react'

const REELS = [
  { id: 1, ep: '01', title: 'The Wagyu Syndicate', tagline: 'Where it all began.' },
  { id: 2, ep: '02', title: 'Trial By Fire', tagline: 'The pit test.' },
  { id: 3, ep: '03', title: 'The Bloodline', tagline: 'Heritage, traced.' },
  { id: 4, ep: '04', title: 'Smoke & Mirrors', tagline: 'Nothing is what it seems.' },
  { id: 5, ep: '05', title: 'The Dry Chamber', tagline: 'Patience as an art form.' },
  { id: 6, ep: '06', title: 'Salt, Fat, Heat', tagline: 'The holy trinity.' },
]

export default function MafiaReels() {
  return (
    <section className="w-full py-20 px-6 md:px-12 relative z-10">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 border border-blood rotate-45 flex-shrink-0" />
              <span className="text-xs tracking-superwide text-blood uppercase font-bold">Instagram Reels</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] text-bone">
              MEAT MAFIA<br />
              <span className="italic text-bone/40">EPISODES</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/porcanvaca2.0"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-xs tracking-superwide text-amber hover:text-white transition-colors duration-300 self-start md:self-auto"
          >
            FOLLOW ON INSTAGRAM
            <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {REELS.map((reel) => (
            <a
              key={reel.id}
              href="https://www.instagram.com/porcanvaca2.0"
              target="_blank"
              rel="noreferrer"
              className="group relative w-full aspect-[9/16] bg-[#1a1614] overflow-hidden border border-white/5 hover:border-blood/40 transition-all duration-500 cursor-pointer"
            >
              {/* Gradient bg standing in for real thumbnail */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,30,30,0.18) 0%, #0D0B0A 100%)`,
                }}
              />

              {/* Episode badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="text-[10px] tracking-superwide text-blood/80 font-bold uppercase">
                  EP. {reel.ep}
                </span>
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-14 h-14 rounded-full bg-blood/20 border border-blood/40 flex items-center justify-center backdrop-blur-md scale-90 group-hover:scale-110 group-hover:bg-blood/40 transition-all duration-500 shadow-[0_0_30px_rgba(139,30,30,0.3)]">
                  <Play fill="currentColor" className="text-bone ml-0.5" size={20} />
                </div>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-sm md:text-base font-display text-bone leading-tight mb-1">{reel.title}</p>
                <p className="text-xs text-bone/40 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {reel.tagline}
                </p>
              </div>

              {/* Hover border glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(139,30,30,0.15)]" />
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-bone/20 tracking-widest mt-10 uppercase">
          New episodes drop every week — follow to stay in the loop
        </p>
      </div>
    </section>
  )
}
