'use client'

import { useEffect, useRef } from 'react'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let lenis: any
    
    const init = async () => {
      const { default: Lenis } = await import('@studio-freight/lenis')
      
      lenis = new Lenis({
        duration: 0.8, // Reduced from 1.4 for snappier scrolling
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1, // Increased from 0.85
        touchMultiplier: 2,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      // Handle anchor links for smooth in-page navigation
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e: Event) => {
          e.preventDefault()
          const href = (anchor as HTMLAnchorElement).getAttribute('href') || ''
          if (href === '#') {
            lenis.scrollTo(0)
            return
          }
          try {
            const target = document.querySelector(href)
            if (target) lenis.scrollTo(target, { offset: -80 })
          } catch (err) {}
        })
      })
    }

    init()

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  return <>{children}</>
}
