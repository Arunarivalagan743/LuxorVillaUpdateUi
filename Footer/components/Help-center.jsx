import React, { useState } from 'react';

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m your villa booking assistant. How can I help you today?' }
  ]);
  
  const faqs = [
    {
      id: 1,
      question: "How do I book a villa?",
      answer: "Booking a villa is simple. Browse our selection, select your dates, and complete the booking form. Our team will confirm availability and guide you through the payment process."
    },
    {
      id: 2,
      question: "What is your cancellation policy?",
      answer: "Our standard cancellation policy allows for a full refund if cancelled 60 days before check-in. Cancellations 30-60 days prior receive a 50% refund. Cancellations less than 30 days before arrival are non-refundable. Some properties may have special policies."
    },
    {
      id: 3,
      question: "Is there a security deposit required?",
      answer: "Yes, most villas require a security deposit, typically 20-30% of the total booking amount. This is fully refundable within 7 days after checkout, provided there's no damage to the property."
    },
    {
      id: 4,
      question: "Are pets allowed in your villas?",
      answer: "Pet policies vary by property. Some villas welcome pets, while others do not. Please check the specific villa listing for pet information or contact our team for assistance."
    },
    {
      id: 5,
      question: "Can I request additional services?",
      answer: "Absolutely! We offer various additional services including airport transfers, private chefs, grocery delivery, childcare, and more. These can be arranged during booking or after confirmation."
    }
  ];
  
  const chatbotQuestions = [
    {
      id: 1,
      question: "What types of villas do you offer?",
      answer: "We offer a wide range of villas including beachfront properties, mountain retreats, countryside estates, and luxury urban villas. Our collection includes traditional and modern architectural styles with various amenities."
    },
    {
      id: 2,
      question: "How do I choose the right villa size for my group?",
      answer: "We recommend selecting villas with at least one bedroom per couple, plus additional rooms for children or single travelers. Our listings clearly indicate maximum occupancy, and many villas offer multiple common spaces for gathering."
    },
    {
      id: 3,
      question: "Are your villas family-friendly?",
      answer: "Yes! Many of our villas are perfect for families. Look for properties with features like fenced pools, game rooms, multiple bedrooms, child-safe areas, and proximity to family attractions. You can filter for 'family-friendly' when searching."
    },
    {
      id: 4,
      question: "Do villas come with private pools?",
      answer: "Most of our luxury villas feature private pools. You can filter specifically for properties with pools, and further refine by heated pools, infinity pools, or child-safe options depending on your preferences."
    },
    {
      id: 5,
      question: "What kind of views can I expect from your villas?",
      answer: "Our villas offer stunning views ranging from ocean panoramas and mountain vistas to lush gardens and city skylines. Each property listing includes photos and descriptions of the views available."
    },
    {
      id: 6,
      question: "Are there staff available at the villas?",
      answer: "Staffing varies by property. Some villas come with full-time staff including housekeepers, chefs, and property managers, while others offer these services optionally. Check the individual villa description for staffing details."
    },
    {
      id: 7,
      question: "Do you have villas in remote/secluded areas?",
      answer: "Yes, we have many properties in secluded locations for guests seeking privacy and tranquility. These range from island retreats to mountain escapes and countryside properties set on private land."
    },
    {
      id: 8,
      question: "What's the average price range for villas?",
      answer: "Our villas range from ₹25,000 to ₹5,00,000 per night depending on location, size, amenities, and season. We offer options for various budgets while maintaining high standards of quality and comfort."
    },
    {
      id: 9,
      question: "Are there seasonal specials or discounts?",
      answer: "Yes, we regularly offer seasonal promotions and last-minute discounts. We also have special rates for extended stays (7+ nights) and returning guests. Sign up for our newsletter to receive notifications about our latest offers."
    },
    {
      id: 10,
      question: "Can I book a villa for events or weddings?",
      answer: "Selected villas in our collection are suitable for events and celebrations. These properties offer expansive grounds, reception areas, and can accommodate larger groups. Additional fees and special terms may apply for event bookings."
    }
  ];

  const handleQuestionClick = (id) => {
    const question = chatbotQuestions.find(q => q.id === id);
    
    setMessages(prev => [...prev, { sender: 'user', text: question.question }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: question.answer }]);
    }, 500);
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="bg-white w-full overflow-x-hidden min-h-screen">
      {/* Header - Added top padding to prevent navbar overlap */}
      <header className="pt-28 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center">Help Center</h1>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto px-4">
            Find answers to common questions and get the support you need for your villa booking.
          </p>
        </div>
      </header>

      {/* Tabs - Improved mobile responsiveness */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap border-b border-gray-200 overflow-x-auto scrollbar-hide">
          <button 
            className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-base sm:text-lg whitespace-nowrap ${activeTab === 'faq' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('faq')}
          >
            Frequently Asked Questions
          </button>
      
          <button 
            className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-base sm:text-lg whitespace-nowrap ${activeTab === 'resources' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          
          <button 
            className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-base sm:text-lg whitespace-nowrap ${activeTab === 'chatbot' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
            onClick={() => setActiveTab('chatbot')}
          >
            Villa Assistant
          </button>
        </div>
      </div>

      {/* Tab Content - Fixed container width and made fully responsive */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    className="flex justify-between items-center w-full p-4 sm:p-6 text-left"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span className="font-medium text-base sm:text-lg pr-4">{faq.question}</span>
                    <span className="text-xl sm:text-2xl flex-shrink-0">{expandedFaq === faq.id ? '−' : '+'}</span>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="p-4 sm:p-6 pt-0 text-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Booking Guide</h3>
                <p className="text-gray-700 mb-4">
                  A comprehensive guide to booking your perfect villa, from searching to check-in.
                </p>
                <a href="#" className="text-black font-medium hover:underline">Download PDF</a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Destination Guides</h3>
                <p className="text-gray-700 mb-4">
                  Explore our collection of destination guides to help plan your perfect villa vacation.
                </p>
                <a href="#" className="text-black font-medium hover:underline">Browse Guides</a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Travel Tips</h3>
                <p className="text-gray-700 mb-4">
                  Expert advice and insider tips for making the most of your villa stay.
                </p>
                <a href="#" className="text-black font-medium hover:underline">Read Tips</a>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Video Tutorials</h3>
                <p className="text-gray-700 mb-4">
                  Watch our helpful video guides on booking, amenities, and more.
                </p>
                <a href="#" className="text-black font-medium hover:underline">Watch Videos</a>
              </div>
            </div>
          </div>
        )}
        
        {/* Chatbot Tab */}
        {activeTab === 'chatbot' && (
          <div className="max-w-3xl mx-auto">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-medium text-center">Villa Assistant</h3>
              </div>
              
              {/* Chat messages - Fixed height to prevent layout shifts */}
              <div className="p-3 sm:p-4 h-80 sm:h-96 overflow-y-auto bg-white">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div 
                      key={index} 
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`p-2 sm:p-3 rounded-lg max-w-xs md:max-w-md ${
                          message.sender === 'user' 
                            ? 'bg-black text-white rounded-tr-none' 
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Question options - Better responsive grid */}
              <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-500 mb-2 sm:mb-3">Select a question:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {chatbotQuestions.map(q => (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionClick(q.id)}
                      className="text-left text-sm p-2 border border-gray-200 rounded hover:bg-gray-100 transition-colors"
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add bottom padding to ensure proper spacing at the page bottom */}
      <div className="h-16 sm:h-24"></div>
    </div>
  );
};

export default HelpCenter;