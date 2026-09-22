import React from 'react'
import Link from 'next/link'
import { createAdminClient } from '@/utils/supabase/server'
import ToggleAvailableButton from './ToggleAvailableButton'

export default async function AdminMenuPage() {
  const supabase = createAdminClient()
  const { data: menuItems, error } = await supabase
    .from('menu_items')
    .select('*, category:menu_categories(name, slug)')
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching menu items:', error)
    return <div className="text-red-500">Error loading menu items</div>
  }

  return (
    <div className="max-w-6xl w-full text-bone">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-4xl">Menu Management</h2>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-bone/50">
              <th className="px-6 py-4 font-normal tracking-widest text-xs uppercase">Category</th>
              <th className="px-6 py-4 font-normal tracking-widest text-xs uppercase">Item Name</th>
              <th className="px-6 py-4 font-normal tracking-widest text-xs uppercase">Price (₹)</th>
              <th className="px-6 py-4 font-normal tracking-widest text-xs uppercase">Signature</th>
              <th className="px-6 py-4 font-normal tracking-widest text-xs uppercase">Status</th>
              <th className="px-6 py-4 font-normal tracking-widest text-xs uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {menuItems?.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-bone/70">
                  {item.category?.name || 'Uncategorized'}
                </td>
                <td className="px-6 py-4 font-medium text-amber">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  ₹{item.price}
                </td>
                <td className="px-6 py-4">
                  {item.is_signature ? (
                    <span className="px-2 py-1 bg-amber/20 text-amber text-[10px] tracking-widest rounded-sm border border-amber/30">
                      SIGNATURE
                    </span>
                  ) : (
                    <span className="text-white/20">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <ToggleAvailableButton id={item.id} isAvailable={item.is_available} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/admin/menu/${item.id}/edit`}
                    className="text-xs tracking-widest text-bone/50 hover:text-bone underline underline-offset-4 decoration-white/20 hover:decoration-bone transition-all"
                  >
                    EDIT
                  </Link>
                </td>
              </tr>
            ))}
            {(!menuItems || menuItems.length === 0) && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-bone/50">
                  No menu items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
