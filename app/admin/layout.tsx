import React from 'react'
import Link from 'next/link'
import { logout } from './actions'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-bone flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col gap-8">
        <div>
          <h1 className="font-display text-2xl text-amber">Porca & Vaca</h1>
          <p className="text-xs text-bone/50 tracking-widest mt-1">ADMIN PORTAL</p>
        </div>
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className="text-sm tracking-widest hover:text-amber transition-colors">DASHBOARD</Link>
          <Link href="/admin/menu" className="text-sm tracking-widest hover:text-amber transition-colors">MENU ITEMS</Link>
          <Link href="/admin/mafia" className="text-sm tracking-widest hover:text-amber transition-colors">MEAT MAFIA</Link>
          <Link href="/admin/reservations" className="text-sm tracking-widest hover:text-amber transition-colors">RESERVATIONS</Link>
          <Link href="/" className="text-sm tracking-widest text-bone/30 hover:text-bone transition-colors mt-8">← BACK TO SITE</Link>
          
          <form action={logout} className="mt-4">
            <button type="submit" className="text-sm tracking-widest text-red-500/70 hover:text-red-500 transition-colors uppercase">
              Log Out
            </button>
          </form>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
