import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Header from './components/Header';
import LocationStep from './components/PropertySelection/LocationStep';
import BedroomStep from './components/PropertySelection/BedroomStep';
import SizeStep from './components/PropertySelection/SizeStep';
import InteriorStep from './components/PropertySelection/InteriorStep';
import PricePrediction from './components/Results/PricePrediction';
import { predictPrice, saveSearchHistory } from './utils/pricePredictor';
import DesignStudio from './components/InteriorDesign/DesignStudio';

function App() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    bedrooms: '',
    sqft: '',
    interiorChoice: '',
    propertyType: null,
    buildingAge: null,
    floor: null,
    amenities: []
  });
  const [prediction, setPrediction] = useState(null);

  // Check if user can proceed to next step
  const canProceed = () => {
    switch(step) {
      case 1: 
        return formData.location && formData.location.trim().length > 0;
      case 2: 
        return formData.bedrooms && formData.propertyType && formData.buildingAge;
      case 3: 
        return formData.sqft >= 300;
      case 4: 
        return formData.interiorChoice;
      default: 
        return true;
    }
  };

  // Handle next button click
  const handleNext = async () => {
    if (step === 4 && formData.interiorChoice === 'without') {
      // Show loading state
      setLoading(true);
      try {
        // Calculate prediction and show results
        const result = await predictPrice(formData);
        setPrediction(result);
        
        // Save to history
        await saveSearchHistory(formData);
        
        setStep(6);
      } catch (error) {
        console.error('Prediction error:', error);
        alert('Failed to get prediction. Please try again.');
      } finally {
        setLoading(false);
      }
    } else if (step === 4 && formData.interiorChoice === 'with') {
      // Go to interior design
      setStep(5);
    } else {
      setStep(step + 1);
    }
  };

  // Handle back button click
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Reset the entire form
  const handleReset = () => {
    setStep(1);
    setFormData({
      location: '',
      bedrooms: '',
      sqft: '',
      interiorChoice: '',
      propertyType: null,
      buildingAge: null,
      floor: null,
      amenities: []
    });
    setPrediction(null);
  };

  // Render the current step
  const renderStep = () => {
    switch(step) {
      case 1:
        return <LocationStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <BedroomStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <SizeStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <InteriorStep formData={formData} setFormData={setFormData} />;
      case 5:
        return (
          <DesignStudio 
            formData={formData}
            onComplete={async (designData, interiorCost) => {
              setLoading(true);
              try {
                const result = await predictPrice(formData);
                const propertyPrice = result.price;
                
                setPrediction({
                  ...result,
                  interiorCost: interiorCost,
                  totalWithInterior: propertyPrice + interiorCost,
                  designData: designData
                });
                
                await saveSearchHistory({
                  ...formData,
                  interiorDesign: designData
                });
                
                setStep(6);
              } catch (error) {
                console.error('Prediction error:', error);
                alert('Failed to get prediction. Please try again.');
              } finally {
                setLoading(false);
              }
            }}
          />
        );
      case 6:
        return (
          <PricePrediction 
            formData={formData} 
            prediction={prediction} 
            onReset={handleReset}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
            <div className="animate-spin text-6xl mb-4">🏠</div>
            <p className="text-xl font-bold text-gray-800 mb-2">
              AI Analyzing Your Property...
            </p>
            <p className="text-sm text-gray-600">
              Processing market data and generating prediction
            </p>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {step < 6 && (
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s 
                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 5 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    step > s 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2 px-2">
            <span>Location</span>
            <span>Configuration</span>
            <span>Area & Amenities</span>
            <span>Interior</span>
            <span>Result</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          {renderStep()}

          {/* Navigation Buttons */}
          {step < 6 && step !== 5 && (
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-gray-400 transition-all hover:shadow-md"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed() || loading}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ml-auto ${
                  canProceed() && !loading
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {step === 4 && formData.interiorChoice === 'without' 
                  ? 'Get Prediction' 
                  : 'Continue'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;