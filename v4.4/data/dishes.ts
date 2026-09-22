export interface Dish {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  size: "large" | "small";
  tag?: string;
}

export const signatureDishes: Dish[] = [
  {
    id: "brisket",
    name: "Wood-Smoked Brisket",
    description: "Twelve hours. Low heat. Serious patience. The kind of tenderness that rewrites your expectations.",
    category: "Beef",
    imageUrl: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=85&w=1200&auto=format&fit=crop",
    imageAlt: "Wood-smoked beef brisket, sliced and plated on dark surface",
    size: "large",
    tag: "Signature",
  },
  {
    id: "smash-burger",
    name: "The P&V Smash",
    description: "Double smash patty, house cheese, caramelised onion, our sauce. The reason regulars return.",
    category: "Burgers",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=85&w=900&auto=format&fit=crop",
    imageAlt: "Double smash burger with melted cheese, served on dark slate",
    size: "small",
    tag: "Fan Favourite",
  },
  {
    id: "baby-back-ribs",
    name: "Baby Back Ribs",
    description: "Dry-rubbed. Slow-smoked. Glazed with our house BBQ. A full or half rack of unapologetic flavour.",
    category: "Pork",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=1200&auto=format&fit=crop",
    imageAlt: "Baby back pork ribs glazed with BBQ sauce, plated dramatically",
    size: "large",
    tag: "Must Try",
  },
  {
    id: "short-ribs",
    name: "Braised Short Ribs",
    description: "Fall-off-the-bone beef, red wine reduction, roasted garlic mash. Slow food at its finest.",
    category: "Beef",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=85&w=900&auto=format&fit=crop",
    imageAlt: "Braised beef short ribs on roasted garlic mash",
    size: "small",
  },
  {
    id: "meat-lovers-pizza",
    name: "Meat Lovers Pizza",
    description: "Pulled pork, salami, smoked bacon, mozzarella. For when you want everything on one plate.",
    category: "Pizza",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=85&w=1200&auto=format&fit=crop",
    imageAlt: "Meat lovers pizza with pulled pork, salami and bacon on wood-fired base",
    size: "large",
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    description: "Crinkle-cut, cheese sauce, pulled pork, pickled jalapeños. The side that steals the show.",
    category: "Sides",
    imageUrl: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=85&w=900&auto=format&fit=crop",
    imageAlt: "Loaded fries with cheese sauce, pulled pork and jalapeños",
    size: "small",
  },
];
