'use client'

import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 animate-fade-in transition-colors duration-700 ${
        scrolled ? 'bg-obsidian/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
        <a href="#" className="font-display text-2xl tracking-wide text-bone">
          PORCA <span className="italic text-bone/60">&</span> VACA
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#menu" className="text-label tracking-widest text-bone/60 hover:text-amber transition-colors">MENU</a>
          <a href="#story" className="text-label tracking-widest text-bone/60 hover:text-amber transition-colors">STORY</a>
          <a href="#cut-compass" className="text-label tracking-widest text-amber hover:text-cream transition-colors">CUT COMPASS</a>
          <a href="#house" className="text-label tracking-widest text-bone/60 hover:text-amber transition-colors">THE HOUSE</a>
          <a href="#reservation" className="text-label tracking-widest text-bone/60 hover:text-amber transition-colors">VISIT</a>
        </nav>

        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/porcanvaca2.0"
            target="_blank"
            rel="noreferrer"
            aria-label="Follow on Instagram"
            className="text-bone/60 hover:text-amber transition-colors duration-300 hidden md:block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="#reservation" className="hidden md:block text-label tracking-widest text-bone border-b border-bone/30 pb-1 hover:border-bone transition-colors">
            BOOK A TABLE
          </a>
        </div>
      </div>
    </header>
  )
}
