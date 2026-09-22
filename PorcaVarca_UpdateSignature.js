const fs = require('fs');

const file = 'd:/Websites/Porca Varca/v4/components/SignatureCarousel.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the carouselItems
const newData = `
const carouselItems = [
  {
    id: 1,
    name: "WET AGED FILET MIGNON",
    tag: "RED WINE JUS",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=85&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "BARBECUE PORK RIBS",
    tag: "SLOW ROASTED",
    src: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=85&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "SMASH CHEESEBURGER",
    tag: "MAILLARD CRUST",
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=85&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "TRUFFLE BURRATA PIZZA",
    tag: "WOOD-FIRED",
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=85&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "SMOKED BEEF BRISKET",
    tag: "16-HOUR OAK",
    src: "/house/rib.png"
  }
]
`;

content = content.replace(/const carouselItems = \[[\s\S]*?\]/, newData);

// Remove price div from mobile block
content = content.replace(/<div className="font-display text-lg text-ember mt-1">\{item\.price\}<\/div>/g, "");
// Remove price div from desktop block
content = content.replace(/<div className="font-display text-xl text-ember">\{item\.price\}<\/div>/g, "");

fs.writeFileSync(file, content);
console.log('Done SignatureCarousel.tsx');
