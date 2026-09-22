import { createClient } from '@/utils/supabase/server';

export interface Testimonial {
  id: string;
  customer_name: string;
  role: string;
  location: string | null;
  quote: string;
  image_url: string | null;
  is_published: boolean;
  display_order: number;
}

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    customer_name: "Vikram R.",
    role: "Food Critic",
    location: "Bangalore",
    quote: "The 60-day dry-aged ribeye was unlike anything I've had in Chennai. Period.",
    image_url: null,
    is_published: true,
    display_order: 1
  },
  {
    id: '2',
    customer_name: "Ananya S.",
    role: "Regular",
    location: "Mumbai",
    quote: "Brisket so good I almost missed my flight back to Bombay. Almost.",
    image_url: null,
    is_published: true,
    display_order: 2
  },
  {
    id: '3',
    customer_name: "Rajan K.",
    role: "Member #019",
    location: "Chennai",
    quote: "The Meat Mafia membership is the best free thing I've ever signed up for.",
    image_url: null,
    is_published: true,
    display_order: 3
  },
  {
    id: '4',
    customer_name: "Priya M.",
    role: "Convert",
    location: "Chennai",
    quote: "They refused to serve my steak well-done. I argued. I was wrong. I respect that.",
    image_url: null,
    is_published: true,
    display_order: 4
  },
  {
    id: '5',
    customer_name: "Arjun D.",
    role: "First Visit",
    location: "Hyderabad",
    quote: "The Pit Calculator on the website made me plan my visit three days in advance. Worth every minute.",
    image_url: null,
    is_published: true,
    display_order: 5
  }
];

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('display_order');

    if (error) {
      console.error('Error fetching testimonials:', error);
      return FALLBACK_TESTIMONIALS;
    }

    if (!data || data.length === 0) {
      return FALLBACK_TESTIMONIALS;
    }

    return data as Testimonial[];
  } catch (err) {
    console.error('Unexpected error fetching testimonials:', err);
    return FALLBACK_TESTIMONIALS;
  }
}
