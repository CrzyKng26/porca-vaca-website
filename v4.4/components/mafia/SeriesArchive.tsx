'use client'

import React from 'react'

export default function SeriesArchive() {
  const archiveItems = [
    { num: '01', title: 'BRISKET' },
    { num: '02', title: 'RIBS' },
    { num: '03', title: 'BURGER' },
    { num: '04', title: 'STEAK' },
    { num: '05', title: 'PORK' },
    { num: '06', title: 'FIRE' },
  ]

  return (
    <section className="relative w-full bg-obsidian py-32 px-6 md:px-12 flex flex-col items-center">
      <h2 className="text-label tracking-superwide text-bone/40 mb-16 text-center">
        THE SERIES
      </h2>

      <div className="flex flex-col gap-6 md:gap-8 w-full max-w-2xl">
        {archiveItems.map((item) => (
          <div 
            key={item.num} 
            className="group flex items-baseline gap-6 md:gap-12 cursor-pointer border-b border-white/5 pb-6 hover:border-white/20 transition-colors duration-500"
          >
            <span className="text-body-sm text-bone/30 font-medium group-hover:text-oxblood transition-colors duration-300">
              {item.num}
            </span>
            <h3 className="font-display text-4xl md:text-5xl text-bone/80 group-hover:text-bone transition-colors duration-300">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}
