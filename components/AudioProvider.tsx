'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

type AudioContextType = {
  isMuted: boolean
  toggleMute: () => void
  playHover: () => void
  playThud: () => void
  playSizzle: () => void
}

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  playHover: () => {},
  playThud: () => {},
  playSizzle: () => {},
})

export const useAudio = () => useContext(AudioContext)

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMuted, setIsMuted] = useState(true) // Default muted for browsers
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null)

  useEffect(() => {
    // Initialize audio context only on client side
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    setAudioCtx(ctx)
    return () => { ctx.close() }
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev
      if (!next && audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume()
      }
      return next
    })
  }, [audioCtx])

  // A light "tick" or "clack" for hovering
  const playHover = useCallback(() => {
    if (isMuted || !audioCtx) return
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, audioCtx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05)
    
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05)
    
    osc.start(audioCtx.currentTime)
    osc.stop(audioCtx.currentTime + 0.05)
  }, [isMuted, audioCtx])

  // A heavy bass "thud" for when the draw finishes
  const playThud = useCallback(() => {
    if (isMuted || !audioCtx) return
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(150, audioCtx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.3)
    
    gain.gain.setValueAtTime(0.8, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3)
    
    osc.start(audioCtx.currentTime)
    osc.stop(audioCtx.currentTime + 0.3)
  }, [isMuted, audioCtx])

  // A noise-based "sizzle" for the fire/doneness
  const playSizzle = useCallback(() => {
    if (isMuted || !audioCtx) return
    
    const bufferSize = audioCtx.sampleRate * 0.5 // half a second
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    
    const noise = audioCtx.createBufferSource()
    noise.buffer = buffer
    
    // Filter to make it sound like sizzle (high pass)
    const filter = audioCtx.createBiquadFilter()
    filter.type = 'highpass'
    filter.frequency.value = 4000
    
    const gain = audioCtx.createGain()
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5)
    
    noise.connect(filter)
    filter.connect(gain)
    gain.connect(audioCtx.destination)
    
    noise.start()
  }, [isMuted, audioCtx])

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playHover, playThud, playSizzle }}>
      {children}
    </AudioContext.Provider>
  )
}
