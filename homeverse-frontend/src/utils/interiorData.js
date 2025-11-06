// Paint colors with prices
export const paintColors = {
  walls: [
    { id: 'white', name: 'Pure White', color: '#FFFFFF', pricePerSqft: 15 },
    { id: 'cream', name: 'Warm Cream', color: '#F5F5DC', pricePerSqft: 18 },
    { id: 'gray', name: 'Modern Gray', color: '#9E9E9E', pricePerSqft: 20 },
    { id: 'blue', name: 'Sky Blue', color: '#87CEEB', pricePerSqft: 22 },
    { id: 'green', name: 'Mint Green', color: '#98FF98', pricePerSqft: 22 },
    { id: 'beige', name: 'Sandy Beige', color: '#F5F5DC', pricePerSqft: 18 },
    { id: 'lavender', name: 'Soft Lavender', color: '#E6E6FA', pricePerSqft: 25 }
  ],
  accent: [
    { id: 'navy', name: 'Navy Blue', color: '#000080', pricePerSqft: 30 },
    { id: 'maroon', name: 'Deep Maroon', color: '#800000', pricePerSqft: 30 },
    { id: 'teal', name: 'Teal', color: '#008080', pricePerSqft: 28 },
    { id: 'gold', name: 'Golden Yellow', color: '#FFD700', pricePerSqft: 35 }
  ]
};

// Flooring options
export const flooringOptions = [
  { id: 'tile', name: 'Ceramic Tiles', pricePerSqft: 80, image: '🔲' },
  { id: 'wood', name: 'Wooden Flooring', pricePerSqft: 150, image: '🪵' },
  { id: 'marble', name: 'Marble', pricePerSqft: 200, image: '💎' },
  { id: 'vinyl', name: 'Vinyl Flooring', pricePerSqft: 60, image: '📋' },
  { id: 'carpet', name: 'Carpet', pricePerSqft: 50, image: '🧶' }
];

// Furniture catalog
export const furnitureItems = {
  livingRoom: [
    { id: 'sofa-3seat', name: '3-Seater Sofa', price: 35000, category: 'seating', icon: '🛋️' },
    { id: 'sofa-2seat', name: '2-Seater Sofa', price: 25000, category: 'seating', icon: '🛋️' },
    { id: 'coffee-table', name: 'Coffee Table', price: 8000, category: 'table', icon: '🪑' },
    { id: 'tv-unit', name: 'TV Unit', price: 15000, category: 'storage', icon: '📺' },
    { id: 'bookshelf', name: 'Bookshelf', price: 12000, category: 'storage', icon: '📚' },
    { id: 'side-table', name: 'Side Table', price: 5000, category: 'table', icon: '🪑' },
    { id: 'ottoman', name: 'Ottoman', price: 6000, category: 'seating', icon: '🪑' },
    { id: 'floor-lamp', name: 'Floor Lamp', price: 3000, category: 'lighting', icon: '💡' }
  ],
  bedroom: [
    { id: 'king-bed', name: 'King Size Bed', price: 45000, category: 'bed', icon: '🛏️' },
    { id: 'queen-bed', name: 'Queen Size Bed', price: 35000, category: 'bed', icon: '🛏️' },
    { id: 'wardrobe', name: 'Wardrobe', price: 40000, category: 'storage', icon: '🚪' },
    { id: 'bedside-table', name: 'Bedside Table', price: 7000, category: 'table', icon: '🪑' },
    { id: 'dresser', name: 'Dresser with Mirror', price: 25000, category: 'storage', icon: '🪞' },
    { id: 'study-table', name: 'Study Table', price: 15000, category: 'table', icon: '🪑' },
    { id: 'chair', name: 'Study Chair', price: 8000, category: 'seating', icon: '🪑' }
  ],
  dining: [
    { id: 'dining-table-6', name: '6-Seater Dining Table', price: 40000, category: 'table', icon: '🍽️' },
    { id: 'dining-table-4', name: '4-Seater Dining Table', price: 30000, category: 'table', icon: '🍽️' },
    { id: 'dining-chairs', name: 'Dining Chairs (Set of 6)', price: 18000, category: 'seating', icon: '🪑' },
    { id: 'crockery-unit', name: 'Crockery Unit', price: 25000, category: 'storage', icon: '🍽️' },
    { id: 'bar-cabinet', name: 'Bar Cabinet', price: 20000, category: 'storage', icon: '🍷' }
  ],
  kitchen: [
    { id: 'modular-basic', name: 'Basic Modular Kitchen', price: 150000, category: 'kitchen', icon: '🍳' },
    { id: 'modular-premium', name: 'Premium Modular Kitchen', price: 300000, category: 'kitchen', icon: '🍳' },
    { id: 'kitchen-island', name: 'Kitchen Island', price: 50000, category: 'kitchen', icon: '🏝️' }
  ],
  decor: [
    { id: 'wall-art', name: 'Wall Art (Set of 3)', price: 5000, category: 'decor', icon: '🖼️' },
    { id: 'curtains', name: 'Curtains (Per Window)', price: 4000, category: 'decor', icon: '🪟' },
    { id: 'rug', name: 'Area Rug', price: 8000, category: 'decor', icon: '🧶' },
    { id: 'plants', name: 'Indoor Plants (Set)', price: 3000, category: 'decor', icon: '🪴' },
    { id: 'mirror', name: 'Decorative Mirror', price: 6000, category: 'decor', icon: '🪞' },
    { id: 'cushions', name: 'Cushion Set (5 pcs)', price: 2500, category: 'decor', icon: '🛋️' }
  ]
};

// Room templates
export const roomTemplates = {
  '1BHK': {
    rooms: ['Living Room', 'Bedroom', 'Kitchen'],
    totalArea: 600
  },
  '2BHK': {
    rooms: ['Living Room', 'Master Bedroom', 'Bedroom 2', 'Kitchen', 'Dining'],
    totalArea: 900
  },
  '3BHK': {
    rooms: ['Living Room', 'Master Bedroom', 'Bedroom 2', 'Bedroom 3', 'Kitchen', 'Dining'],
    totalArea: 1200
  },
  '4BHK': {
    rooms: ['Living Room', 'Master Bedroom', 'Bedroom 2', 'Bedroom 3', 'Bedroom 4', 'Kitchen', 'Dining', 'Study'],
    totalArea: 1600
  }
};

// Labor costs
export const laborCosts = {
  painting: 25, // per sqft
  flooring: 30, // per sqft
  electrical: 15000, // flat rate
  plumbing: 12000, // flat rate
  carpentry: 20000 // flat rate
};