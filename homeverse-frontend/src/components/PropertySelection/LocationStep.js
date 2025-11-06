import React, { useState } from 'react';
import { getPopularLocalities, getLandmarks } from '../../utils/data';

function LocationStep({ formData, setFormData }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState(formData.location || '');

  const popularLocalities = getPopularLocalities();
  const landmarks = getLandmarks();

  const filteredSuggestions = searchTerm.length > 0
    ? [...popularLocalities, ...landmarks].filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 8)
    : [...popularLocalities.slice(0, 6), ...landmarks.slice(0, 6)];

  const handleLocationSelect = (location) => {
    setSearchTerm(location);
    setFormData({ ...formData, location });
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header with Animation */}
      <div className="text-center mb-8 animate-bounce-slow">
        <div className="text-7xl mb-4 animate-pulse">📍</div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
          Where in Nagpur?
        </h2>
        <p className="text-gray-600 text-lg">Enter any location, area, or landmark in Nagpur</p>
        <div className="mt-3 inline-block bg-orange-100 px-4 py-2 rounded-full">
          <span className="text-orange-600 font-semibold text-sm">🤖 AI-Powered Location Detection</span>
        </div>
      </div>

      {/* Search Input with Autocomplete */}
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          🏠 Property Location in Nagpur
        </label>
        
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setFormData({ ...formData, location: e.target.value });
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="e.g., Dharampeth, Seminary Hills, Near Futala Lake..."
            className="w-full px-6 py-4 text-lg border-3 border-orange-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-all shadow-lg bg-gradient-to-r from-white to-orange-50"
          />
          <div className="absolute right-4 top-4 text-2xl animate-pulse">
            🔍
          </div>
        </div>

        {/* Autocomplete Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border-2 border-orange-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto animate-slideDown">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleLocationSelect(suggestion)}
                className="w-full px-6 py-4 text-left hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all border-b border-gray-100 flex items-center gap-3"
              >
                <span className="text-2xl">
                  {landmarks.includes(suggestion) ? '🏛️' : '📍'}
                </span>
                <div>
                  <p className="font-semibold text-gray-800">{suggestion}</p>
                  <p className="text-xs text-gray-500">
                    {landmarks.includes(suggestion) ? 'Popular Landmark' : 'Locality in Nagpur'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Popular Quick Picks */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          ⚡ Quick Picks - Popular Areas
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {popularLocalities.slice(0, 9).map(locality => (
            <button
              key={locality}
              onClick={() => handleLocationSelect(locality)}
              className={`px-4 py-4 rounded-xl border-2 transition-all transform hover:scale-105 hover:shadow-xl ${
                formData.location === locality
                  ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 font-bold shadow-lg'
                  : 'border-gray-200 hover:border-orange-300 text-gray-700 bg-white'
              }`}
            >
              <div className="text-xl mb-1">🏘️</div>
              <div className="text-sm font-semibold">{locality}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Landmarks Section */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          🏛️ Near Landmarks
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {landmarks.slice(0, 6).map(landmark => (
            <button
              key={landmark}
              onClick={() => handleLocationSelect(`Near ${landmark}`)}
              className={`px-4 py-4 rounded-xl border-2 transition-all transform hover:scale-105 hover:shadow-xl ${
                formData.location?.includes(landmark)
                  ? 'border-red-500 bg-gradient-to-r from-red-50 to-orange-50 text-red-700 font-bold shadow-lg'
                  : 'border-gray-200 hover:border-red-300 text-gray-700 bg-white'
              }`}
            >
              <div className="text-xl mb-1">⭐</div>
              <div className="text-sm font-semibold">{landmark}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      {formData.location && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5 animate-slideUp">
          <div className="flex items-start gap-3">
            <span className="text-3xl">✅</span>
            <div>
              <p className="font-bold text-green-800 mb-1">Location Selected!</p>
              <p className="text-sm text-green-700">
                Our AI will analyze market data for <strong>{formData.location}</strong> to give you the most accurate price prediction.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default LocationStep;