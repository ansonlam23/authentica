export interface Business {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  address: string;
  neighborhood: string;
  imageUrl: string;
  rating: number;
}

export const BUSINESS_CATEGORIES = {
  "Food & Drink": ["Restaurant", "Coffee Shop", "Bakery", "Bar", "Fast Food", "Ice Cream", "Brewery"],
  "Retail": ["Grocery", "Convenience", "Pharmacy", "Bookstore", "Clothing Store", "Department Store"],
  "Services": ["Salon", "Beauty Salon", "Nail Salon", "Laundromat", "Repair", "Auto Service"],
  "Health": ["Dentist", "Doctor", "Veterinarian", "Pharmacy", "Physical Therapy"],
  "Fitness": ["Gym", "Sports Complex", "Yoga Studio", "Personal Training"],
  "Beauty": ["Nail Salon", "Salon", "Beauty Salon", "Spa"],
  "Professional": ["Bank", "Real Estate", "Legal", "Accounting", "Insurance"],
  "Other": ["Hotel", "Gas Station", "Car Wash", "Pet Store"]
};

export const LOCAL_BUSINESSES: Omit<Business, 'id'>[] = [
  // Food & Drink
  {
    name: "Greyhouse Coffee & Supply Co. – West Lafayette",
    category: "Food & Drink",
    subcategory: "Coffee Shop",
    description: "Cozy coffeehouse serving espresso drinks, crepes, gelato, and baked goods in a student-friendly atmosphere.",
    address: "100 Northwestern Ave Unit A",
    neighborhood: "West Lafayette",
    imageUrl: "/images/coffee.jpg",
    rating: 4.5
  },
  {
    name: "Leaps Coffee Shop",
    category: "Food & Drink",
    subcategory: "Coffee Shop",
    description: "Small, welcoming café on Grant Street with excellent coffee, pastries, and light breakfast items.",
    address: "201 Grant St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/coffee.jpg",
    rating: 4.4
  },
  {
    name: "Mochaland",
    category: "Food & Drink",
    subcategory: "Coffee Shop",
    description: "Modern coffee shop with house-made baklava and pastries, open late evenings to suit students.",
    address: "102 N Chauncey Ave Suite E",
    neighborhood: "West Lafayette",
    imageUrl: "/images/coffee.jpg",
    rating: 4.3
  },
  {
    name: "8Eleven Modern Bistro",
    category: "Food & Drink",
    subcategory: "Restaurant",
    description: "Upscale bistro serving multi-cuisine dishes, cocktails, and weekend brunch with a polished, date-friendly vibe.",
    address: "201 Grant St Ste 100",
    neighborhood: "West Lafayette",
    imageUrl: "/images/restaurant.jpg",
    rating: 4.6
  },
  {
    name: "Boiler Up Bar",
    category: "Food & Drink",
    subcategory: "Bar",
    description: "Sports-bar style spot with burgers, cocktails, and a lively atmosphere popular with students.",
    address: "201 Grant St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/bar.jpg",
    rating: 4.0
  },
  {
    name: "Flaming Kuma",
    category: "Food & Drink",
    subcategory: "Restaurant",
    description: "Fast-casual American spot known for creative hot dogs, corn dogs, and comfort plates.",
    address: "342 E State St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/restaurant.jpg",
    rating: 4.2
  },
  {
    name: "Pocha",
    category: "Food & Drink",
    subcategory: "Restaurant",
    description: "Korean-style restaurant with Korean barbecue, chicken wings, and bar-style small plates.",
    address: "150 S Chauncey Ave Suite 120-130",
    neighborhood: "West Lafayette",
    imageUrl: "/images/restaurant.jpg",
    rating: 4.4
  },
  {
    name: "Réveille Coffee Bar",
    category: "Food & Drink",
    subcategory: "Coffee Shop",
    description: "Downtown Lafayette coffee bar with house-roasted coffee, pastries, and light breakfast items.",
    address: "1001 Main St",
    neighborhood: "Lafayette",
    imageUrl: "/images/coffee.jpg",
    rating: 4.3
  },
  {
    name: "Sacred Grounds",
    category: "Food & Drink",
    subcategory: "Coffee Shop",
    description: "Historic coffeehouse with a warm, artsy vibe, good coffee, and simple breakfast and lunch fare.",
    address: "724 Wabash Ave",
    neighborhood: "Lafayette",
    imageUrl: "/images/coffee.jpg",
    rating: 4.2
  },
  {
    name: "The Eleventh House",
    category: "Food & Drink",
    subcategory: "Coffee Shop",
    description: "Coffee-plus-bagel shop with healthy-leaning bagel sandwiches and a quiet, studious interior.",
    address: "116 N 3rd St",
    neighborhood: "Lafayette",
    imageUrl: "/images/coffee.jpg",
    rating: 4.1
  },

  // Retail
  {
    name: "University Book Store (PurdueU)",
    category: "Retail",
    subcategory: "Bookstore",
    description: "University-aligned bookstore for textbooks, school supplies, Boilermaker apparel, and graduation gear.",
    address: "360 W State St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/bookstore.jpg",
    rating: 4.0
  },
  {
    name: "Target",
    category: "Retail",
    subcategory: "Department Store",
    description: "Compact Target near campus for essentials, clothes, electronics, and small home-goods items.",
    address: "300 W State St Ste 100",
    neighborhood: "West Lafayette",
    imageUrl: "/images/retail.jpg",
    rating: 4.2
  },
  {
    name: "Walmart Supercenter",
    category: "Retail",
    subcategory: "Grocery",
    description: "Large-format Walmart with full grocery, pharmacy, clothing, and general merchandise.",
    address: "2801 Northwestern Ave",
    neighborhood: "West Lafayette",
    imageUrl: "/images/grocery.jpg",
    rating: 3.8
  },
  {
    name: "Fresh Thyme Market",
    category: "Retail",
    subcategory: "Grocery",
    description: "Natural-/organics-leaning grocery store with produce, deli, and supplement sections.",
    address: "2410 N Salisbury St Suite 100",
    neighborhood: "West Lafayette",
    imageUrl: "/images/grocery.jpg",
    rating: 4.3
  },
  {
    name: "Better World Market",
    category: "Retail",
    subcategory: "Grocery",
    description: "Asian-focused grocery with fresh seafood, produce, and imported pantry staples.",
    address: "402 Brown St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/grocery.jpg",
    rating: 4.4
  },
  {
    name: "Discount Den",
    category: "Retail",
    subcategory: "Clothing Store",
    description: "Small campus-adjacent shop selling Purdue merch, casual wear, and snack items.",
    address: "618 W Stadium Ave",
    neighborhood: "West Lafayette",
    imageUrl: "/images/clothing.jpg",
    rating: 3.9
  },
  {
    name: "Vintage Vault",
    category: "Retail",
    subcategory: "Clothing Store",
    description: "Thrift and vintage shop with used clothes, collectibles, and video games.",
    address: "525 Wabash Ave",
    neighborhood: "Lafayette",
    imageUrl: "/images/clothing.jpg",
    rating: 4.1
  },
  {
    name: "Salisbury Market",
    category: "Retail",
    subcategory: "Convenience",
    description: "Gas-station-adjacent convenience store with snacks, drinks, lottery, and basic groceries.",
    address: "920 N Salisbury St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/convenience.jpg",
    rating: 3.7
  },

  // Services
  {
    name: "Henni's Hairshop",
    category: "Services",
    subcategory: "Salon",
    description: "Full-service hair salon and barber shop offering cuts, color, and styling for students and locals.",
    address: "121 Northwestern Ave",
    neighborhood: "West Lafayette",
    imageUrl: "/images/salon.jpg",
    rating: 4.3
  },
  {
    name: "Beaux Cheveux Styling Salon",
    category: "Services",
    subcategory: "Salon",
    description: "Boutique salon specializing in cuts, color, and hair extensions.",
    address: "327 Northwestern Ave",
    neighborhood: "West Lafayette",
    imageUrl: "/images/salon.jpg",
    rating: 4.4
  },
  {
    name: "Eclectic Hair Salon – Campus",
    category: "Services",
    subcategory: "Salon",
    description: "Student-friendly salon on Chauncey with cuts and basic color services.",
    address: "115 N Chauncey Ave",
    neighborhood: "West Lafayette",
    imageUrl: "/images/salon.jpg",
    rating: 4.2
  },
  {
    name: "D & J Nails",
    category: "Services",
    subcategory: "Nail Salon",
    description: "Reliable nail salon offering manicures, pedicures, and gel services.",
    address: "1056 Sagamore Pkwy W",
    neighborhood: "West Lafayette",
    imageUrl: "/images/nails.jpg",
    rating: 4.1
  },
  {
    name: "West Lafayette Nail & Spa",
    category: "Services",
    subcategory: "Nail Salon",
    description: "Nail-focused spa with clean, modern stations and a variety of nail-art styles.",
    address: "307 Sagamore Pkwy W #400",
    neighborhood: "West Lafayette",
    imageUrl: "/images/nails.jpg",
    rating: 4.2
  },
  {
    name: "Shilpa's Beauty Studio",
    category: "Services",
    subcategory: "Beauty Salon",
    description: "Small beauty studio offering nail and basic hair services in a relaxed setting.",
    address: "916 Main St",
    neighborhood: "Lafayette",
    imageUrl: "/images/beauty.jpg",
    rating: 4.0
  },
  {
    name: "Cabaret Hair Salon",
    category: "Services",
    subcategory: "Salon",
    description: "Family-oriented salon with haircuts, color, and nail services.",
    address: "1607 Kossuth St",
    neighborhood: "Lafayette",
    imageUrl: "/images/salon.jpg",
    rating: 4.1
  },
  {
    name: "Ladybug Laundry",
    category: "Services",
    subcategory: "Laundromat",
    description: "Clean, well-maintained laundromat with coin-or-card washers and dryers.",
    address: "1317 Union St",
    neighborhood: "Lafayette",
    imageUrl: "/images/laundromat.jpg",
    rating: 4.0
  },

  // Health
  {
    name: "Purdue University Small Animal Hospital",
    category: "Health",
    subcategory: "Veterinarian",
    description: "24-hour veterinary hospital for pets; accepts emergencies and routine care.",
    address: "625 Harrison St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/vet.jpg",
    rating: 4.6
  },
  {
    name: "CustomPlus Pharmacy",
    category: "Health",
    subcategory: "Pharmacy",
    description: "Independent pharmacy with Rx dispensing and medication-disposal services.",
    address: "482 W Navajo St Suite A",
    neighborhood: "West Lafayette",
    imageUrl: "/images/pharmacy.jpg",
    rating: 4.2
  },
  {
    name: "CVS Pharmacy (Sagamore Pkwy W)",
    category: "Health",
    subcategory: "Pharmacy",
    description: "Standard CVS with prescriptions, OTC meds, photos, and basic health products.",
    address: "512 Sagamore Pkwy W",
    neighborhood: "West Lafayette",
    imageUrl: "/images/pharmacy.jpg",
    rating: 3.8
  },
  {
    name: "Walgreens Pharmacy (Sagamore Pkwy W)",
    category: "Health",
    subcategory: "Pharmacy",
    description: "Nationwide pharmacy chain branch with drive-through and standard pharmacy services.",
    address: "1000 Sagamore Pkwy W",
    neighborhood: "West Lafayette",
    imageUrl: "/images/pharmacy.jpg",
    rating: 3.9
  },

  // Fitness
  {
    name: "France A. Córdova Recreational Sports Center",
    category: "Fitness",
    subcategory: "Gym",
    description: "Main campus recreation center with weight rooms, cardio, courts, and group-fitness classes.",
    address: "355 N Martin Jischke Dr",
    neighborhood: "West Lafayette",
    imageUrl: "/images/gym.jpg",
    rating: 4.5
  },
  {
    name: "CrossFit West Lafayette",
    category: "Fitness",
    subcategory: "Gym",
    description: "Cross-Fit gym with coached WODs, small groups, and beginner-friendly classes.",
    address: "304 Brown St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/gym.jpg",
    rating: 4.4
  },
  {
    name: "Empire Fitness",
    category: "Fitness",
    subcategory: "Gym",
    description: "24-hour gym with free-weight and machine setups, sauna, and open atmosphere.",
    address: "2200 Elmwood Ave Ste A7A",
    neighborhood: "Lafayette",
    imageUrl: "/images/gym.jpg",
    rating: 4.2
  },
  {
    name: "Lafayette Family YMCA Downtown",
    category: "Fitness",
    subcategory: "Gym",
    description: "YMCA facility with a pool, cardio, weights, and community programs.",
    address: "250 Main St #50b",
    neighborhood: "Lafayette",
    imageUrl: "/images/gym.jpg",
    rating: 4.3
  },
  {
    name: "TREC (Turf Recreation Exercise Center)",
    category: "Fitness",
    subcategory: "Sports Complex",
    description: "Indoor turf and sports complex for sports leagues and open-play activities.",
    address: "1252 3rd St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/sports.jpg",
    rating: 4.1
  },
  {
    name: "Fit4Ever Health & Wellness",
    category: "Fitness",
    subcategory: "Gym",
    description: "Small wellness-oriented gym with functional training and personal-training options.",
    address: "319 Cincinnati St",
    neighborhood: "Lafayette",
    imageUrl: "/images/gym.jpg",
    rating: 4.0
  },

  // Beauty
  {
    name: "Luxury Nail Spa",
    category: "Beauty",
    subcategory: "Nail Salon",
    description: "Upscale nail spa with a wide range of manicure, pedicure, and nail-art options.",
    address: "1185 Sagamore Pkwy W Suite 7",
    neighborhood: "West Lafayette",
    imageUrl: "/images/nails.jpg",
    rating: 4.5
  },
  {
    name: "Soul House Hair",
    category: "Beauty",
    subcategory: "Salon",
    description: "Hair salon emphasizing natural styles and protective cuts.",
    address: "507 Columbia St",
    neighborhood: "Lafayette",
    imageUrl: "/images/salon.jpg",
    rating: 4.3
  },
  {
    name: "Ace High Hair Club",
    category: "Beauty",
    subcategory: "Salon",
    description: "LGBTQ-friendly hair salon with a focus on inclusive, gender-neutral services.",
    address: "658 Main St Suite 210",
    neighborhood: "Lafayette",
    imageUrl: "/images/salon.jpg",
    rating: 4.4
  },

  // Professional
  {
    name: "Chase Bank (W State St)",
    category: "Professional",
    subcategory: "Bank",
    description: "Chase branch with ATMs and basic banking services near campus.",
    address: "210 W State St",
    neighborhood: "West Lafayette",
    imageUrl: "/images/bank.jpg",
    rating: 4.0
  },
  {
    name: "Chase Bank (Sagamore Pkwy W)",
    category: "Professional",
    subcategory: "Bank",
    description: "Second Chase branch on Sagamore serving residents and students.",
    address: "309 Sagamore Pkwy W",
    neighborhood: "West Lafayette",
    imageUrl: "/images/bank.jpg",
    rating: 4.0
  },
  {
    name: "Centier Bank (Main St)",
    category: "Professional",
    subcategory: "Bank",
    description: "Local Indiana bank with branch services and financial-planning support.",
    address: "201 Main St Suite 100",
    neighborhood: "Lafayette",
    imageUrl: "/images/bank.jpg",
    rating: 4.1
  },
  {
    name: "First Merchants Bank",
    category: "Professional",
    subcategory: "Bank",
    description: "Regional bank providing personal and business financial services.",
    address: "250 Main St",
    neighborhood: "Lafayette",
    imageUrl: "/images/bank.jpg",
    rating: 4.0
  },
  {
    name: "1st Source Bank",
    category: "Professional",
    subcategory: "Bank",
    description: "Full-service bank with drive-through and investment-oriented services.",
    address: "133 N 4th St",
    neighborhood: "Lafayette",
    imageUrl: "/images/bank.jpg",
    rating: 4.1
  },
  {
    name: "Old National Bank",
    category: "Professional",
    subcategory: "Bank",
    description: "Community-focused bank with standard personal-banking services.",
    address: "100 N 2nd St",
    neighborhood: "Lafayette",
    imageUrl: "/images/bank.jpg",
    rating: 3.9
  },
  {
    name: "Horizon Bank (South St)",
    category: "Professional",
    subcategory: "Bank",
    description: "Local-brand bank branch with drive-through and basic loan services.",
    address: "301 South St",
    neighborhood: "Lafayette",
    imageUrl: "/images/bank.jpg",
    rating: 3.8
  },
  {
    name: "Horizon Bank (Northwestern Ave)",
    category: "Professional",
    subcategory: "Bank",
    description: "Horizon branch convenient for West Lafayette and Purdue-area residents.",
    address: "1980 Northwestern Ave",
    neighborhood: "West Lafayette",
    imageUrl: "/images/bank.jpg",
    rating: 3.9
  }
];