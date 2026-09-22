'use client'

import React from 'react'
import { restaurant } from '@/data/restaurant'

export default function AlwarpetChapter() {
  return (
    <section className="w-full bg-obsidian py-16 md:py-48 px-6 md:px-12 relative overflow-hidden border-t border-bone/10">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
        
        {/* Left: Typography & Details */}
        <div className="flex flex-col">
          <span className="text-label tracking-superwide text-oxblood mb-6">LOCATION</span>
          <h2 className="font-display text-display-sm text-bone leading-[0.9] mb-12">
            THE<br />ALWARPET<br /><span className="italic text-bone/60">CHAPTER</span>
          </h2>
          
          <div className="flex flex-col gap-8 max-w-sm">
            <div>
              <p className="text-body-lg text-bone/80 leading-relaxed font-light mb-1">
                42, Sriram Colony<br />
                Bheemanna Garden Street<br />
                Alwarpet, Chennai
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <a href={restaurant.mapUrl} target="_blank" rel="noreferrer" className="text-label tracking-widest text-bone border-b border-bone/20 pb-1 w-fit hover:border-bone transition-colors">
                GET DIRECTIONS
              </a>
              <a href={`tel:${restaurant.phoneRaw}`} className="text-label tracking-widest text-bone border-b border-bone/20 pb-1 w-fit hover:border-bone transition-colors">
                CALL {restaurant.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Right: Map / Visual Element */}
        <div className="relative w-full aspect-square md:aspect-[4/3] bg-obsidian border border-white/5 p-4 img-zoom-wrap">
          <iframe
            src={restaurant.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(120%) hue-rotate(180deg) opacity(0.8)' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover mix-blend-luminosity"
          />
        </div>
      </div>
    </section>
  )
}

