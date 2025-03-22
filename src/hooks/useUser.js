// hooks/useUser.js
'use client';

import { useState, useEffect } from 'react';

export function useUser() {
  const [user, setUser] = useState(null);
  const [userPreferences, setUserPreferences] = useState({
    experience: 'first-time',
    duration: 'short',
    interest: 'views',
    budget: 'mid-range'
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading user data from an API
  useEffect(() => {
    const loadUser = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock user data
      const mockUser = {
        id: 'user-123',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '+1 (555) 123-4567',
        passportNumber: 'X12345678',
        profileImage: null,
        createdAt: '2024-03-01T12:00:00Z',
        verifiedForSpaceTravel: true
      };
      
      // Mock preferences from "backend"
      const mockPreferences = {
        experience: 'first-time',
        duration: 'short',
        interest: 'views',
        budget: 'mid-range'
      };
      
      setUser(mockUser);
      setUserPreferences(mockPreferences);
      setIsLoading(false);
    };
    
    loadUser();
  }, []);
  
  // Update user preferences
  const updatePreferences = (newPreferences) => {
    setUserPreferences(prev => ({ ...prev, ...newPreferences }));
    
    // In a real app, we would send this to the backend
    console.log('Updating user preferences:', newPreferences);
  };
  
  // Update user profile
  const updateProfile = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
    
    // In a real app, we would send this to the backend
    console.log('Updating user profile:', profileData);
  };
  
  return {
    user,
    userPreferences,
    isLoading,
    updatePreferences,
    updateProfile
  };
}