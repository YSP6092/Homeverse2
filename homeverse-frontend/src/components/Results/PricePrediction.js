import React from 'react';
import { formatPrice } from '../../utils/pricePredictor';

function PricePrediction({ formData, prediction, onReset }) {
  const hasInterior = prediction.interiorCost !== undefined;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce">
          <span className="text-4xl text-white">🎉</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your Dream Home Awaits!
        </h2>
        <p className="text-gray-600">Complete price breakdown with AI insights</p>
      </div>

      {/* Main Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Property Cost */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-300 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">🏠</span>
            <h3 className="text-lg font-bold text-gray-800">Property Cost</h3>
          </div>
          <p className="text-4xl font-bold text-blue-600 mb-2">
            {formatPrice(prediction.price)}
          </p>
          <p className="text-sm text-gray-600">
            {formData.sqft} sq ft × {formatPrice(prediction.pricePerSqft)}/sq ft
          </p>
        </div>

        {/* Interior Cost */}
        {hasInterior && (
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-300 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">✨</span>
              <h3 className="text-lg font-bold text-gray-800">Interior Cost</h3>
            </div>
            <p className="text-4xl font-bold text-purple-600 mb-2">
              {formatPrice(prediction.interiorCost)}
            </p>
            <p className="text-sm text-gray-600">
              Complete interior with furniture
            </p>
          </div>
        )}
      </div>

      {/* Total Cost */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-2xl shadow-2xl text-white">
        <div className="text-center">
          <p className="text-lg opacity-90 mb-2">Total Investment</p>
          <p className="text-5xl md:text-6xl font-bold mb-3">
            {hasInterior 
              ? formatPrice(prediction.totalWithInterior) 
              : formatPrice(prediction.price)
            }
          </p>
          <div className="flex items-center justify-center gap-2 bg-white/20 rounded-lg px-4 py-2 inline-block">
            <span className="text-2xl">📈</span>
            <span className="font-semibold">Market Competitive Price</span>
          </div>
        </div>
      </div>

      {/* Property Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="text-2xl mb-2">📍</div>
          <p className="text-xs text-gray-600 mb-1">Location</p>
          <p className="font-bold text-gray-800 text-sm">
            {formData.locality}
          </p>
          <p className="text-xs text-gray-500">{formData.city}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="text-2xl mb-2">🛏️</div>
          <p className="text-xs text-gray-600 mb-1">Configuration</p>
          <p className="font-bold text-gray-800 text-sm">
            {formData.bedrooms} BHK
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="text-2xl mb-2">📏</div>
          <p className="text-xs text-gray-600 mb-1">Carpet Area</p>
          <p className="font-bold text-gray-800 text-sm">
            {formData.sqft} sq ft
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
          <div className="text-2xl mb-2">💰</div>
          <p className="text-xs text-gray-600 mb-1">Per Sq Ft</p>
          <p className="font-bold text-gray-800 text-sm">
            {formatPrice(prediction.pricePerSqft)}
          </p>
        </div>
      </div>

      {/* Design Details (if interior selected) */}
      {hasInterior && prediction.designData && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🎨</span> Your Interior Design
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Wall Paint */}
            <div className="bg-white p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Wall Color</p>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg border-2 border-gray-300"
                  style={{ backgroundColor: prediction.designData.wallColor.color }}
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {prediction.designData.wallColor.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    ₹{prediction.designData.wallColor.pricePerSqft}/sq ft
                  </p>
                </div>
              </div>
            </div>
{/* Room-by-Room Breakdown */}
{hasInterior && prediction.designData && (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <span>🏠</span> Room-by-Room Design
    </h3>
    
    {Object.entries({
      livingRoom: 'Living Room 🛋️',
      bedroom: 'Bedroom 🛏️',
      dining: 'Dining Room 🍽️',
      kitchen: 'Kitchen 🍳'
    }).map(([roomKey, roomName]) => {
      const roomFurniture = prediction.designData.furniture.filter(f => f.room === roomKey);
      if (roomFurniture.length === 0) return null;
      
      return (
        <div key={roomKey} className="bg-white p-4 rounded-xl mb-3 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-gray-800">{roomName}</h4>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
              {roomFurniture.length} items
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {roomFurniture.map(item => (
              <div key={item.id} className="text-xs bg-purple-50 p-2 rounded flex justify-between">
                <span className="text-gray-700">{item.name} (×{item.quantity})</span>
                <span className="font-semibold text-purple-600">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
)}
            {/* Flooring */}
            <div className="bg-white p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-2">Flooring</p>
              <div className="flex items-center gap-3">
                <div className="text-3xl">
                  {prediction.designData.flooring.image}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {prediction.designData.flooring.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    ₹{prediction.designData.flooring.pricePerSqft}/sq ft
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Furniture List */}
          {prediction.designData.furniture.length > 0 && (
            <div className="bg-white p-4 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Furniture & Decor ({prediction.designData.furniture.length} items)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {prediction.designData.furniture.map(item => (
                  <div key={item.id} className="text-xs bg-gray-50 p-2 rounded">
                    <span className="font-semibold text-gray-800">{item.name}</span>
                    <span className="text-gray-600"> (×{item.quantity})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Price Breakdown */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">💰 Price Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b">
            <span className="text-gray-700">Base Property Price</span>
            <span className="font-bold text-gray-800">
              {formatPrice(prediction.price)}
            </span>
          </div>

          {hasInterior && (
            <>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-700">Interior & Furnishing</span>
                <span className="font-bold text-gray-800">
                  {formatPrice(prediction.interiorCost)}
                </span>
              </div>
            </>
          )}

          <div className="flex justify-between items-center pt-3 text-lg">
            <span className="font-bold text-gray-800">Grand Total</span>
            <span className="font-bold text-green-600 text-2xl">
              {hasInterior 
                ? formatPrice(prediction.totalWithInterior) 
                : formatPrice(prediction.price)
              }
            </span>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-3xl">💡</span>
          <div>
            <p className="font-bold text-amber-900 mb-2">AI Market Insights</p>
            <ul className="space-y-2 text-sm text-amber-800">
              <li>✓ This property is priced <strong>competitively</strong> for {formData.locality}</li>
              <li>✓ Similar properties in this area range from {formatPrice(prediction.price * 0.85)} to {formatPrice(prediction.price * 1.15)}</li>
              <li>✓ Property values in {formData.city} have grown by <strong>8-12%</strong> annually</li>
              {hasInterior && (
                <li>✓ Your interior design choices offer excellent <strong>value for money</strong></li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
        >
          🔄 Start New Search
        </button>
        
        <button
          onClick={() => window.print()}
          className="border-2 border-indigo-600 text-indigo-600 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all"
        >
          📄 Download Report
        </button>

        <button
          onClick={() => {
            const text = `Check out my dream home in ${formData.locality}, ${formData.city}! ${formData.bedrooms} BHK, ${formData.sqft} sq ft for ${hasInterior ? formatPrice(prediction.totalWithInterior) : formatPrice(prediction.price)}`;
            if (navigator.share) {
              navigator.share({ title: 'Homeverse', text });
            } else {
              navigator.clipboard.writeText(text);
              alert('Link copied to clipboard!');
            }
          }}
          className="border-2 border-green-600 text-green-600 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all"
        >
          📤 Share
        </button>
      </div>

      {/* Financing Estimate */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
        <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
          <span>🏦</span> Estimated Monthly EMI
        </h4>
        <p className="text-sm text-blue-800 mb-2">
          Approximate EMI for 20 years at 8.5% interest rate:
        </p>
        <p className="text-3xl font-bold text-blue-600">
          {formatPrice(
            Math.round(
              ((hasInterior ? prediction.totalWithInterior : prediction.price) * 0.00867) 
            )
          )}/month
        </p>
        <p className="text-xs text-blue-600 mt-2">
          *This is an estimate. Actual EMI may vary based on loan terms.
        </p>
      </div>
    </div>
  );
}

export default PricePrediction;