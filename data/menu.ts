import { createClient } from '@/utils/supabase/server'

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  dietary_type: string | null;
  display_order: number;
  is_available: boolean;
  is_signature: boolean;
  category?: MenuCategory; // For joined data
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('menu_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data || [];
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('menu_items')
    .select('*, category:menu_categories(*)')
    .eq('is_available', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  return data || [];
}
