export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: "porca" | "vaca";
  tags?: string[];
  highlight?: boolean;
}

export interface MenuCategory {
  id: "porca" | "vaca";
  label: string;
  icon?: string;
}

export const menuCategories: MenuCategory[] = [
  { id: "porca", label: "Porca (Pork)" },
  { id: "vaca", label: "Vaca (Beef)" },
];

export const menuItems: MenuItem[] = [
  // --- PORCA (PORK) ---
  {
    id: "baby-back-ribs",
    name: "Baby Back Ribs",
    description: "Dry-rubbed, smoked low & slow, finished with P&V house BBQ glaze. Full or half rack.",
    category: "porca",
    highlight: true,
  },
  {
    id: "pork-smash",
    name: "Pork Smash Burger",
    description: "Ground pork patty, apple slaw, mustard aioli, crispy shallots, sesame bun.",
    category: "porca",
  },
  {
    id: "pulled-pork",
    name: "Pulled Pork Platter",
    description: "12-hour smoked pork shoulder, pulled to order, house slaw, pickles, toasted brioche.",
    category: "porca",
  },
  {
    id: "crispy-pork-belly",
    name: "Crispy Pork Belly",
    description: "Crackling skin, apple cider glaze, pickled daikon, chilli oil, steamed rice.",
    category: "porca",
  },
  {
    id: "meat-lovers-pizza",
    name: "Meat Lovers Pizza",
    description: "Pulled pork, salami, smoked bacon, mozzarella, house tomato sauce, wood-fired base.",
    category: "porca",
    highlight: true,
  },
  {
    id: "pepperoni-pizza",
    name: "Classic Pepperoni",
    description: "Generous pepperoni, mozzarella, house tomato, fresh basil, chilli flakes.",
    category: "porca",
  },
  {
    id: "loaded-fries-pork",
    name: "Pulled Pork Loaded Fries",
    description: "Crinkle-cut fries, pulled pork, cheese sauce, pickled jalapeños, spring onion.",
    category: "porca",
  },
  {
    id: "onion-rings-porca",
    name: "Onion Rings",
    description: "Beer-battered, crispy, chipotle dipping sauce.",
    category: "porca",
  },
  {
    id: "house-slaw-porca",
    name: "House Slaw",
    description: "Shredded cabbage, carrot, apple, house dressing.",
    category: "porca",
  },

  // --- VACA (BEEF) ---
  {
    id: "beef-brisket",
    name: "Wood-Smoked Beef Brisket",
    description: "12-hour low & slow smoked brisket, house slaw, pickled jalapeños. Served with choice of one side.",
    category: "vaca",
    highlight: true,
  },
  {
    id: "smash-burger",
    name: "The P&V Smash",
    description: "Double smash patty, American cheese, house pickles, caramelised onion, P&V sauce, brioche bun.",
    category: "vaca",
    highlight: true,
  },
  {
    id: "short-ribs",
    name: "Braised Short Ribs",
    description: "Slow-braised beef short ribs, red wine reduction, roasted garlic mash, fresh herbs.",
    category: "vaca",
  },
  {
    id: "bbq-bacon-stack",
    name: "BBQ Bacon Stack",
    description: "Beef patty, crispy streaky bacon, chipotle BBQ sauce, cheddar, jalapeños, brioche.",
    category: "vaca",
  },
  {
    id: "mushroom-swiss",
    name: "The Umami Burger",
    description: "Beef patty, sautéed wild mushrooms, Swiss cheese, truffle mayo, potato bun.",
    category: "vaca",
  },
  {
    id: "beef-bowl",
    name: "Beef Chilli Bowl",
    description: "Slow-cooked beef chilli, rice, sour cream, cheddar, spring onion, tortilla chips.",
    category: "vaca",
  },
  {
    id: "brisket-pizza",
    name: "Brisket & Caramelised Onion Pizza",
    description: "House brisket, caramelised onion, smoked cheddar, pickled jalapeños, ranch drizzle.",
    category: "vaca",
    highlight: true,
  },
  {
    id: "mac-cheese-vaca",
    name: "Mac & Cheese",
    description: "Three-cheese sauce, crunchy breadcrumb top, smoked paprika.",
    category: "vaca",
  },
  {
    id: "onion-rings-vaca",
    name: "Onion Rings",
    description: "Beer-battered, crispy, chipotle dipping sauce.",
    category: "vaca",
  },
  {
    id: "house-slaw-vaca",
    name: "House Slaw",
    description: "Shredded cabbage, carrot, apple, house dressing.",
    category: "vaca",
  },
];
