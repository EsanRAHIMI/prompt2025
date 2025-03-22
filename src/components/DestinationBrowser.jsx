// components/DestinationBrowser.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Clock, Award, Filter } from 'lucide-react';

export default function DestinationBrowser({ 
  destinations, 
  onSelect, 
  selectedDestination 
}) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  
  // Filter destinations
  const filteredDestinations = destinations.filter(dest => {
    if (filter === 'all') return true;
    if (filter === 'orbital' && dest.type === 'orbital') return true;
    if (filter === 'lunar' && dest.type === 'lunar') return true;
    if (filter === 'mars' && dest.type === 'mars') return true;
    return false;
  });
  
  // Sort destinations
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortBy === 'popularity') return b.popularity - a.popularity;
    if (sortBy === 'price') return a.pricingTiers[0].price - b.pricingTiers[0].price;
    if (sortBy === 'duration') return a.travelTime - b.travelTime;
    return 0;
  });
  
  return (
    <div className="space-y-8">
      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 bg-black/30 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-purple-400" />
          <span className="text-purple-300">Filter by:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('orbital')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'orbital' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Orbital
            </button>
            <button
              onClick={() => setFilter('lunar')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'lunar' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Lunar
            </button>
            <button
              onClick={() => setFilter('mars')}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === 'mars' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Mars
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-purple-300">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="popularity">Popular</option>
            <option value="price">Price (Low to High)</option>
            <option value="duration">Travel Time</option>
          </select>
        </div>
      </div>
      
      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedDestinations.map((destination) => (
          <motion.div
            key={destination.id}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`relative overflow-hidden rounded-xl border-2 ${
              selectedDestination?.id === destination.id
                ? 'border-purple-400 shadow-lg shadow-purple-500/20'
                : 'border-gray-800 hover:border-purple-600'
            } transition-all duration-300 cursor-pointer group`}
            onClick={() => onSelect(destination)}
          >
            {/* Destination Image */}
            <div className="relative h-56 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${destination.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              
              {/* Destination Type Badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                <Rocket className="w-3 h-3" />
                <span>
                  {destination.type === 'orbital' && 'Orbital Experience'}
                  {destination.type === 'lunar' && 'Lunar Expedition'}
                  {destination.type === 'mars' && 'Mars Adventure'}
                </span>
              </div>
            </div>
            
            {/* Destination Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
              <p className="text-gray-300 text-sm mb-4">{destination.shortDescription}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1 text-purple-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-medium">{destination.travelTime} days</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-medium">{destination.rating}/5 Rating</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                <span className="text-xs text-gray-400">Starting from</span>
                <span className="text-lg font-bold text-purple-300">
                  ${destination.pricingTiers[0].price.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}