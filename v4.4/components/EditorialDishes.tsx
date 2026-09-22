'use client'

import React from 'react'
import Image from 'next/image'

export default function EditorialDishes() {
  return (
    <section id="menu-highlights" className="w-full bg-obsidian py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-24 md:gap-40">

        {/* Spread 01: Vaca / Brisket (Medium-large feature) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-6 relative w-full aspect-[4/3] img-zoom-wrap">
            <Image
              src="https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=85&w=1000&auto=format&fit=crop"
              alt="Wood-Smoked Beef Brisket"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-4 md:col-start-8 flex flex-col pb-4">
            <span className="text-label text-oxblood tracking-widest mb-3">01 / VACA</span>
            <h3 className="font-display text-4xl md:text-5xl text-bone leading-[0.9] mb-4">
              THE BRISKET
            </h3>
            <p className="text-body-sm text-bone/60 max-w-xs leading-relaxed">
              Twelve hours. Low heat. Serious patience. The kind of tenderness that rewrites expectations.
            </p>
          </div>
        </div>

        {/* Spread 02: Porca / Ribs (Smaller supporting feature, offset right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 md:col-start-3 flex flex-col pt-8 md:pt-16 order-2 md:order-1">
            <span className="text-label text-oxblood tracking-widest mb-3">02 / PORCA</span>
            <h3 className="font-display text-4xl md:text-5xl text-bone leading-[0.9] mb-4">
              BABY BACK<br /><span className="italic text-bone/60">RIBS</span>
            </h3>
            <p className="text-body-sm text-bone/60 max-w-xs leading-relaxed">
              Dry-rubbed. Slow-smoked. Glazed with house BBQ.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-8 relative w-full aspect-[3/4] img-zoom-wrap order-1 md:order-2">
            <Image
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=800&auto=format&fit=crop"
              alt="Baby Back Ribs"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Spread 03: House / Burger (Offset left, medium size) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 md:col-start-2 relative w-full aspect-square img-zoom-wrap">
            <Image
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=85&w=1000&auto=format&fit=crop"
              alt="The P&V Smash Burger"
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-4 md:col-start-8">
            <span className="text-label text-oxblood tracking-widest mb-3 block">03 / HOUSE</span>
            <h3 className="font-display text-4xl md:text-5xl text-bone leading-[0.9] mb-4">
              THE SMASH
            </h3>
            <p className="text-body-sm text-bone/60 max-w-xs leading-relaxed">
              Double smash patty, house cheese, caramelised onion. The reason regulars return.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
