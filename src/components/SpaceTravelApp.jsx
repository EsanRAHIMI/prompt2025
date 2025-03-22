// components/SpaceTravelApp.jsx
'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import DestinationBrowser from './DestinationBrowser';
import PricingTiers from './PricingTiers';
import BookingCalendar from './BookingCalendar';
import UserDashboard from './UserDashboard';
import LaunchCountdown from './LaunchCountdown';
import RecommendationEngine from './RecommendationEngine';
import Footer from './Footer';
import { destinations, upcomingLaunches } from '../data/spaceData';
import { useUser } from '../hooks/useUser';
import { ThemeProvider } from '../context/ThemeContext';

export default function SpaceTravelApp() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const { user, userPreferences, updatePreferences } = useUser();
  
  // Handle destination selection
  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
    setSelectedTier(null); // Reset tier when destination changes
    setSelectedDate(null); // Reset date when destination changes
    
    // Only run scrollIntoView on the client
    if (typeof window !== 'undefined') {
      // Safely access document
      document.getElementById('pricing-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  };
  
  // Handle tier selection
  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    
    // Only run scrollIntoView on the client
    if (typeof window !== 'undefined') {
      // Safely access document
      document.getElementById('booking-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }
  };  
  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };
  
  // Handle booking creation
  const handleCreateBooking = () => {
    if (selectedDestination && selectedTier && selectedDate) {
      const newBooking = {
        id: `booking-${Date.now()}`,
        destination: selectedDestination,
        tier: selectedTier,
        date: selectedDate,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      setBookings([...bookings, newBooking]);
      
      // Reset selections
      setSelectedDestination(null);
      setSelectedTier(null);
      setSelectedDate(null);
      
      // Show confirmation and open dashboard
      alert('Your journey to the stars is booked! Check your dashboard for details.');
      setShowDashboard(true);
    }
  };
  
  // Toggle dashboard visibility
  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };
  
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-900 to-black text-white">
        <Navbar onDashboardToggle={toggleDashboard} />
        
        {showDashboard ? (
          <UserDashboard 
            bookings={bookings} 
            onClose={() => setShowDashboard(false)} 
            upcomingLaunches={upcomingLaunches}
          />
        ) : (
          <main>
            <HeroSection />
            
            <section id="destinations-section" className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Explore Cosmic Destinations
                </h2>
                <DestinationBrowser 
                  destinations={destinations} 
                  onSelect={handleDestinationSelect}
                  selectedDestination={selectedDestination}
                />
              </div>
            </section>
            
            {selectedDestination && (
              <section id="pricing-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Select Your Journey Class
                  </h2>
                  <PricingTiers 
                    destination={selectedDestination}
                    onSelect={handleTierSelect}
                    selectedTier={selectedTier}
                  />
                </div>
              </section>
            )}
            
            {selectedDestination && selectedTier && (
              <section id="booking-section" className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    Choose Your Launch Date
                  </h2>
                  <BookingCalendar 
                    destination={selectedDestination}
                    tier={selectedTier}
                    onSelect={handleDateSelect}
                    selectedDate={selectedDate}
                    upcomingLaunches={upcomingLaunches}
                  />
                  
                  {selectedDate && (
                    <div className="mt-12 text-center">
                      <button
                        onClick={handleCreateBooking}
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-lg font-bold shadow-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300"
                      >
                        Confirm Your Cosmic Journey
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}
            
            <section id="launches-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Upcoming Launches
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingLaunches.slice(0, 3).map(launch => (
                    <LaunchCountdown key={launch.id} launch={launch} />
                  ))}
                </div>
              </div>
            </section>
            
            <section id="recommendations-section" className="py-20 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  Personalized Journey Recommendations
                </h2>
                <RecommendationEngine 
                  destinations={destinations}
                  userPreferences={userPreferences}
                  onUpdatePreferences={updatePreferences}
                  onSelectDestination={handleDestinationSelect}
                />
              </div>
            </section>
          </main>
        )}
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}