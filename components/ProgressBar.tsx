'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // On route change — show progress bar
    setVisible(true)
    setProgress(0)
    
    const t1 = setTimeout(() => setProgress(60), 50)
    const t2 = setTimeout(() => setProgress(80), 400)
    const t3 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setVisible(false), 400)
    }, 700)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [pathname])

  // Also track scroll depth
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return
      const pct = Math.min((scrolled / maxScroll) * 100, 100)
      if (!visible) setProgress(pct)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [visible])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9997] h-[2px] pointer-events-none"
      style={{ opacity: visible ? 1 : 0.7 }}
    >
      <div
        className="h-full bg-ember transition-all duration-300 ease-out"
        style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(163, 75, 43, 0.8)' }}
      />
    </div>
  )
}
