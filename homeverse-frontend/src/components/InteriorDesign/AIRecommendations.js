import React, { useState } from 'react';
import { getDesignRecommendations, getPopularCombinations, getTrendingStyles } from '../../utils/aiRecommendations';
import { formatPrice } from '../../utils/pricePredictor';

function AIRecommendations({ formData, designData, onAddFurniture }) {
  const recommendations = getDesignRecommendations(formData, designData);
  const popularCombos = getPopularCombinations('Nagpur', formData.sqft * 5000);
  const trendingStyles = getTrendingStyles();
  
  const [activeSection, setActiveSection] = useState('recommendations');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <span className="text-3xl">🤖</span> AI Design Assistant
        </h3>
        <p className="text-gray-600">Personalized recommendations just for you</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'recommendations', label: '💡 Smart Picks', count: recommendations.furniture.length },
          { id: 'combinations', label: '📦 Packages', count: popularCombos.length },
          { id: 'styles', label: '🎨 Trending', count: trendingStyles.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSection === tab.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className="bg-white text-purple-600 px-2 py-1 rounded-full text-xs font-bold">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Smart Recommendations */}
      {activeSection === 'recommendations' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Color Scheme Recommendations */}
          {recommendations.colorSchemes.length > 0 && (
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
              <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🎨</span> Recommended Color Scheme
              </h4>
              {recommendations.colorSchemes.map((scheme, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl">
                  <h5 className="font-bold text-gray-800 mb-2">{scheme.name}</h5>
                  <p className="text-sm text-gray-600 mb-3">{scheme.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {scheme.furniture.map(item => (
                      <span key={item} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Furniture Recommendations */}
          {recommendations.furniture.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-xl">🛋️</span> Suggested Furniture
              </h4>
              <div className="space-y-3">
                {recommendations.furniture.map((rec, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-bold text-gray-800">{rec.item}</h5>
                        <p className="text-sm text-gray-600">{rec.reason}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      {rec.options.map(option => (
                        <button
                          key={option.id}
                          onClick={() => onAddFurniture(option)}
                          className="flex justify-between items-center bg-blue-50 hover:bg-blue-100 p-3 rounded-lg transition-all"
                        >
                          <span className="font-semibold text-gray-800 text-sm">{option.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-blue-600 font-bold">{formatPrice(option.price)}</span>
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-bold">
                              Add +
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete the Look */}
          {recommendations.completeLook.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
              <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                <span className="text-xl">✨</span> Complete the Look
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendations.completeLook.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800">{item.item}</p>
                      <p className="text-xs text-gray-600">{item.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-600 font-bold">{formatPrice(item.price)}</p>
                      <button className="text-xs text-green-600 font-semibold hover:underline">
                        Add →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Budget Alternatives */}
          {recommendations.budgetAlternatives.length > 0 && (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
              <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                <span className="text-xl">💰</span> Budget-Friendly Alternatives
              </h4>
              {recommendations.budgetAlternatives.map((alt, idx) => (
                <div key={idx} className="space-y-3">
                  <p className="text-sm text-orange-800 font-semibold">{alt.message}</p>
                  <div className="bg-white p-3 rounded-xl">
                    <p className="text-lg font-bold text-green-600 mb-2">
                      Save up to {formatPrice(alt.savings)}!
                    </p>
                    {alt.alternatives.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm py-2 border-b last:border-0">
                        <span className="text-gray-700">{item.original} → {item.alternative}</span>
                        <span className="text-green-600 font-bold">-{formatPrice(item.savings)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Popular Combinations */}
      {activeSection === 'combinations' && (
        <div className="space-y-4 animate-fadeIn">
          {popularCombos.map((combo, idx) => (
            <div key={idx} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-1">{combo.name}</h4>
                  <p className="text-sm text-gray-600">{combo.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="text-lg font-bold text-indigo-600">{combo.budget}</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl mb-3">
                <p className="font-semibold text-gray-700 mb-2 text-sm">Included Items:</p>
                <div className="grid grid-cols-2 gap-2">
                  {combo.items.map((item, i) => (<div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="text-indigo-600 font-semibold">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
              </div>
          <div className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-xl text-white">
            <div>
              <p className="text-sm opacity-90">Package Total</p>
              <p className="text-2xl font-bold">{formatPrice(combo.total)}</p>
            </div>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
              Select Package
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  {/* Trending Styles */}
  {activeSection === 'styles' && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
      {trendingStyles.map((style, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-400 transition-all hover:shadow-xl">
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-lg font-bold text-gray-800">{style.name}</h4>
            <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-purple-700">{style.popularity}%</span>
              <span className="text-xs text-purple-600">Popular</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">{style.description}</p>

          {/* Color Palette */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Color Palette:</p>
            <div className="flex gap-2">
              {style.colorPalette.map((color, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Best For */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Best For:</p>
            <div className="flex gap-2 flex-wrap">
              {style.bestFor.map((type, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <p className="text-xs font-semibold text-gray-700 mb-2">Key Features:</p>
            <ul className="space-y-1">
              {style.keyFeatures.map((feature, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                  <span className="text-purple-600">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all">
            Apply This Style
          </button>
        </div>
      ))}
    </div>
  )}
</div>
);
}
export default AIRecommendations;