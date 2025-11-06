import { nagpurZones, predictZone, nagpurLandmarks } from './data';

// API URL - Change this when deploying
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Use ML-enhanced prediction
export const predictPrice = async (formData) => {
  try {
    // Try ML backend first
    const response = await fetch(`${API_URL}/predict-ml`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('ML Backend API failed');
    }

    const data = await response.json();
    
    if (data.success) {
      return data.prediction;
    } else {
      throw new Error(data.error || 'Prediction failed');
    }
  } catch (error) {
    console.warn('ML Backend unavailable, using frontend fallback:', error.message);
    // Fallback to frontend prediction
    return predictPriceFrontend(formData);
  }
};

// Frontend fallback prediction
const predictPriceFrontend = (formData) => {
  const { location, bedrooms, sqft, propertyType, buildingAge, amenities, floor } = formData;

  const zoneData = predictZone(location);
  const baseRate = nagpurZones[zoneData.zone].avgPrice;

  const bedroomMultipliers = {
    '1': 0.85,
    '2': 1.0,
    '3': 1.15,
    '4': 1.30,
    '5+': 1.45
  };
  const bedroomMultiplier = bedroomMultipliers[bedrooms] || 1;

  const typeMultiplier = propertyType?.multiplier || 1.0;
  const ageMultiplier = buildingAge?.multiplier || 1.0;

  let floorMultiplier = 1.0;
  if (floor) {
    if (floor === 'ground') floorMultiplier = 0.95;
    else if (floor >= 1 && floor <= 3) floorMultiplier = 1.0;
    else if (floor >= 4 && floor <= 7) floorMultiplier = 1.05;
    else if (floor >= 8) floorMultiplier = 1.10;
  }

  let amenitiesMultiplier = 1.0;
  let additionalCosts = 0;
  
  if (amenities && amenities.length > 0) {
    amenities.forEach(amenity => {
      if (amenity.priceImpact) {
        amenitiesMultiplier *= amenity.priceImpact;
      }
      if (amenity.price) {
        additionalCosts += amenity.price;
      }
    });
  }

  let landmarkBonus = 1.0;
  for (const [landmark, data] of Object.entries(nagpurLandmarks)) {
    if (location.toLowerCase().includes(landmark.toLowerCase())) {
      landmarkBonus = data.multiplier;
      break;
    }
  }

  let calculatedRate = baseRate * 
    bedroomMultiplier * 
    typeMultiplier * 
    ageMultiplier * 
    floorMultiplier * 
    amenitiesMultiplier * 
    landmarkBonus;

  const basePrice = sqft * calculatedRate;
  const variation = basePrice * 0.05 * (Math.random() - 0.5);
  const finalPrice = Math.round(basePrice + variation);

  return {
    price: finalPrice + additionalCosts,
    pricePerSqft: Math.round(calculatedRate),
    breakdown: {
      baseRate: baseRate,
      calculatedRate: Math.round(calculatedRate),
      bedroomFactor: bedroomMultiplier,
      propertyTypeFactor: typeMultiplier,
      ageFactor: ageMultiplier,
      floorFactor: floorMultiplier,
      amenitiesFactor: amenitiesMultiplier,
      landmarkFactor: landmarkBonus,
      totalArea: sqft,
      additionalCosts: additionalCosts
    },
    zoneInfo: {
      detectedZone: zoneData.zone,
      zoneName: nagpurZones[zoneData.zone].name,
      confidence: zoneData.confidence,
      matchedLocality: zoneData.matchedLocality,
      matchedLandmark: zoneData.matchedLandmark
    }
  };
};

// Format price in Indian currency format
export const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

// Get market trends from backend
export const getMarketTrends = async (zone = 'central') => {
  try {
    const response = await fetch(`${API_URL}/market-trends?zone=${zone}`);
    const data = await response.json();
    
    if (data.success) {
      return data.trends;
    }
    throw new Error('Failed to fetch trends');
  } catch (error) {
    console.error('Error fetching market trends:', error);
    return null;
  }
};

// Get investment analysis
export const getInvestmentAnalysis = async (price, zone) => {
  try {
    const response = await fetch(`${API_URL}/investment-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price, zone })
    });

    const data = await response.json();
    
    if (data.success) {
      return data.analysis;
    }
    throw new Error('Analysis failed');
  } catch (error) {
    console.error('Error getting investment analysis:', error);
    return null;
  }
};

// Calculate ROI
export const calculateROI = async (purchasePrice, holdingPeriod, zone) => {
  try {
    const response = await fetch(`${API_URL}/roi-calculator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ purchasePrice, holdingPeriod, zone })
    });

    const data = await response.json();
    
    if (data.success) {
      return data.calculation;
    }
    throw new Error('ROI calculation failed');
  } catch (error) {
    console.error('Error calculating ROI:', error);
    return null;
  }
};

// Save search history
export const saveSearchHistory = async (searchData) => {
  try {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    history.unshift({
      ...searchData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    
    const limitedHistory = history.slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
    
    return limitedHistory;
  } catch (error) {
    console.error('Error saving search history:', error);
    return [];
  }
};

// Get search history
export const getSearchHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('searchHistory') || '[]');
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

// Clear search history
export const clearSearchHistory = () => {
  try {
    localStorage.removeItem('searchHistory');
    return true;
  } catch (error) {
    console.error('Error clearing search history:', error);
    return false;
  }
};

// Calculate EMI
export const calculateEMI = (principal, annualRate, tenureYears) => {
  const monthlyRate = annualRate / 12 / 100;
  const tenureMonths = tenureYears * 12;
  
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / 
              (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  
  const totalAmount = emi * tenureMonths;
  const totalInterest = totalAmount - principal;
  
  return {
    monthlyEMI: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    principal: principal
  };
};

// Check backend health
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
    });
    const data = await response.json();
    return data.status === 'running' && data.ml_enabled === true;
  } catch (error) {
    console.warn('Backend health check failed:', error);
    return false;
  }
};
