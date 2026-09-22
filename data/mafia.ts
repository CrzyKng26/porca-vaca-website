import { createAdminClient } from '@/utils/supabase/server';

export interface MafiaStoryEvent {
  id: string;
  title: string;
  image_url: string;
  description: string;
  is_active: boolean;
  display_order: number;
}

export async function getMafiaStoryEvents(): Promise<MafiaStoryEvent[]> {
  const supabase = createAdminClient();
  
  try {
    const { data, error } = await supabase
      .from('mafia_story_events')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(5); // Maximum 5 events as requested

    if (error) {
      console.error('Error fetching mafia events from Supabase:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Supabase connection failed. Returning empty array.', err);
    return [];
  }
}
