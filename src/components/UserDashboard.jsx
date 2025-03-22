// components/UserDashboard.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Calendar, Clock, Rocket, Check, AlertTriangle } from 'lucide-react';
import LaunchCountdown from './LaunchCountdown';

export default function UserDashboard({ bookings, onClose, upcomingLaunches }) {
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Sort bookings by date
  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  
  // Find the user's upcoming launches
  const userLaunches = sortedBookings
    .filter(booking => new Date(booking.date) > new Date())
    .map(booking => {
      // Find the corresponding launch
      const matchingLaunch = upcomingLaunches.find(launch => 
        new Date(launch.date).toDateString() === new Date(booking.date).toDateString()
      );
      
      return {
        ...booking,
        launch: matchingLaunch
      };
    });
  
  // Dashboard variants for animation
  const dashboardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } }
  };
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md overflow-auto py-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-full overflow-auto"
          variants={dashboardVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Dashboard header */}
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <User className="w-8 h-8 text-purple-300" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Cosmic Traveler Dashboard</h2>
            <p className="text-purple-200">Manage your space journeys and prepare for liftoff</p>
          </div>
          
          {/* Dashboard tabs */}
          <div className="border-b border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'bookings'
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Your Bookings
              </button>
              <button
                onClick={() => setActiveTab('launches')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'launches'
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Upcoming Launches
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'profile'
                    ? 'border-b-2 border-purple-500 text-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Profile & Preferences
              </button>
            </div>
          </div>
          
          {/* Dashboard content */}
          <div className="p-6">
            {/* Bookings tab */}
            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-xl font-bold mb-6">Your Space Journey Bookings</h3>
                
                {sortedBookings.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto flex items-center justify-center mb-4">
                      <Rocket className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-medium mb-2">No bookings yet</h4>
                    <p className="text-gray-400 max-w-md mx-auto">
                      You haven't booked any space journeys yet. Explore our destinations and secure your spot on the next launch.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                    >
                      Explore Destinations
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {sortedBookings.map(booking => {
                      const isUpcoming = new Date(booking.date) > new Date();
                      
                      return (
                        <div 
                          key={booking.id} 
                          className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-colors"
                        >
                          <div className="p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                              <div>
                                <h4 className="text-lg font-bold mb-1">
                                  {booking.destination.name}
                                </h4>
                                <div className="flex items-center text-sm text-gray-300 mb-3">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>
                                    {new Date(booking.date).toLocaleDateString('en-US', {
                                      weekday: 'long',
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                  <span className="px-2 py-1 bg-indigo-900/50 rounded text-xs font-medium text-indigo-300">
                                    {booking.tier.name}
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    isUpcoming
                                      ? 'bg-green-900/50 text-green-300'
                                      : 'bg-gray-700/50 text-gray-300'
                                  }`}>
                                    {isUpcoming ? 'Upcoming' : 'Past'}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-lg font-bold mb-1">
                                  ${booking.tier.price.toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-400 mb-3">
                                  Confirmation #{booking.id.slice(-8)}
                                </div>
                                <div className="flex justify-end">
                                  <button className="text-sm text-purple-400 hover:text-purple-300">
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {isUpcoming && (
                            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 px-6 py-3 flex justify-between items-center">
                              <div className="flex items-center text-sm">
                                <Clock className="w-4 h-4 mr-1 text-purple-400" />
                                <span className="text-purple-200">
                                  Launching in {Math.ceil((new Date(booking.date) - new Date()) / (1000 * 60 * 60 * 24))} days
                                </span>
                              </div>
                              <button className="text-sm text-purple-400 hover:text-purple-300">
                                Pre-flight Checklist
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            
            {/* Launches tab */}
            {activeTab === 'launches' && (
              <div>
                <h3 className="text-xl font-bold mb-6">Your Upcoming Launches</h3>
                
                {userLaunches.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userLaunches.map(booking => (
                      <LaunchCountdown 
                        key={booking.id}
                        launch={{
                          id: booking.id,
                          name: booking.destination.name,
                          date: booking.date,
                          image: booking.destination.imageUrl,
                          description: `${booking.tier.name} journey to ${booking.destination.name}`
                        }}
                        booked
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto flex items-center justify-center mb-4">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-xl font-medium mb-2">No upcoming launches</h4>
                    <p className="text-gray-400 max-w-md mx-auto">
                      You don't have any upcoming launches scheduled. Book a journey to see your launch countdown here.
                    </p>
                  </div>
                )}
                
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-6">Other Available Launches</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingLaunches.slice(0, 4).map(launch => (
                      <LaunchCountdown 
                        key={launch.id}
                        launch={launch}
                        booked={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Profile tab */}
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-xl font-bold mb-6">Your Profile & Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Personal Information */}
                  <div className="md:col-span-2 bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-bold mb-4">Personal Information</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          defaultValue="Jane Doe"
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          defaultValue="jane.doe@example.com"
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          defaultValue="+1 (555) 123-4567"
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Passport Number
                        </label>
                        <input 
                          type="text" 
                          defaultValue="X12345678"
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <button className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors">
                      Update Profile
                    </button>
                  </div>
                  
                  {/* Travel Preferences */}
                  <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                    <h4 className="text-lg font-bold mb-4">Travel Preferences</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Preferred Journey Type
                        </label>
                        <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option>Orbital Experiences</option>
                          <option>Lunar Expeditions</option>
                          <option>Mars Adventures</option>
                          <option>All Journey Types</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Accommodation Preference
                        </label>
                        <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                          <option>Business Class</option>
                          <option>Luxury Suite</option>
                          <option>Economy</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Notification Preferences
                        </label>
                        <div className="space-y-2 mt-2">
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="notify-launches" 
                              className="rounded text-purple-600 focus:ring-purple-500 bg-gray-900 border-gray-700"
                              defaultChecked 
                            />
                            <label htmlFor="notify-launches" className="ml-2 text-sm text-gray-300">
                              New launch opportunities
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="notify-discounts" 
                              className="rounded text-purple-600 focus:ring-purple-500 bg-gray-900 border-gray-700"
                              defaultChecked 
                            />
                            <label htmlFor="notify-discounts" className="ml-2 text-sm text-gray-300">
                              Special offers and discounts
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input 
                              type="checkbox" 
                              id="notify-preparation" 
                              className="rounded text-purple-600 focus:ring-purple-500 bg-gray-900 border-gray-700"
                              defaultChecked 
                            />
                            <label htmlFor="notify-preparation" className="ml-2 text-sm text-gray-300">
                              Pre-flight preparation reminders
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors">
                      Save Preferences
                    </button>
                  </div>
                  
                  {/* Account Verification Status */}
                  <div className="md:col-span-3 bg-indigo-900/30 rounded-lg p-6 border border-indigo-800 mt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-indigo-200">Space Travel Verification Complete</h3>
                        <p className="mt-2 text-sm text-indigo-300">
                          Your account is fully verified for space travel. All required documentation has been processed and approved.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Training Requirements */}
                  <div className="md:col-span-3 bg-yellow-900/20 rounded-lg p-6 border border-yellow-800/50 mt-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-yellow-200">Training Requirements</h3>
                        <p className="mt-2 text-sm text-yellow-300/80">
                          For journeys beyond orbital experiences, you'll need to complete our basic space traveler training program.
                          This can be scheduled at our Dubai Space Center at your convenience.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-yellow-600/70 hover:bg-yellow-600 text-white text-sm rounded transition-colors">
                          Schedule Training
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}