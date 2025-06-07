


import React, { useState, useRef, useEffect } from 'react';
import { assets, cities } from '../assets/assets';
import { API_BASE_URL } from '../config/api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaUtensils, FaWifi, FaSwimmingPool, FaStar } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const Hero = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [showTableReservation, setShowTableReservation] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Comfort";
  
  // For 3D effect
  const formRef = useRef(null);
  const locationDropdownRef = useRef(null);

  // Typewriter effect for "Comfort"
  useEffect(() => {
    if (displayText.length < fullText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 150);
      
      return () => clearTimeout(timeoutId);
    }
  }, [displayText]);
  
  // Detect navbar height on mount and window resize
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector('header nav') || 
                    document.querySelector('header') || 
                    document.querySelector('nav');
      
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      } else {
        setNavbarHeight(80);
      }
    };
    
    // Initial detection with a small delay
    setTimeout(updateNavbarHeight, 100);
    
    // Update on resize
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSearchParams({
      ...searchParams,
      [id === 'destinationInput' ? 'destination' : id === 'checkIn' ? 'checkIn' : id === 'checkOut' ? 'checkOut' : 'guests']: value
    });
  };

  const handleLocationSelect = (location) => {
    // Directly update the state without delay or animations
    setSearchParams({
      ...searchParams,
      destination: location
    });
    // Immediately close dropdown
    setShowLocationDropdown(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchParams.destination || !searchParams.checkIn || !searchParams.checkOut || !searchParams.guests) {
      setError('Please fill in all search fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Format destination for consistency
      const formattedDestination = searchParams.destination.charAt(0).toUpperCase() + 
                                searchParams.destination.slice(1).toLowerCase();
      
      // Navigate to search results page
      navigate(`/search-results?location=${formattedDestination}&checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guests=${searchParams.guests}`);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Error searching for properties');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total available rooms
  const totalRooms = searchResults.reduce((total, hotel) => total + hotel.totalRooms, 0);

  // Gold-toned amenities for the card
  const amenities = [
    { icon: <FaWifi className="w-5 h-5" />, name: "Free WiFi" },
    { icon: <FaSwimmingPool className="w-5 h-5" />, name: "Swimming Pool" },
    { icon: <FaStar className="w-5 h-5" />, name: "5-Star Service" }
  ];

  // Available locations
  const locations = ["Chennai", "Pondicherry"];

  // Gold and grey color palette
  const colors = {
    primaryGold: "#D4AF37",
    secondaryGold: "#BFA181",
    lightGold: "#F0E6CA",
    darkGrey: "#333333",
  };

  // Custom styles for Hero component only - SCOPED to avoid navbar conflicts
  const heroStyles = `
    /* Typewriter effect */
    .hero-typewriter-cursor::after {
      content: '|';
      display: inline-block;
      color: #D4AF37;
      animation: heroTypeBlink 1s step-end infinite;
      margin-left: 2px;
    }
    
    @keyframes heroTypeBlink {
      from, to { opacity: 1; }
      50% { opacity: 0; }
    }
    
    /* Gold gradient for buttons */
    .hero-gold-gradient {
      background: linear-gradient(to right, #D4AF37, #BFA181);
    }
    
    /* Gold text */
    .hero-gold-text {
      color: #D4AF37;
    }
    
    /* Custom styles for form inputs and dropdowns */
    .hero-form input[type="date"], 
    .hero-form select, 
    .hero-form .custom-dropdown-btn {
      color-scheme: dark;
    }
    
    .hero-form input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
    
    /* Gold focus styles */
    .hero-gold-focus:focus {
      border-color: #D4AF37 !important;
      box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.25) !important;
    }
    
    /* 3D Tilt animation */
    .hero-tilt-card {
      transform-style: preserve-3d;
      transition: transform 0.1s ease;
    }
    
    /* Location dropdown options */
    .hero-location-option {
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      background-color: #333 !important;
    }
    
    /* Hero container - ensure it doesn't affect navbar */
    .hero-container {
      position: relative;
      z-index: 1;
    }
  `;

  return (
    <div className="hero-container relative w-full overflow-hidden bg-[url('/src/assets/heroImage.png')] bg-no-repeat bg-cover bg-center"
      style={{ 
        minHeight: `calc(100vh - ${navbarHeight}px)`,
        marginTop: `${navbarHeight}px`,
      }}
    >
      {/* Add scoped styles that won't affect the navbar */}
      <style>{heroStyles}</style>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center h-full w-full">
        <div className="container mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left side - Text Content */}
            <motion.div 
              className="lg:w-1/2 text-white w-full max-w-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.p 
                className="text-lg font-light mb-2 text-[#D4AF37] tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Welcome to Luxor Villa
              </motion.p>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Your Kingdom of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F0E6CA] hero-typewriter-cursor">{displayText}</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg mb-8 text-gray-200 max-w-md leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Experience unparalleled luxury in our exclusive villas, 
                where every detail is crafted for your ultimate relaxation and pleasure.
              </motion.p>
              
              {/* Feature highlights */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {amenities.map((amenity, i) => (
                  <motion.div
                    key={i}
                    className="p-3 rounded-lg bg-black/30 flex flex-col items-center text-center transition-all"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(212, 175, 55, 0.15)"
                    }}
                  >
                    <div className="text-[#D4AF37] text-2xl mb-2">{amenity.icon}</div>
                    <div className="text-white text-sm font-medium">{amenity.name}</div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.button 
                  className="px-8 py-3 hero-gold-gradient text-white rounded-full font-medium text-lg tracking-wide"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <span>Discover More</span>
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.button>

                <motion.button 
                  className="px-8 py-3 border-2 border-[#D4AF37]/40 bg-transparent text-white rounded-full font-medium text-lg"
                  whileHover={{ 
                    scale: 1.03,
                    backgroundColor: "rgba(212, 175, 55, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <span>Take a Tour</span>
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Right side - Booking Form */}
            <motion.div 
              className="lg:w-1/2 mt-8 lg:mt-0 w-full max-w-md mx-auto lg:max-w-lg hero-tilt-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              ref={formRef}
              onMouseMove={(e) => {
                if (formRef.current) {
                  const rect = formRef.current.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  
                  formRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
                }
              }}
              onMouseLeave={() => {
                if (formRef.current) {
                  formRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
                }
              }}
            >
              <div className="bg-black/30 p-6 sm:p-8 rounded-2xl shadow-2xl border border-[#D4AF37]/20">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">Book Your Stay</h3>
                  <button 
                    className="text-[#D4AF37] hover:text-white text-sm flex items-center gap-1"
                  >
                    View Amenities
                    <span>→</span>
                  </button>
                </div>
                
                <form onSubmit={handleSearch} className="space-y-6 hero-form">
                  {/* Check-in and Check-out */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-1">
                        <FaCalendarAlt className="inline mr-2 text-[#D4AF37]" /> Check-in
                      </label>
                      <input
                        id="checkIn" 
                        type="date" 
                        className="w-full p-3 bg-black/40 text-white border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent hero-gold-focus"
                        value={searchParams.checkIn}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white text-sm font-medium mb-1">
                        <FaCalendarAlt className="inline mr-2 text-[#D4AF37]" /> Check-out
                      </label>
                      <input
                        id="checkOut" 
                        type="date" 
                        className="w-full p-3 bg-black/40 text-white border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent hero-gold-focus"
                        value={searchParams.checkOut}
                        onChange={handleInputChange}
                        min={searchParams.checkIn || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Guests and Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-1">
                        <FaUsers className="inline mr-2 text-[#D4AF37]" /> Guests
                      </label>
                      <select
                        id="guests"
                        value={searchParams.guests}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-black/40 text-white border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent hero-gold-focus"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num} className="bg-gray-800">
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Location with custom dropdown - improved to avoid blur effect */}
                    <div className="relative" ref={locationDropdownRef}>
                      <label className="block text-white text-sm font-medium mb-1">
                        <FaMapMarkerAlt className="inline mr-2 text-[#D4AF37]" /> Location
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                        className="w-full p-3 bg-black/40 text-white border border-[#D4AF37]/30 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent flex justify-between items-center hero-gold-focus"
                      >
                        <span>{searchParams.destination || "Select location"}</span>
                        <FiChevronDown className={`transition-transform text-[#D4AF37] ${showLocationDropdown ? "rotate-180" : ""}`} />
                      </button>
                      
                      {/* Using a simple div instead of AnimatePresence to avoid blur effect */}
                      {showLocationDropdown && (
                        <div
                          className="absolute z-20 mt-1 w-full rounded-md bg-gray-800 shadow-lg border border-[#D4AF37]/30 overflow-hidden hero-location-option"
                        >
                          <div className="max-h-60 overflow-auto py-1">
                            {locations.map((location) => (
                              <button
                                key={location}
                                type="button"
                                onClick={() => handleLocationSelect(location)}
                                className={`w-full px-4 py-2 text-left hover:bg-[#D4AF37]/20 transition-colors ${searchParams.destination === location ? 'bg-[#D4AF37]/30 text-[#D4AF37]' : 'text-gray-300'}`}
                              >
                                {location}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Hidden input for form validation */}
                      <input 
                        type="hidden" 
                        id="destinationInput" 
                        value={searchParams.destination} 
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Table Reservation Toggle */}
                  <div className="flex items-center p-3 rounded-lg">
                    <input
                      type="checkbox"
                      id="tableReservation"
                      checked={showTableReservation}
                      onChange={() => setShowTableReservation(!showTableReservation)}
                      className="w-5 h-5 text-[#D4AF37] border-[#D4AF37]/30 rounded focus:ring-[#D4AF37]"
                    />
                    <label htmlFor="tableReservation" className="ml-2 text-white flex items-center">
                      <FaUtensils className="mr-2 text-[#D4AF37]" /> 
                      <span>Add Table Reservation</span>
                    </label>
                  </div>
                  
                  {/* Error message */}
                  {error && (
                    <div className="bg-red-500/80 text-white px-4 py-2 rounded-md animate-pulse">
                      {error}
                    </div>
                  )}
                  
                  {/* Book Now Button */}
                  <button 
                    type="submit"
                    className="w-full py-4 hero-gold-gradient text-white font-bold rounded-lg relative overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    disabled={loading}
                  >
                    <span className="relative z-10 tracking-wider font-bold">
                      {loading ? 'Searching...' : 'Book Now'}
                    </span>
                    {loading && (
                      <div className="ml-2 inline-block w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    )}
                  </button>

                  {/* 3D effect indicator */}
                  <div className="text-[#D4AF37]/50 text-xs text-center">
                    Move mouse for 3D effect ✨
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Results Modal - Keep existing implementation */}
      {showResults && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto text-gray-800">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-playfair font-bold">
                {totalRooms} Available {totalRooms === 1 ? 'Villa' : 'Villas'}
              </h2>
              <button 
                onClick={() => setShowResults(false)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex flex-wrap gap-2 mb-4 text-sm">
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {searchParams.destination}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {new Date(searchParams.checkIn).toLocaleDateString()} - {new Date(searchParams.checkOut).toLocaleDateString()}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {searchParams.guests} {parseInt(searchParams.guests) === 1 ? 'Guest' : 'Guests'}
                </span>
              </div>
              
              {searchResults.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-xl">No available villas for your search criteria</p>
                  <p className="text-gray-500 mt-2">Try adjusting your dates or destination</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {searchResults.map(hotel => (
                    <div key={hotel.hotel.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 border-b">
                        <h3 className="text-xl font-bold">{hotel.hotel.name}</h3>
                        <p className="text-gray-600">{hotel.hotel.address}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 divide-y">
                        {hotel.rooms.map(room => (
                          <div key={room.id} className="flex flex-col md:flex-row p-4">
                            <div className="md:w-1/3 mb-4 md:mb-0 md:pr-4">
                              <img 
                                src={`/src/assets/${room.images[0]}`} 
                                alt={room.roomType} 
                                className="h-48 w-full object-cover rounded"
                                onError={(e) => {
                                  e.target.src = '/src/assets/roomImg11.png'; // Fallback image
                                }}
                              />
                            </div>
                            <div className="md:w-2/3 flex flex-col">
                              <div>
                                <h4 className="text-lg font-semibold">{room.roomType}</h4>
                                <div className="mt-2">
                                  <ul className="flex flex-wrap gap-2 text-sm">
                                    {room.amenities.map(amenity => (
                                      <li key={amenity} className="bg-gray-100 px-2 py-1 rounded">
                                        {amenity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="mt-auto pt-4 flex justify-between items-end">
                                <div>
                                  <p className="text-lg font-bold">₹{room.pricePerNight}</p>
                                  <p className="text-sm text-gray-500">per night</p>
                                </div>
                                <a 
                                  href={`/rooms/${room.id}?checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guests=${searchParams.guests}`}
                                  className="bg-[#D4AF37] text-white px-6 py-2 rounded-md hover:bg-[#BFA181] transition"
                                >
                                  View Details
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;