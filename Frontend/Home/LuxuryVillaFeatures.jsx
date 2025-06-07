
import React from 'react'
import { Home, MapPin, Star, ArrowRight, Wifi, Coffee, Bath, Sun, Users, Shield, Key, Gift, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function LuxuryVillaFeatures() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    });
    
    // Refresh AOS on window resize for better responsiveness
    window.addEventListener('resize', AOS.refresh);
    
    return () => {
      window.removeEventListener('resize', AOS.refresh);
    };
  }, []);

  const features = [
    {
      icon: 'Home',
      title: 'Luxury Accommodations',
      description: 'Experience unparalleled comfort in our meticulously designed villas with premium amenities and elegant interiors.'
    },
    {
      icon: 'MapPin',
      title: 'Prime Locations',
      description: 'Our properties are situated in the most scenic and exclusive destinations, offering breathtaking views and convenience.'
    },
    {
      icon: 'Star',
      title: 'Five-Star Experience',
      description: 'Enjoy personalized service, gourmet dining options, and exclusive amenities that define a truly luxurious stay.'
    }
  ];

  const additionalFeatures = [
    { icon: 'Wifi', title: "High-Speed WiFi", description: "Stay connected with ultra-fast internet throughout your stay." },
    { icon: 'Coffee', title: "Gourmet Kitchen", description: "Fully equipped kitchens with premium appliances and amenities." },
    { icon: 'Bath', title: "Luxury Spa", description: "Private spa facilities with jacuzzi and therapeutic treatments." },
    { icon: 'Sun', title: "Infinity Pools", description: "Stunning infinity pools with panoramic views of the surroundings." },
    { icon: 'Users', title: "Concierge Service", description: "24/7 dedicated concierge to handle all your requests and needs." },
    { icon: 'Shield', title: "Total Security", description: "Advanced security systems ensuring your privacy and safety." },
    { icon: 'Key', title: "Smart Home", description: "Modern smart home features for convenience and control." },
    { icon: 'Gift', title: "Welcome Package", description: "Complimentary welcome package with local delicacies and treats." }
  ];

  const renderIcon = (iconName, className = "w-8 h-8") => {
    const icons = {
      Home: <Home className={className} />,
      MapPin: <MapPin className={className} />,
      Star: <Star className={className} />,
      Wifi: <Wifi className={className} />,
      Coffee: <Coffee className={className} />,
      Bath: <Bath className={className} />,
      Sun: <Sun className={className} />,
      Users: <Users className={className} />,
      Shield: <Shield className={className} />,
      Key: <Key className={className} />,
      Gift: <Gift className={className} />
    };
    return icons[iconName] || null;
  };

  return (
    <>
      <section className="py-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center" 
              data-aos="fade-down"
              data-aos-duration="800">
            Exceptional <span className="text-amber-400 relative inline-block">
              Luxury
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0"></span>
            </span> Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center group perspective-1000"
                data-aos={["zoom-in-right", "zoom-in-up", "zoom-in-left"][index]}
                data-aos-delay={index * 150}
                data-aos-duration="1200"
              >
                <div className="transform transition-transform duration-1000 group-hover:rotate-y-180 preserve-3d relative h-96 cursor-pointer">
                  {/* Front card */}
                  <div className="absolute backface-hidden w-full h-full p-8 bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-2xl shadow-2xl flex flex-col items-center justify-center border border-white/10 hover:border-amber-400/50 transition-all duration-500 overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"></div>
                    
                    <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-amber-500/20 to-amber-700/20 rounded-full flex items-center justify-center transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 group-hover:from-amber-500/30 group-hover:to-amber-700/30 shadow-lg shadow-amber-900/20">
                      <div className="bg-gradient-to-br from-amber-400 to-amber-600 text-gray-900 w-16 h-16 rounded-full flex items-center justify-center">
                        {renderIcon(feature.icon)}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-white relative">
                      {feature.title}
                      <span className="absolute -bottom-2 left-1/2 w-12 h-0.5 bg-amber-500/50 transform -translate-x-1/2"></span>
                    </h3>
                    <p className="text-gray-300 mt-2 max-w-xs">{feature.description}</p>
                  </div>
                  
                  {/* Back card */}
                  <div className="absolute backface-hidden rotate-y-180 w-full h-full p-8 bg-gradient-to-br from-amber-900/80 to-amber-700/80 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center justify-center border border-amber-400/50">
                    <div className="absolute inset-0 bg-[url('/luxury-pattern.png')] opacity-5 mix-blend-overlay"></div>
                    <div className="w-16 h-16 mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md">
                      {renderIcon(feature.icon, "w-8 h-8 text-amber-300")}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-amber-200">{feature.title}</h3>
                    <p className="text-white mb-8 opacity-90">{feature.description}</p>
                    <button className="px-6 py-3 bg-white text-amber-900 font-medium rounded-full hover:bg-amber-100 transition-colors duration-300 flex items-center group shadow-lg shadow-amber-900/20 transform hover:scale-105 transition-transform">
                      Explore More
                      <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/luxury-pattern.png')] opacity-8"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent"></div>
        
        {/* 3D animated decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto transform perspective-1000" 
               data-aos="zoom-in"
               data-aos-duration="1000">
            <div className="transform transition-all duration-700 hover:rotate-y-5 hover:rotate-x-5 cursor-pointer">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white leading-tight">
                Ready to Experience <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 inline-block mt-2">Luxury Living?</span>
              </h2>
              <p className="text-gray-200 mb-10 text-lg max-w-2xl mx-auto">
                Join thousands of guests who choose our luxury villas for unforgettable stays in stunning locations worldwide
              </p>
              <button className="group relative bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-medium hover:from-amber-600 hover:to-amber-700 px-10 py-4 text-lg rounded-full transition-all duration-500 flex items-center justify-center mx-auto overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative z-10 flex items-center">
                  Book Your Villa 
                  <ArrowRight className="ml-2 transition-all duration-300 transform group-hover:translate-x-2" />
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-10 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      <section className="py-32 relative overflow-hidden bg-white-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-24 text-center relative" data-aos="fade-up" data-aos-duration="1000">
            Why Choose Our <span className="text-amber-400">Luxury</span> Villas?
            <span className="absolute -bottom-4 left-1/2 w-24 h-1 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0 transform -translate-x-1/2"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "Shield", title: "Private Retreats", description: "Enjoy exclusive access to your own sanctuary with complete privacy." },
              { icon: "Users", title: "Personalized Service", description: "Experience attentive, tailored service from our dedicated staff." },
              { icon: "Star", title: "Premium Amenities", description: "From infinity pools to gourmet kitchens, enjoy the finest amenities." },
              { icon: "Gift", title: "Memorable Experiences", description: "Create lifelong memories with curated experiences and activities." }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="border border-white/10 rounded-xl p-8 bg-gradient-to-br from-gray-900 to-gray-800 group hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-700 hover:-translate-y-2 overflow-hidden relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Icon with animation */}
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-amber-500/20 to-amber-700/10 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-500 group-hover:rotate-3 relative">
                  <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-lg group-hover:animate-pulse"></div>
                  <div className="relative z-10">
                    {renderIcon(item.icon, "w-8 h-8 text-amber-400")}
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-amber-300 transition-colors duration-500">{item.title}</h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-500">{item.description}</p>
                
                {/* Interactive element */}
                <div className="mt-6 h-0.5 w-0 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div 
                key={feature.title}
                className="p-6 bg-gray-900/80 backdrop-blur-sm hover:bg-gray-800/80 rounded-xl transition-all duration-500 transform hover:scale-105 group border-l-2 border-amber-600/50 hover:border-amber-400"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                <div className="flex items-start mb-4 transform transition-transform duration-500 group-hover:translate-z-10">
                  <div className="mr-4 p-3 bg-gradient-to-br from-amber-500/20 to-amber-700/20 rounded-xl transform group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-amber-600/20">
                    {renderIcon(feature.icon, "w-6 h-6 text-amber-400")}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </div>
                </div>
                
                <div className="h-0.5 w-0 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 group-hover:w-full transition-all duration-700 mt-2"></div>
              </div>
            ))}
          </div>
          
          {/* 3D floating decoration */}
          <div className="mt-20 text-center" data-aos="fade-up">
            <button className="relative overflow-hidden group bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-semibold py-4 px-10 rounded-full hover:shadow-xl hover:shadow-amber-600/20 transition-all duration-500 transform hover:scale-105">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 flex items-center">
                Explore All Features
                <ChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-amber-500/5 to-amber-700/5 blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-amber-600/5 blur-[80px] -z-10 animate-pulse"></div>
      </section>
    </>
  );
}

export default LuxuryVillaFeatures
