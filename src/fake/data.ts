export const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life.",
    price: 99.99,
    category: "Electronics",
    stock: 150,
    rating: 4.5,
    reviews: [
      { user: "Alice", comment: "Great sound quality!", rating: 5 },
      { user: "Bob", comment: "Very comfortable to wear.", rating: 4 },
    ],
    features: [
      "Bluetooth 5.0",
      "Active Noise Cancellation",
      "20-hour Battery Life",
      "Built-in Microphone",
    ],
    images: ["https://www.atlantistelecom.com/8781-large_default/head-wireless-headphones-anc-enc-microphone-30h-battery-life-calling-35-mm-jack-cable-case-black.jpg", "https://vieta.es/cdn/shop/files/calm2.jpg?v=1760419350&width=1800"],
    brand: "SoundMagic",
    model: "SM-1000",
    warranty: "2 years",
    releaseDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Microwave Oven",
    description:
      "Compact microwave oven with multiple power levels and a digital display.",
    price: 79.99,
    category: "Home Appliances",
    stock: 80,
    rating: 4.2,
    reviews: [
      { user: "Charlie", comment: "Heats food quickly.", rating: 4 },
      { user: "Dana", comment: "Easy to use and clean.", rating: 5 },
    ],
    features: [
      "700 Watts Power",
      "10 Power Levels",
      "Digital Display",
      "Child Lock Feature",
    ],
    images: ["https://sogo.es/wp-content/uploads/SS-855-3000x3000-1-scaled.jpg", "https://b.scdn.gr/images/sku_main_images/059560/59560897/xlarge_20250331160924_sogo_hor_ss_855_fournos_mikrokymaton_20lt.jpeg"],
    brand: "KitchenPro",
    model: "KP-700",
    warranty: "1 year",
    releaseDate: "2022-11-20",
  },
];
