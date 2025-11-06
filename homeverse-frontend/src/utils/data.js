// Nagpur zones with average price per sqft
export const nagpurZones = {
  central: {
    name: 'Central Nagpur',
    avgPrice: 4500,
    localities: [
      'Sitabuldi', 'Dharampeth', 'Mahal', 'Gandhibagh', 'Bajaj Nagar',
      'Ramdaspeth', 'Civil Lines', 'Mominpura', 'Itwari', 'Jaripatka'
    ]
  },
  east: {
    name: 'East Nagpur',
    avgPrice: 4200,
    localities: [
      'Laxmi Nagar', 'Shankar Nagar', 'Mankapur', 'Pratap Nagar', 
      'Besa', 'Cotton Market', 'Nandanvan', 'Ajni'
    ]
  },
  west: {
    name: 'West Nagpur',
    avgPrice: 4800,
    localities: [
      'Dharampeth', 'Dhantoli', 'Hanuman Nagar', 'Seminary Hills',
      'CA Road', 'Gokulpeth', 'Ramnagar', 'South Ambazari Road'
    ]
  },
  south: {
    name: 'South Nagpur',
    avgPrice: 3800,
    localities: [
      'Wadi', 'Hingna', 'Telephone Exchange Square', 'Pachpaoli',
      'Vayusena Nagar', 'Sonegaon', 'MIHAN', 'Airport Area'
    ]
  },
  north: {
    name: 'North Nagpur',
    avgPrice: 3200,
    localities: [
      'Khamla', 'Kalamna', 'Nara', 'Bhandewadi', 'Khare Town',
      'Ashi Nagar', 'Indora', 'Koradi Road'
    ]
  },
  outskirts: {
    name: 'Outer Nagpur',
    avgPrice: 2500,
    localities: [
      'Kamptee', 'Kanhan', 'Waddhamna', 'Fetri', 'Parseoni',
      'Umred Road', 'Katol Road', 'Kalmeshwar'
    ]
  }
};

// Major landmarks and their price multipliers
export const nagpurLandmarks = {
  'VCA Stadium': { zone: 'central', multiplier: 1.15 },
  'Empress City Mall': { zone: 'west', multiplier: 1.12 },
  'Futala Lake': { zone: 'west', multiplier: 1.20 },
  'Ambazari Lake': { zone: 'west', multiplier: 1.18 },
  'Seminary Hills': { zone: 'west', multiplier: 1.25 },
  'Airport': { zone: 'south', multiplier: 1.10 },
  'MIHAN': { zone: 'south', multiplier: 1.15 },
  'AIIMS': { zone: 'central', multiplier: 1.20 },
  'IIM Nagpur': { zone: 'central', multiplier: 1.18 },
  'VNIT': { zone: 'south', multiplier: 1.15 },
  'GMC': { zone: 'central', multiplier: 1.12 },
  'Railway Station': { zone: 'central', multiplier: 1.10 },
  'Sadar': { zone: 'central', multiplier: 1.08 },
  'Kasturchand Park': { zone: 'central', multiplier: 1.10 }
};

// Property types and their multipliers
export const propertyTypes = [
  { id: 'apartment', name: 'Apartment', multiplier: 1.0, icon: '🏢' },
  { id: 'independent', name: 'Independent House', multiplier: 1.15, icon: '🏠' },
  { id: 'villa', name: 'Villa', multiplier: 1.30, icon: '🏡' },
  { id: 'penthouse', name: 'Penthouse', multiplier: 1.50, icon: '🏙️' },
  { id: 'duplex', name: 'Duplex', multiplier: 1.25, icon: '🏘️' }
];

// Building age factor
export const buildingAge = [
  { id: 'new', name: 'Under Construction', multiplier: 1.10, icon: '🏗️' },
  { id: '0-5', name: '0-5 Years', multiplier: 1.05, icon: '✨' },
  { id: '5-10', name: '5-10 Years', multiplier: 1.0, icon: '🏢' },
  { id: '10-15', name: '10-15 Years', multiplier: 0.95, icon: '🏠' },
  { id: '15+', name: '15+ Years', multiplier: 0.85, icon: '🏚️' }
];

// Amenities
export const amenities = [
  { id: 'parking', name: 'Covered Parking', price: 150000, icon: '🚗' },
  { id: 'gym', name: 'Gymnasium', price: 0, priceImpact: 1.03, icon: '💪' },
  { id: 'pool', name: 'Swimming Pool', price: 0, priceImpact: 1.05, icon: '🏊' },
  { id: 'garden', name: 'Garden', price: 0, priceImpact: 1.02, icon: '🌳' },
  { id: 'security', name: '24/7 Security', price: 0, priceImpact: 1.02, icon: '🔒' },
  { id: 'lift', name: 'Lift', price: 0, priceImpact: 1.04, icon: '🛗' },
  { id: 'powerbackup', name: 'Power Backup', price: 0, priceImpact: 1.02, icon: '⚡' },
  { id: 'clubhouse', name: 'Club House', price: 0, priceImpact: 1.04, icon: '🎯' }
];

// AI function to predict zone from location name
export const predictZone = (locationInput) => {
  const input = locationInput.toLowerCase().trim();
  
  // Check if location matches any known locality
  for (const [zoneKey, zoneData] of Object.entries(nagpurZones)) {
    for (const locality of zoneData.localities) {
      if (input.includes(locality.toLowerCase())) {
        return { zone: zoneKey, confidence: 'high', matchedLocality: locality };
      }
    }
  }
  
  // Check landmarks
  for (const [landmark, data] of Object.entries(nagpurLandmarks)) {
    if (input.includes(landmark.toLowerCase())) {
      return { zone: data.zone, confidence: 'high', matchedLandmark: landmark };
    }
  }
  
  // Use keywords to predict zone
  const keywords = {
    central: ['sitabuldi', 'dharampeth', 'mahal', 'civil', 'itwari', 'sadar', 'gandhi'],
    east: ['laxmi', 'shankar', 'mankapur', 'pratap', 'besa', 'nandanvan', 'cotton'],
    west: ['dhantoli', 'seminary', 'futala', 'ambazari', 'hanuman', 'gokulpeth', 'ramnagar'],
    south: ['wadi', 'hingna', 'sonegaon', 'airport', 'mihan', 'pachpaoli', 'vayusena'],
    north: ['khamla', 'kalamna', 'nara', 'khare', 'ashi', 'indora', 'koradi'],
    outskirts: ['kamptee', 'kanhan', 'waddhamna', 'fetri', 'umred', 'katol', 'kalmeshwar']
  };
  
  for (const [zone, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (input.includes(word)) {
        return { zone, confidence: 'medium' };
      }
    }
  }
  
  // Default to central if no match
  return { zone: 'central', confidence: 'low' };
};

// Get popular localities for autocomplete
export const getPopularLocalities = () => {
  const allLocalities = [];
  Object.values(nagpurZones).forEach(zone => {
    zone.localities.forEach(locality => {
      allLocalities.push(locality);
    });
  });
  return allLocalities.sort();
};

// Get landmark suggestions
export const getLandmarks = () => {
  return Object.keys(nagpurLandmarks).sort();
};