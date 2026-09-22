import React from 'react'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default function NewMafiaEventPage() {
  async function createEvent(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const image_url = formData.get('image_url') as string || 'https://images.unsplash.com/photo-1544025162-811114bd4b69?q=85&w=800&auto=format&fit=crop'
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('mafia_story_events')
      .insert({
        title,
        description,
        image_url,
        is_active: true,
        display_order: 99
      })

    if (error) {
      console.error('Failed to create event', error)
    }
    
    redirect('/admin/mafia')
  }

  return (
    <div className="max-w-2xl w-full text-bone">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/mafia" className="text-bone/50 hover:text-bone">← Back</Link>
        <h2 className="font-display text-4xl">Add New Event</h2>
      </div>

      <form action={createEvent} className="flex flex-col gap-6 bg-white/5 border border-white/10 p-6 rounded-xl">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-bone/70">Title</label>
          <input 
            type="text" 
            name="title" 
            className="bg-black/20 border border-white/10 rounded-md p-2 text-bone outline-none focus:border-amber transition-colors"
            required 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-bone/70">Description</label>
          <textarea 
            name="description" 
            className="bg-black/20 border border-white/10 rounded-md p-2 text-bone h-32 outline-none focus:border-amber transition-colors"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-bone/70">Image URL (optional)</label>
          <input 
            type="text" 
            name="image_url" 
            className="bg-black/20 border border-white/10 rounded-md p-2 text-bone outline-none focus:border-amber transition-colors"
            placeholder="Defaults to a placeholder image if left empty"
          />
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-amber text-obsidian font-bold tracking-widest uppercase py-3 rounded-md hover:bg-amber/90 transition-colors"
        >
          Create Event
        </button>
      </form>
    </div>
  )
}
