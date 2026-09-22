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
  instagram: "@porcaandvaca",
  instagramUrl: "https://www.instagram.com/porcaandvaca/",
  mapUrl:
    "https://www.google.com/maps/search/Porca+and+Vaca+Alwarpet+Chennai/@13.0334,80.2518,15z",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0!2d80.2518!3d13.0334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzAwLjIiTiA4MMKwMTUnMDYuNSJF!5e0!3m2!1sen!2sin!4v1600000000000",
  cuisine: ["Burgers", "Beef", "Pork", "Pizza", "American", "International"],
  priceRange: "₹₹₹",
  // Hours not officially verified — displaying as general guidance only
  hoursNote: "Call +91 81900 05040 for current hours & reservations.",
} as const;
