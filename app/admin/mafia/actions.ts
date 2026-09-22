'use server'

import { createAdminClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleEventActive(id: string, currentStatus: boolean) {
  const supabase = createAdminClient();
  
  const { error } = await supabase
    .from('mafia_story_events')
    .update({ is_active: !currentStatus })
    .eq('id', id);
    
  if (error) {
    console.error("Error toggling event:", error);
    return { success: false, error: error.message };
  }
  
  revalidatePath('/admin/mafia');
  revalidatePath('/'); // Revalidate home so public sees it
  return { success: true };
}
