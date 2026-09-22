import React from 'react'
import { createAdminClient } from '@/utils/supabase/server'
import { ToggleButton } from './ToggleButton'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function MafiaAdminPage() {
  const supabase = createAdminClient()
  
  // Fetch ALL events, regardless of whether they are active or not
  const { data: events, error } = await supabase
    .from('mafia_story_events')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    return <div className="text-red-500">Error loading events: {error.message}</div>
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display text-4xl mb-2">Meat Mafia Events</h2>
          <p className="text-bone/60 text-sm">Manage the Instagram-style story feed. Maximum 5 active events recommended.</p>
        </div>
        <Link href="/admin/mafia/new" className="border border-amber text-amber px-4 py-2 text-xs tracking-widest hover:bg-amber hover:text-obsidian transition-colors">
          + ADD NEW EVENT
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {events?.map((event) => (
          <div key={event.id} className="flex items-center gap-6 p-4 border border-white/10 rounded-xl bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={event.image_url} 
              alt={event.title} 
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-display text-2xl text-bone mb-1">{event.title}</h3>
              <p className="text-sm text-bone/60">{event.description}</p>
            </div>
            <div>
              <ToggleButton id={event.id} isActive={event.is_active} />
            </div>
          </div>
        ))}
        {(!events || events.length === 0) && (
          <div className="p-8 text-center border border-white/10 rounded-xl text-bone/60">
            No events found in database.
          </div>
        )}
      </div>
    </div>
  )
}
