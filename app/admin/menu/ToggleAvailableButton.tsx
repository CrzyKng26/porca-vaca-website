'use client'

import React, { useTransition } from 'react'
import { toggleMenuItemAvailable } from './actions'

interface ToggleAvailableButtonProps {
  id: string
  isAvailable: boolean
}

export default function ToggleAvailableButton({ id, isAvailable }: ToggleAvailableButtonProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await toggleMenuItemAvailable(id, isAvailable)
      } catch (error) {
        console.error('Failed to toggle status:', error)
      }
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`px-3 py-1 text-xs tracking-widest border transition-colors ${
        isAvailable 
          ? 'border-bone/30 text-bone hover:bg-bone hover:text-obsidian' 
          : 'border-white/10 text-white/30 hover:bg-white/5'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isPending ? 'UPDATING...' : (isAvailable ? 'ACTIVE' : 'INACTIVE')}
    </button>
  )
}
