'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Pause, Play, RotateCcw } from 'lucide-react'
import './hero-entrance.css'

export default function Hero() {
  const [replay, setReplay] = useState(0)
  const [finished, setFinished] = useState(false)
  const [skipped, setSkipped] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => { setReduced(preference.matches); if (preference.matches) setFinished(true) }
    sync()
    preference.addEventListener('change', sync)
    return () => preference.removeEventListener('change', sync)
  }, [])

  return (
    <section id="opening" key={replay} className={`film-hero entrance-hero ${skipped ? 'entrance-skipped' : ''} ${paused ? 'motion-paused' : ''}`} aria-label="Porca and Vaca">
      <div className="entrance-media film-image-wrap">
        <picture>
          <source media="(max-width: 767px)" srcSet="/house/interior.png" />
          <img className="entrance-poster" src="/house/interior.png" alt="Illustrative fire-lit beef on a charcoal grill" fetchPriority="high" width="1536" height="1024" />
        </picture>
      </div>
      <div className="entrance-shade" />
      <div className="entrance-heat" aria-hidden="true" />
      <div className="entrance-smoke" aria-hidden="true" />
      <div className="entrance-grain" aria-hidden="true" />

      <div className="entrance-meta"><span>PORCA & VACA / ALWARPET</span><span>PURE MEAT & FIRE</span></div>
      <div className="entrance-heading">
        <p className="entrance-kicker">BOLD CUTS. SLOW FIRE.</p>
        <h1 aria-label="Porca and Vaca" className="flex items-center">
          <span className="entrance-word" aria-hidden="true" style={{ width: '100%', maxWidth: '800px', display: 'flex' }}>
            <span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/hero-text.png" alt="Porca & Vaca" className="w-full h-auto object-contain drop-shadow-2xl mix-blend-screen" />
            </span>
          </span>
        </h1>
        <p className="entrance-signature">Serious <em>flavour.</em></p>
      </div>
      <div className="entrance-edge" aria-hidden="true">FIRE / CRAFT / OBSESSION</div>
      <div className="entrance-bottom">
        <a className="entrance-scroll" href="#story"><ArrowDown size={17} /><span>THE STORY<small>SCROLL TO EXPLORE</small></span></a>
        <span className="entrance-location">ALWARPET, CHENNAI<br/><small>BUILT AROUND MEAT.</small></span>
        <a className="cinema-button" href="#menu">EXPLORE THE MENU <ArrowUpRight size={18} /></a>
      </div>
      <div className="entrance-controls">
        {!finished && !reduced ? <button onClick={() => { setSkipped(true); setFinished(true) }}>SKIP ENTRANCE ↗</button> : <button onClick={() => { setReplay(value => value + 1); setFinished(false); setSkipped(false); setPaused(false) }} disabled={reduced}><RotateCcw size={12} /> REPLAY ENTRANCE</button>}
        <button aria-pressed={paused} aria-label={paused ? 'Play hero motion' : 'Pause hero motion'} onClick={() => setPaused(!paused)} disabled={reduced}>{paused ? <Play size={12} /> : <Pause size={12} />}<span>{paused ? 'PLAY' : 'PAUSE'}</span></button>
      </div>

      {!skipped && <div className="entrance-liquid" aria-hidden="true" onAnimationEnd={event => { if (event.animationName === 'entrance-cover') setFinished(true) }}>
        <svg className="liquid-art" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="liquid-wine" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#170707"/><stop offset=".38" stopColor="#641b1c"/><stop offset=".57" stopColor="#300b0d"/><stop offset=".8" stopColor="#9a3c31"/><stop offset="1" stopColor="#1b0708"/></linearGradient>
            <linearGradient id="liquid-rim" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#bb7a53" stopOpacity="0"/><stop offset=".6" stopColor="#daab78" stopOpacity=".7"/><stop offset="1" stopColor="#6c2220" stopOpacity="0"/></linearGradient>
          </defs>
          <g className="liquid-left"><path fill="url(#liquid-wine)" d="M-250-150H1080C990 60 540 70 680 295S1160 540 785 690 835 1090 990 1180H-250Z"/><path fill="none" stroke="url(#liquid-rim)" strokeWidth="4" d="M1080-150C990 60 540 70 680 295S1160 540 785 690 835 1090 990 1180"/></g>
          <g className="liquid-right"><path fill="url(#liquid-wine)" d="M1700-200H730C1200 80 905 265 1090 400S610 720 915 1040L1700 1200Z"/><path fill="none" stroke="url(#liquid-rim)" strokeWidth="3" d="M730-200C1200 80 905 265 1090 400S610 720 915 1040"/></g>
          <ellipse className="liquid-drop drop-one" cx="785" cy="320" rx="35" ry="80" fill="url(#liquid-wine)" transform="rotate(-25 785 320)"/>
          <ellipse className="liquid-drop drop-two" cx="570" cy="680" rx="22" ry="48" fill="url(#liquid-wine)"/>
        </svg>
        <div className="entrance-prologue"><span>PORCA & VACA</span><p>It started<br/>with <em>a grill.</em></p><small>THEN CAME THE OBSESSION.</small></div>
      </div>}
    </section>
  )
}
