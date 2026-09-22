'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateMenuItemPrice(id: string, price: number): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('menu_items')
    .update({ price })
    .eq('id', id)

  if (error) {
    throw new Error('Failed to update price: ' + error.message)
  }
}

export async function toggleMenuItemAvailable(id: string, currentStatus: boolean): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('menu_items')
    .update({ is_available: !currentStatus })
    .eq('id', id)

  if (error) {
    throw new Error('Failed to toggle availability: ' + error.message)
  }

  revalidatePath('/admin/menu')
  revalidatePath('/')
}
