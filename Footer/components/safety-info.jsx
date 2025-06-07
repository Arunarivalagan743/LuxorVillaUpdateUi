import React from 'react';

const SafetyInfo = () => {
  return (
    <div className="bg-white w-full overflow-x-hidden min-h-screen">
      {/* Header - Added padding-top to prevent navbar overlap */}
      <header className="pt-28 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center">Safety Information</h1>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto px-4">
            Your safety and well-being are our top priorities. Learn about our safety measures and guidelines.
          </p>
        </div>
      </header>

      {/* Main Content - Fixed container width and added responsive padding */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* COVID-19 Section */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-16">
          <div className="bg-gray-50 p-6 sm:p-8 rounded-lg border-l-4 border-black">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">COVID-19 Safety Measures</h2>
            <p className="text-gray-700 mb-4">
              We continue to prioritize the health and safety of our guests and staff. Our enhanced cleaning protocols and flexible booking policies remain in place to ensure your peace of mind.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Enhanced cleaning and disinfection between stays</li>
              <li>Contactless check-in options available</li>
              <li>Staff trained in health and safety protocols</li>
              <li>Flexible cancellation policies</li>
              <li>Local health guidelines followed at all properties</li>
            </ul>
          </div>
        </div>

        {/* Safety Categories - Better responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 pb-2 border-b border-gray-200">Property Safety</h2>
            <ul className="space-y-4 sm:space-y-6">
              <li>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Fire Safety</h3>
                <p className="text-gray-700">
                  All our properties are equipped with smoke detectors, fire extinguishers, and clearly marked emergency exits. Emergency contact information and evacuation plans are provided in each villa.
                </p>
              </li>
              <li>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Pool Safety</h3>
                <p className="text-gray-700">
                  Properties with pools include safety features such as pool alarms, covers, or fencing where required. We recommend constant supervision of children around water features. Safety equipment is available at all pool areas.
                </p>
              </li>
              <li>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Security Systems</h3>
                <p className="text-gray-700">
                  Many of our villas feature security systems, including alarm systems, secure entry points, and in some cases, 24-hour security personnel. Details of security features are available on each property listing.
                </p>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 pb-2 border-b border-gray-200">Guest Safety</h2>
            <ul className="space-y-4 sm:space-y-6">
              <li>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Emergency Assistance</h3>
                <p className="text-gray-700">
                  Our 24/7 customer support team is available to assist with any emergencies. Each property has information on local emergency services, including the nearest hospital, police station, and fire department.
                </p>
              </li>
              <li>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Health Concerns</h3>
                <p className="text-gray-700">
                  We maintain a list of local medical facilities and can arrange medical assistance if needed. First aid kits are available in all properties, and some locations offer telemedicine services.
                </p>
              </li>
              <li>
                <h3 className="text-lg sm:text-xl font-medium mb-2">Travel Insurance</h3>
                <p className="text-gray-700">
                  We strongly recommend that all guests purchase comprehensive travel insurance that includes coverage for trip cancellation, medical emergencies, and personal belongings.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Safety Tips - Improved responsive layout */}
        <div className="max-w-4xl mx-auto mt-10 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">Safety Tips for Your Stay</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-50 p-5 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-medium mb-3">Before You Arrive</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Research your destination</li>
                <li>• Share your itinerary with family</li>
                <li>• Save emergency contacts</li>
                <li>• Check travel advisories</li>
                <li>• Arrange transportation in advance</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-5 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-medium mb-3">During Your Stay</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Familiarize yourself with the property</li>
                <li>• Locate emergency exits</li>
                <li>• Secure valuables in safes</li>
                <li>• Follow pool and beach safety rules</li>
                <li>• Use provided safety equipment</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-5 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-medium mb-3">Local Awareness</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Respect local customs and laws</li>
                <li>• Be aware of your surroundings</li>
                <li>• Use reputable transportation</li>
                <li>• Keep a copy of important documents</li>
                <li>• Know basic local phrases</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Commitment - Improved responsive spacing */}
        <div className="max-w-4xl mx-auto mt-10 sm:mt-16 text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Safety Commitment</h2>
          <p className="text-gray-700 max-w-2xl mx-auto px-4">
            We are committed to maintaining the highest safety standards across all our properties. Our team regularly reviews and updates our safety protocols to ensure we're providing the safest possible environment for our guests. If you have any safety concerns or questions, please don't hesitate to contact our customer support team.
          </p>
          <button className="mt-6 sm:mt-8 px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
            Contact Safety Team
          </button>
        </div>
      </div>
      
      {/* Add bottom padding to ensure proper spacing at the page bottom */}
      <div className="h-16 sm:h-24"></div>
    </div>
  );
};

export default SafetyInfo;