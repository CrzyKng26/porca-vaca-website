'use client'

import React from 'react'
import { restaurant } from '@/data/restaurant'

export default function Footer() {
  return (
    <footer className="w-full bg-obsidian pt-24 pb-12 px-6 md:px-12 border-t border-bone/5 flex flex-col items-center text-center">
      
      {/* Brand */}
      <h2 className="font-display text-4xl text-bone mb-4">
        PORCA <span className="italic text-bone/60">&</span> VACA
      </h2>
      <p className="text-label tracking-superwide text-bone/40 mb-16">
        ALWARPET / CHENNAI
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full max-w-4xl mb-24">
        
        {/* Address */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest text-bone/30 mb-2">Address</span>
          <p className="text-body-sm text-bone/60 leading-relaxed">
            {restaurant.address.street}<br />
            {restaurant.address.area}<br />
            {restaurant.address.locality}, {restaurant.address.city}
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-widest text-bone/30 mb-2">Contact</span>
          <p className="text-body-sm text-bone/60 leading-relaxed mb-4">
            {restaurant.phone}
          </p>
          <a href={restaurant.instagramUrl} target="_blank" rel="noreferrer" className="text-label tracking-widest text-bone/80 hover:text-bone transition-colors">
            INSTAGRAM
          </a>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <span className="text-[10px] uppercase tracking-widest text-bone/30 mb-1">Explore</span>
          <a href="#menu" className="text-label tracking-widest text-bone/60 hover:text-bone transition-colors">MENU</a>
          <a href="#reservation" className="text-label tracking-widest text-bone/60 hover:text-bone transition-colors">BOOK</a>
          <a href="#reservation" className="text-label tracking-widest text-bone/60 hover:text-bone transition-colors">ORDER</a>
          <a href={restaurant.mapUrl} target="_blank" rel="noreferrer" className="text-label tracking-widest text-bone/60 hover:text-bone transition-colors">DIRECTIONS</a>
        </div>

      </div>

      {/* Copyright */}
      <div className="w-full max-w-[1440px] flex justify-between items-center border-t border-bone/5 pt-8 text-[10px] uppercase tracking-widest text-bone/20">
        <span>© {new Date().getFullYear()} Porca & Vaca</span>
        <span>All rights reserved.</span>
      </div>

    </footer>
  )
}
