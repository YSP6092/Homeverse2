import React, { useState } from 'react';
import { paintColors, flooringOptions, furnitureItems, laborCosts } from '../../utils/interiorData';
import { formatPrice } from '../../utils/pricePredictor';
import Room3DScene from './Room3D';
function DesignStudio({ formData, onComplete }) {
  const [designData, setDesignData] = useState({
    wallColor: paintColors.walls[0],
    accentColor: null,
    flooring: flooringOptions[0],
    furniture: [],
    rooms: []
  });

  const [activeTab, setActiveTab] = useState('paint');
  const [selectedRoom, setSelectedRoom] = useState('livingRoom');

  // Calculate total interior cost
  const calculateInteriorCost = () => {
    let total = 0;

    // Wall painting cost
    const wallArea = formData.sqft * 2.5; // Approximate wall area
    total += wallArea * designData.wallColor.pricePerSqft;

    // Accent wall (if selected)
    if (designData.accentColor) {
      const accentArea = wallArea * 0.15; // 15% accent wall
      total += accentArea * designData.accentColor.pricePerSqft;
    }

    // Flooring cost
    total += formData.sqft * designData.flooring.pricePerSqft;

    // Furniture cost
    designData.furniture.forEach(item => {
      total += item.price * item.quantity;
    });

    // Labor costs
    total += laborCosts.painting * wallArea;
    total += laborCosts.flooring * formData.sqft;
    total += laborCosts.electrical;
    total += laborCosts.plumbing;
    total += laborCosts.carpentry;

    return Math.round(total);
  };

  const addFurniture = (item) => {
    const existing = designData.furniture.find(f => f.id === item.id);
    if (existing) {
      setDesignData({
        ...designData,
        furniture: designData.furniture.map(f =>
          f.id === item.id ? { ...f, quantity: f.quantity + 1 } : f
        )
      });
    } else {
      setDesignData({
        ...designData,
        furniture: [...designData.furniture, { ...item, quantity: 1 }]
      });
    }
  };

  const removeFurniture = (itemId) => {
    const existing = designData.furniture.find(f => f.id === itemId);
    if (existing.quantity > 1) {
      setDesignData({
        ...designData,
        furniture: designData.furniture.map(f =>
          f.id === itemId ? { ...f, quantity: f.quantity - 1 } : f
        )
      });
    } else {
      setDesignData({
        ...designData,
        furniture: designData.furniture.filter(f => f.id !== itemId)
      });
    }
  };

  const totalCost = calculateInteriorCost();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">🎨</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Interior Design Studio
        </h2>
        <p className="text-gray-600">Customize your space with AI-powered suggestions</p>
      </div>

      {/* Cost Summary Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-90">Total Interior Cost</p>
            <p className="text-2xl font-bold">{formatPrice(totalCost)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Items Selected</p>
            <p className="text-2xl font-bold">{designData.furniture.length}</p>
          </div>
        </div>
      </div>

     
{/* Design Tabs */}
<div className="flex gap-2 overflow-x-auto pb-2">
  {[
    { id: 'paint', label: '🎨 Paint', icon: '🎨' },
    { id: 'flooring', label: '🔲 Flooring', icon: '🔲' },
    { id: 'furniture', label: '🛋️ Furniture', icon: '🛋️' },
    { id: '3d', label: '🏠 3D Preview', icon: '🏠' },
    { id: 'summary', label: '📊 Summary', icon: '📊' }
  ].map(tab => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
        activeTab === tab.id
          ? 'bg-indigo-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>
      {/* Paint Selection */}
      {activeTab === 'paint' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Wall Colors</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {paintColors.walls.map(color => (
                <button
                  key={color.id}
                  onClick={() => setDesignData({ ...designData, wallColor: color })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    designData.wallColor.id === color.id
                      ? 'border-indigo-600 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div
                    className="w-full h-20 rounded-lg mb-2 border-2 border-gray-300"
                    style={{ backgroundColor: color.color }}
                  />
                  <p className="text-sm font-semibold text-gray-800">{color.name}</p>
                  <p className="text-xs text-gray-600">₹{color.pricePerSqft}/sqft</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Accent Wall (Optional)</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              <button
                onClick={() => setDesignData({ ...designData, accentColor: null })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  !designData.accentColor
                    ? 'border-indigo-600 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="w-full h-20 rounded-lg mb-2 bg-gray-100 flex items-center justify-center text-3xl">
                  ❌
                </div>
                <p className="text-sm font-semibold text-gray-800">No Accent</p>
              </button>
              {paintColors.accent.map(color => (
                <button
                  key={color.id}
                  onClick={() => setDesignData({ ...designData, accentColor: color })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    designData.accentColor?.id === color.id
                      ? 'border-indigo-600 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div
                    className="w-full h-20 rounded-lg mb-2 border-2 border-gray-300"
                    style={{ backgroundColor: color.color }}
                  />
                  <p className="text-sm font-semibold text-gray-800">{color.name}</p>
                  <p className="text-xs text-gray-600">₹{color.pricePerSqft}/sqft</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Flooring Selection */}
      {activeTab === 'flooring' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Flooring</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {flooringOptions.map(floor => (
              <button
                key={floor.id}
                onClick={() => setDesignData({ ...designData, flooring: floor })}
                className={`p-6 rounded-xl border-2 transition-all ${
                  designData.flooring.id === floor.id
                    ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="text-5xl mb-3">{floor.image}</div>
                <p className="text-lg font-semibold text-gray-800">{floor.name}</p>
                <p className="text-indigo-600 font-bold mt-2">₹{floor.pricePerSqft}/sqft</p>
                <p className="text-sm text-gray-600 mt-1">
                  Total: {formatPrice(floor.pricePerSqft * formData.sqft)}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Furniture Selection */}
      {activeTab === 'furniture' && (
        <div className="space-y-6">
          {/* Room Selector */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.keys(furnitureItems).map(room => (
              <button
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedRoom === room
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {room.charAt(0).toUpperCase() + room.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
          </div>

          {/* Furniture Items */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {furnitureItems[selectedRoom].map(item => {
              const inCart = designData.furniture.find(f => f.id === item.id);
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all"
                >
                  <div className="text-5xl mb-3 text-center">{item.icon}</div>
                  <p className="text-sm font-semibold text-gray-800 text-center">{item.name}</p>
                  <p className="text-indigo-600 font-bold text-center mt-2">
                    {formatPrice(item.price)}
                  </p>
                  
                  {inCart ? (
                    <div className="flex items-center justify-between mt-3 bg-indigo-50 rounded-lg p-2">
                      <button
                        onClick={() => removeFurniture(item.id)}
                        className="w-8 h-8 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="font-bold text-indigo-600">{inCart.quantity}</span>
                      <button
                        onClick={() => addFurniture(item)}
                        className="w-8 h-8 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addFurniture(item)}
                      className="w-full mt-3 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                    >
                      Add
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
{/* 3D Preview */}
{activeTab === '3d' && (
  <div className="space-y-6">
    <div className="text-center mb-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        3D Room Visualization
      </h3>
      <p className="text-gray-600">
        See your design come to life in 3D!
      </p>
    </div>

    <Room3DScene 
      wallColor={designData.wallColor.color}
      floorColor={designData.flooring.id === 'wood' ? '#8B4513' : 
                  designData.flooring.id === 'marble' ? '#F5F5DC' :
                  designData.flooring.id === 'carpet' ? '#CD853F' : '#D2B48C'}
      furniture={designData.furniture.map(f => f.id)}
    />

    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200">
      <h4 className="font-bold text-blue-900 mb-3">💡 3D Preview Tips</h4>
      <ul className="space-y-2 text-sm text-blue-800">
        <li>• Use your mouse to drag and rotate the room</li>
        <li>• Scroll to zoom in and out</li>
        <li>• Click "Pause" to stop auto-rotation</li>
        <li>• Add more furniture to see it appear in 3D</li>
      </ul>
    </div>

    <button
      onClick={() => setActiveTab('summary')}
      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all"
    >
      Continue to Summary →
    </button>
  </div>
)}
      {/* Summary */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Design Summary</h3>
            
            <div className="space-y-4">
              {/* Paint */}
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <p className="font-semibold text-gray-800">Wall Paint: {designData.wallColor.name}</p>
                  <p className="text-sm text-gray-600">
                    {(formData.sqft * 2.5).toFixed(0)} sqft × ₹{designData.wallColor.pricePerSqft}
                  </p>
                </div>
                <p className="font-bold text-indigo-600">
                  {formatPrice(formData.sqft * 2.5 * designData.wallColor.pricePerSqft)}
                </p>
              </div>

              {/* Accent */}
              {designData.accentColor && (
                <div className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-semibold text-gray-800">Accent Wall: {designData.accentColor.name}</p>
                    <p className="text-sm text-gray-600">
                      {(formData.sqft * 2.5 * 0.15).toFixed(0)} sqft × ₹{designData.accentColor.pricePerSqft}
                    </p>
                  </div>
                  <p className="font-bold text-indigo-600">
                    {formatPrice(formData.sqft * 2.5 * 0.15 * designData.accentColor.pricePerSqft)}
                  </p>
                </div>
              )}

              {/* Flooring */}
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <p className="font-semibold text-gray-800">Flooring: {designData.flooring.name}</p>
                  <p className="text-sm text-gray-600">
                    {formData.sqft} sqft × ₹{designData.flooring.pricePerSqft}
                  </p>
                </div>
                <p className="font-bold text-indigo-600">
                  {formatPrice(formData.sqft * designData.flooring.pricePerSqft)}
                </p>
              </div>

              {/* Furniture */}
              {designData.furniture.map(item => (
                <div key={item.id} className="flex justify-between items-center pb-3 border-b">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-indigo-600">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}

              {/* Labor */}
              <div className="flex justify-between items-center pb-3 border-b">
                <p className="font-semibold text-gray-800">Labor & Installation</p>
                <p className="font-bold text-indigo-600">
                  {formatPrice(
                    laborCosts.painting * (formData.sqft * 2.5) +
                    laborCosts.flooring * formData.sqft +
                    laborCosts.electrical +
                    laborCosts.plumbing +
                    laborCosts.carpentry
                  )}
                </p>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 text-xl">
                <p className="font-bold text-gray-800">Total Interior Cost</p>
                <p className="font-bold text-green-600 text-2xl">{formatPrice(totalCost)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onComplete(designData, totalCost)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
          >
            Complete Design & See Final Price
          </button>
        </div>
      )}

      {/* Selected Items Cart (if not on summary tab) */}
      {activeTab !== 'summary' && designData.furniture.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-2xl p-4 border-2 border-indigo-200 max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-gray-800">Selected Items</h4>
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
              {designData.furniture.length}
            </span>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {designData.furniture.slice(0, 3).map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700">{item.name} (×{item.quantity})</span>
                <span className="font-semibold text-indigo-600">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
            {designData.furniture.length > 3 && (
              <p className="text-xs text-gray-500 text-center">
                +{designData.furniture.length - 3} more items
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DesignStudio;