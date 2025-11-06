import React from 'react';
import { propertyTypes, buildingAge } from '../../utils/data';

function BedroomStep({ formData, setFormData }) {
  const bedroomOptions = ['1', '2', '3', '4', '5+'];
  const floorOptions = ['Ground', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8 animate-bounce-slow">
        <div className="text-7xl mb-4">🏠</div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Property Configuration
        </h2>
        <p className="text-gray-600 text-lg">Tell us about your dream property</p>
      </div>

      {/* Property Type Selection */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-purple-200">
        <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🏢</span> Property Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {propertyTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setFormData({...formData, propertyType: type})}
              className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                formData.propertyType?.id === type.id
                  ? 'border-purple-600 bg-white shadow-2xl scale-105 ring-4 ring-purple-200'
                  : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-lg'
              }`}
            >
              <div className="text-4xl mb-2">{type.icon}</div>
              <p className="text-sm font-bold text-gray-800">{type.name}</p>
              <p className="text-xs text-purple-600 mt-1">
                {type.multiplier > 1 ? `+${((type.multiplier - 1) * 100).toFixed(0)}%` : 'Base'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Bedrooms Selection */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
        <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🛏️</span> Number of Bedrooms
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {bedroomOptions.map(num => (
            <button
              key={num}
              onClick={() => setFormData({...formData, bedrooms: num})}
              className={`py-8 rounded-2xl border-3 transition-all transform hover:scale-110 ${
                formData.bedrooms === num
                  ? 'border-blue-600 bg-gradient-to-br from-blue-100 to-cyan-100 shadow-2xl scale-110 ring-4 ring-blue-300'
                  : 'border-gray-200 hover:border-blue-400 bg-white hover:shadow-xl'
              }`}
            >
              <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {num}
              </div>
              <div className="text-sm mt-2 font-semibold text-gray-700">BHK</div>
            </button>
          ))}
        </div>
      </div>

      {/* Building Age */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
        <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">📅</span> Building Age
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {buildingAge.map(age => (
            <button
              key={age.id}
              onClick={() => setFormData({...formData, buildingAge: age})}
              className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                formData.buildingAge?.id === age.id
                  ? 'border-green-600 bg-white shadow-2xl scale-105 ring-4 ring-green-200'
                  : 'border-gray-200 hover:border-green-300 bg-white hover:shadow-lg'
              }`}
            >
              <div className="text-4xl mb-2">{age.icon}</div>
              <p className="text-sm font-bold text-gray-800">{age.name}</p>
              <p className="text-xs text-green-600 mt-1">
                {age.multiplier > 1 
                  ? `+${((age.multiplier - 1) * 100).toFixed(0)}%` 
                  : age.multiplier < 1 
                    ? `${((age.multiplier - 1) * 100).toFixed(0)}%`
                    : 'Standard'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Floor Selection */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border-2 border-orange-200">
        <label className="block text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-2xl">🏗️</span> Floor Number
        </label>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">
          {floorOptions.map((floor, index) => (
            <button
              key={floor}
              onClick={() => setFormData({
                ...formData, 
                floor: floor === 'Ground' ? 'ground' : floor === '10+' ? 10 : parseInt(floor)
              })}
              className={`py-4 px-2 rounded-xl border-2 transition-all transform hover:scale-105 ${
                formData.floor === (floor === 'Ground' ? 'ground' : floor === '10+' ? 10 : parseInt(floor))
                  ? 'border-orange-600 bg-gradient-to-br from-orange-100 to-amber-100 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-orange-300 bg-white hover:shadow-md'
              }`}
            >
              <p className="text-lg font-bold text-gray-800">{floor}</p>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-3 text-center">
          💡 Higher floors typically have better views and fetch premium prices
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default BedroomStep;