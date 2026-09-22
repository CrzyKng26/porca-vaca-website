'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleSignatureActive(id: string, currentState: boolean) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('signature_images')
    .update({ is_active: !currentState })
    .eq('id', id)

  if (error) {
    throw new Error('Failed to toggle status')
  }

  revalidatePath('/admin/signature')
  revalidatePath('/')
}

export async function updateSignatureOrder(id: string, newOrder: number) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('signature_images')
    .update({ display_order: newOrder })
    .eq('id', id)

  if (error) {
    throw new Error('Failed to update order')
  }

  revalidatePath('/admin/signature')
  revalidatePath('/')
}

export async function updateSignatureUrl(id: string, newUrl: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('signature_images')
    .update({ url: newUrl })
    .eq('id', id)

  if (error) {
    throw new Error('Failed to update url')
  }

  revalidatePath('/admin/signature')
  revalidatePath('/')
}
