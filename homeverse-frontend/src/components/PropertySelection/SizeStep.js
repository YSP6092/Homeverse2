import React from 'react';
import { amenities } from '../../utils/data';

function SizeStep({ formData, setFormData }) {
  const quickSizes = ['600', '800', '1000', '1200', '1500', '1800', '2000', '2500'];

  const toggleAmenity = (amenity) => {
    const currentAmenities = formData.amenities || [];
    const exists = currentAmenities.find(a => a.id === amenity.id);
    
    if (exists) {
      setFormData({
        ...formData,
        amenities: currentAmenities.filter(a => a.id !== amenity.id)
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...currentAmenities, amenity]
      });
    }
  };

  const isAmenitySelected = (amenityId) => {
    return formData.amenities?.some(a => a.id === amenityId);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8 animate-bounce-slow">
        <div className="text-7xl mb-4">📐</div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
          Area & Amenities
        </h2>
        <p className="text-gray-600 text-lg">Specify your space requirements</p>
      </div>

      {/* Area Input */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-3xl border-3 border-pink-200 shadow-xl">
        <label className="block text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
          <span className="text-3xl">📏</span> 
          <span>Carpet Area (Square Feet)</span>
        </label>
        
        <div className="relative mb-6">
          <input
            type="number"
            value={formData.sqft}
            onChange={(e) => setFormData({...formData, sqft: e.target.value})}
            placeholder="Enter area in sq ft"
            min="300"
            className="w-full px-8 py-6 text-4xl font-bold text-center border-3 border-pink-300 rounded-2xl focus:border-pink-600 focus:outline-none transition-all shadow-lg bg-white focus:ring-4 focus:ring-pink-200"
          />
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-2xl text-pink-600 font-bold">
            sq ft
          </div>
        </div>
        
        {/* Quick Size Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {quickSizes.map(size => (
            <button
              key={size}
              onClick={() => setFormData({...formData, sqft: size})}
              className={`py-4 rounded-xl transition-all transform hover:scale-110 font-bold ${
                formData.sqft === size
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-xl scale-110'
                  : 'bg-white text-gray-700 border-2 border-pink-200 hover:border-pink-400 hover:shadow-lg'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Area Info */}
        {formData.sqft && formData.sqft >= 300 && (
          <div className="mt-6 bg-white p-4 rounded-xl border-2 border-pink-300 animate-slideUp">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approximate Room Size</p>
                <p className="text-lg font-bold text-pink-600">
                  {formData.sqft < 700 ? '1 BHK Suitable' : 
                   formData.sqft < 1000 ? '2 BHK Suitable' : 
                   formData.sqft < 1400 ? '3 BHK Suitable' : 
                   '4+ BHK Suitable'}
                </p>
              </div>
              <div className="text-4xl">
                {formData.sqft < 700 ? '🏠' : 
                 formData.sqft < 1000 ? '🏡' : 
                 formData.sqft < 1400 ? '🏘️' : '🏰'}
              </div>
            </div>
          </div>
        )}

        {/* Validation */}
        {formData.sqft && formData.sqft < 300 && (
          <div className="mt-4 bg-red-50 border-2 border-red-300 p-4 rounded-xl animate-shake">
            <p className="text-red-600 font-semibold text-center flex items-center justify-center gap-2">
              <span className="text-2xl">⚠️</span>
              Minimum area should be 300 sq ft
            </p>
          </div>
        )}
      </div>

      {/* Amenities Selection */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border-3 border-blue-200 shadow-xl">
        <label className="block text-lg font-bold text-gray-800 mb-2 text-center flex items-center justify-center gap-2">
          <span className="text-3xl">✨</span> 
          <span>Select Amenities</span>
        </label>
        <p className="text-center text-sm text-gray-600 mb-6">
          Choose amenities to get accurate pricing
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenities.map(amenity => {
            const isSelected = isAmenitySelected(amenity.id);
            return (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity)}
                className={`p-5 rounded-2xl border-3 transition-all transform hover:scale-105 ${
                  isSelected
                    ? 'border-blue-600 bg-gradient-to-br from-blue-100 to-indigo-100 shadow-2xl scale-105 ring-4 ring-blue-300'
                    : 'border-gray-200 bg-white hover:border-blue-400 hover:shadow-lg'
                }`}
              >
                <div className="text-5xl mb-3">{amenity.icon}</div>
                <p className="text-sm font-bold text-gray-800 mb-2">{amenity.name}</p>
                {amenity.price > 0 ? (
                  <p className="text-xs text-blue-600 font-semibold">
                    +₹{(amenity.price / 100000).toFixed(1)}L
                  </p>
                ) : (
                  <p className="text-xs text-green-600 font-semibold">
                    +{((amenity.priceImpact - 1) * 100).toFixed(0)}% value
                  </p>
                )}
                {isSelected && (
                  <div className="mt-2 bg-blue-600 text-white text-xs py-1 px-2 rounded-full font-bold">
                    ✓ Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Amenities Summary */}
        {formData.amenities && formData.amenities.length > 0 && (
          <div className="mt-6 bg-white p-5 rounded-xl border-2 border-blue-300 animate-slideUp">
            <div className="flex items-center justify-between mb-3">
              <p className="font-bold text-gray-800">Selected Amenities</p>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                {formData.amenities.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map(amenity => (
                <span
                  key={amenity.id}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
                >
                  {amenity.icon} {amenity.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default SizeStep;