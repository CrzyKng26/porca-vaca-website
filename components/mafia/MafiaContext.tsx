'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { MafiaStoryEvent } from '@/data/mafia'

interface MafiaContextType {
  isMafiaActive: boolean;
  enterMafia: () => void;
  exitMafia: () => void;
  storyEvents: MafiaStoryEvent[];
}

const MafiaContext = createContext<MafiaContextType | undefined>(undefined)

export function MafiaProvider({ children, initialStoryEvents = [] }: { children: ReactNode, initialStoryEvents?: MafiaStoryEvent[] }) {
  const [isMafiaActive, setIsMafiaActive] = useState(false)
  const [storyEvents] = useState<MafiaStoryEvent[]>(initialStoryEvents)

  const enterMafia = () => {
    setIsMafiaActive(true)
    // Optional: pushState to update URL without navigation
    window.history.pushState({}, '', '/mafia')
  }

  const exitMafia = () => {
    setIsMafiaActive(false)
    window.history.pushState({}, '', '/')
  }

  return (
    <MafiaContext.Provider value={{ isMafiaActive, enterMafia, exitMafia, storyEvents }}>
      {children}
    </MafiaContext.Provider>
  )
}

export function useMafia() {
  const context = useContext(MafiaContext)
  if (context === undefined) {
    throw new Error('useMafia must be used within a MafiaProvider')
  }
  return context
}
