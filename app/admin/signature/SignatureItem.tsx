'use client'

import React, { useState, useTransition } from 'react'
import { toggleSignatureActive, updateSignatureOrder, updateSignatureUrl } from './actions'

interface SignatureItemProps {
  image: {
    id: string
    url: string
    alt_text: string | null
    display_order: number
    is_active: boolean
  }
}

export function SignatureItem({ image }: SignatureItemProps) {
  const [isPending, startTransition] = useTransition()
  const [url, setUrl] = useState(image.url)
  const [order, setOrder] = useState(image.display_order.toString())
  const [isSavingUrl, setIsSavingUrl] = useState(false)
  const [isSavingOrder, setIsSavingOrder] = useState(false)

  const handleToggle = () => {
    startTransition(() => {
      toggleSignatureActive(image.id, image.is_active)
    })
  }

  const handleUrlSave = async () => {
    setIsSavingUrl(true)
    try {
      await updateSignatureUrl(image.id, url)
    } finally {
      setIsSavingUrl(false)
    }
  }

  const handleOrderSave = async () => {
    setIsSavingOrder(true)
    try {
      await updateSignatureOrder(image.id, parseInt(order) || 0)
    } finally {
      setIsSavingOrder(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 border border-white/10 rounded-xl bg-white/5 items-start md:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={image.url} 
        alt={image.alt_text || 'Signature Image'} 
        className="w-32 h-24 object-cover rounded-lg bg-black/50"
      />
      
      <div className="flex-1 flex flex-col gap-3 w-full">
        <h3 className="font-display text-xl text-bone mb-1">{image.alt_text || 'No Alt Text'}</h3>
        
        <div className="flex flex-col gap-2">
          <label className="text-xs text-bone/60">Image URL</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-obsidian border border-white/10 rounded-md px-3 py-1 text-sm text-bone focus:outline-none focus:border-amber transition-colors"
            />
            <button 
              onClick={handleUrlSave}
              disabled={isSavingUrl || url === image.url}
              className="bg-amber/10 text-amber px-3 py-1 text-xs rounded-md hover:bg-amber/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSavingUrl ? 'SAVING...' : 'SAVE'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row md:flex-col gap-6 md:gap-3 w-full md:w-auto items-center md:items-end mt-4 md:mt-0">
        <div className="flex items-center gap-2">
          <label className="text-xs text-bone/60">Order</label>
          <input 
            type="number" 
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            onBlur={handleOrderSave}
            className="w-16 bg-obsidian border border-white/10 rounded-md px-2 py-1 text-sm text-center text-bone focus:outline-none focus:border-amber transition-colors"
          />
        </div>
        
        <button 
          onClick={handleToggle}
          disabled={isPending}
          className={`px-4 py-2 text-xs tracking-widest rounded-md border transition-colors ${
            image.is_active 
              ? 'border-green-500/30 text-green-500 hover:bg-green-500/10' 
              : 'border-red-500/30 text-red-500 hover:bg-red-500/10'
          }`}
        >
          {isPending ? 'UPDATING...' : image.is_active ? 'ACTIVE' : 'INACTIVE'}
        </button>
      </div>
    </div>
  )
}
