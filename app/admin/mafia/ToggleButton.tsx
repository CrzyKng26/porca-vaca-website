'use client'

import React, { useTransition } from 'react'
import { toggleEventActive } from './actions'

export function ToggleButton({ id, isActive }: { id: string, isActive: boolean }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => { toggleEventActive(id, isActive); })}
      disabled={isPending}
      className={`px-4 py-2 text-xs tracking-widest border transition-colors ${
        isActive 
          ? 'border-green-500/50 text-green-400 hover:bg-green-500/10' 
          : 'border-red-500/50 text-red-400 hover:bg-red-500/10'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isPending ? 'UPDATING...' : isActive ? 'ACTIVE (ON)' : 'HIDDEN (OFF)'}
    </button>
  )
}
