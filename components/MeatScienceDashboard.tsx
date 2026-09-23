'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CutCompass from './CutCompass'
import FireWoodWidget from './FireWoodWidget'
import DonenessWidget from './DonenessWidget'
import Embers from './Embers'

type TabId = 'calculator' | 'cuts' | 'doneness' | 'fire'

const tabs: { id: TabId; label: string }[] = [
  { id: 'calculator', label: 'PIT CALCULATOR' },
  { id: 'cuts', label: 'CUT COMPASS' },
  { id: 'doneness', label: 'DONENESS' },
  { id: 'fire', label: 'WOOD & FIRE' },
]

const WOODS = [
  { id: 'oak', name: 'White Oak', note: 'Clean, vanilla, long burn.', best: 'Brisket, Ribeye' },
  { id: 'hickory', name: 'Hickory', note: 'Bacon-like, bold.', best: 'Pork Shoulder' },
  { id: 'cherry', name: 'Cherry', note: 'Fruity, mahogany colour.', best: 'Pork Belly' },
  { id: 'mesquite', name: 'Mesquite', note: 'Desert wood. Aggressive.', best: 'Short Ribs' },
]

const MEAT_TYPES = [
  { id: 'brisket', label: 'Brisket' },
  { id: 'ribs', label: 'Ribs' },
  { id: 'belly', label: 'Pork Belly' },
  { id: 'steak', label: 'Steak' },
]

function calcResult(meat: string, weight: number) {
  const base = meat === 'brisket' ? 90 : meat === 'ribs' ? 75 : meat === 'belly' ? 60 : 12
  const totalMins = Math.round(base * weight)
  const hrs = Math.floor(totalMins / 60)
  const mins = totalMins % 60
  const temp = meat === 'brisket' ? '225\u00B0F' : meat === 'steak' ? '800\u00B0F' : '275\u00B0F'
  const woodKg = (weight * 0.6).toFixed(1)
  const rest = meat === 'brisket' ? '60\u201390 min' : meat === 'steak' ? '5 min' : '10 min'
  const serves = Math.ceil(weight / 0.35)
  return { time: hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`, temp, woodKg, rest, serves }
}

function PitCalculator() {
  const [meat, setMeat] = useState('brisket')
  const [weight, setWeight] = useState(1.5)
  const [wood, setWood] = useState('oak')

  const result = calcResult(meat, weight)

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full">

      {/* LEFT: Controls */}
      <div className="bg-smoke border-b lg:border-b-0 lg:border-r border-coal p-6 md:p-8 flex flex-col gap-6">
        <h3 className="font-display text-2xl md:text-3xl text-cream leading-tight">
          Calculate the <span className="text-amber italic">Burn.</span>
        </h3>

        {/* Meat type */}
        <div>
          <p className="text-[10px] tracking-superwide text-cream/30 uppercase mb-3">PHASE ONE — PROTEIN</p>
          <div className="grid grid-cols-4 gap-2">
            {MEAT_TYPES.map(m => (
              <button
                key={m.id}
                onClick={() => setMeat(m.id)}
                className={`flex flex-col items-center justify-center py-4 px-1 border text-center transition-all duration-300 ${
                  meat === m.id
                    ? 'border-amber bg-amber/5 text-amber'
                    : 'border-coal text-cream/40 hover:border-cream/20 hover:text-cream'
                }`}
              >
                <span className="text-[9px] tracking-widest uppercase font-semibold leading-none">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Weight slider */}
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <p className="text-[10px] tracking-superwide text-cream/30 uppercase">PHASE TWO — MASS</p>
            <p className="font-display text-xl text-amber">
              {weight.toFixed(1)} <span className="text-xs font-sans tracking-widest text-cream/40">KG</span>
            </p>
          </div>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={weight}
            aria-label="Meat weight in kg"
            onChange={e => setWeight(parseFloat(e.target.value))}
            className="w-full h-[2px] appearance-none bg-coal cursor-ew-resize [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-amber [&::-webkit-slider-thumb]:rounded-none"
          />
          <div className="flex justify-between text-[8px] tracking-widest text-cream/20 mt-2">
            <span>0.5</span><span>5.0</span>
          </div>
        </div>

        {/* Wood type */}
        <div>
          <p className="text-[10px] tracking-superwide text-cream/30 uppercase mb-3">PHASE THREE — COMBUSTIBLE</p>
          <div className="grid grid-cols-2 gap-2">
            {WOODS.map(w => (
              <button
                key={w.id}
                onClick={() => setWood(w.id)}
                className={`p-3 border text-left transition-all duration-300 ${
                  wood === w.id
                    ? 'border-amber bg-amber/5 text-amber'
                    : 'border-coal text-cream/40 hover:border-cream/20 hover:text-cream'
                }`}
              >
                <div className="text-[10px] font-bold tracking-widest uppercase leading-none">{w.name}</div>
                <div className="text-[9px] text-cream/30 mt-1">{w.best}</div>
              </button>
            ))}
          </div>
        </div>

        <a
          href="#reservation"
          className="mt-auto text-center bg-cream text-pitch px-4 py-3 text-[10px] tracking-widest uppercase font-bold hover:bg-amber transition-colors duration-300"
        >
          Initialize Fire
        </a>
      </div>

      {/* RIGHT: Live Results */}
      <div className="bg-pitch p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
        {/* Subtle tech grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="relative z-10">
          <p className="text-[10px] tracking-superwide text-amber uppercase mb-2">TELEMETRY OUTPUT</p>

          {/* Big cook time */}
          <div className="font-display text-[4rem] md:text-[5rem] lg:text-[7rem] leading-none text-cream tracking-tight">
            {result.time}
          </div>
          <p className="text-[9px] tracking-widest text-cream/30 uppercase mt-2">Total Cook Time</p>
        </div>

        {/* 4 stat tiles */}
        <div className="grid grid-cols-2 gap-0 mt-6 relative z-10">
          {[
            { label: 'Chamber Temp', value: result.temp, accent: false },
            { label: 'Rest Period', value: result.rest, accent: false },
            { label: 'Fuel Load', value: `${result.woodKg} kg`, accent: true },
            { label: 'Est. Yield', value: `${result.serves} pax`, accent: false },
          ].map(stat => (
            <div key={stat.label} className={`border-l ${stat.accent ? 'border-amber/30' : 'border-coal'} pl-4 py-3`}>
              <div className={`text-[9px] tracking-widest uppercase mb-1 ${stat.accent ? 'text-amber/50' : 'text-cream/30'}`}>{stat.label}</div>
              <div className={`font-display text-2xl ${stat.accent ? 'text-amber' : 'text-cream'}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Wood note */}
        <div className="mt-5 pt-4 border-t border-coal text-[10px] text-cream/35 leading-relaxed relative z-10">
          SYS: Using <span className="text-cream">{WOODS.find(w => w.id === wood)?.name}</span> wood —{' '}
          {WOODS.find(w => w.id === wood)?.note}
        </div>
      </div>
    </div>
  )
}

export default function MeatScienceDashboard() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const [activeTab, setActiveTab] = useState<TabId>('calculator')

  const getGlowColor = () => {
    switch(activeTab) {
      case 'fire': return 'rgba(201, 125, 62, 0.15)'
      case 'doneness': return 'rgba(139, 30, 30, 0.15)'
      case 'calculator': return 'rgba(201, 125, 62, 0.08)'
      case 'cuts': return 'rgba(28, 25, 22, 0)'
    }
  }

  return (
    <section ref={ref} id="meat-science" className="relative w-full bg-pitch flex flex-col py-12 md:py-20 overflow-hidden">
      {/* Dynamic Ambient Glow */}
      <div
        className="absolute inset-0 z-0 transition-colors duration-1000 ease-in-out blur-[150px] pointer-events-none"
        style={{ backgroundColor: getGlowColor() }}
      />
      {activeTab === 'fire' && <Embers />}
      
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-8 relative z-10">
        
        {/* Header & Tabs */}
        <motion.div style={{ y }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-coal pb-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-superwide text-amber uppercase">The Science of Meat</span>
            <h2 className="font-display text-4xl md:text-display-sm text-cream leading-none">
              Precision in every element.
            </h2>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-4 py-2.5 text-label tracking-widest transition-all duration-300 border
                    ${isActive
                      ? 'text-pitch bg-amber border-amber'
                      : 'text-linen border-coal hover:border-amber hover:text-amber'}
                  `}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="relative w-full bg-smoke border border-coal" style={{ minHeight: '500px' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'calculator' && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <PitCalculator />
              </motion.div>
            )}

            {activeTab === 'cuts' && (
              <motion.div
                key="cuts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <CutCompass />
              </motion.div>
            )}
            
            {activeTab === 'doneness' && (
              <motion.div
                key="doneness"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <DonenessWidget />
              </motion.div>
            )}

            {activeTab === 'fire' && (
              <motion.div
                key="fire"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <FireWoodWidget />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  )
}
