// components/BookingCalendar.jsx
'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Info } from 'lucide-react';

export default function BookingCalendar({ 
  destination, 
  tier, 
  onSelect, 
  selectedDate,
  upcomingLaunches 
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  
  // Generate available dates based on the destination type and upcoming launches
  useEffect(() => {
    if (!destination || !tier) return;
    
    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    
    // Filter launches for this destination
    const relevantLaunches = upcomingLaunches.filter(
      launch => launch.destinationType === destination.type
    );
    
    // Generate dates based on launch schedule
    const dates = relevantLaunches.map(launch => {
      const launchDate = new Date(launch.date);
      return {
        date: launchDate,
        launchId: launch.id,
        launchName: launch.name,
        price: tier.price, // Base price from the tier
        availableSeats: launch.availableSeats,
        discount: launch.discount || 0,
        status: launchDate < now 
          ? 'past' 
          : launch.availableSeats === 0 
            ? 'full' 
            : 'available'
      };
    });
    
    setAvailableDates(dates);
  }, [destination, tier, upcomingLaunches]);
  
  // Generate calendar days for the current month view
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // Get the last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDate = lastDayOfMonth.getDate();
    
    // Create calendar grid with empty cells for padding
    const days = [];
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < dayOfWeek; i++) {
      days.push({ day: null, status: 'padding' });
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= lastDate; day++) {
      const date = new Date(year, month, day);
      
      // Check if this date has a launch
      const launchForDate = availableDates.find(avail => {
        const availDate = new Date(avail.date);
        return (
          availDate.getFullYear() === date.getFullYear() &&
          availDate.getMonth() === date.getMonth() &&
          availDate.getDate() === date.getDate()
        );
      });
      
      if (launchForDate) {
        days.push({
          day,
          date,
          status: launchForDate.status,
          launch: launchForDate
        });
      } else {
        days.push({ day, date, status: 'unavailable' });
      }
    }
    
    setCalendarDays(days);
  }, [currentMonth, availableDates]);
  
  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  };
  
  // Format date for display
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  // Handle date selection
  const handleDateSelect = (day) => {
    if (day.status === 'available') {
      onSelect(day.date);
    }
  };
  
  // Calculate the final price with any discounts
  const calculatePrice = (basePrice, discount) => {
    return basePrice * (1 - discount / 100);
  };
  
  return (
    <div className="bg-black/30 rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={goToPrevMonth}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <h3 className="text-xl font-bold flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-400" />
          {formatMonthYear(currentMonth)}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Weekday headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-2 text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`relative aspect-square rounded-lg flex flex-col items-center justify-center ${
              day.status === 'padding' 
                ? 'bg-transparent' 
                : day.status === 'available'
                  ? selectedDate && day.date && selectedDate.getTime() === day.date.getTime()
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 cursor-pointer'
                  : day.status === 'full'
                    ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : day.status === 'past'
                      ? 'bg-gray-900/30 text-gray-600 cursor-not-allowed'
                      : 'bg-gray-900/30 text-gray-600 cursor-not-allowed'
            }`}
            onClick={() => day.status === 'available' && handleDateSelect(day)}
            onMouseEnter={() => day.launch && setHoveredDate(day)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            {day.day && (
              <>
                <span className={`text-sm ${
                  day.status === 'available' 
                    ? selectedDate && day.date && selectedDate.getTime() === day.date.getTime()
                      ? 'font-bold' 
                      : 'font-medium text-white'
                    : day.status === 'full'
                      ? 'font-medium text-gray-400'
                      : 'font-medium text-gray-500'
                }`}>
                  {day.day}
                </span>
                
                {day.launch && (
                  <div className="mt-1">
                    {day.status === 'available' && (
                      <div className={`w-2 h-2 rounded-full ${
                        day.launch.discount > 0 ? 'bg-green-500' : 'bg-purple-500'
                      }`} />
                    )}
                    {day.status === 'full' && (
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </div>
                )}
                
                {/* Price indicator for available days with discounts */}
                {day.launch && day.status === 'available' && day.launch.discount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                    {day.launch.discount}%
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
      
      {/* Tooltip for hovered date */}
      {hoveredDate && hoveredDate.launch && (
        <div className="bg-gray-900 p-3 rounded-lg shadow-lg">
          <h4 className="font-bold">{hoveredDate.launch.launchName}</h4>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Available seats:</span>
            <span className={`font-medium ${
              hoveredDate.launch.availableSeats > 10 
                ? 'text-green-400' 
                : hoveredDate.launch.availableSeats > 0 
                  ? 'text-yellow-400' 
                  : 'text-red-400'
            }`}>
              {hoveredDate.launch.availableSeats > 0 
                ? hoveredDate.launch.availableSeats 
                : 'Sold Out'}
            </span>
          </div>
          {hoveredDate.launch.discount > 0 && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Price:</span>
              <div>
                <span className="text-gray-400 line-through mr-1">
                  ${hoveredDate.launch.price.toLocaleString()}
                </span>
                <span className="text-green-400">
                  ${calculatePrice(hoveredDate.launch.price, hoveredDate.launch.discount).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Selected date summary */}
      {selectedDate && (
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
          <h4 className="font-bold text-lg mb-2">Your Selected Launch Date</h4>
          <div className="flex justify-between">
            <div>
              <p className="text-purple-300">{selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
              {/* Find the launch information for the selected date */}
              {availableDates.find(avail => 
                avail.date.getTime() === selectedDate.getTime()
              )?.launchName && (
                <p className="text-sm text-gray-400 mt-1">
                  {availableDates.find(avail => 
                    avail.date.getTime() === selectedDate.getTime()
                  )?.launchName}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="font-bold text-2xl">
                ${calculatePrice(
                  tier.price, 
                  availableDates.find(avail => 
                    avail.date.getTime() === selectedDate.getTime()
                  )?.discount || 0
                ).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">per person</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2" />
          <span className="text-gray-300">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
          <span className="text-gray-300">Discounted</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
          <span className="text-gray-300">Sold Out</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-600 mr-2" />
          <span className="text-gray-300">Unavailable</span>
        </div>
      </div>
      
      <div className="flex items-start p-3 bg-indigo-900/30 rounded-lg">
        <Info className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
        <p className="ml-2 text-sm text-indigo-200">
          Launch dates are limited based on orbital windows, fuel availability, and safety conditions. 
          Book early to secure your spot as seats are limited for each launch.
        </p>
      </div>
    </div>
  );
}