'use client'

import React from 'react'
import Image from 'next/image'

export default function PorcaVacaSplit() {
  return (
    <section className="relative w-full h-[150vh] md:h-[100dvh] flex flex-col md:flex-row bg-charcoal overflow-hidden">
      
      {/* PORCA (Left / Top) */}
      <div className="group relative w-full md:w-1/2 h-1/2 md:h-full flex-1 overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-obsidian">
        {/* Background */}
        <div className="absolute inset-0 z-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105">
          <Image
            src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=85&w=1200&auto=format&fit=crop"
            alt="Pork dish preparation"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-1000"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center p-8">
          <span className="text-label tracking-widest text-bone/50 mb-4 transition-colors duration-500 group-hover:text-bone/80">
            THE PIG
          </span>
          <h2 className="font-display text-display-md text-bone leading-none">
            PORCA
          </h2>
        </div>
      </div>

      {/* VACA (Right / Bottom) */}
      <div className="group relative w-full md:w-1/2 h-1/2 md:h-full flex-1 overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 z-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105">
          <Image
            src="https://images.unsplash.com/photo-1558030006-450675393462?q=85&w=1200&auto=format&fit=crop"
            alt="Beef steak preparation"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-1000"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent z-10" />

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center text-center p-8">
          <span className="text-label tracking-widest text-bone/50 mb-4 transition-colors duration-500 group-hover:text-bone/80">
            THE COW
          </span>
          <h2 className="font-display text-display-md text-bone leading-none italic">
            VACA
          </h2>
        </div>
      </div>

    </section>
  )
}
