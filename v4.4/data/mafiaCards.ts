export interface MafiaCard {
  id: number
  title: string
  tagline: string
  character: string
  reward: string
  terms?: string
  image: string
  isSpecial?: boolean
}

export const MAFIA_CARDS: MafiaCard[] = [
  {
    id: 1,
    title: "COME & TRY OUT YOUR LUCK",
    tagline: "Porca & Vaca Anniversary Week",
    character: "Anniversary Week Cover",
    reward: "Anniversary Celebration (Sep 2 - Sep 6)",
    terms: "Limited Anniversary Window",
    image: "/mafia/01_anniversary_luck.jpg",
    isSpecial: true,
  },
  {
    id: 2,
    title: "PICK YOUR POISON",
    tagline: "Your call",
    character: "Morpheus Pig with Red & Blue Pills (Matrix)",
    reward: "CHOOSE ONE: DRINK / DESSERT / SIDE",
    image: "/mafia/02_pick_your_poison.jpg",
  },
  {
    id: 3,
    title: "COME BACK FOR MORE",
    tagline: "You weren't supposed to know about this",
    character: "Red Carpet VIP Bull & Limousine",
    reward: "₹1000 OFF YOUR NEXT VISIT",
    terms: "Valid until 30 September 2026",
    image: "/mafia/03_come_back_1000_off.jpg",
  },
  {
    id: 4,
    title: "CHEF'S CALL",
    tagline: "Come back. We'll take it from here.",
    character: "Executive Chef Pig with Artisan Pie",
    reward: "A SURPRISE DISH ON YOUR NEXT VISIT",
    terms: "Valid until 30 September 2026. Subject to availability.",
    image: "/mafia/04_chefs_call_surprise.jpg",
  },
  {
    id: 5,
    title: "DESSERT CHOSE YOU",
    tagline: "Some endings are meant to be sweet",
    character: "Thanos Pig with Golden Infinity Gauntlet",
    reward: "1 COMPLIMENTARY DESSERT",
    image: "/mafia/05_dessert_chose_you.jpg",
  },
  {
    id: 6,
    title: "THE MAFIA SEND ITS REGARDS",
    tagline: "Come back hungry",
    character: "Bull & Pig Enforcers with Gold Bar Briefcases",
    reward: "₹500 OFF YOUR BILL",
    terms: "Valid until 30 September 2026",
    image: "/mafia/06_mafia_regards_500_off.jpg",
  },
  {
    id: 7,
    title: "EVERYONE GETS SOMETHING",
    tagline: "The odds are clearly on your side",
    character: "The Last Supper Barnyard Mafia Gathering",
    reward: "10% OFF YOUR BILL",
    image: "/mafia/07_everyone_gets_something_10_off.jpg",
  },
  {
    id: 8,
    title: "DRINKS ON US",
    tagline: "Sip first. Ask questions later",
    character: "Bull & Pig Selfie with Craft Cocktail Platter",
    reward: "COMPLIMENTARY DRINKS",
    terms: "Subject to availability. An equivalent alternative will be offered if unavailable.",
    image: "/mafia/08_drinks_on_us.jpg",
  },
  {
    id: 9,
    title: "BIG WIN ENERGY",
    tagline: "The odds are clearly on your side",
    character: "Champagne Popping & Confetti Celebration",
    reward: "25% OFF YOUR BILL",
    terms: "Maximum discount ₹750",
    image: "/mafia/09_big_win_25_off.jpg",
  },
  {
    id: 10,
    title: "HALF THE DAMAGE",
    tagline: "You got away with half of it",
    character: "Venom Symbiote Transformation Pig",
    reward: "50% OFF YOUR BILL",
    terms: "Maximum discount ₹1,000",
    image: "/mafia/10_half_the_damage_50_off.jpg",
  },
  {
    id: 11,
    title: "THE GODFATHER",
    tagline: "The Mafia picked up the tab",
    character: "Don Vito Corleone Pig in Armchair with Bull Bodyguard",
    reward: "100% OFF YOUR BILL (JACKPOT)",
    terms: "Up to ₹2,000",
    image: "/mafia/11_the_godfather_100_off.jpg",
    isSpecial: true,
  },
  {
    id: 12,
    title: "PICK YOUR FATE",
    tagline: "Deliciously Different",
    character: "Dealer Bull & Pig with Playing Cards in Fire",
    reward: "Meat Mafia Deck Cover",
    image: "/mafia/12_pick_your_fate.jpg",
    isSpecial: true,
  },
]
