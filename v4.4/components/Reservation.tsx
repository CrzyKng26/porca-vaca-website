'use client'

import React, { useState } from 'react'

interface ResState {
  name: string
  phone: string
  date: string
  time: string
  guests: string
  occasion: string
  note: string
}

export default function Reservation() {
  const [res, setRes] = useState<ResState>({
    name: '',
    phone: '',
    date: '',
    time: '19:30',
    guests: '2 Guests',
    occasion: 'Dinner',
    note: '',
  })

  const buildWhatsAppLink = () => {
    const msg =
      `Hi Porca & Vaca — I'd like to reserve a table.%0A%0A` +
      `Name: ${res.name}%0A` +
      `Phone: ${res.phone}%0A` +
      `Date: ${res.date}%0A` +
      `Time: ${res.time}%0A` +
      `Guests: ${res.guests}%0A` +
      `Occasion: ${res.occasion}%0A` +
      (res.note ? `Note: ${res.note}%0A` : '') +
      `%0A— Sent from porcanvaca.netlify.app`
    return `https://wa.me/919940024442?text=${msg}`
  }

  const update = (field: keyof ResState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setRes(r => ({ ...r, [field]: e.target.value }))

  const inputClass =
    'h-12 px-4 bg-obsidian border border-bone/15 text-bone text-body-sm outline-none focus:border-bone/50 transition-colors duration-300 placeholder:text-bone/30 w-full'
  const selectClass =
    'h-12 px-4 bg-obsidian border border-bone/15 text-bone text-body-sm outline-none focus:border-bone/50 transition-colors duration-300 w-full cursor-pointer'

  return (
    <section id="reservation" className="relative w-full bg-charcoal border-t border-bone/10">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-[1.05fr_0.95fr]">

        {/* LEFT — Cinematic Image Panel */}
        <div className="relative h-[55vh] lg:h-auto min-h-[600px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=85&w=1400&auto=format&fit=crop"
            alt="Porca & Vaca table"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="inline-flex border border-bone/20 px-3 py-1.5 text-label tracking-widest uppercase text-bone/70 mb-6">
              Limited Seating Each Evening — 32 covers
            </div>
            <h3 className="font-display text-display-sm md:text-display-md text-bone leading-[0.85]">
              YOUR TABLE<br />
              <span className="italic font-light text-bone/70">IS WAITING.</span>
            </h3>
            <div className="mt-6 flex gap-4 text-label tracking-widest uppercase text-bone/40">
              <span>Alwarpet Chapter</span>
              <span>·</span>
              <span>Open Daily 12PM – 11PM</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Form Panel */}
        <div className="px-8 md:px-12 lg:px-14 py-16 lg:py-20 bg-bone text-pitch flex flex-col">
          
          <span className="text-label tracking-widest uppercase text-pitch/50 mb-4">
            Reserve via WhatsApp — Real System
          </span>
          <h4 className="font-display text-4xl md:text-5xl leading-tight mb-3 text-pitch">
            Book your fire.
          </h4>
          <p className="text-body-sm text-pitch/60 max-w-[40ch] mb-10 leading-relaxed">
            Fill your details below. We pre-fill a WhatsApp message with everything. No form spam — direct to <span className="text-pitch font-medium">+91 99400 24442</span>.
          </p>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
            <input
              value={res.name}
              onChange={update('name')}
              placeholder="Full name"
              className="h-12 px-4 bg-white border border-pitch/15 text-pitch text-body-sm outline-none focus:border-pitch/50 transition-colors duration-300 placeholder:text-pitch/30 w-full"
            />
            <input
              value={res.phone}
              onChange={update('phone')}
              placeholder="WhatsApp / Phone"
              type="tel"
              className="h-12 px-4 bg-white border border-pitch/15 text-pitch text-body-sm outline-none focus:border-pitch/50 transition-colors duration-300 placeholder:text-pitch/30 w-full"
            />
            <input
              type="date"
              value={res.date}
              onChange={update('date')}
              className="h-12 px-4 bg-white border border-pitch/15 text-pitch text-body-sm outline-none focus:border-pitch/50 transition-colors duration-300 w-full"
            />
            <input
              type="time"
              value={res.time}
              onChange={update('time')}
              className="h-12 px-4 bg-white border border-pitch/15 text-pitch text-body-sm outline-none focus:border-pitch/50 transition-colors duration-300 w-full"
            />
            <select
              value={res.guests}
              onChange={update('guests')}
              className="h-12 px-4 bg-white border border-pitch/15 text-pitch text-body-sm outline-none focus:border-pitch/50 transition-colors duration-300 w-full cursor-pointer"
            >
              {['1 Guest','2 Guests','3 Guests','4 Guests','5 Guests','6 Guests','7+ Guests'].map(g => (
                <option key={g}>{g}</option>
              ))}
            </select>
            <select
              value={res.occasion}
              onChange={update('occasion')}
              className="h-12 px-4 bg-white border border-pitch/15 text-pitch text-body-sm outline-none focus:border-pitch/50 transition-colors duration-300 w-full cursor-pointer"
            >
              {['Dinner','Lunch','Date Night','Birthday','Business Lunch'].map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <textarea
              value={res.note}
              onChange={update('note')}
              placeholder="Anything we should know? Allergies, high chair?"
              rows={3}
              className="sm:col-span-2 px-4 py-3 bg-white border border-pitch/15 text-pitch text-body-sm outline-none focus:border-pitch/50 transition-colors duration-300 placeholder:text-pitch/30 resize-none w-full"
            />
          </div>

          {/* CTA */}
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 h-14 bg-pitch text-bone text-label tracking-widest uppercase font-bold inline-flex items-center justify-center gap-3 hover:bg-ember transition-colors duration-500"
          >
            Reserve via WhatsApp
            <span className="text-base">→</span>
            <span className="text-[10px] opacity-60 ml-1">{res.guests} · {res.time}</span>
          </a>

          {/* Secondary CTAs */}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href="tel:+918190005040"
              className="h-11 border border-pitch/20 text-label tracking-widest uppercase inline-flex items-center justify-center hover:border-pitch transition-colors duration-300 text-pitch"
            >
              Call Us
            </a>
            <a
              href="https://www.google.com/maps/search/Porca+and+Vaca+Alwarpet+Chennai/@13.0334,80.2518,15z"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 border border-pitch/20 text-label tracking-widest uppercase inline-flex items-center justify-center hover:border-pitch transition-colors duration-300 text-pitch"
            >
              Get Directions
            </a>
          </div>

          {/* Info grid */}
          <div className="mt-10 border-t border-pitch/10 pt-8 grid grid-cols-3 gap-6">
            <div>
              <div className="text-label tracking-widest uppercase text-pitch/50 mb-2">Hours</div>
              <div className="text-body-sm text-pitch/80 leading-relaxed">12PM – 3:30PM<br />7PM – 11PM<br />Daily</div>
            </div>
            <div>
              <div className="text-label tracking-widest uppercase text-pitch/50 mb-2">Seating</div>
              <div className="text-body-sm text-pitch/80 leading-relaxed">32 covers</div>
            </div>
            <div>
              <div className="text-label tracking-widest uppercase text-pitch/50 mb-2">Location</div>
              <div className="text-body-sm text-pitch/80 leading-relaxed">42, Sriram Colony<br />Alwarpet<br />Chennai</div>
            </div>
          </div>

          {/* Disclaimer bar */}
          <div className="mt-6 px-4 py-3 bg-pitch text-bone text-[10px] leading-relaxed tracking-wider">
            WhatsApp: +91 99400 24442 · This builder pre-fills your message. No data stored — direct to us.
          </div>

        </div>
      </div>
    </section>
  )
}
