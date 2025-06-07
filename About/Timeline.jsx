
import React, { useEffect, useRef } from 'react';
import { FaHome, FaUsers, FaTools, FaAward } from 'react-icons/fa';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const milestones = [
  {
    date: '2020',
    text: 'Villa Established',
    icon: <FaHome size={28} />,
    bgImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // house-themed
    description: 'Our luxurious villa opened its doors to welcome guests to an unforgettable experience of comfort and elegance.'
  },
  {
    date: '2021',
    text: 'First Guests Arrived',
    icon: <FaUsers size={28} />,
    bgImage:
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80', // people-themed
    description: 'We were delighted to host our first guests who experienced our exceptional hospitality and amenities.'
  },
  {
    date: '2022',
    text: 'Renovation Completed',
    icon: <FaTools size={28} />,
    bgImage:
      'https://images.unsplash.com/photo-1581091870624-1e3e64a1b80d?auto=format&fit=crop&w=800&q=80', // tools-themed
    description: 'Our villa underwent a complete transformation, adding modern features while preserving its authentic charm.'
  },
  {
    date: '2023',
    text: 'Awarded Best Villa',
    icon: <FaAward size={28} />,
    bgImage:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', // award-themed
    description: 'Our commitment to excellence was recognized with the prestigious "Best Villa" award in the luxury accommodation category.'
  },
];

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  useEffect(() => {
    // Add 3D perspective to the container
    const container = containerRef.current;
    if (container) {
      container.style.perspective = '1000px';
    }
  }, []);

  // Create floating particles in background
  const Particles = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-black bg-opacity-5 backdrop-blur-sm"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 60 - 30],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="relative py-20 min-h-screen bg-gradient-to-b from-white to-gray-100 overflow-hidden select-none"
    >
      <Particles />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,220,255,0.3),transparent_70%)]"
        style={{ y: backgroundY }}
      />
      
      <motion.h2 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative text-5xl font-serif text-black text-center mb-20 tracking-wide drop-shadow-sm z-10"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700">
          Our Journey
        </span>
      </motion.h2>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Animated vertical timeline line */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute left-1/2 top-0 transform -translate-x-1/2 w-[3px] bg-gradient-to-b from-black/5 via-black/20 to-black/5 rounded"
        ></motion.div>

        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          
          return (
            <MilestoneItem 
              key={i} 
              milestone={m} 
              isLeft={isLeft} 
              index={i} 
            />
          );
        })}
      </div>
    </div>
  );
};

// Separate component for each milestone for better animation control
const MilestoneItem = ({ milestone, isLeft, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });
  
  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: isLeft ? 50 : -50,
      rotateY: isLeft ? -10 : 10
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: { 
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0, rotate: -90 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260,
        damping: 20,
        delay: 0.4 + index * 0.1
      }
    }
  };

  return (
    <div
      ref={ref}
      className={`mb-24 md:mb-20 flex flex-col md:flex-row justify-between items-center w-full relative
        ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      {/* Content box with background image */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`w-full md:w-5/12 p-6 md:p-8 rounded-[2rem] border border-black/10 shadow-lg backdrop-blur-sm
          text-${isLeft ? 'right' : 'left'} relative cursor-pointer
          transition-all duration-500 ease-out hover:shadow-xl
          hover:[transform:perspective(1000px)_rotateY(${isLeft ? '-' : ''}5deg)]
          group`}
        style={{
          backgroundImage: `url(${milestone.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Animated overlay for subtle text readability */}
        <div className="absolute inset-0 bg-white/40 group-hover:bg-white/30 rounded-[2rem] pointer-events-none
          transition-all duration-500 backdrop-filter backdrop-blur-[2px] group-hover:backdrop-blur-[1px]"></div>

        {/* Text content */}
        <div className="relative z-10">
          <p className="text-gray-700 text-sm font-mono mb-2 md:mb-3">{milestone.date}</p>
          <p className="text-black font-semibold text-xl md:text-2xl leading-relaxed mb-3">{milestone.text}</p>
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            whileInView={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-black/80 text-sm md:text-base leading-relaxed hidden md:block"
          >
            {milestone.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Icon circle */}
      <motion.div
        variants={iconVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="absolute top-8 md:top-auto left-1/2 transform -translate-x-1/2 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center
          bg-gradient-to-br from-gray-100 to-white backdrop-blur-md shadow-lg cursor-pointer z-20
          transition-transform duration-300 hover:scale-125 hover:shadow-xl"
        style={{
          boxShadow: '0 0 20px rgba(0,0,0,0.1)'
        }}
      >
        <div className="text-black z-10 drop-shadow-md">{milestone.icon}</div>
      </motion.div>
      
      {/* Date indicator for mobile */}
      <div className="md:hidden text-center text-lg font-bold py-3">
        {milestone.date}
      </div>
    </div>
  );
};

export default Timeline;