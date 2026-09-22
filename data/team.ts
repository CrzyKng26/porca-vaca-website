import { createClient } from '@/utils/supabase/server';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string;
  is_published: boolean;
  display_order: number;
}

export const FALLBACK_TEAM: TeamMember[] = [
  {
    id: 'founder',
    name: 'Founder',
    role: 'FOUNDER',
    bio: null,
    image_url: '/team/founder.jpg',
    is_published: true,
    display_order: 1
  },
  {
    id: 'chef',
    name: 'Chef',
    role: 'CHEF',
    bio: null,
    image_url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=85&w=1200&auto=format&fit=crop',
    is_published: true,
    display_order: 2
  },
  {
    id: 'business-head',
    name: 'Business Head',
    role: 'BUSINESS HEAD',
    bio: null,
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=85&w=1200&auto=format&fit=crop',
    is_published: true,
    display_order: 3
  },
  {
    id: 'manager',
    name: 'Manager',
    role: 'MANAGER',
    bio: null,
    image_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=85&w=1200&auto=format&fit=crop',
    is_published: true,
    display_order: 4
  }
];

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_published', true)
      .order('display_order');

    if (error) {
      console.error('Error fetching team members:', error);
      return FALLBACK_TEAM;
    }

    if (!data || data.length === 0) {
      return FALLBACK_TEAM;
    }

    return data as TeamMember[];
  } catch (err) {
    console.error('Unexpected error fetching team members:', err);
    return FALLBACK_TEAM;
  }
}
