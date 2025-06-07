


import React, { useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useInView, useAnimation, useScroll, useTransform } from 'framer-motion'

const Footer = () => {
  // Add navigation hooks
  const navigate = useNavigate()
  const location = useLocation()
  
  // State management
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [hoveredSocial, setHoveredSocial] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 })
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Refs for animations
  const footerRef = useRef(null)
  const newsletterRef = useRef(null)
  const logoRef = useRef(null)
  const magneticRef = useRef(null)
  
  const isNewsletterInView = useInView(newsletterRef, { once: false, amount: 0.3 })
  const isLogoInView = useInView(logoRef, { once: true, amount: 0.8 })
  const logoControls = useAnimation()
  
  // Scroll animations
  const { scrollYProgress } = useScroll()
  const wavePathScroll = useTransform(scrollYProgress, [0, 1], [0, 200])
  const backgroundYPosition = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  // Function to handle navigation with proper scroll behavior
  const handleNavigation = (path) => {
    // Only perform actions if path is different from current location
    if (path !== location.pathname && path !== '#') {
      // First scroll to top immediately
      window.scrollTo(0, 0);
      
      // Then navigate to the new route
      navigate(path);
    }
  }

  // Parallax effect tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Logo animation when in view
  useEffect(() => {
    if (isLogoInView) {
      logoControls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.8, 
          ease: [0.6, 0.05, 0.01, 0.9],
          staggerChildren: 0.1
        }
      })
    }
  }, [isLogoInView, logoControls])

  // Handle magnetic button effect
  const handleMouseMove = (e) => {
    if (!magneticRef.current || !isHoveringButton) return
    
    const rect = magneticRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    
    // Calculate strength based on distance from center (max 25px movement)
    const maxStrength = 15
    const strength = Math.min(maxStrength, Math.max(rect.width, rect.height) / 5)
    
    // Calculate move distance with easing
    const moveX = distanceX * strength / Math.max(rect.width, rect.height) * 0.5
    const moveY = distanceY * strength / Math.max(rect.width, rect.height) * 0.5
    
    setMagneticPosition({ x: moveX, y: moveY })
  }
  
  const resetMagneticPosition = () => {
    setMagneticPosition({ x: 0, y: 0 })
    setIsHoveringButton(false)
  }

  // Handle newsletter submission with enhanced animation
  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (email.trim() !== '') {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
      setEmail('')
    }
  }

  // Create sound effect on button hover
  const playTickSound = () => {
    if (!isPlaying) {
      setIsPlaying(true)
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3')
      audio.volume = 0.1
      audio.play().catch(e => console.log('Audio play prevented:', e))
      setTimeout(() => setIsPlaying(false), 300)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.6, 0.05, 0.01, 0.9] 
      }
    }
  }

  const logoLetterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    })
  }

  const socialIconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2, 
      rotate: [0, -10, 10, -5, 0],
      transition: { duration: 0.5 }
    }
  }

  const linkVariants = {
    initial: { x: 0 },
    hover: { 
      x: 5,
      transition: { duration: 0.2 }
    }
  }

  const floatingButtonVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        yoyo: Infinity
      }
    },
    tap: {
      scale: 0.95
    }
  }

  const wavePath = `
    M0 30
    C150 10 350 50 500 20
    C650 -10 800 30 1000 10
    L1000 100
    L0 100
    Z
  `

  // Social media icons with hover effects
  const socialIcons = [
    { icon: assets.instagramIcon, name: 'instagram', url: 'https://instagram.com' },
    { icon: assets.facebookIcon, name: 'facebook', url: 'https://facebook.com' },
    { icon: assets.twitterIcon, name: 'twitter', url: 'https://twitter.com' },
    { icon: assets.linkendinIcon, name: 'linkedin', url: 'https://linkedin.com' }
  ]

  // Footer links with animations
  const footerLinks = [
    { section: "COMPANY", links: [
      { to: "/about", text: "About Us" },
      { to: "#", text: "Careers" },
      { to: "#", text: "Press" },
      { to: "#", text: "Blog" },
      { to: "/partners", text: "Partners" }
    ]},
    { section: "SUPPORT", links: [
      { to: "/h", text: "Help Center" },
      { to: "/si", text: "Safety Information" },
      { to: "#", text: "Cancellation Options" },
      { to: "/contact", text: "Contact Us" },
      { to: "#", text: "Accessibility" }
    ]}
  ]

  return (
    <div className="relative">
      {/* Animated wave divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-20 -translate-y-[99%]">
        <motion.svg
          viewBox="0 0 1000 100"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
          style={{ y: wavePathScroll }}
        >
          <motion.path
            d={wavePath}
            fill="url(#footer-gradient)"
            className="opacity-90"
            animate={{
              d: [
                wavePath,
                `
                M0 30
                C150 20 350 40 500 30
                C650 20 800 40 1000 20
                L1000 100
                L0 100
                Z
                `,
                wavePath,
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 15,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="footer-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F6F9FC" />
              <stop offset="100%" stopColor="#F6F9FC" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      <motion.div 
        ref={footerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='relative bg-gradient-to-b from-[#F6F9FC] to-[#EDF2F7] text-gray-500/80 pt-16 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden'
        onMouseMove={handleMouseMove}
      >
        {/* Dynamic background patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            style={{ y: backgroundYPosition }}
            className="absolute inset-0 opacity-30"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-black/5"
                style={{
                  width: 10 + Math.random() * 40,
                  height: 10 + Math.random() * 40,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 30],
                  y: [0, (Math.random() - 0.5) * 30],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </motion.div>
          
          <motion.div 
            className="absolute top-10 left-10 w-64 h-64 rounded-full bg-black/5 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -25, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ 
              translateY: scrollPosition * -0.02
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-black/3 blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{ 
              translateY: scrollPosition * -0.03
            }}
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className='flex flex-wrap justify-between gap-12 md:gap-6 relative z-10'
        >
          {/* Logo and description section - UPDATED LAYOUT */}
          <motion.div 
            variants={itemVariants}
            ref={logoRef}
            className='max-w-sm'
            animate={logoControls}
            initial="hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Logo on left */}
              <div className="relative">
                <motion.img 
                  src={assets.logo} 
                  alt="logo" 
                  className='h-16 md:h-20 relative z-10'
                  whileHover={{ 
                    scale: 1.05,
                    filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.1))"
                  }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Animated logo highlight */}
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-black/0 via-black/5 to-black/0 rounded-lg blur-lg z-0"
                  animate={{
                    backgroundPosition: ['200% 0', '0% 0', '-200% 0'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                />
              </div>
              
              {/* Description on right/below */}
              <div className="relative mt-4 md:mt-0">
                <motion.p 
                  variants={itemVariants}
                  className='text-sm bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500 text-transparent relative z-10'
                >
                  Discover the world's most extraordinary villas for your dream vacation. Experience luxury, comfort and stunning locations.
                </motion.p>
                
                {/* Typing cursor effect */}
                <motion.div 
                  className="absolute top-0 bottom-0 right-0 w-0.5 bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    height: ['0%', '100%', '0%'],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    delay: 1,
                    repeat: 3,
                    repeatDelay: 10,
                  }}
                />
              </div>
            </div>
            
            {/* Social Icons Below Description */}
            <motion.div 
              variants={itemVariants}
              className='flex items-center gap-4 mt-6'
            >
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.9 }}
                  className='relative group'
                  onMouseEnter={() => {
                    setHoveredSocial(social.name)
                    playTickSound()
                  }}
                  onMouseLeave={() => setHoveredSocial(null)}
                  custom={index}
                >
                  <motion.div 
                    className="absolute -inset-2 scale-0 group-hover:scale-100 bg-gray-100 rounded-full -z-10 opacity-0 group-hover:opacity-100"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  
                  <motion.img 
                    src={social.icon} 
                    alt={`${social.name}-icon`} 
                    className='w-6 h-6 relative z-10 cursor-pointer transition-transform'
                  />
                  
                  {/* Particle burst effect on hover */}
                  <AnimatePresence>
                    {hoveredSocial === social.name && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-black/20 rounded-full z-0"
                            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                            animate={{
                              scale: [0, 1, 0],
                              x: [0, (Math.random() - 0.5) * 30],
                              y: [0, (Math.random() - 0.5) * 30],
                              opacity: [0, 1, 0],
                            }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              duration: 0.6,
                              ease: "easeOut",
                            }}
                            style={{
                              left: "50%",
                              top: "50%",
                              translateX: "-50%",
                              translateY: "-50%",
                            }}
                          />
                        ))}
                        <motion.div 
                          className="absolute inset-0 rounded-full border-2 border-black/10"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1.8, opacity: 0.3 }}
                          exit={{ scale: 2.2, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </motion.div>

            {/* Interactive globe effect */}
            <motion.div
              className="mt-8 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 relative overflow-hidden hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center overflow-hidden relative">
                  <motion.div
                    className="absolute w-14 h-14"
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity,
                      ease: "linear" 
                    }}
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80')",
                      backgroundSize: "cover"
                    }}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium text-black/70">Worldwide Presence</p>
                  <p className="text-xs text-black/50">20+ countries, 100+ locations</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Links sections with animations - Modified for proper navigation */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div 
              key={section.section} 
              variants={itemVariants}
              custom={sectionIndex}
            >
              <motion.span 
                variants={itemVariants}
                className='font-playfair text-lg text-gray-800 relative inline-block'
              >
                {section.section}
                <motion.div 
                  className='absolute bottom-0 left-0 h-0.5 bg-black/40 w-0'
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ delay: 0.5 + (sectionIndex * 0.2), duration: 0.8 }}
                />
              </motion.span>
              
              <motion.ul 
                variants={containerVariants}
                className='mt-4 flex flex-col gap-3 text-sm'
              >
                {section.links.map((link, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    custom={index}
                    onMouseEnter={() => setHoveredLink(`${section.section.toLowerCase()}-${index}`)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {/* Changed from Link to clickable div with navigation handler */}
                    <motion.div 
                      onClick={() => handleNavigation(link.to)}
                      className="flex items-center space-x-1 cursor-pointer"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                      onMouseEnter={playTickSound}
                    >
                      <motion.span 
                        className="w-0 h-0.5 bg-black/30"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: hoveredLink === `${section.section.toLowerCase()}-${index}` ? 5 : 0 
                        }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="relative">
                        {link.text}
                        <AnimatePresence>
                          {hoveredLink === `${section.section.toLowerCase()}-${index}` && (
                            <motion.span
                              className="absolute bottom-0 left-0 w-full h-[1px] bg-black/40"
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              exit={{ width: 0 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>
                      </span>
                    </motion.div>
                  </motion.li>
                ))}
              </motion.ul>
              
              {/* Section badge */}
              {sectionIndex === 0 && (
                <motion.div
                  className="mt-4 inline-flex items-center gap-1.5 bg-black/5 backdrop-blur-sm px-2.5 py-1 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-green-500"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <span className="text-[10px] uppercase tracking-wider font-medium text-black/60">
                    Active 24/7
                  </span>
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Newsletter section */}
          <motion.div 
            variants={itemVariants}
            className='max-w-80'
            ref={newsletterRef}
          >
            <motion.span 
              variants={itemVariants}
              className='font-playfair text-lg text-gray-800 relative inline-block'
            >
              STAY UPDATED
              <motion.div 
                className='absolute bottom-0 left-0 h-0.5 bg-black/40 w-0'
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
            </motion.span>
            
            <motion.p 
              variants={itemVariants}
              className='mt-3 text-sm'
            >
              Subscribe to our newsletter for inspiration and special offers.
            </motion.p>
            
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 px-4 py-3 bg-black/5 backdrop-blur-sm border border-black/10 rounded-md"
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Thank you! You're now subscribed.</p>
                      <motion.p 
                        className="text-xs text-gray-400 mt-0.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Check your inbox for a welcome gift.
                      </motion.p>
                    </div>
                  </div>

                  {/* Confetti animation */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: `hsl(${Math.random() * 360}, 80%, 60%)`,
                        }}
                        initial={{ 
                          scale: 0,
                          x: 0,
                          y: 0,
                          opacity: 1
                        }}
                        animate={{ 
                          scale: Math.random() * 0.8 + 0.2,
                          x: (Math.random() - 0.5) * 150,
                          y: (Math.random() - 0.5) * 150,
                          opacity: 0
                        }}
                        transition={{ 
                          duration: Math.random() * 1 + 0.5,
                          ease: "easeOut" 
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  variants={itemVariants}
                  onSubmit={handleEmailSubmit}
                  className='relative mt-4'
                >
                  <motion.div 
                    className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-black/5 via-black/10 to-black/5 blur-sm -z-10"
                    animate={{
                      backgroundPosition: ['0% center', '100% center', '0% center'],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      opacity: isNewsletterInView ? 1 : 0,
                      transition: "opacity 0.5s ease-in-out"
                    }}
                  />
                  <div className='flex items-center relative group'>
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full bg-white/80 backdrop-blur-sm rounded-l-md border border-gray-300 h-10 px-3 outline-none focus:border-black transition-colors duration-300'
                      placeholder='Your email'
                      required
                      whileFocus={{ boxShadow: "0 0 0 2px rgba(0,0,0,0.1)" }}
                    />
                    
                    {/* Magnetic button effect */}
                    <motion.div
                      ref={magneticRef}
                      style={{ x: magneticPosition.x, y: magneticPosition.y }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      onMouseEnter={() => setIsHoveringButton(true)}
                      onMouseLeave={resetMagneticPosition}
                      className="relative"
                    >
                      <motion.button
                        whileHover={{ backgroundColor: "#333" }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className='flex items-center justify-center bg-black h-10 w-10 rounded-r-md relative overflow-hidden'
                      >
                        <motion.div
                          initial={{ y: -30, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 30, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <img src={assets.arrowIcon} alt="arrow-icon" className='w-3.5 invert' />
                        </motion.div>
                      </motion.button>
                    </motion.div>
                    
                    {/* Floating particles effect */}
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      initial="initial"
                      whileHover="animate"
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-black/20 rounded-full"
                          variants={{
                            initial: { opacity: 0 },
                            animate: {
                              opacity: [0, 1, 0],
                              x: [0, (Math.random() * 20) - 10],
                              y: [0, -20 * (i+1)],
                              transition: {
                                duration: 1 + Math.random(),
                                ease: "easeOut",
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatDelay: Math.random() * 2,
                              }
                            }
                          }}
                          style={{
                            right: 10 + (i * 3),
                            bottom: 10,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
            
            {/* Security indicators */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 flex items-center"
            >
              <div className="flex space-x-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-8 h-5 bg-black/5 backdrop-blur-sm rounded-md overflow-hidden relative"
                    whileHover={{ y: -2 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"
                      animate={{
                        x: [-8, 8, -8],
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 2 + i,
                        ease: "linear"
                      }}
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-xs ml-3 text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure & encrypted
              </p>
            </motion.div>
            
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-6 p-3 bg-white/60 backdrop-blur-sm border border-black/5 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white"
                      style={{
                        backgroundImage: `url('https://randomuser.me/api/portraits/thumb/men/${i + 20}.jpg')`,
                        backgroundSize: "cover"
                      }}
                      initial={{ scale: 0, y: 10 }}
                      whileInView={{ scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + (i * 0.1) }}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-3 w-3 text-yellow-500"
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.8 + (i * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Trusted by 10k+ travelers</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.hr 
          variants={itemVariants}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className='border-gray-300/70 mt-12' 
        />

        {/* Bottom footer section - Updated with navigation handler */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='flex flex-col md:flex-row gap-4 items-center justify-between py-6 relative z-10'
        >
          <motion.p 
            variants={itemVariants}
            className="text-sm"
          >
            © {new Date().getFullYear()} 
            <motion.span 
              className="font-medium mx-1"
              initial={{ opacity: 0.6 }}
              whileHover={{
                opacity: 1,
                color: "#000",
                transition: { duration: 0.2 }
              }}
            >
              Luxor Stay
            </motion.span> 
            All rights reserved.
          </motion.p>
          <motion.ul 
            variants={containerVariants}
            className='flex items-center gap-6 text-sm'
          >
            {["Privacy", "Terms", "Sitemap"].map((item, index) => (
              <motion.li 
                key={item} 
                variants={itemVariants}
                custom={index}
                className="relative"
                onMouseEnter={() => setHoveredLink(`footer-${item}`)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {/* Changed from anchor tag to div with click handler */}
                <motion.div 
                  onClick={() => handleNavigation(`/${item.toLowerCase()}`)}
                  className="transition-colors hover:text-gray-800 cursor-pointer"
                  onMouseEnter={playTickSound}
                >
                  {item}
                  <AnimatePresence>
                    {hoveredLink === `footer-${item}` && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-black/40"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        exit={{ width: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        
        {/* Back to top button */}
        <motion.button
          ref={magneticRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: scrollPosition > 300 ? 1 : 0,
            y: scrollPosition > 300 ? 0 : 20 
          }}
          whileHover="hover"
          whileTap="tap"
          variants={floatingButtonVariants}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-6 bottom-6 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg z-50 overflow-hidden"
          transition={{ duration: 0.3 }}
          onMouseEnter={playTickSound}
        >
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black"
            animate={{
              backgroundPosition: ['0% center', '100% center', '0% center'],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Arrow icon with animation */}
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 relative z-10" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            animate={{ y: [0, -2, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          >
            <path 
              fillRule="evenodd" 
              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </motion.svg>
          
          {/* Ripple effect on click */}
          <AnimatePresence>
            {isHoveringButton && (
              <motion.span
                className="absolute w-full h-full bg-white rounded-full"
                initial={{ scale: 0, opacity: 0.7 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {/* Copyright wave animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-8"
            style={{ transform: 'rotateX(180deg)' }}
          >
            <motion.path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".2" 
              fill="black"
              animate={{ 
                d: [
                  "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z",
                  "M0,0V46.29c47.79,22.2,103.59,22.17,158,28,70.36,15.37,136.33-3.31,206.8-7.5C438.64,52.43,512.34,33.67,583,42.05c69.27,8,138.3,44.88,209.4,33.08,36.15-6,69.85-27.84,104.45-19.34C989.49,65,1113,-4.29,1200,22.47V0Z",
                  "M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,-14.29,1200,52.47V0Z"
                ],
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;