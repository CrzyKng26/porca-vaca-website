import React from 'react'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl">
      <h2 className="font-display text-4xl mb-8">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-white/10 p-6 rounded-xl bg-white/5">
          <h3 className="font-display text-2xl mb-2 text-amber">Meat Mafia Events</h3>
          <p className="text-bone/60 mb-6 text-sm leading-relaxed">
            Manage your Instagram-style stories, upload new event images, and toggle them on or off.
          </p>
          <Link href="/admin/mafia" className="inline-block border border-bone/30 px-4 py-2 text-xs tracking-widest hover:bg-bone hover:text-obsidian transition-colors">
            MANAGE EVENTS
          </Link>
        </div>
        
        <div className="border border-white/10 p-6 rounded-xl bg-white/5">
          <h3 className="font-display text-2xl mb-2 text-amber">Menu Management</h3>
          <p className="text-bone/60 mb-6 text-sm leading-relaxed">
            Update prices, manage items, and toggle dish availability.
          </p>
          <Link href="/admin/menu" className="inline-block border border-bone/30 px-4 py-2 text-xs tracking-widest hover:bg-bone hover:text-obsidian transition-colors">
            MANAGE MENU
          </Link>
        </div>
        <div className="border border-white/10 p-6 rounded-xl bg-white/5">
          <h3 className="font-display text-2xl mb-2 text-amber">Signature Carousel</h3>
          <p className="text-bone/60 mb-6 text-sm leading-relaxed">
            Manage the swappable signature images on the homepage carousel.
          </p>
          <Link href="/admin/signature" className="inline-block border border-bone/30 px-4 py-2 text-xs tracking-widest hover:bg-bone hover:text-obsidian transition-colors">
            MANAGE IMAGES
          </Link>
        </div>
      </div>
    </div>
  )
}
