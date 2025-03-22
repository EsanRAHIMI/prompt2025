// components/RecommendationEngine.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, Star, User } from 'lucide-react';

export default function RecommendationEngine({ 
  destinations, 
  userPreferences = {}, 
  onUpdatePreferences,
  onSelectDestination
}) {
  const [preferences, setPreferences] = useState({
    experience: userPreferences.experience || 'first-time',
    duration: userPreferences.duration || 'short',
    interest: userPreferences.interest || 'views',
    budget: userPreferences.budget || 'mid-range'
  });
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);
  const [showPreferences, setShowPreferences] = useState(!userPreferences.experience);
  
  // Generate recommendations based on preferences
  useEffect(() => {
    // Skip if we don't have destinations
    if (!destinations || destinations.length === 0) return;
    
    // Algorithm to match destinations based on preferences
    const generateRecommendations = () => {
      let recommendations = [...destinations];
      let scores = {};
      
      // Calculate a match score for each destination
      recommendations.forEach(dest => {
        let score = 0;
        
        // Experience level
        if (preferences.experience === 'first-time' && dest.type === 'orbital') score += 10;
        if (preferences.experience === 'intermediate' && dest.type === 'lunar') score += 10;
        if (preferences.experience === 'advanced' && dest.type === 'mars') score += 10;
        
        // Duration preference
        if (preferences.duration === 'short' && dest.travelTime <= 7) score += 10;
        if (preferences.duration === 'medium' && dest.travelTime > 7 && dest.travelTime <= 14) score += 10;
        if (preferences.duration === 'long' && dest.travelTime > 14) score += 10;
        
        // Interest matching
        if (preferences.interest === 'views' && dest.features.includes('panoramic-views')) score += 10;
        if (preferences.interest === 'science' && dest.features.includes('research-facilities')) score += 10;
        if (preferences.interest === 'adventure' && dest.features.includes('space-activities')) score += 10;
        if (preferences.interest === 'luxury' && dest.features.includes('premium-amenities')) score += 10;
        
        // Budget matching
        const lowestPrice = Math.min(...dest.pricingTiers.map(tier => tier.price));
        if (preferences.budget === 'budget' && lowestPrice < 100000) score += 10;
        if (preferences.budget === 'mid-range' && lowestPrice >= 100000 && lowestPrice < 250000) score += 10;
        if (preferences.budget === 'luxury' && lowestPrice >= 250000) score += 10;
        
        // Store the score
        scores[dest.id] = score;
      });
      
      // Sort by score
      recommendations.sort((a, b) => scores[b.id] - scores[a.id]);
      
      // Return top 3 recommendations
      return recommendations.slice(0, 3);
    };
    
    setRecommendedDestinations(generateRecommendations());
  }, [destinations, preferences]);
  
  // Handle preference changes
  const handlePreferenceChange = (category, value) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, [category]: value };
      
      // Update parent component preferences
      if (onUpdatePreferences) {
        onUpdatePreferences(newPreferences);
      }
      
      return newPreferences;
    });
  };
  
  // Handle destination selection
  const handleSelectDestination = (destination) => {
    if (onSelectDestination) {
      onSelectDestination(destination);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* Preferences Selection */}
      <div className={`bg-indigo-900/20 rounded-xl p-6 border border-indigo-800/50 transition-all duration-500 ${
        showPreferences ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden p-0 border-0'
      }`}>
        <div className="flex items-center mb-6">
          <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
          <h3 className="text-xl font-bold">Customize Your Journey Preferences</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Level */}
          <div>
            <h4 className="text-md font-medium mb-3">Your Space Travel Experience</h4>
            <div className="space-y-2">
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.experience === 'first-time' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('experience', 'first-time')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.experience === 'first-time' ? 'opacity-100' : 'opacity-0'
                }`} />
                First-time space traveler
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.experience === 'intermediate' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('experience', 'intermediate')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.experience === 'intermediate' ? 'opacity-100' : 'opacity-0'
                }`} />
                Experienced (Orbital flights before)
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.experience === 'advanced' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('experience', 'advanced')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.experience === 'advanced' ? 'opacity-100' : 'opacity-0'
                }`} />
                Advanced space explorer
              </button>
            </div>
          </div>
          
          {/* Journey Duration */}
          <div>
            <h4 className="text-md font-medium mb-3">Preferred Journey Duration</h4>
            <div className="space-y-2">
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.duration === 'short' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('duration', 'short')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.duration === 'short' ? 'opacity-100' : 'opacity-0'
                }`} />
                Short (1-7 days)
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.duration === 'medium' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('duration', 'medium')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.duration === 'medium' ? 'opacity-100' : 'opacity-0'
                }`} />
                Medium (8-14 days)
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.duration === 'long' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('duration', 'long')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.duration === 'long' ? 'opacity-100' : 'opacity-0'
                }`} />
                Extended (15+ days)
              </button>
            </div>
          </div>
          
          {/* Primary Interest */}
          <div>
            <h4 className="text-md font-medium mb-3">Primary Interest</h4>
            <div className="space-y-2">
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.interest === 'views' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('interest', 'views')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.interest === 'views' ? 'opacity-100' : 'opacity-0'
                }`} />
                Panoramic space views
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.interest === 'science' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('interest', 'science')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.interest === 'science' ? 'opacity-100' : 'opacity-0'
                }`} />
                Science and research
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.interest === 'adventure' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('interest', 'adventure')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.interest === 'adventure' ? 'opacity-100' : 'opacity-0'
                }`} />
                Space activities and adventures
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.interest === 'luxury' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('interest', 'luxury')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.interest === 'luxury' ? 'opacity-100' : 'opacity-0'
                }`} />
                Luxury and comfort
              </button>
            </div>
          </div>
          
          {/* Budget Range */}
          <div>
            <h4 className="text-md font-medium mb-3">Budget Range</h4>
            <div className="space-y-2">
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.budget === 'budget' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('budget', 'budget')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.budget === 'budget' ? 'opacity-100' : 'opacity-0'
                }`} />
                Economy ($75,000 - $100,000)
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.budget === 'mid-range' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('budget', 'mid-range')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.budget === 'mid-range' ? 'opacity-100' : 'opacity-0'
                }`} />
                Business ($100,000 - $250,000)
              </button>
              <button 
                className={`w-full text-left p-3 rounded-lg flex items-center ${
                  preferences.budget === 'luxury' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => handlePreferenceChange('budget', 'luxury')}
              >
                <CheckCircle className={`w-5 h-5 mr-2 ${
                  preferences.budget === 'luxury' ? 'opacity-100' : 'opacity-0'
                }`} />
                Luxury ($250,000+)
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
            onClick={() => setShowPreferences(false)}
          >
            Update Recommendations
          </button>
        </div>
      </div>
      
      {/* Toggle Preferences */}
      {!showPreferences && (
        <div className="text-center mb-8">
          <button
            onClick={() => setShowPreferences(true)}
            className="inline-flex items-center text-purple-400 hover:text-purple-300"
          >
            <User className="w-4 h-4 mr-2" />
            <span>Customize Your Preferences</span>
          </button>
        </div>
      )}
      
      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recommendedDestinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
            onClick={() => handleSelectDestination(destination)}
          >
            {/* Recommendation Badge */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="font-medium">
                  {index === 0 ? 'Perfect Match' : index === 1 ? 'Great Choice' : 'Recommended'}
                </span>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < 5 - index ? 'text-yellow-300' : 'text-gray-600'}`} 
                    fill={i < 5 - index ? '#FBBF24' : 'none'}
                  />
                ))}
              </div>
            </div>
            
            {/* Destination Image */}
            <div className="relative h-40 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transform hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${destination.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              
              {/* Destination Name */}
              <div className="absolute bottom-0 w-full p-3">
                <h4 className="text-lg font-bold">{destination.name}</h4>
              </div>
            </div>
            
            {/* Destination Features */}
            <div className="p-4">
              <div className="text-sm text-gray-300 mb-4">{destination.shortDescription}</div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Experience:</span>
                  <span className="font-medium">
                    {destination.type === 'orbital' && 'Orbital'}
                    {destination.type === 'lunar' && 'Lunar'}
                    {destination.type === 'mars' && 'Mars'}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="font-medium">{destination.travelTime} days</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Starting at:</span>
                  <span className="font-medium text-purple-300">
                    ${destination.pricingTiers[0].price.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectDestination(destination);
                }}
                className="w-full mt-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm font-medium transition-colors"
              >
                Explore This Destination
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}