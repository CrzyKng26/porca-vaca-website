import { createClient } from '@/utils/supabase/server';

export interface SignatureImage {
  id: string;
  url: string;
  alt_text: string | null;
  display_order: number;
}

const FALLBACK_IMAGES: SignatureImage[] = [
  {
    id: "fb-1",
    url: "https://images.unsplash.com/photo-1544025162-d76694265947?q=60&w=800&auto=format&fit=crop",
    alt_text: "WET AGED FILET MIGNON",
    display_order: 1
  },
  {
    id: "fb-2",
    url: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=60&w=800&auto=format&fit=crop",
    alt_text: "BARBECUE PORK RIBS",
    display_order: 2
  },
  {
    id: "fb-3",
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=60&w=800&auto=format&fit=crop",
    alt_text: "SMASH CHEESEBURGER",
    display_order: 3
  },
  {
    id: "fb-4",
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=60&w=800&auto=format&fit=crop",
    alt_text: "TRUFFLE BURRATA PIZZA",
    display_order: 4
  },
  {
    id: "fb-5",
    url: "/house/rib.png",
    alt_text: "SMOKED BEEF BRISKET",
    display_order: 5
  },
  {
    id: "fb-6",
    url: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1200&auto=format&fit=crop",
    alt_text: "Neapolitan pizza",
    display_order: 6
  }
];

export async function getSignatureImages(): Promise<SignatureImage[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('signature_images')
      .select('id, url, alt_text, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching signature images:', error);
      return FALLBACK_IMAGES;
    }

    if (!data || data.length === 0) {
      return FALLBACK_IMAGES;
    }

    return data;
  } catch (error) {
    console.error('Error in getSignatureImages:', error);
    return FALLBACK_IMAGES;
  }
}
