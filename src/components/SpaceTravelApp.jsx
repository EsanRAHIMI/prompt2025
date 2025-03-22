'use client';

import { useState, useEffect } from 'react';
import { 
  Calendar, 
  User, 
  Users, 
  Rocket, 
  Moon, 
  Globe, 
  Star, 
  Menu, 
  X, 
  ChevronRight, 
  Clock, 
  DollarSign, 
  Home,
  CreditCard,
  Settings,
  LogOut,
  Activity
} from 'lucide-react';

// Mock data for destinations
const destinations = [
  {
    id: 1,
    name: "Orbital Experience",
    type: "Orbital Station",
    distance: "400 km",
    duration: "3 days",
    description: "Experience zero gravity and witness breathtaking views of Earth from our state-of-the-art orbital station.",
    image: "/api/placeholder/1200/600",
    pricing: {
      economy: 75000,
      business: 125000,
      luxury: 180000
    },
    amenities: ["Zero-G training", "Earth observation deck", "Space photography sessions", "Live communication with Earth"],
    departureDates: ["2025-04-15", "2025-04-30", "2025-05-10", "2025-05-25"]
  },
  {
    id: 2,
    name: "Lunar Oasis Resort",
    type: "Lunar Resort",
    distance: "384,400 km",
    duration: "10 days",
    description: "Stay at the exclusive Lunar Oasis Resort on the moon's surface and explore the magnificent desolation of our closest celestial neighbor.",
    image: "/api/placeholder/1200/600",
    pricing: {
      economy: 225000,
      business: 300000,
      luxury: 395000
    },
    amenities: ["Lunar surface walks", "Mare Tranquillitatis view suites", "Low-gravity recreation center", "Crater exploration tours"],
    departureDates: ["2025-06-12", "2025-07-10", "2025-08-15", "2025-09-05"]
  },
  {
    id: 3,
    name: "Mars Preparation Facility",
    type: "Mars Experience",
    distance: "225 million km",
    duration: "30 days",
    description: "Prepare for the future of interplanetary travel in our Mars simulation facility, experiencing what life on the Red Planet will be like.",
    image: "/api/placeholder/1200/600",
    pricing: {
      economy: 350000,
      business: 395000,
      luxury: 450000
    },
    amenities: ["Simulated Martian environment", "Terraforming workshops", "Mars vehicle training", "Survival skill development"],
    departureDates: ["2025-10-10", "2025-11-22", "2026-01-15", "2026-02-28"]
  }
];

// Mock data for accommodations
const accommodations = [
  {
    id: 1,
    name: "Standard Space Pod",
    type: "Economy",
    description: "Comfortable and practical space pods designed for the essential space experience.",
    amenities: ["Sleep station", "Personal storage", "Entertainment system", "Basic food service"],
    image: "/api/placeholder/800/500"
  },
  {
    id: 2,
    name: "Space Suite",
    type: "Business",
    description: "Expanded quarters with additional comfort features and personalized service.",
    amenities: ["Larger sleep quarters", "Work/leisure station", "Premium entertainment", "Priority dining", "Private hygiene facilities"],
    image: "/api/placeholder/800/500"
  },
  {
    id: 3,
    name: "Cosmic Luxury Villa",
    type: "Luxury",
    description: "The pinnacle of space accommodation, offering maximum space, comfort, and exclusive services.",
    amenities: ["Multi-room environment", "Panoramic observation windows", "Personal concierge", "Gourmet dining", "Exclusive access to ship areas", "Custom space attire"],
    image: "/api/placeholder/800/500"
  }
];

// Preferences questionnaire for recommendations
const preferencesQuestions = [
  {
    id: "purpose",
    question: "What is the primary purpose of your trip?",
    options: ["Adventure", "Education", "Luxury Experience", "Scientific Interest", "Once-in-a-lifetime Event"]
  },
  {
    id: "duration",
    question: "What is your preferred trip duration?",
    options: ["Short (3-5 days)", "Medium (7-14 days)", "Extended (15+ days)"]
  },
  {
    id: "budget",
    question: "What is your approximate budget per person?",
    options: ["$50,000 - $150,000", "$150,000 - $300,000", "$300,000+"]
  },
  {
    id: "activities",
    question: "Which activities interest you most?",
    options: ["Space walks", "Scientific experiments", "Photography", "Relaxation", "Training & Learning"]
  },
  {
    id: "accommodation",
    question: "What type of accommodation do you prefer?",
    options: ["Practical & Efficient", "Comfortable & Business-oriented", "Luxurious & Exclusive"]
  }
];

// Main application component
export default function SpaceTravelApp() {
  // State for active screen/section
  const [activeScreen, setActiveScreen] = useState('home');
  
  // State for selected destination
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for user preferences
  const [userPreferences, setUserPreferences] = useState({});
  
  // State for booking information
  const [bookingInfo, setBookingInfo] = useState({
    destination: null,
    departureDate: null,
    accommodationType: null,
    passengers: 1,
    totalCost: 0
  });
  
  // State for countdown timer
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // State for user bookings
  const [userBookings, setUserBookings] = useState([
    {
      id: "bk-001",
      destination: "Orbital Experience",
      departureDate: "2025-04-15",
      accommodationType: "Business",
      passengers: 2,
      totalCost: 250000,
      status: "Confirmed",
      launchCountdown: 25 // days
    }
  ]);

  // Calculate countdown for a sample upcoming launch
  useEffect(() => {
    if (activeScreen !== 'dashboard') return;
    
    const interval = setInterval(() => {
      const now = new Date();
      const launchDate = new Date("2025-04-15");
      const timeLeft = launchDate - now;
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
      
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [activeScreen]);

  // Function to handle selecting a destination
  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    setBookingInfo({
      ...bookingInfo,
      destination: destination,
      totalCost: destination.pricing.economy
    });
    setActiveScreen('booking');
  };

  // Function to handle updating booking information
  const handleUpdateBooking = (field, value) => {
    let updatedBooking = { ...bookingInfo, [field]: value };
    
    // Calculate total cost
    if (field === 'accommodationType' && bookingInfo.destination) {
      updatedBooking.totalCost = bookingInfo.destination.pricing[value.toLowerCase()] * bookingInfo.passengers;
    } else if (field === 'passengers' && bookingInfo.destination && bookingInfo.accommodationType) {
      const accommodationType = bookingInfo.accommodationType.toLowerCase();
      updatedBooking.totalCost = bookingInfo.destination.pricing[accommodationType] * value;
    }
    
    setBookingInfo(updatedBooking);
  };

  // Function to handle submitting preferences
  const handleSubmitPreferences = (preferences) => {
    setUserPreferences(preferences);
    
    // Simple recommendation logic
    let recommendedDestination;
    
    if (preferences.budget === "$300,000+") {
      recommendedDestination = destinations.find(d => d.name === "Mars Preparation Facility");
    } else if (preferences.duration === "Medium (7-14 days)") {
      recommendedDestination = destinations.find(d => d.name === "Lunar Oasis Resort");
    } else {
      recommendedDestination = destinations.find(d => d.name === "Orbital Experience");
    }
    
    handleSelectDestination(recommendedDestination);
  };

  // Function to handle completing booking
  const handleCompleteBooking = () => {
    // In a real app, this would send data to a server
    const newBooking = {
      id: `bk-${Math.floor(Math.random() * 1000)}`,
      destination: bookingInfo.destination.name,
      departureDate: bookingInfo.departureDate,
      accommodationType: bookingInfo.accommodationType,
      passengers: bookingInfo.passengers,
      totalCost: bookingInfo.totalCost,
      status: "Confirmed",
      launchCountdown: 60 // example days
    };
    
    setUserBookings([...userBookings, newBooking]);
    setActiveScreen('confirmation');
  };

  // Render the appropriate screen
  const renderScreen = () => {
    switch(activeScreen) {
      case 'home':
        return <HomeScreen onSelectDestination={handleSelectDestination} />;
      case 'destinations':
        return <DestinationsScreen destinations={destinations} onSelectDestination={handleSelectDestination} />;
      case 'booking':
        return (
          <BookingScreen 
            destination={selectedDestination} 
            bookingInfo={bookingInfo}
            accommodations={accommodations}
            onUpdateBooking={handleUpdateBooking}
            onCompleteBooking={handleCompleteBooking}
          />
        );
      case 'preferences':
        return <PreferencesScreen questions={preferencesQuestions} onSubmit={handleSubmitPreferences} />;
      case 'dashboard':
        return <DashboardScreen bookings={userBookings} countdown={countdown} />;
      case 'confirmation':
        return <ConfirmationScreen booking={bookingInfo} onReturn={() => setActiveScreen('home')} />;
      default:
        return <HomeScreen onSelectDestination={handleSelectDestination} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header with navigation */}
      <header className="bg-indigo-900 border-b border-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                Dubai to the Stars
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => setActiveScreen('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeScreen === 'home' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveScreen('destinations')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeScreen === 'destinations' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
              >
                Destinations
              </button>
              <button 
                onClick={() => setActiveScreen('preferences')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeScreen === 'preferences' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
              >
                Find Your Trip
              </button>
              <button 
                onClick={() => setActiveScreen('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${activeScreen === 'dashboard' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
              >
                My Dashboard
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  setActiveScreen('home');
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeScreen === 'home' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveScreen('destinations');
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeScreen === 'destinations' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'
                }`}
              >
                Destinations
              </button>
              <button
                onClick={() => {
                  setActiveScreen('preferences');
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeScreen === 'preferences' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'
                }`}
              >
                Find Your Trip
              </button>
              <button
                onClick={() => {
                  setActiveScreen('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${
                  activeScreen === 'dashboard' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'
                }`}
              >
                My Dashboard
              </button>
            </div>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {renderScreen()}
      </main>
      
      {/* Footer */}
      <footer className="bg-indigo-900 border-t border-indigo-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2">
                <Rocket className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold text-white">Dubai to the Stars</span>
              </div>
              <p className="mt-2 text-sm text-indigo-200">
                The world's premier space tourism hub
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-indigo-200 tracking-wider uppercase">Explore</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <button onClick={() => setActiveScreen('destinations')} className="text-sm text-indigo-300 hover:text-white">Destinations</button>
                  </li>
                  <li>
                    <button className="text-sm text-indigo-300 hover:text-white">Experiences</button>
                  </li>
                  <li>
                    <button className="text-sm text-indigo-300 hover:text-white">Launch Schedule</button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-indigo-200 tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <button className="text-sm text-indigo-300 hover:text-white">About Us</button>
                  </li>
                  <li>
                    <button className="text-sm text-indigo-300 hover:text-white">Safety & Training</button>
                  </li>
                  <li>
                    <button className="text-sm text-indigo-300 hover:text-white">Sustainability</button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-indigo-200 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <button className="text-sm text-indigo-300 hover:text-white">Terms</button>
                  </li>
                  <li>
                    <button className="text-sm text-indigo-300 hover:text-white">Privacy</button>
                  </li>
                  <li>
                    <button className="text-sm text-indigo-300 hover:text-white">Regulations</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-indigo-800 pt-8">
            <p className="text-sm text-indigo-400">
              &copy; 2025 Dubai to the Stars. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Home Screen Component
function HomeScreen({ onSelectDestination }) {
  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <div className="relative">
        <div 
          className="h-96 w-full bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('/api/placeholder/1920/1080')` 
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Your Journey to the <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">Stars</span> Begins in Dubai
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Experience the future of space tourism with unparalleled luxury and innovation.
            </p>
            <div>
              <button
                onClick={() => document.getElementById('featured-destinations').scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300"
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-indigo-900/50 rounded-lg p-6 backdrop-blur">
            <div className="text-3xl font-bold text-purple-400 mb-2">12</div>
            <div className="text-sm text-gray-300">Successful Launches</div>
          </div>
          <div className="bg-indigo-900/50 rounded-lg p-6 backdrop-blur">
            <div className="text-3xl font-bold text-purple-400 mb-2">450+</div>
            <div className="text-sm text-gray-300">Space Travelers</div>
          </div>
          <div className="bg-indigo-900/50 rounded-lg p-6 backdrop-blur">
            <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
            <div className="text-sm text-gray-300">Unique Destinations</div>
          </div>
          <div className="bg-indigo-900/50 rounded-lg p-6 backdrop-blur">
            <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-sm text-gray-300">Safety Record</div>
          </div>
        </div>
      </div>
      
      {/* Featured Destinations */}
      <div id="featured-destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Featured Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div 
              key={destination.id} 
              className="bg-indigo-900/30 border border-indigo-800 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  {destination.type === "Orbital Station" && <Globe className="h-5 w-5 text-blue-400 mr-2" />}
                  {destination.type === "Lunar Resort" && <Moon className="h-5 w-5 text-blue-400 mr-2" />}
                  {destination.type === "Mars Experience" && <Star className="h-5 w-5 text-blue-400 mr-2" />}
                  <span className="text-sm text-blue-400">{destination.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                <div className="flex justify-between text-sm text-gray-300 mb-4">
                  <span>Distance: {destination.distance}</span>
                  <span>Duration: {destination.duration}</span>
                </div>
                <p className="text-gray-300 mb-6 text-sm">{destination.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-purple-400">
                    <span className="text-sm">From</span>
                    <div className="text-xl font-bold">${destination.pricing.economy.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => onSelectDestination(destination)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Experience Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-2xl p-8 md:p-12">
          <div className="md:flex md:items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-white mb-4">The Ultimate Space Experience</h2>
              <p className="text-gray-300 mb-6">
                Our space voyages offer more than just travel—they're transformative experiences that combine luxury, 
                adventure, and education. From astronaut training to zero-gravity recreation, each journey is 
                meticulously designed to inspire and amaze.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                    <User className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-gray-200">Expert Guides</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                    <Moon className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-gray-200">Unique Locations</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                    <Star className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-gray-200">Luxury Amenities</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-purple-400" />
                  </div>
                  <span className="text-gray-200">Personalized Service</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-indigo-800/60 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Not sure where to start?</h3>
                <p className="text-gray-300 mb-6">
                  Take our preference survey to find the perfect space journey for your interests and budget.
                </p>
                <button
                  onClick={() => document.getElementById('ai-recommendations').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-white text-indigo-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  Find My Perfect Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Recommendations */}
      <div id="ai-recommendations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Personalized Recommendations</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our AI-powered recommendation system will help you find the perfect space journey based on your preferences.
          </p>
        </div>
        <div className="bg-indigo-900/30 border border-indigo-800 rounded-xl p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
              <Rocket className="h-8 w-8 text-purple-400 mr-3" />
              <h3 className="text-xl font-bold text-white">Trip Recommendation Engine</h3>
            </div>
            <p className="text-gray-300 mb-8">
              Answer a few questions about your preferences, and we'll suggest the perfect space experience for you.
            </p>
            <button
              onClick={() => document.getElementById('ai-recommendations').scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition duration-300"
            >
              Start Questionnaire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Destinations Screen Component
function DestinationsScreen({ destinations, onSelectDestination }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-white mb-6">Space Destinations</h1>
      <p className="text-gray-300 mb-8 max-w-3xl">
        Explore our exclusive selection of space destinations ranging from orbital experiences to lunar resorts and Mars preparation facilities.
      </p>
      
      {/* Destination filters */}
      <div className="bg-indigo-900/30 border border-indigo-800 rounded-lg p-4 mb-8">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <span className="text-gray-300 mr-2">Filter by:</span>
          </div>
          <button className="bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">All Destinations</button>
          <button className="bg-indigo-900/50 text-gray-300 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm">Orbital</button>
          <button className="bg-indigo-900/50 text-gray-300 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm">Lunar</button>
          <button className="bg-indigo-900/50 text-gray-300 hover:bg-indigo-800 px-4 py-2 rounded-md text-sm">Mars</button>
          <div className="ml-auto">
            <select className="bg-indigo-900 text-white border border-indigo-700 rounded-md px-3 py-2 text-sm">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Duration: Shortest</option>
              <option>Duration: Longest</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Destinations list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <div key={destination.id} className="bg-indigo-900/20 border border-indigo-800 rounded-xl overflow-hidden hover:translate-y-[-8px] transition-transform duration-300">
            <div className="relative h-48 overflow-hidden">
              <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
              <div className="absolute top-0 right-0 bg-indigo-700 text-white px-3 py-1 text-xs font-semibold">
                {destination.type}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
              <div className="flex justify-between text-sm text-gray-300 mb-4">
                <div className="flex items-center">
                  <Rocket className="h-4 w-4 mr-1 text-blue-400" />
                  <span>{destination.distance}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-blue-400" />
                  <span>{destination.duration}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-sm">{destination.description}</p>
              
              {/* Amenities */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-200 mb-2">Key Amenities</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {destination.amenities.slice(0, 4).map((amenity, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                      <span className="text-gray-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pricing and Book button */}
              <div className="border-t border-indigo-800 pt-4 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-300">Starting from</div>
                  <div className="text-xl font-bold text-purple-400">${destination.pricing.economy.toLocaleString()}</div>
                </div>
                <button
                  onClick={() => onSelectDestination(destination)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition duration-300 flex items-center"
                >
                  Book Now
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Detailed destination information */}
      <div className="mt-16 bg-indigo-900/30 border border-indigo-800 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">About Our Space Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Orbital Experiences</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Our orbital experiences take you 400km above Earth's surface, providing stunning views of our planet
              and the chance to experience weightlessness in a comfortable, luxurious environment.
              Perfect for first-time space travelers seeking a transformative yet accessible adventure.
            </p>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <Moon className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Lunar Destinations</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Travel 384,400km to experience the Moon's magnificent desolation. Our lunar resorts offer
              unparalleled luxury at Earth's closest celestial neighbor, with activities ranging from
              surface excursions to low-gravity recreation centers.
            </p>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <Star className="h-6 w-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Mars Preparation</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Prepare for humanity's next giant leap with our Mars preparation experiences. While actual Mars
              travel is still in development, our state-of-the-art simulation facilities provide an authentic
              preview of life on the Red Planet with scientific and survival training.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Booking Screen Component
function BookingScreen({ destination, bookingInfo, accommodations, onUpdateBooking, onCompleteBooking }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onUpdateBooking('departureDate', date);
  };
  
  // Determine if the current step is complete
  const isStepComplete = () => {
    switch(step) {
      case 1: 
        return selectedDate !== null;
      case 2:
        return bookingInfo.accommodationType !== null;
      case 3:
        return bookingInfo.passengers > 0;
      default:
        return false;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Booking header with destination info */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <span className="text-sm text-indigo-400">Booking</span>
          <ChevronRight className="h-4 w-4 mx-2 text-indigo-400" />
          <span className="text-sm text-white">{destination.name}</span>
        </div>
        <h1 className="text-3xl font-bold text-white">{destination.name}</h1>
        <div className="flex items-center mt-2 text-gray-300">
          <span className="flex items-center mr-4">
            <Rocket className="h-4 w-4 mr-1 text-indigo-400" />
            {destination.type}
          </span>
          <span className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1 text-indigo-400" />
            {destination.duration}
          </span>
        </div>
      </div>
      
      {/* Booking progress */}
      <div className="bg-indigo-900/30 border border-indigo-800 rounded-lg p-4 mb-8">
        <div className="flex justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-purple-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 1 ? 'bg-purple-400 text-indigo-900' : 'bg-indigo-800 text-gray-400'}`}>
              1
            </div>
            <span className="text-xs">Select Date</span>
          </div>
          <div className={`flex-1 border-t border-dashed self-center mx-2 ${step >= 2 ? 'border-purple-400' : 'border-gray-600'}`}></div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-purple-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 2 ? 'bg-purple-400 text-indigo-900' : 'bg-indigo-800 text-gray-400'}`}>
              2
            </div>
            <span className="text-xs">Choose Accommodation</span>
          </div>
          <div className={`flex-1 border-t border-dashed self-center mx-2 ${step >= 3 ? 'border-purple-400' : 'border-gray-600'}`}></div>
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-purple-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 3 ? 'bg-purple-400 text-indigo-900' : 'bg-indigo-800 text-gray-400'}`}>
              3
            </div>
            <span className="text-xs">Passengers</span>
          </div>
          <div className={`flex-1 border-t border-dashed self-center mx-2 ${step >= 4 ? 'border-purple-400' : 'border-gray-600'}`}></div>
          <div className={`flex flex-col items-center ${step >= 4 ? 'text-purple-400' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${step >= 4 ? 'bg-purple-400 text-indigo-900' : 'bg-indigo-800 text-gray-400'}`}>
              4
            </div>
            <span className="text-xs">Review & Pay</span>
          </div>
        </div>
      </div>
      
      {/* Step content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6 h-full">
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Select Your Launch Date</h2>
                <p className="text-gray-300 mb-6">
                  Choose from our upcoming departures to {destination.name}. All launches depart from
                  Dubai Spaceport at 08:00 GST (Gulf Standard Time).
                </p>
                
                {/* Calendar selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.departureDates.map((date, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleDateSelect(date)}
                      className={`p-4 rounded-lg cursor-pointer border transition-colors ${
                        selectedDate === date 
                          ? 'bg-indigo-700 border-indigo-500'
                          : 'bg-indigo-900/40 border-indigo-800 hover:bg-indigo-800/40'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-purple-400" />
                          <span className="text-white font-medium">
                            {new Date(date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        {selectedDate === date && (
                          <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                            <svg className="w-3 h-3 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Choose Your Accommodation</h2>
                <p className="text-gray-300 mb-6">
                  Select your preferred accommodation tier for your journey to {destination.name}.
                  Each option offers different amenities and comfort levels.
                </p>
                
                {/* Accommodation options */}
                <div className="space-y-4">
                  {accommodations.map((accommodation) => (
                    <div 
                      key={accommodation.id}
                      onClick={() => onUpdateBooking('accommodationType', accommodation.type)}
                      className={`rounded-lg cursor-pointer border transition-colors ${
                        bookingInfo.accommodationType === accommodation.type
                          ? 'bg-indigo-700 border-indigo-500'
                          : 'bg-indigo-900/40 border-indigo-800 hover:bg-indigo-800/40'
                      }`}
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img 
                            src={accommodation.image} 
                            alt={accommodation.name} 
                            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none" 
                          />
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold text-white">{accommodation.name}</h3>
                            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold">
                              {accommodation.type}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-4">{accommodation.description}</p>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-200 mb-2">Amenities</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {accommodation.amenities.map((amenity, idx) => (
                                <div key={idx} className="flex items-center">
                                  <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                                  <span className="text-gray-300">{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-xl font-bold text-purple-400">
                              ${destination.pricing[accommodation.type.toLowerCase()].toLocaleString()}
                            </div>
                            {bookingInfo.accommodationType === accommodation.type && (
                              <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                                <svg className="w-3 h-3 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Passenger Information</h2>
                <p className="text-gray-300 mb-6">
                  Specify the number of passengers for your space journey. Pricing will be updated accordingly.
                </p>
                
                <div className="bg-indigo-900/40 border border-indigo-800 rounded-lg p-6">
                  <div className="mb-6">
                    <label className="block text-gray-200 mb-2">Number of Passengers</label>
                    <div className="flex items-center">
                      <button 
                        onClick={() => {
                          if (bookingInfo.passengers > 1) {
                            onUpdateBooking('passengers', bookingInfo.passengers - 1);
                          }
                        }}
                        className="bg-indigo-800 text-white w-10 h-10 rounded-l-lg flex items-center justify-center"
                      >
                        -
                      </button>
                      <div className="bg-indigo-700 text-white w-16 h-10 flex items-center justify-center font-medium">
                        {bookingInfo.passengers}
                      </div>
                      <button 
                        onClick={() => onUpdateBooking('passengers', bookingInfo.passengers + 1)}
                        className="bg-indigo-800 text-white w-10 h-10 rounded-r-lg flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="border-t border-indigo-800 pt-6">
                    <h3 className="text-white font-medium mb-4">Passenger Details</h3>
                    <div className="space-y-4">
                      {[...Array(bookingInfo.passengers)].map((_, idx) => (
                        <div key={idx} className="bg-indigo-800/50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-white mb-3">Passenger {idx + 1}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-gray-300 mb-1">Full Name</label>
                              <input 
                                type="text" 
                                placeholder="Enter full name"
                                className="w-full bg-indigo-900 border border-indigo-700 rounded px-3 py-2 text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-300 mb-1">Date of Birth</label>
                              <input 
                                type="date" 
                                className="w-full bg-indigo-900 border border-indigo-700 rounded px-3 py-2 text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-300 mb-1">Passport Number</label>
                              <input 
                                type="text" 
                                placeholder="Enter passport number"
                                className="w-full bg-indigo-900 border border-indigo-700 rounded px-3 py-2 text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-300 mb-1">Nationality</label>
                              <input 
                                type="text" 
                                placeholder="Enter nationality"
                                className="w-full bg-indigo-900 border border-indigo-700 rounded px-3 py-2 text-white text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Review Your Booking</h2>
                <p className="text-gray-300 mb-6">
                  Please review your booking details before proceeding to payment.
                </p>
                
                <div className="space-y-6">
                  {/* Trip Summary */}
                  <div className="bg-indigo-900/40 border border-indigo-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Trip Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Destination:</span>
                        <span className="text-white font-medium">{destination.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Departure Date:</span>
                        <span className="text-white font-medium">
                          {bookingInfo.departureDate && new Date(bookingInfo.departureDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Duration:</span>
                        <span className="text-white font-medium">{destination.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Accommodation:</span>
                        <span className="text-white font-medium">{bookingInfo.accommodationType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Passengers:</span>
                        <span className="text-white font-medium">{bookingInfo.passengers}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Details */}
                  <div className="bg-indigo-900/40 border border-indigo-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Payment Method</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-300 mb-1">Cardholder Name</label>
                          <input 
                            type="text" 
                            placeholder="Enter cardholder name"
                            className="w-full bg-indigo-900 border border-indigo-700 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-300 mb-1">Card Number</label>
                          <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-indigo-900 border border-indigo-700 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-300 mb-1">Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY"
                            className="w-full bg-indigo-900 border border-indigo-700 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-300 mb-1">CVC</label>
                          <input 
                            type="text" 
                            placeholder="123"
                            className="w-full bg-indigo-900 border border-indigo-700 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="bg-indigo-900/40 border border-indigo-800 rounded-lg p-6">
                    <div className="flex items-start">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        className="mt-1 mr-3"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-300">
                        I agree to the <button className="text-purple-400 hover:underline">Terms & Conditions</button> and 
                        <button className="text-purple-400 hover:underline ml-1">Space Travel Waiver</button>. I understand that 
                        space travel involves inherent risks and that this booking is subject to medical clearance.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Booking Summary */}
        <div className="md:col-span-1">
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-bold text-white mb-4">Booking Summary</h3>
            
            {/* Destination */}
            <div className="flex items-center mb-6">
              {destination.type === "Orbital Station" && <Globe className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" />}
              {destination.type === "Lunar Resort" && <Moon className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" />}
              {destination.type === "Mars Experience" && <Star className="h-5 w-5 text-indigo-400 mr-2 flex-shrink-0" />}
              <div>
                <div className="text-white font-medium">{destination.name}</div>
                <div className="text-xs text-gray-400">{destination.type}</div>
              </div>
            </div>
            
            {/* Selected Options */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-indigo-400 mr-2 flex-shrink-0" />
                <div className="text-gray-300">
                  {bookingInfo.departureDate ? new Date(bookingInfo.departureDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Select a date'}
                </div>
              </div>
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 text-indigo-400 mr-2 flex-shrink-0" />
                <div className="text-gray-300">
                  {bookingInfo.accommodationType ? `${bookingInfo.accommodationType} Accommodation` : 'Select accommodation'}
                </div>
              </div>
              <div className="flex items-center text-sm">
                <Users className="h-4 w-4 text-indigo-400 mr-2 flex-shrink-0" />
                <div className="text-gray-300">{bookingInfo.passengers} Passenger(s)</div>
              </div>
            </div>
            
            {/* Price Breakdown */}
            <div className="border-t border-indigo-800 pt-4 mb-6">
              <h4 className="text-sm font-semibold text-white mb-3">Price Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Base Price ({bookingInfo.accommodationType || 'Economy'})</span>
                  <span className="text-white">
                    ${bookingInfo.accommodationType
                      ? destination.pricing[bookingInfo.accommodationType.toLowerCase()].toLocaleString()
                      : destination.pricing.economy.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Passengers</span>
                  <span className="text-white">× {bookingInfo.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Space Training & Preparation</span>
                  <span className="text-white">Included</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Spacesuit and Equipment</span>
                  <span className="text-white">Included</span>
                </div>
                <div className="flex justify-between border-t border-indigo-800 pt-2 mt-2">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-xl text-purple-400 font-bold">
                    ${bookingInfo.totalCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="space-y-3">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-full bg-indigo-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-300"
                >
                  Previous Step
                </button>
              )}
              
              {step < 4 ? (
                <button
                  onClick={() => isStepComplete() && setStep(step + 1)}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition duration-300 ${
                    isStepComplete()
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Continue to {step === 1 ? 'Accommodation' : step === 2 ? 'Passengers' : 'Review'}
                </button>
              ) : (
                <button
                  onClick={onCompleteBooking}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition duration-300 flex items-center justify-center"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Complete Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Preferences Screen Component
function PreferencesScreen({ questions, onSubmit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };
  
  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const getRecommendation = () => {
    // Calculate recommendation based on answers
    // This is a simplified version - in a real application, you'd have more complex logic
    
    const selectedPurpose = answers['purpose'] || '';
    const selectedBudget = answers['budget'] || '';
    
    let recommendation = '';
    
    if (selectedBudget === '$300,000+') {
      recommendation = 'Mars Preparation Facility';
    } else if (selectedBudget === '$150,000 - $300,000') {
      recommendation = 'Lunar Oasis Resort';
    } else {
      recommendation = 'Orbital Experience';
    }
    
    if (selectedPurpose === 'Scientific Interest' && recommendation === 'Orbital Experience') {
      recommendation = 'Lunar Oasis Resort';
    }
    
    return recommendation;
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Find Your Perfect Space Journey</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Answer a few questions about your preferences, and our AI system will recommend the ideal space experience for you.
        </p>
      </div>
      
      <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-8">
        {!showResults ? (
          <div>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.floor(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
              </div>
              <div className="h-2 bg-indigo-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Current Question */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-6">{questions[currentQuestion].question}</h2>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleAnswer(questions[currentQuestion].id, option)}
                    className={`p-4 rounded-lg cursor-pointer border transition-all ${
                      answers[questions[currentQuestion].id] === option
                        ? 'bg-indigo-700 border-indigo-500 transform scale-[1.02]'
                        : 'bg-indigo-900/40 border-indigo-800 hover:bg-indigo-800/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white">{option}</span>
                      {answers[questions[currentQuestion].id] === option && (
                        <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center">
                          <svg className="w-3 h-3 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={goToPreviousQuestion}
                className={`px-6 py-2 rounded-lg text-sm font-medium ${
                  currentQuestion > 0
                    ? 'bg-indigo-800 text-white hover:bg-indigo-700'
                    : 'bg-indigo-900/20 text-gray-500 cursor-not-allowed'
                }`}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                onClick={goToNextQuestion}
                className={`px-6 py-2 rounded-lg text-sm font-medium ${
                  answers[questions[currentQuestion].id]
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                }`}
                disabled={!answers[questions[currentQuestion].id]}
              >
                {currentQuestion < questions.length - 1 ? 'Next' : 'See Results'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/20 rounded-full mb-4">
                <Rocket className="h-10 w-10 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Your Personalized Recommendation</h2>
              <p className="text-gray-300">
                Based on your preferences, we've found the perfect space journey for you!
              </p>
            </div>
            
            <div className="bg-indigo-800/50 border border-indigo-700 rounded-xl p-6 mb-8 max-w-lg mx-auto">
              <h3 className="text-xl font-bold text-white mb-2">{getRecommendation()}</h3>
              <p className="text-gray-300 text-sm mb-6">
                This destination matches your budget, interests, and preferred trip duration.
                It offers the perfect balance of adventure, luxury, and unique experiences.
              </p>
              <button
                onClick={() => onSubmit(answers)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition duration-300 w-full"
              >
                View This Destination
              </button>
            </div>
            
            <button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
              }}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Dashboard Screen Component
function DashboardScreen({ bookings, countdown }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Space Dashboard</h1>
          <p className="text-gray-300">
            Manage your space travel bookings and countdown to your next adventure
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition duration-300">
            Book New Journey
          </button>
        </div>
      </div>
      
      {/* Dashboard Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">John Doe</div>
                  <div className="text-xs text-indigo-300">Premium Member</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <button className="flex items-center w-full p-3 rounded-lg bg-indigo-800 text-white">
                  <Home className="h-5 w-5 mr-3" />
                  <span>Dashboard</span>
                </button>
                <button className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-indigo-800/50 hover:text-white transition-colors">
                  <Rocket className="h-5 w-5 mr-3" />
                  <span>My Bookings</span>
                </button>
                <button className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-indigo-800/50 hover:text-white transition-colors">
                  <Star className="h-5 w-5 mr-3" />
                  <span>Wishlist</span>
                </button>
                <button className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-indigo-800/50 hover:text-white transition-colors">
                  <CreditCard className="h-5 w-5 mr-3" />
                  <span>Payment Methods</span>
                </button>
                <button className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-indigo-800/50 hover:text-white transition-colors">
                  <Settings className="h-5 w-5 mr-3" />
                  <span>Account Settings</span>
                </button>
                <button className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-indigo-800/50 hover:text-white transition-colors">
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-span-12 md:col-span-9">
          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 rounded-xl p-6 mb-8">
            <div className="md:flex md:justify-between md:items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-xl font-bold text-white mb-2">Countdown to Your Next Launch</h2>
                <p className="text-indigo-200">
                  Orbital Experience • Departing from Dubai Spaceport
                </p>
              </div>
              <div>
                <div className="grid grid-cols-4 gap-3 text-center">
                  <div className="bg-indigo-900/50 rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold text-white">{countdown.days}</div>
                    <div className="text-xs text-indigo-300">Days</div>
                  </div>
                  <div className="bg-indigo-900/50 rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold text-white">{countdown.hours}</div>
                    <div className="text-xs text-indigo-300">Hours</div>
                  </div>
                  <div className="bg-indigo-900/50 rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold text-white">{countdown.minutes}</div>
                    <div className="text-xs text-indigo-300">Minutes</div>
                  </div>
                  <div className="bg-indigo-900/50 rounded-lg px-3 py-2">
                    <div className="text-2xl font-bold text-white">{countdown.seconds}</div>
                    <div className="text-xs text-indigo-300">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Tabs */}
          <div className="mb-6">
            <div className="border-b border-indigo-800">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'upcoming' 
                      ? 'border-purple-400 text-purple-400' 
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Upcoming Journeys
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'past' 
                      ? 'border-purple-400 text-purple-400' 
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Past Journeys
                </button>
                <button
                  onClick={() => setActiveTab('training')}
                  className={`py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'training' 
                      ? 'border-purple-400 text-purple-400' 
                      : 'border-transparent text-gray-400 hover:text-gray-200'
                  }`}
                >
                  Training Progress
                </button>
              </div>
            </div>
          </div>
          
          {/* Bookings List */}
          <div>
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-indigo-900/20 border border-indigo-800 rounded-xl overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-1/3 bg-indigo-900/30 p-6">
                        <div className="mb-4">
                          <span className="inline-block bg-green-500/20 text-green-400 text-xs font-semibold px-2 py-1 rounded-full">
                            {booking.status}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{booking.destination}</h3>
                        <div className="text-sm text-gray-300 mb-4">
                          Booking ID: {booking.id}
                        </div>
                        <div className="flex items-center text-indigo-300 text-sm mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>
                            {new Date(booking.departureDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-indigo-300 text-sm">
                          <User className="h-4 w-4 mr-2" />
                          <span>{booking.passengers} Passenger(s)</span>
                        </div>
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between mb-6">
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Accommodation</div>
                            <div className="text-white">{booking.accommodationType}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Total Cost</div>
                            <div className="text-xl font-bold text-purple-400">${booking.totalCost.toLocaleString()}</div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <div className="text-sm text-gray-400 mb-2">Countdown to Launch</div>
                          <div className="w-full bg-indigo-900/50 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2.5 rounded-full" 
                              style={{ width: `${100 - (booking.launchCountdown / 90) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Booking Confirmed</span>
                            <span>{booking.launchCountdown} days remaining</span>
                          </div>
                        </div>
                        
                        <div className="border-t border-indigo-800 pt-4 flex flex-wrap gap-3">
                          <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
                            View Details
                          </button>
                          <button className="bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
                            Training Portal
                          </button>
                          <button className="bg-indigo-900 hover:bg-indigo-800 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
                            Manage Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Empty State */}
                {bookings.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-900/30 rounded-full mb-4">
                      <Rocket className="h-8 w-8 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No upcoming journeys</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      You don't have any space journeys booked yet. Start your adventure by exploring our destinations.
                    </p>
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-6 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition duration-300">
                      Browse Destinations
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'past' && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-900/30 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No past journeys</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Your completed space journeys will appear here. You're at the beginning of your space travel journey!
                </p>
              </div>
            )}
            
            {activeTab === 'training' && (
              <div>
                <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Your Training Progress</h3>
                  <p className="text-gray-300 mb-6">
                    Complete all required training modules before your journey to ensure safety and maximize your experience.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-white">Space Orientation</span>
                        <span className="text-sm text-purple-400">100% Complete</span>
                      </div>
                      <div className="w-full bg-indigo-900/50 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full w-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-white">Zero Gravity Adaptation</span>
                        <span className="text-sm text-purple-400">75% Complete</span>
                      </div>
                      <div className="w-full bg-indigo-900/50 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-white">Emergency Procedures</span>
                        <span className="text-sm text-purple-400">50% Complete</span>
                      </div>
                      <div className="w-full bg-indigo-900/50 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full w-1/2"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-white">Space Equipment Usage</span>
                        <span className="text-sm text-purple-400">25% Complete</span>
                      </div>
                      <div className="w-full bg-indigo-900/50 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full w-1/4"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-white">Health Monitoring</span>
                        <span className="text-sm text-purple-400">0% Complete</span>
                      </div>
                      <div className="w-full bg-indigo-900/50 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full w-0"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="bg-indigo-700 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-300">
                      Continue Training
                    </button>
                  </div>
                </div>
                
                <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Physical Readiness</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-indigo-800/30 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
                          <Activity className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Health Assessment</div>
                          <div className="text-lg font-medium text-white">Excellent</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-800/30 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
                          <Activity className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">G-Force Training</div>
                          <div className="text-lg font-medium text-white">Scheduled</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-800/30 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center mr-3">
                          <Activity className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Medical Clearance</div>
                          <div className="text-lg font-medium text-white">Pending</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Confirmation Screen Component
function ConfirmationScreen({ booking, onReturn }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h1>
        <p className="text-gray-300 max-w-lg mx-auto">
          Your journey to the stars is now booked. We'll send you a confirmation email with all the details.
          Get ready for the adventure of a lifetime!
        </p>
      </div>
      
      <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-white mb-6">Your Booking Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase mb-4">Trip Details</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">Destination</div>
                  <div className="text-lg font-medium text-white">{booking.destination?.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Departure Date</div>
                  <div className="text-lg font-medium text-white">
                    {booking.departureDate && new Date(booking.departureDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Duration</div>
                  <div className="text-lg font-medium text-white">{booking.destination?.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Booking Reference</div>
                  <div className="text-lg font-medium text-white">DBSP-{Math.floor(Math.random() * 100000)}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-300 uppercase mb-4">Payment Details</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-400">Accommodation Type</div>
                  <div className="text-lg font-medium text-white">{booking.accommodationType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Passengers</div>
                  <div className="text-lg font-medium text-white">{booking.passengers}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Payment Method</div>
                  <div className="text-lg font-medium text-white">Credit Card (**** 1234)</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Amount</div>
                  <div className="text-xl font-bold text-purple-400">${booking.totalCost?.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-indigo-800 pt-6">
            <h3 className="text-lg font-medium text-white mb-4">Next Steps</h3>
            <div className="space-y-4">
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-indigo-700 flex-shrink-0 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">1</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Check Your Email</h4>
                  <p className="text-gray-300 text-sm">
                    We've sent a detailed confirmation to your email with important information about your journey.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-indigo-700 flex-shrink-0 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">2</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Complete Medical Assessment</h4>
                  <p className="text-gray-300 text-sm">
                    You'll need to complete a medical assessment before your journey. We'll contact you to schedule this.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-indigo-700 flex-shrink-0 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">3</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Begin Training Program</h4>
                  <p className="text-gray-300 text-sm">
                    Access your personalized training program through your dashboard to prepare for your space journey.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-8 h-8 rounded-full bg-indigo-700 flex-shrink-0 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">4</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Pre-Flight Briefing</h4>
                  <p className="text-gray-300 text-sm">
                    Two weeks before your journey, you'll attend a comprehensive pre-flight briefing at Dubai Spaceport.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onReturn}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition duration-300"
        >
          Return to Home
        </button>
        <button className="bg-indigo-700 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg text-sm font-medium transition duration-300">
          View My Dashboard
        </button>
      </div>
    </div>
  );
}