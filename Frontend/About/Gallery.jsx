
import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { PlayCircle, PauseCircle, X, ZoomIn, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import villaImage from '../../assets/About/advantages-of-living-in-a-villa.jpg';
import villaVideo from '../../assets/About/Villa Vela - Ultra Modern House in La Reserva de Sotogrande, Spain _ Cinematic Video by Drumelia.mp4';

const Gallery = () => {
  // State management
  const [isInView, setIsInView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const [playingStates, setPlayingStates] = useState({});
  const [filterCategory, setFilterCategory] = useState('all');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  
  // Refs for element access
  const galleryRef = useRef(null);
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const modalVideoRef = useRef(null);
  const controls = useAnimation();
  
  // CRT effect ref
  const crtOverlayRef = useRef(null);

  // Sample media items with categories
  const mediaItems = [
    { type: 'image', src: villaImage, alt: 'Villa exterior', category: 'exterior' },
    { type: 'video', src: villaVideo, alt: 'Villa tour', category: 'tour' },
    { type: 'image', src: villaImage, alt: 'Garden view', category: 'outdoor' },
    { type: 'image', src: villaImage, alt: 'Master bedroom', category: 'interior' },
    { type: 'video', src: villaVideo, alt: 'Pool area', category: 'outdoor' },
    { type: 'image', src: villaImage, alt: 'Dining space', category: 'interior' },
  ];

  // Filter categories from media items
  const categories = ['all', 'exterior', 'interior', 'outdoor', 'tour'];

  // Filtered items based on selected category
  const filteredItems = filterCategory === 'all'
    ? mediaItems
    : mediaItems.filter(item => item.category === filterCategory);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for triggering animations when gallery comes into view
  useEffect(() => {
    const options = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          controls.start("visible");
        }
      });
    }, options);

    if (galleryRef.current) observer.observe(galleryRef.current);
    
    return () => {
      if (galleryRef.current) observer.unobserve(galleryRef.current);
    };
  }, [controls]);

  // Create CRT effect when a video is active
  const applyCRTEffect = (videoElement, isPlaying) => {
    if (!crtOverlayRef.current) return;
    
    if (isPlaying) {
      // Activate CRT effect
      crtOverlayRef.current.style.opacity = '1';
      crtOverlayRef.current.style.display = 'block';
      
      // Apply scan lines and flicker
      document.documentElement.style.setProperty('--crt-scan-speed', '8s');
    } else {
      // Remove CRT effect with a smooth fadeout
      crtOverlayRef.current.style.opacity = '0';
      setTimeout(() => {
        crtOverlayRef.current.style.display = 'none';
      }, 500);
      
      // Reset scan lines
      document.documentElement.style.setProperty('--crt-scan-speed', '0s');
    }
  };

  // Enhanced video play/pause with smooth transitions and effects
  const toggleVideoPlay = (index, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    const video = videoRefs.current[index];
    if (!video) return;
    
    setPlayingStates(prev => {
      const newState = { ...prev, [index]: !prev[index] };
      
      if (!prev[index]) {
        // Video is about to play
        setActiveVideoIndex(index);
        video.play().catch(e => console.log('Play error:', e));
        
        // Add visual effects for playing state
        applyCRTEffect(video, true);
        
        // Create startup animation
        video.classList.add('playing');
        setTimeout(() => video.classList.add('crt-active'), 100);
      } else {
        // Video is about to pause
        video.pause();
        setActiveVideoIndex(null);
        
        // Remove visual effects
        applyCRTEffect(video, false);
        
        // Remove classes with transition
        video.classList.remove('crt-active');
        setTimeout(() => video.classList.remove('playing'), 300);
      }
      
      return newState;
    });
  };

  // Handle mouse hover effects
  const handleMouseEnter = (index) => {
    setHoveredItem(index);
    
    // Auto-play on hover (optional)
    // const video = videoRefs.current[index];
    // if (mediaItems[index].type === 'video' && video && video.paused) {
    //   video.play().catch(e => console.log('Play error on hover:', e));
    //   setPlayingStates(prev => ({ ...prev, [index]: true }));
    // }
  };
  
  const handleMouseLeave = (index) => {
    setHoveredItem(null);
    
    // Auto-pause on mouse leave (optional)
    // const video = videoRefs.current[index];
    // if (mediaItems[index].type === 'video' && video && !video.paused) {
    //   video.pause();
    //   setPlayingStates(prev => ({ ...prev, [index]: false }));
    // }
  };
  
  // Track mouse position for hover effects
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  
  // Open fullscreen modal for item
  const openModal = (index) => {
    setSelectedItem(index);
    document.body.style.overflow = 'hidden';
    
    // If it's a video, prepare it for modal viewing
    if (mediaItems[index].type === 'video') {
      setTimeout(() => {
        if (modalVideoRef.current) {
          modalVideoRef.current.currentTime = 0;
        }
      }, 100);
    }
  };
  
  // Close fullscreen modal
  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = '';
    
    // If active video is playing in gallery, keep it playing
    if (activeVideoIndex !== null) {
      const video = videoRefs.current[activeVideoIndex];
      if (video && !video.paused) {
        video.play().catch(e => console.log('Resume error:', e));
      }
    }
  };
  
  // Handle modal video playback
  const toggleModalVideo = () => {
    if (!modalVideoRef.current) return;
    
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play();
      applyCRTEffect(modalVideoRef.current, true);
    } else {
      modalVideoRef.current.pause();
      applyCRTEffect(modalVideoRef.current, false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    }),
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    tap: {
      scale: 0.97
    }
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.1
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const filterItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    active: {
      color: "#000",
      fontWeight: "600",
      scale: 1.05,
      textShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
    },
    inactive: {
      color: "#777",
      fontWeight: "400",
      scale: 1
    },
    hover: {
      color: "#000",
      scale: 1.05
    },
    tap: {
      scale: 0.97
    }
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* CRT overlay effect for videos */}
      <div 
        ref={crtOverlayRef} 
        className="fixed inset-0 pointer-events-none z-10 opacity-0 hidden transition-opacity duration-300"
        style={{
          background: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.02) 50%)",
          backgroundSize: "100% 4px",
          mixBlendMode: "overlay",
        }}
      />

      {/* Custom CSS for CRT effect */}
      <style jsx global>{`
        @keyframes scanLine {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes flicker {
          0% { opacity: 0.97; }
          5% { opacity: 0.9; }
          10% { opacity: 0.97; }
          15% { opacity: 1; }
          50% { opacity: 0.94; }
          80% { opacity: 0.98; }
          95% { opacity: 0.94; }
          100% { opacity: 0.98; }
        }
        
        .crt-active {
          animation: flicker 0.3s infinite alternate;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2), inset 0 0 30px rgba(0, 0, 0, 0.2);
        }
        
        .crt-active::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.05) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 2;
        }
        
        .playing {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .playing::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          animation: scanLine var(--crt-scan-speed, 8s) linear infinite;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      <motion.div 
        ref={(el) => {
          galleryRef.current = el;
          containerRef.current = el;
        }}
        className="bg-white px-6 py-12 md:p-12 rounded-xl shadow-lg overflow-hidden relative"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        onMouseMove={handleMouseMove}
      >
        {/* Background elements */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gray-100 mix-blend-multiply opacity-50"
          animate={{
            y: scrollY * 0.05
          }}
        />
        
        <motion.div
          className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-gray-200 mix-blend-multiply opacity-40"
          animate={{
            y: scrollY * -0.03
          }}
        />
        
        {/* Title section with animated underline */}
        <motion.div className="text-center mb-10 relative z-10" variants={titleVariants}>
          <motion.h2 className="text-3xl sm:text-4xl font-serif text-charcoal mb-4 inline-block relative">
            Our Gallery
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-charcoal to-transparent"
              initial={{ width: "0%" }}
              animate={{ width: "80%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Explore our luxurious villa through these stunning visuals. Click on any item to view in full screen.
          </motion.p>
        </motion.div>
        
        {/* Filter categories */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-8"
          variants={filterVariants}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              variants={filterItemVariants}
              custom={index}
              animate={filterCategory === category ? "active" : "inactive"}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm ${
                filterCategory === category 
                ? 'border-charcoal bg-charcoal/5' 
                : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Gallery grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
        >
          {filteredItems.map((item, index) => (
            <motion.div 
              key={index} 
              className="h-64 md:h-80 overflow-hidden rounded-xl relative group cursor-pointer"
              variants={itemVariants}
              custom={index}
              whileHover="hover"
              whileTap="tap"
              onClick={() => openModal(mediaItems.indexOf(item))}
              onMouseEnter={() => handleMouseEnter(mediaItems.indexOf(item))}
              onMouseLeave={() => handleMouseLeave(mediaItems.indexOf(item))}
              style={{
                transformOrigin: 'center',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                backgroundColor: '#f8f8f8',
              }}
            >
              {/* Item content (image or video) */}
              {item.type === 'image' ? (
                <motion.img 
                  src={item.src} 
                  alt={item.alt} 
                  className="w-full h-full object-cover transition-transform duration-1500 ease-out"
                  initial={{ scale: 1.1, filter: 'grayscale(100%)' }}
                  animate={{ 
                    scale: hoveredItem === mediaItems.indexOf(item) ? 1.05 : 1,
                    filter: hoveredItem === mediaItems.indexOf(item) ? 'grayscale(0%)' : 'grayscale(80%)'
                  }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                />
              ) : (
                <div className="w-full h-full relative overflow-hidden">
                  <motion.video
                    ref={el => videoRefs.current[mediaItems.indexOf(item)] = el}
                    src={item.src}
                    className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                      playingStates[mediaItems.indexOf(item)] ? '' : 'grayscale'
                    }`}
                    muted
                    loop
                    playsInline
                    initial={{ scale: 1.1 }}
                    animate={{ 
                      scale: hoveredItem === mediaItems.indexOf(item) || playingStates[mediaItems.indexOf(item)] ? 1.05 : 1
                    }}
                    transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    onClick={(e) => e.preventDefault()}
                  />
                  
                  {/* Play button overlay with improved animation */}
                  <motion.button
                    onClick={(e) => toggleVideoPlay(mediaItems.indexOf(item), e)}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ 
                      scale: 1.1, 
                      opacity: 1,
                      boxShadow: "0 0 20px rgba(255,255,255,0.5)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <motion.div
                      className="relative flex items-center justify-center"
                      animate={{
                        rotate: playingStates[mediaItems.indexOf(item)] ? 0 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {playingStates[mediaItems.indexOf(item)] ? (
                        <PauseCircle className="w-14 h-14 text-white drop-shadow-lg" />
                      ) : (
                        <PlayCircle className="w-14 h-14 text-white drop-shadow-lg" />
                      )}
                      
                      {/* Animated ring around play button */}
                      <motion.div
                        className="absolute -inset-1 rounded-full border-2 border-white/50"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                        }}
                      />
                    </motion.div>
                  </motion.button>
                </div>
              )}
              
              {/* Overlay gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredItem === mediaItems.indexOf(item) ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Item info */}
              <motion.div 
                className="absolute bottom-0 left-0 w-full p-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: hoveredItem === mediaItems.indexOf(item) ? 1 : 0,
                  y: hoveredItem === mediaItems.indexOf(item) ? 0 : 20
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.h3 
                  className="text-lg font-medium"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  {item.alt}
                </motion.h3>
                
                <motion.div 
                  className="text-sm text-white/80 mt-1 flex items-center gap-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <span className="capitalize">{item.category}</span>
                  <span className="w-1 h-1 bg-white/70 rounded-full" />
                  <span>{item.type === 'video' ? 'Video' : 'Photo'}</span>
                </motion.div>
              </motion.div>
              
              {/* Zoom icon */}
              <motion.div 
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: hoveredItem === mediaItems.indexOf(item) ? 1 : 0.5, 
                  opacity: hoveredItem === mediaItems.indexOf(item) ? 1 : 0 
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-black/30 backdrop-blur-sm p-2 rounded-full">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </motion.div>
              
              {/* Category badge */}
              <motion.div 
                className="absolute top-4 left-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: hoveredItem === mediaItems.indexOf(item) ? 1 : 0, 
                  x: hoveredItem === mediaItems.indexOf(item) ? 0 : -10
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs capitalize">
                  {item.category}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Fullscreen modal */}
      <AnimatePresence>
        {selectedItem !== null && (
          <motion.div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              className="absolute top-6 right-6 text-white/80 hover:text-white z-10"
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            
            <motion.div 
              className="relative max-w-5xl max-h-[80vh] w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {mediaItems[selectedItem].type === 'image' ? (
                <motion.img 
                  src={mediaItems[selectedItem].src} 
                  alt={mediaItems[selectedItem].alt}
                  className="w-full h-full object-contain rounded-lg shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              ) : (
                <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-2xl">
                  <video
                    ref={modalVideoRef}
                    src={mediaItems[selectedItem].src}
                    className="w-full h-full object-contain"
                    controls={false}
                    muted
                    loop
                    onClick={toggleModalVideo}
                  />
                  
                  {/* CRT scan lines overlay for modal video */}
                  <div className="absolute inset-0 pointer-events-none z-10 opacity-30" 
                    style={{
                      background: "linear-gradient(transparent 50%, rgba(0, 0, 0, 0.05) 50%)",
                      backgroundSize: "100% 4px",
                      mixBlendMode: "overlay",
                    }}
                  />
                  
                  {/* Play/pause button */}
                  <motion.button
                    onClick={toggleModalVideo}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/30 rounded-full p-6 backdrop-blur-sm"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {modalVideoRef.current && !modalVideoRef.current.paused ? (
                      <PauseCircle className="w-12 h-12 text-white" />
                    ) : (
                      <PlayCircle className="w-12 h-12 text-white" />
                    )}
                  </motion.button>
                </div>
              )}
              
              {/* Image/video info */}
              <motion.div 
                className="bg-white/10 backdrop-blur-md text-white p-4 rounded-lg mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">{mediaItems[selectedItem].alt}</h3>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-xs capitalize">
                    {mediaItems[selectedItem].category}
                  </span>
                </div>
                <p className="text-white/70 text-sm mt-2">
                  Experience the luxury and elegance of our exquisite villa, designed for comfort and sophistication.
                </p>
              </motion.div>
              
              {/* Navigation buttons */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full flex justify-between pointer-events-none">
                <motion.button 
                  className="pointer-events-auto bg-black/30 backdrop-blur-sm p-2 rounded-full text-white/70 hover:text-white -ml-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(selectedItem > 0 ? selectedItem - 1 : mediaItems.length - 1);
                  }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={mediaItems.length <= 1}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>
                
                <motion.button 
                  className="pointer-events-auto bg-black/30 backdrop-blur-sm p-2 rounded-full text-white/70 hover:text-white -mr-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem((selectedItem + 1) % mediaItems.length);
                  }}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={mediaItems.length <= 1}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;