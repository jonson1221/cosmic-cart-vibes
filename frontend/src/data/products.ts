
import { Product } from "@/context/CartContext";

export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Radiance Facial Serum",
    price: 68.00,
    description: "A powerful serum packed with vitamin C and hyaluronic acid to brighten and hydrate your skin. This lightweight formula absorbs quickly and works to reduce the appearance of fine lines and dark spots.",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop",
    category: "skincare"
  },
  {
    id: 2,
    name: "Hydrating Moisturizer",
    price: 45.00,
    description: "This rich, luxurious moisturizer provides long-lasting hydration for dry to normal skin. Formulated with shea butter and ceramides to strengthen your skin barrier.",
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf13?q=80&w=800&auto=format&fit=crop",
    category: "skincare"
  },
  {
    id: 3,
    name: "Gentle Cleansing Foam",
    price: 32.00,
    description: "A gentle, sulfate-free foaming cleanser that effectively removes makeup and impurities without stripping your skin of essential moisture.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop",
    category: "skincare"
  },
  {
    id: 4,
    name: "Exfoliating Facial Scrub",
    price: 38.00,
    description: "A gentle yet effective exfoliating scrub that removes dead skin cells, unclogs pores, and leaves your skin feeling smooth and renewed.",
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824ce?q=80&w=800&auto=format&fit=crop",
    category: "skincare"
  },
  {
    id: 5,
    name: "Matte Liquid Lipstick",
    price: 24.00,
    description: "A long-wearing, highly pigmented liquid lipstick that dries to a beautiful matte finish. Available in 12 stunning shades.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop",
    category: "makeup"
  },
  {
    id: 6,
    name: "Volumizing Mascara",
    price: 28.00,
    description: "This mascara adds incredible volume and length to your lashes without clumping. The unique brush separates and defines each lash.",
    image: "https://images.unsplash.com/photo-1631214503851-36fc7ef0cfb3?q=80&w=800&auto=format&fit=crop",
    category: "makeup"
  },
  {
    id: 7,
    name: "Smoothing Foundation",
    price: 42.00,
    description: "A medium to full coverage foundation that smooths and evens out your skin tone while providing a natural, radiant finish.",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop",
    category: "makeup"
  },
  {
    id: 8,
    name: "Eyeshadow Palette",
    price: 54.00,
    description: "A collection of 12 highly pigmented, blendable eyeshadows in matte, shimmer, and metallic finishes. Perfect for creating everyday and dramatic looks.",
    image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?q=80&w=800&auto=format&fit=crop",
    category: "makeup"
  },
  {
    id: 9,
    name: "Nourishing Shampoo",
    price: 26.00,
    description: "A gentle, sulfate-free shampoo that cleanses your hair while providing essential moisture and nutrients.",
    image: "https://images.unsplash.com/photo-1633253028619-dea9b2eccead?q=80&w=800&auto=format&fit=crop",
    category: "haircare"
  },
  {
    id: 10,
    name: "Repairing Hair Mask",
    price: 34.00,
    description: "An intensive treatment that repairs damaged hair, restores elasticity, and prevents breakage. Perfect for dry, color-treated, or heat-styled hair.",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop",
    category: "haircare"
  },
  {
    id: 11,
    name: "Texturizing Hair Spray",
    price: 29.00,
    description: "A lightweight spray that adds volume, texture, and hold to your hair without stickiness or stiffness.",
    image: "https://images.unsplash.com/photo-1633253284116-cc62f6afdd24?q=80&w=800&auto=format&fit=crop",
    category: "haircare"
  },
  {
    id: 12,
    name: "Citrus Blossom Perfume",
    price: 85.00,
    description: "A refreshing fragrance with notes of citrus, jasmine, and cedar wood. Long-lasting and perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
    category: "fragrances"
  },
  // New products start here
  {
    id: 13,
    name: "Overnight Repair Serum",
    price: 76.00,
    description: "This powerful nighttime treatment works while you sleep to repair and rejuvenate your skin, reducing the appearance of fine lines and wrinkles.",
    image: "https://images.unsplash.com/photo-1620916566886-f6b4296d163d?q=80&w=800&auto=format&fit=crop",
    category: "skincare"
  },
  {
    id: 14,
    name: "Brightening Eye Cream",
    price: 48.00,
    description: "Specifically formulated for the delicate eye area, this cream reduces puffiness, dark circles, and fine lines while providing intense hydration.",
    image: "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=800&auto=format&fit=crop",
    category: "skincare"
  },
  {
    id: 15,
    name: "Clay Purifying Mask",
    price: 36.00,
    description: "A detoxifying clay mask that draws out impurities, unclogs pores, and balances oil production for clearer, more refined skin.",
    image: "https://images.unsplash.com/photo-1629722372596-91f4f7d4e8e1?q=80&w=800&auto=format&fit=crop",
    category: "skincare"
  },
  {
    id: 16,
    name: "Hydrating Lip Balm",
    price: 18.00,
    description: "A nourishing lip balm infused with natural oils and butters to hydrate, repair, and protect dry, chapped lips.",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=800&auto=format&fit=crop",
    category: "skincare"
  },
  {
    id: 17,
    name: "Cream Blush",
    price: 32.00,
    description: "A creamy, blendable blush that adds a natural flush of color to your cheeks with a dewy, radiant finish.",
    image: "https://images.unsplash.com/photo-1596704017268-51a97c21bc64?q=80&w=800&auto=format&fit=crop",
    category: "makeup"
  },
  {
    id: 18,
    name: "Waterproof Eyeliner",
    price: 22.00,
    description: "A long-lasting, waterproof eyeliner that glides on smoothly and stays put all day without smudging or fading.",
    image: "https://images.unsplash.com/photo-1631214503051-14a33b946554?q=80&w=800&auto=format&fit=crop",
    category: "makeup"
  },
  {
    id: 19,
    name: "Hydrating Setting Spray",
    price: 29.00,
    description: "A fine mist that sets your makeup in place while providing a boost of hydration for a fresh, dewy finish that lasts all day.",
    image: "https://images.unsplash.com/photo-1619451334211-15ddac6e7aaf?q=80&w=800&auto=format&fit=crop",
    category: "makeup"
  },
  {
    id: 20,
    name: "Tinted Brow Gel",
    price: 26.00,
    description: "A tinted gel that fills, shapes, and sets your brows in place for a natural, polished look that lasts all day.",
    image: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?q=80&w=800&auto=format&fit=crop",
    category: "makeup"
  },
  {
    id: 21,
    name: "Curl Defining Cream",
    price: 32.00,
    description: "A hydrating cream that defines and enhances natural curls while taming frizz and adding shine.",
    image: "https://images.unsplash.com/photo-1599751449418-67da0759413f?q=80&w=800&auto=format&fit=crop",
    category: "haircare"
  },
  {
    id: 22,
    name: "Scalp Treatment Oil",
    price: 38.00,
    description: "A nourishing oil blend that soothes and balances the scalp while promoting healthy hair growth.",
    image: "https://images.unsplash.com/photo-1599425347023-6d177cf21ce8?q=80&w=800&auto=format&fit=crop",
    category: "haircare"
  },
  {
    id: 23,
    name: "Heat Protectant Spray",
    price: 28.00,
    description: "A lightweight spray that shields your hair from heat damage while adding shine and reducing frizz.",
    image: "https://images.unsplash.com/photo-1630082900894-adca8139b3be?q=80&w=800&auto=format&fit=crop",
    category: "haircare"
  },
  {
    id: 24,
    name: "Vanilla Amber Perfume",
    price: 92.00,
    description: "A warm, sophisticated fragrance with notes of vanilla, amber, and sandalwood. Perfect for evening wear.",
    image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=800&auto=format&fit=crop",
    category: "fragrances"
  }
];

// Featured products for the homepage
export const FEATURED_PRODUCTS = ALL_PRODUCTS.slice(0, 8);
