import React from 'react';

function InteriorStep({ formData, setFormData }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-8 animate-bounce-slow">
        <div className="text-7xl mb-4 animate-pulse">✨</div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Interior Design Options
        </h2>
        <p className="text-gray-600 text-lg">Would you like to design your interiors?</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Without Interior */}
        <button
          onClick={() => setFormData({...formData, interiorChoice: 'without'})}
          className={`group p-10 rounded-3xl border-4 transition-all text-left transform hover:scale-105 ${
            formData.interiorChoice === 'without'
              ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-2xl scale-105 ring-8 ring-blue-200'
              : 'border-gray-200 hover:border-blue-400 bg-white hover:shadow-2xl'
          }`}
        >
          <div className="text-7xl mb-6 group-hover:animate-bounce">🏗️</div>
          <h3 className="text-2xl font-black text-gray-800 mb-3">
            Without Interior
          </h3>
          <p className="text-gray-600 mb-4 text-base leading-relaxed">
            Get instant price prediction for the bare property with all the amenities you've selected
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Property price only</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Immediate results</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600 font-bold">✓</span>
              <span>Basic configuration</span>
            </div>
          </div>

          <div className={`mt-6 px-4 py-3 rounded-xl font-bold text-center transition-all ${
            formData.interiorChoice === 'without'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600'
          }`}>
            ⚡ Quick Estimate
          </div>
        </button>

        {/* With Interior */}
        <button
          onClick={() => setFormData({...formData, interiorChoice: 'with'})}
          className={`group p-10 rounded-3xl border-4 transition-all text-left transform hover:scale-105 relative overflow-hidden ${
            formData.interiorChoice === 'with'
              ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-2xl scale-105 ring-8 ring-purple-200'
              : 'border-gray-200 hover:border-purple-400 bg-white hover:shadow-2xl'
          }`}
        >
          <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-600 to-pink-600 text-white px-4 py-2 rounded-bl-2xl text-xs font-bold">
            🌟 POPULAR
          </div>
          
          <div className="text-7xl mb-6 group-hover:animate-spin-slow">✨</div>
          <h3 className="text-2xl font-black text-gray-800 mb-3">
            With Interior Design
          </h3>
          <p className="text-gray-600 mb-4 text-base leading-relaxed">
            Design your dream home with our AI-powered 3D interior studio. Choose colors, furniture, and get complete pricing
          </p>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-purple-600 font-bold">✓</span>
              <span>3D Room Visualization</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Paint & Furniture Selection</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-purple-600 font-bold">✓</span>
              <span>AI Design Suggestions</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-purple-600 font-bold">✓</span>
              <span>Complete Cost Breakdown</span>
            </div>
          </div>

          <div className={`mt-6 px-4 py-3 rounded-xl font-bold text-center transition-all ${
            formData.interiorChoice === 'with'
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
              : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-r group-hover:from-purple-100 group-hover:to-pink-100 group-hover:text-purple-600'
          }`}>
            🎨 Design Studio
          </div>
        </button>
      </div>

      {/* Info Box */}
      {formData.interiorChoice && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-3 border-emerald-300 rounded-2xl p-6 animate-slideUp">
          <div className="flex items-start gap-4">
            <span className="text-5xl">
              {formData.interiorChoice === 'without' ? '💰' : '🎨'}
            </span>
            <div>
              <p className="font-bold text-emerald-800 text-lg mb-2">
                {formData.interiorChoice === 'without' 
                  ? 'Quick Property Valuation' 
                  : 'Complete Interior Design Experience'}
              </p>
              <p className="text-emerald-700 leading-relaxed">
                {formData.interiorChoice === 'without'
                  ? 'You\'ll get an instant AI-powered price prediction based on your property configuration and selected amenities.'
                  : 'Our AI interior designer will help you create your dream home with personalized recommendations, 3D previews, and accurate cost estimates for every element.'}
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default InteriorStep;