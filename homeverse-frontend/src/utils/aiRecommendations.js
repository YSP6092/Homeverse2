// AI-powered design recommendations
export const getDesignRecommendations = (formData, designData) => {
  const recommendations = {
    colorSchemes: [],
    furniture: [],
    styles: [],
    budgetAlternatives: [],
    completeLook: []
  };

  // Color scheme recommendations based on selected wall color
  const wallColorId = designData.wallColor?.id;
  const colorSchemes = {
    white: {
      name: 'Minimalist Modern',
      accent: 'navy',
      furniture: ['sofa-3seat', 'coffee-table', 'tv-unit'],
      description: 'Clean white walls pair perfectly with navy accents and modern furniture'
    },
    cream: {
      name: 'Warm Traditional',
      accent: 'maroon',
      furniture: ['sofa-3seat', 'wooden-shelf', 'coffee-table'],
      description: 'Cream walls create a cozy atmosphere with maroon accents'
    },
    gray: {
      name: 'Industrial Chic',
      accent: 'teal',
      furniture: ['modern-sofa', 'metal-table', 'floor-lamp'],
      description: 'Gray walls with teal accents for a contemporary industrial look'
    },
    blue: {
      name: 'Coastal Retreat',
      accent: 'gold',
      furniture: ['light-sofa', 'glass-table', 'plants'],
      description: 'Light blue walls with gold accents bring a seaside feel'
    }
  };

  if (wallColorId && colorSchemes[wallColorId]) {
    recommendations.colorSchemes.push(colorSchemes[wallColorId]);
  }

  // Furniture recommendations based on room type and budget
  const budget = formData.sqft * 5000; // Approximate budget
  const selectedFurnitureIds = designData.furniture.map(f => f.id);

  // Living Room recommendations
  if (!selectedFurnitureIds.includes('sofa-3seat') && !selectedFurnitureIds.includes('sofa-2seat')) {
    recommendations.furniture.push({
      category: 'Living Room',
      item: 'Sofa',
      reason: 'Essential seating for your living room',
      priority: 'high',
      options: [
        { id: 'sofa-3seat', name: '3-Seater Sofa', price: 35000 },
        { id: 'sofa-2seat', name: '2-Seater Sofa', price: 25000 }
      ]
    });
  }

  if (!selectedFurnitureIds.includes('coffee-table')) {
    recommendations.furniture.push({
      category: 'Living Room',
      item: 'Coffee Table',
      reason: 'Complete your seating area',
      priority: 'medium',
      options: [
        { id: 'coffee-table', name: 'Coffee Table', price: 8000 }
      ]
    });
  }

  // Bedroom recommendations
  if (!selectedFurnitureIds.includes('king-bed') && !selectedFurnitureIds.includes('queen-bed')) {
    recommendations.furniture.push({
      category: 'Bedroom',
      item: 'Bed',
      reason: 'Essential for your bedroom',
      priority: 'high',
      options: [
        { id: 'king-bed', name: 'King Size Bed', price: 45000 },
        { id: 'queen-bed', name: 'Queen Size Bed', price: 35000 }
      ]
    });
  }

  // Style recommendations based on property type
  const propertyType = formData.propertyType?.id;
  const styleRecommendations = {
    apartment: {
      name: 'Modern Minimalist',
      description: 'Clean lines and space-efficient furniture perfect for apartments',
      colors: ['white', 'gray', 'beige'],
      furniture: ['compact-sofa', 'wall-mounted-tv', 'floating-shelves']
    },
    villa: {
      name: 'Luxury Contemporary',
      description: 'Premium furniture and elegant color schemes for spacious villas',
      colors: ['cream', 'gold', 'navy'],
      furniture: ['sectional-sofa', 'chandelier', 'statement-pieces']
    },
    independent: {
      name: 'Traditional Elegance',
      description: 'Classic furniture with warm colors for independent houses',
      colors: ['cream', 'brown', 'maroon'],
      furniture: ['wooden-furniture', 'traditional-sofa', 'carved-details']
    }
  };

  if (propertyType && styleRecommendations[propertyType]) {
    recommendations.styles.push(styleRecommendations[propertyType]);
  }

  // Budget alternatives
  const totalFurnitureCost = designData.furniture.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (totalFurnitureCost > budget * 0.3) {
    recommendations.budgetAlternatives.push({
      message: 'Your furniture selection is premium. Here are budget-friendly alternatives:',
      savings: Math.round(totalFurnitureCost * 0.3),
      alternatives: [
        { original: 'King Bed', alternative: 'Queen Bed', savings: 10000 },
        { original: '3-Seater Sofa', alternative: '2-Seater Sofa', savings: 10000 }
      ]
    });
  }

  // Complete the look recommendations
  const hasSeating = selectedFurnitureIds.some(id => id.includes('sofa'));
  const hasTables = selectedFurnitureIds.some(id => id.includes('table'));
  const hasStorage = selectedFurnitureIds.some(id => id.includes('wardrobe') || id.includes('cabinet'));

  if (hasSeating && !hasTables) {
    recommendations.completeLook.push({
      item: 'Coffee Table',
      reason: 'Complement your seating area',
      price: 8000
    });
  }

  if (hasTables && !hasSeating) {
    recommendations.completeLook.push({
      item: 'Dining Chairs',
      reason: 'Essential for your dining table',
      price: 18000
    });
  }

  // Decor recommendations
  if (designData.furniture.length > 3 && !selectedFurnitureIds.includes('plants')) {
    recommendations.completeLook.push({
      item: 'Indoor Plants Set',
      reason: 'Add life and freshness to your space',
      price: 3000
    });
  }

  return recommendations;
};

// Popular combinations that work well together
export const getPopularCombinations = (city, budget) => {
  const combinations = [
    {
      name: 'Starter Home Package',
      budget: '₹2-3L',
      suitable: budget < 300000,
      items: [
        { name: '2-Seater Sofa', price: 25000 },
        { name: 'Coffee Table', price: 8000 },
        { name: 'Queen Bed', price: 35000 },
        { name: 'Wardrobe', price: 40000 },
        { name: 'Dining Table (4-seater)', price: 30000 }
      ],
      total: 138000,
      description: 'Essential furniture for a comfortable start'
    },
    {
      name: 'Modern Living Package',
      budget: '₹4-5L',
      suitable: budget >= 300000 && budget < 500000,
      items: [
        { name: '3-Seater Sofa', price: 35000 },
        { name: 'Coffee Table', price: 8000 },
        { name: 'TV Unit', price: 15000 },
        { name: 'King Bed', price: 45000 },
        { name: 'Wardrobe', price: 40000 },
        { name: 'Dining Table (6-seater)', price: 40000 },
        { name: 'Study Table', price: 15000 }
      ],
      total: 198000,
      description: 'Complete furnishing for modern living'
    },
    {
      name: 'Premium Package',
      budget: '₹6L+',
      suitable: budget >= 500000,
      items: [
        { name: '3-Seater Sofa Premium', price: 50000 },
        { name: 'Coffee Table Premium', price: 15000 },
        { name: 'TV Unit Premium', price: 25000 },
        { name: 'King Bed Premium', price: 60000 },
        { name: 'Wardrobe Premium', price: 55000 },
        { name: 'Dining Table Premium', price: 50000 },
        { name: 'Bar Cabinet', price: 20000 },
        { name: 'Premium Kitchen', price: 300000 }
      ],
      total: 575000,
      description: 'Luxury furnishing with premium materials'
    }
  ];

  return combinations.filter(combo => combo.suitable);
};

// Trending styles in Nagpur
export const getTrendingStyles = () => {
  return [
    {
      name: 'Minimalist Modern',
      popularity: 85,
      description: 'Clean lines, neutral colors, functional furniture',
      bestFor: ['Apartments', 'Small spaces'],
      colorPalette: ['#FFFFFF', '#F5F5F5', '#E8E8E8'],
      keyFeatures: ['Open spaces', 'Hidden storage', 'Multi-functional furniture']
    },
    {
      name: 'Contemporary Indian',
      popularity: 78,
      description: 'Blend of traditional and modern aesthetics',
      bestFor: ['Villas', 'Independent houses'],
      colorPalette: ['#F5F5DC', '#8B4513', '#800000'],
      keyFeatures: ['Wooden accents', 'Ethnic patterns', 'Warm lighting']
    },
    {
      name: 'Scandinavian',
      popularity: 72,
      description: 'Light, airy spaces with natural materials',
      bestFor: ['All property types'],
      colorPalette: ['#FFFFFF', '#87CEEB', '#F0E68C'],
      keyFeatures: ['Natural light', 'Wood tones', 'Minimalist decor']
    },
    {
      name: 'Industrial Chic',
      popularity: 65,
      description: 'Raw materials, exposed elements, urban feel',
      bestFor: ['Lofts', 'Modern apartments'],
      colorPalette: ['#808080', '#2F4F4F', '#D2691E'],
      keyFeatures: ['Metal accents', 'Exposed brick', 'Edison bulbs']
    }
  ];
};