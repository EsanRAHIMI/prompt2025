// components/PricingTiers.jsx
'use client';

import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingTiers({ destination, onSelect, selectedTier }) {
  if (!destination) return null;
  
  const { pricingTiers } = destination;
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h3 className="text-xl text-purple-300 mb-2">Select Your Experience Class for</h3>
        <h4 className="text-3xl font-bold">{destination.name}</h4>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier, index) => {
          const isPopular = index === 1; // Middle tier is usually the popular option
          
          return (
            <motion.div
              key={tier.name}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`relative rounded-xl ${
                selectedTier?.name === tier.name
                  ? 'bg-gradient-to-b from-purple-900 to-indigo-900 border-2 border-purple-400'
                  : 'bg-black/50 border border-gray-800 hover:border-purple-500'
              } overflow-hidden transition-all duration-300`}
            >
              {/* Popular badge */}
              {isPopular && (
                <div className="absolute top-0 inset-x-0 transform -translate-y-1/2">
                  <span className="inline-block bg-purple-600 text-white text-xs font-bold py-1 px-4 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-6 space-y-6">
                <div className="text-center pb-6">
                  <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex justify-center items-baseline">
                    <span className="text-3xl font-extrabold text-white">
                      ${tier.price.toLocaleString()}
                    </span>
                    <span className="text-gray-400 ml-1 text-sm">/ person</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-300">{tier.description}</p>
                </div>
                
                <div className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <Check className="flex-shrink-0 w-5 h-5 text-green-400 mt-0.5" />
                      <span className="ml-3 text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                  
                  {tier.notIncluded && tier.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start opacity-60">
                      <X className="flex-shrink-0 w-5 h-5 text-red-400 mt-0.5" />
                      <span className="ml-3 text-sm text-gray-400 line-through">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => onSelect(tier)}
                  className={`w-full py-3 px-6 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedTier?.name === tier.name
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-gray-800 text-white hover:bg-purple-700'
                  }`}
                >
                  {selectedTier?.name === tier.name ? 'Selected' : 'Select'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}