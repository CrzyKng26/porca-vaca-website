import React from 'react'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function EditMenuItemPage({ params }: { params: { id: string } }) {
  const supabase = createAdminClient()
  const { data: item, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !item) {
    return <div className="text-red-500">Menu item not found</div>
  }

  async function updateMenuItem(formData: FormData) {
    'use server'
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = parseInt(formData.get('price') as string, 10)
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('menu_items')
      .update({ name, description, price })
      .eq('id', params.id)

    if (error) {
      console.error('Failed to update menu item', error)
    }
    
    redirect('/admin/menu')
  }

  return (
    <div className="max-w-2xl w-full text-bone">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/menu" className="text-bone/50 hover:text-bone">← Back</Link>
        <h2 className="font-display text-4xl">Edit Menu Item</h2>
      </div>

      <form action={updateMenuItem} className="flex flex-col gap-6 bg-white/5 border border-white/10 p-6 rounded-xl">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-bone/70">Name</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={item.name} 
            className="bg-black/20 border border-white/10 rounded-md p-2 text-bone outline-none focus:border-amber transition-colors"
            required 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-bone/70">Description</label>
          <textarea 
            name="description" 
            defaultValue={item.description || ''} 
            className="bg-black/20 border border-white/10 rounded-md p-2 text-bone h-32 outline-none focus:border-amber transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-bone/70">Price (₹)</label>
          <input 
            type="number" 
            name="price" 
            defaultValue={item.price} 
            className="bg-black/20 border border-white/10 rounded-md p-2 text-bone outline-none focus:border-amber transition-colors"
            required 
          />
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-amber text-obsidian font-bold tracking-widest uppercase py-3 rounded-md hover:bg-amber/90 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
