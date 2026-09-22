const fs = require('fs');

const file = 'd:/Websites/Porca Varca/v4/components/MenuEditorial.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the data
const newData = `
const menuData = {
  veloute: {
    name: "VELOUTÉ",
    desc: "Soups • Chowder",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=600&auto=format&fit=crop",
  },
  passport: {
    name: "PASSPORT PLATES",
    desc: "Fresh • Bold • Starters",
    img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=600&auto=format&fit=crop",
  },
  global: {
    name: "GLOBAL COMFORT",
    desc: "Mains • Culinary Craft",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop",
  },
  pizzas: {
    name: "NEAPOLITAN PIZZAS",
    desc: "Blistered • Artisanal",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop",
  },
  burgers: {
    name: "BURGERS",
    desc: "Smashed • Smoked",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
  }
};

const menuItems = [
  // VELOUTE
  { cat: "veloute", name: "Chicken Velouté Soup", desc: "A silky, slow-simmered chicken broth thickened with roux, finished with cream and a whisper of nutmeg. Served with toasted garlic bread." },
  { cat: "veloute", name: "Mixed Seafood Chowder", desc: "A luscious cream-based chowder brimming with shrimp, cuttlefish, squid, and crab. Served with toasted garlic bread." },
  { cat: "veloute", name: "Cream of Mushroom with Truffle Oil", desc: "Velvety mushroom soup with a drizzle of truffle oil, served with artisan bread." },
  
  // PASSPORT PLATES
  { cat: "passport", name: "Watermelon & Feta Salad", desc: "Chilled cubes of sweet watermelon and crumbly feta, tossed with mint leaves, balsamic glaze." },
  { cat: "passport", name: "Mongolian Stir-Fry Beef", desc: "Wok-seared flank steak glazed in a sweet soy reduction, tossed with ginger, garlic, and bell peppers." },
  { cat: "passport", name: "Spiced Kerala Beef Paratha Bites", desc: "Crisp paratha stuffed with tender beef, pan-fried to perfection." },
  { cat: "passport", name: "Roast Beef Vol-au-Vent", desc: "Delicate puff pastry cups filled with slow-roasted beef, caramelised onions, and a rich brandy glaze." },
  { cat: "passport", name: "Spicy Thai basil Pork Belly", desc: "Succulent pork belly slow-roasted and tossed with soy, and ginger, hoisin glaze, scallions, and toasted sesame." },
  { cat: "passport", name: "Rangoon Chicken Pockets", desc: "Cream cheese and chicken tucked inside golden wrappers." },
  { cat: "passport", name: "Eggplant Parmesan", desc: "Golden strips of eggplant coated in Parmesan and breadcrumbs, served with roasted garlic aioli—a rustic Italian comfort snack." },
  { cat: "passport", name: "Chili Oil Prawns", desc: "Fresh sea caught prawns tossed in aromatic chili oil, garlic, and scallions." },

  // GLOBAL COMFORT MEETS CULINARY CRAFT
  { cat: "global", name: "Roast Barbecue Pork Ribs", desc: "Slow-roasted pork ribs glazed in smoky barbecue sauce, served with mashed potatoes and buttered veggies.", badge: "Signature" },
  { cat: "global", name: "Wet Aged Filet Mignon with Red Wine Jus", desc: "A luxurious cut of tenderloin steak, pan-seared to a golden crust and finished to medium rare. Served with a velvety red wine jus.", badge: "Signature" },
  { cat: "global", name: "Beef Bolognese", desc: "Al dente spaghetti served with minced beef slow simmered with onions, carrots, celery, garlic, and tomatoes. Enriched with red wine." },
  { cat: "global", name: "Classic British Fish and Chips", desc: "Golden, beer-battered fillets white fish fried until crisp and served with thick-cut potato chips. Accompanied by mushy peas, lemon wedges, and creamy tartar sauce." },
  { cat: "global", name: "Smoked Chicken Red Pesto Pasta", desc: "Smoked chicken strips tangled in al dente penne, drenched in a molten red pesto made from sun-dried tomatoes, roasted garlic, and wild basil. Finished with a splash of mascarpone." },

  // NEAPOLITAN PIZZAS
  { cat: "pizzas", name: "Smoked Chicken Neapolitan Pizza", desc: "A Neapolitan crust—thin, chewy, and blistered to perfection." },
  { cat: "pizzas", name: "Pizza Diavola", desc: "A Neapolitan-style pizza that brings the heat and the flavour. Topped with slices of Sicilian Peperoni, fresh mozzarella, and thinly sliced chili peppers and jalapeños." },
  { cat: "pizzas", name: "Truffle Burrata Mushroom Pizza", desc: "A golden, hand-stretched crust brushed with truffle oil and layered with sautéed mushrooms, melted Parmesan and a touch of garlic. Once baked to perfection, crowned with torn, creamy burrata, fresh arugula, and a drizzle of truffle glaze.", badge: "Signature" },
  { cat: "pizzas", name: "Kerala Beef Neapolitan Pizza", desc: "A Neapolitan-style crust, thin and chewy with charred edges, layered with coconut oil and parmesan base infused with curry leaves. Topped with tender Kerala-style beef fry—slow-cooked with black pepper, fennel, and coconut slivers—alongside fresh mozzarella and red onions." },
  { cat: "pizzas", name: "Neapolitan Veg Pizza", desc: "A Neapolitan-style crust with a soft, airy centre and charred edges, layered with a classic tomato sauce. Topped with creamy fresh mozzarella, grilled mushrooms, broccoli, black olives, sun-dried tomatoes, and artichoke hearts, then finished with torn basil leaves." },

  // BURGERS
  { cat: "burgers", name: "Smash Cheeseburger", desc: "A Ground beef smashed onto a sizzling hot griddle, creating a crisp, caramelised crust through the Maillard reaction. Topped with a slice of melting cheese, nestled in a toasted buttery bun. Each bite delivers crunch, richness, and nostalgic diner-style satisfaction." },
  { cat: "burgers", name: "Honey BBQ Pulled Pork Burger", desc: "Slow-roasted pork shoulder, pulled to perfection and glazed in a rich honey BBQ sauce—smoky, sweet, and irresistibly sticky. Nestled on a buttered sliders, it's layered with crisp red cabbage slaw, fresh cilantro, and sliced jalapeños for a flash of heat and crunch." },
  { cat: "burgers", name: "Smoked Beef Brisket", desc: "Smoked Beef Brisket - Texas to chennai. 16-hours oak-smoked brisket, crusted in black pepper and garlic, slow-bathed in its own juices until it whispers apart. Finished with a glaze and served with, red wine - caramelised onions on cibata.", badge: "Signature" },
  { cat: "burgers", name: "Nashville Fried Chicken Burger", desc: "Crispy buttermilk chicken thigh, drenched in devil-red cayenne oil, stacked with jalapeño, honey drizzle, and all hugged by a charcoal bun." }
];
`;

content = content.replace(/const menuData = \{[\s\S]*?\};[\s\S]*?const menuItems = \[[\s\S]*?\];/, newData);
// Remove price rendering
content = content.replace(/<span className="font-mono text-sm tracking-wider text-ember whitespace-nowrap">[\s\S]*?\{item\.price\}[\s\S]*?<\/span>/g, "");
// Replace activeCat type
content = content.replace(/useState<"all" \| "porca" \| "vaca">/g, `useState<"all" | "veloute" | "passport" | "global" | "pizzas" | "burgers">`);
// Remove activeFilter logic
content = content.replace(/const \[activeFilter, setActiveFilter\] = useState<"all" \| "signature" \| "burger" \| "sides">\("all"\);/, "");
content = content.replace(/if \(activeFilter !== "all" && item.type !== activeFilter\) return false;/g, "");
content = content.replace(/<div className="flex gap-3 flex-wrap">[\s\S]*?<\/div>/, "");

// Replace the categories rendering loop
const newSidebar = `
          {(["veloute", "passport", "global", "pizzas", "burgers"] as const).map((cat) => (
`;
content = content.replace(/\{\(\["vaca", "porca"\] as const\)\.map\(\(cat\) => \(/, newSidebar);

// Write back
fs.writeFileSync(file, content);
console.log('Done MenuEditorial.tsx');
