export const restaurant = {
  name: "Porca & Vaca",
  tagline: "Bold cuts. Slow fire. Serious flavour.",
  location: "Alwarpet",
  city: "Chennai",
  country: "India",
  address: {
    street: "42, Sriram Colony",
    area: "Bheemanna Garden Street",
    locality: "Alwarpet",
    city: "Chennai",
    state: "Tamil Nadu",
    pin: "600018",
    full: "42, Sriram Colony, Bheemanna Garden Street, Alwarpet, Chennai – 600018",
  },
  phone: "+91 81900 05040",
  phoneRaw: "+918190005040",
  instagram: "@porcanvaca2.0",
  instagramUrl: "https://www.instagram.com/porcanvaca2.0",
  mapUrl:
    "https://maps.google.com/?q=Porca+and+Vaca+42+Sriram+Colony+Bheemanna+Garden+Street+Alwarpet+Chennai",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.088!2d80.2513!3d13.0334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267252a5e9d21%3A0xc9b58c7f2f60fcf8!2sPorca%20%26%20Vaca!5e0!3m2!1sen!2sin!4v1726999999999!5m2!1sen!2sin",
  cuisine: ["Burgers", "Beef", "Pork", "Pizza", "American", "International"],
  priceRange: "₹₹₹",
  // Hours not officially verified — displaying as general guidance only
  hoursNote: "Call +91 81900 05040 for current hours & reservations.",
} as const;
