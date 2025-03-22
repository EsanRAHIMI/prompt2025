// components/LaunchCountdown.jsx
'use client';

import { useState, useEffect } from 'react';
import { Rocket, Clock, Users, Info } from 'lucide-react';

export default function LaunchCountdown({ launch, booked = false }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Calculate and update the countdown
  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchTime = new Date(launch.date).getTime();
      const now = new Date().getTime();
      const difference = launchTime - now;
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
      
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Set up the interval
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up
    return () => clearInterval(timer);
  }, [launch.date]);
  
  // Format number to always have two digits
  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };
  
  return (
    <div className="bg-gray-800/60 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      {/* Launch Image */}
      <div className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform hover:scale-110 transition-transform duration-700"
          style={{ backgroundImage: `url(${launch.image || '/images/default-launch.jpg'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Badge */}
        {booked && (
          <div className="absolute top-3 right-3 bg-green-600/90 text-white text-xs font-bold px-3 py-1 rounded-full">
            Booked
          </div>
        )}
        
        {/* Launch Name */}
        <div className="absolute bottom-0 w-full p-4">
          <h3 className="text-xl font-bold text-white">{launch.name}</h3>
          <p className="text-sm text-gray-300 mt-1">{launch.description}</p>
        </div>
      </div>
      
      {/* Countdown Timer */}
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Clock className="w-5 h-5 text-purple-400 mr-2" />
          <h4 className="font-bold">Launch Countdown</h4>
        </div>
        
        <div className="grid grid-cols-4 gap-2 text-center mb-4">
          <div className="bg-black/30 rounded p-2">
            <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.days)}</div>
            <div className="text-xs text-gray-400">Days</div>
          </div>
          <div className="bg-black/30 rounded p-2">
            <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.hours)}</div>
            <div className="text-xs text-gray-400">Hours</div>
          </div>
          <div className="bg-black/30 rounded p-2">
            <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.minutes)}</div>
            <div className="text-xs text-gray-400">Minutes</div>
          </div>
          <div className="bg-black/30 rounded p-2">
            <div className="text-2xl font-bold text-white">{formatNumber(timeLeft.seconds)}</div>
            <div className="text-xs text-gray-400">Seconds</div>
          </div>
        </div>
        
        {/* Launch Information */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-gray-300">
            <Rocket className="w-4 h-4 mr-1 text-indigo-400" />
            <span>
              {new Date(launch.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          
          {launch.availableSeats !== undefined && (
            <div className="flex items-center text-gray-300">
              <Users className="w-4 h-4 mr-1 text-indigo-400" />
              <span>{launch.availableSeats} seats left</span>
            </div>
          )}
        </div>
        
        {/* Action Button */}
        {!booked && (
          <button className="w-full mt-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm font-medium transition-colors">
            Book This Launch
          </button>
        )}
        
        {booked && (
          <div className="mt-4 flex items-start p-2 bg-indigo-900/30 rounded">
            <Info className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
            <p className="ml-2 text-xs text-indigo-200">
              Your pre-flight briefing is scheduled 48 hours before launch. Check your email for details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}