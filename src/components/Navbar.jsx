// components/Navbar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, Moon, Sun, Rocket } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ onDashboardToggle }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Dubai to the Stars
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#destinations-section" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Destinations
            </Link>
            <Link 
              href="#launches-section" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Launches
            </Link>
            <Link 
              href="#recommendations-section" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Recommendations
            </Link>
            <button 
              onClick={onDashboardToggle}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md">
          <div className="px-4 pt-2 pb-4 space-y-4">
            <Link 
              href="#destinations-section" 
              className="block py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Destinations
            </Link>
            <Link 
              href="#launches-section" 
              className="block py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Launches
            </Link>
            <Link 
              href="#recommendations-section" 
              className="block py-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Recommendations
            </Link>
            <button 
              onClick={() => {
                onDashboardToggle();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}