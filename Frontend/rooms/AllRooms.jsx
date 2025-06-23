"use client"

import { useState, useEffect } from "react"
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  ArrowLeft,
  Users,
  Bed,
  MapPin,
  Share,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import PhotoGallery from "./PhotoGallery"
import Ac from "../assets/Facilities/AC.png"
import Kitchen from "../assets/Facilities/KITCHEN.png"
import Parking from "../assets/Facilities/PARK.png"
import Pool from "../assets/Facilities/p.png"
import Wifi from "../assets/Facilities/WIFI.png"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../config/api"
import Swal from 'sweetalert2'

// Date range picker imports
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import anandvilla1 from "../assets/empireanandvilla/anandvilla1.jpg"
import anandvilla2 from "../assets/empireanandvilla/anandvilla2.jpg"
import anandvilla3 from "../assets/empireanandvilla/anandvilla3.jpg"
import anandvilla4 from "../assets/empireanandvilla/anandvilla4.jpg"
import anandvilla5 from "../assets/empireanandvilla/anandvilla5.jpg"
import anandvilla6 from "../assets/empireanandvilla/anandvilla6.jpg"
import anandvilla7 from "../assets/empireanandvilla/anandvilla7.jpg"
import anandvilla8 from "../assets/empireanandvilla/anandvilla8.jpg"
import anandvilla9 from "../assets/empireanandvilla/anandvilla9.jpg"
import anandvilla10 from "../assets/empireanandvilla/anandvilla10.jpg"
import anandvilla11 from "../assets/empireanandvilla/anandvilla11.jpg"
import anandvilla12 from "../assets/empireanandvilla/anandvilla12.jpg"
import anandvilla13 from "../assets/empireanandvilla/anandvilla13.jpg"
import anandvilla14 from "../assets/empireanandvilla/anandvilla14.jpg"
import anandvilla15 from "../assets/empireanandvilla/anandvilla15.jpg"
import anandvilla16 from "../assets/empireanandvilla/anandvilla16.jpg"

const imageImports = {
  "anandvilla1.jpg": anandvilla1,
  "anandvilla2.jpg": anandvilla2,
  "anandvilla3.jpg": anandvilla3,
  "anandvilla4.jpg": anandvilla4,
  "anandvilla5.jpg": anandvilla5,
  "anandvilla6.jpg": anandvilla6,
  "anandvilla7.jpg": anandvilla7,
  "anandvilla8.jpg": anandvilla8,
  "anandvilla9.jpg": anandvilla9,
  "anandvilla10.jpg": anandvilla10,
  "anandvilla11.jpg": anandvilla11,
  "anandvilla12.jpg": anandvilla12,
  "anandvilla13.jpg": anandvilla13,
  "anandvilla14.jpg": anandvilla14,
  "anandvilla15.jpg": anandvilla15,
  "anandvilla16.jpg": anandvilla16,
  // Also support .jpeg extension
  "anandvilla1.jpeg": anandvilla1,
  "anandvilla2.jpeg": anandvilla2,
  "anandvilla3.jpeg": anandvilla3,
  "anandvilla4.jpeg": anandvilla4,
  "anandvilla5.jpeg": anandvilla5,
  "anandvilla6.jpeg": anandvilla6,
  "anandvilla7.jpeg": anandvilla7,
  "anandvilla8.jpeg": anandvilla8,
  "anandvilla9.jpeg": anandvilla9,
  "anandvilla10.jpeg": anandvilla10,
  "anandvilla11.jpeg": anandvilla11,
  "anandvilla12.jpeg": anandvilla12,
  "anandvilla13.jpeg": anandvilla13,
  "anandvilla14.jpeg": anandvilla14,
  "anandvilla15.jpeg": anandvilla15,
  "anandvilla16.jpeg": anandvilla16,
}

export const empireAnandVillaImages = [
  anandvilla1,
  anandvilla2,
  anandvilla3,
  anandvilla4,
  anandvilla5,
  anandvilla6,
  anandvilla7,
  anandvilla8,
  anandvilla9,
  anandvilla10,
  anandvilla11,
  anandvilla12,
  anandvilla13,
  anandvilla14,
  anandvilla15,
  anandvilla16,
]

// Utility to shuffle images for each villa
function getRandomImages(imagesArr) {
  const arr = [...imagesArr]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const facilityIconMap = {
  "Private Pool": Pool,
  "Shared Pool": Pool,
  "Free Parking": Parking,
  AC: Ac,
  WiFi: Wifi,
  Kitchen: Kitchen,
  Microwave: Kitchen,
  Barbecue: Kitchen,
  Gym: Kitchen,
  "Pet Friendly": null,
}

const VillaDetail = ({ villa, onBack }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [showCancellationPolicy, setShowCancellationPolicy] = useState(false)
  const [showThingsToKnow, setShowThingsToKnow] = useState(false)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [showGuestDropdown, setShowGuestDropdown] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)
  const [showPhotoGallery, setShowPhotoGallery] = useState(false)
  const { isSignedIn, user } = useUser()
  const navigate = useNavigate()
  const [bookingLoading, setBookingLoading] = useState(false)

  // Date range picker state
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ])
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")

  useEffect(() => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      setCheckInDate(dateRange[0].startDate.toISOString().split("T")[0])
      setCheckOutDate(dateRange[0].endDate.toISOString().split("T")[0])
    }
  }, [dateRange])

  const locationParts = villa.location.split(" ")
  const city = locationParts[0]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % villa.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + villa.images.length) % villa.images.length)
  }

  const handleMorePhotosClick = () => {
    setShowPhotoGallery(true)
  }

  const handleBookNow = async () => {
    if (!isSignedIn) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please log in to book this villa.',
        confirmButtonColor: '#16a34a'
      }).then(() => {
        navigate("/sign-in");
      });
      return;
    }
    if (!checkInDate || !checkOutDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Dates',
        text: 'Please select check-in and check-out dates.',
        confirmButtonColor: '#16a34a'
      });
      return;
    }
    const villaId = villa._id || villa.id;
    if (!villaId || villaId.length < 12) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Villa',
        text: 'Invalid villa. Please try again from the main villa list.',
        confirmButtonColor: '#16a34a'
      });
      return;
    }
    setBookingLoading(true);
    try {
      const bookingData = {
        villaId,
        villaName: villa.name,
        email: user?.primaryEmailAddress?.emailAddress || user?.emailAddress || user?.email,
        guestName: user?.fullName || user?.firstName || "",
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: adults + children,
      };
      const response = await fetch(`${API_BASE_URL}/api/bookings/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Booking Successful!',
          text: 'Confirmation sent to your email.',
          confirmButtonColor: '#16a34a'
        });
        setBookingLoading(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: data.error || "Booking failed. Please try again.",
          confirmButtonColor: '#16a34a'
        });
        setBookingLoading(false);
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: "Booking failed. Please try again.",
        confirmButtonColor: '#16a34a'
      });
      setBookingLoading(false);
    }
  };

  const facilities =
    villa.amenities?.map((amenity) => ({
      name: amenity,
      image: facilityIconMap[amenity] || Kitchen,
    })) || []


  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <button onClick={onBack} className="flex items-center gap-2 hover:text-gray-800 transition-colors">
                <span>Back</span>
              </button>
              <span className="text-gray-400">|</span>
              <button className="hover:text-gray-800 transition-colors">Home</button>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <button className="hover:text-gray-800 transition-colors">{city}</button>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{villa.name}</span>
                <ArrowLeft className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Heart className={`h-4 w-4 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                <span>Save</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-4 gap-2 h-96 rounded-lg overflow-hidden">
          {/* Main Image */}
          <div className="col-span-2 relative">
            <img
              src={villa.images[currentImageIndex] || villa.images[0]}
              alt={villa.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Thumbnail Grid */}
          <div className="col-span-2 grid grid-cols-2 gap-2">
            {villa.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${villa.name} ${index + 2}`}
                  className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setCurrentImageIndex(index + 1)}
                />
                {index === 3 && villa.images.length > 5 && (
                  <div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition-colors"
                    onClick={e => {
                      e.stopPropagation();
                      setShowPhotoGallery(true);
                    }}
                  >
  
                      {/* <span className="text-lg font-semibold">+{villa.images.length - 5}</span> */}
                      <PhotoGallery className="h-6 w-6 mb-2" />
                   
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Villa Title and Info */}
<div className="mt-8 grid lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">{villa.name}</h1>
    <div className="flex items-center gap-2 mb-6">
      <span className="text-gray-600">{villa.location}</span>
      <button className="text-green-600 hover:text-green-700 font-medium underline">View on Map</button>
    </div>

    {/* Villa Info Header */}
    <div className="flex items-center gap-6 text-gray-600 text-sm mb-8">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-green-600" />
        <span>{villa.guests} Guests</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 text-green-600">🏠</div>
        <span>{villa.bedrooms} Bedrooms</span>
      </div>
      <div className="flex items-center gap-2">
        <Bed className="h-4 w-4 text-green-600" />
        <span>{villa.bathrooms || villa.bedrooms} Bathrooms</span>
      </div>
    </div>

    {/* Overview Section */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
      <div className="text-gray-700 leading-relaxed">
        <p className="mb-4">
          {showFullDescription ? villa.description : villa.description?.substring(0, 200) + "..."}
        </p>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-green-600 hover:text-green-700 font-medium underline"
        >
          {showFullDescription ? "Read less" : "Read more"}
        </button>
      </div>
    </div>

    {/* Enhanced Facilities Section */}
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Facilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
                <img
                  src={facility.image || "/placeholder.svg"}
                  alt={facility.name}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{facility.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-6 text-green-600 hover:text-green-700 font-medium underline">
        View all amenities
      </button>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Location</h2>
      <div className="rounded-lg overflow-hidden h-64">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.2313083493!2d79.92235835!3d13.048160899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
        ></iframe>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        <MapPin className="h-4 w-4 inline mr-1" />
        {villa.location} - Interactive map showing location
      </p>
    </div>

    {/* Cancellation Policy Section */}
    <div className="border-t pt-8 mb-8">
      <button
        onClick={() => setShowCancellationPolicy(!showCancellationPolicy)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-2xl font-semibold text-gray-900">Cancellation Policy</h2>
        {showCancellationPolicy ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {showCancellationPolicy && (
        <div className="mt-6">
          <p className="text-gray-700 mb-6">
            In case of cancellation made during the below mentioned period before the check in by the Guests,
            the following amount shall be deducted from the total Booking Amount:
          </p>

          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="bg-green-100">
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Criteria</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">Cancellation Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">If Travel is Within 15 Days</td>
                  <td className="px-4 py-3 text-gray-700">
                    Booking Is Non-Refundable and No Refund Will be applicable
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-gray-700">If Travel is Within 15-30 Days</td>
                  <td className="px-4 py-3 text-gray-700">
                    50% of the Total Booking amount will be charged as a Cancellation penalty and the rest be
                    refunded back
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">If Travel is after 30 Days</td>
                  <td className="px-4 py-3 text-gray-700">
                    25% of the Total Booking amount will be charged as a Cancellation penalty and the rest be
                    refunded back
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>

    {/* Things To Know Section */}
    <div className="border-t pt-8">
      <button
        onClick={() => setShowThingsToKnow(!showThingsToKnow)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-2xl font-semibold text-gray-900">Things To Know</h2>
        {showThingsToKnow ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {showThingsToKnow && (
        <div className="mt-6">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>
                Security deposit of INR 20,000/- will be collected at the time of booking and refunded within 72
                hours of checkout. Any damages or unpaid dues will be deducted from this deposit.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Check-in time is 2:00 PM and check-out time is 11:00 AM.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
              <span>Smoking is not allowed inside the property.</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  </div>
  {/* Booking Sidebar with DateRange Picker */}
  <div className="lg:col-span-1">
    <div className="sticky top-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="mb-6">
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Starts from</div>
            <div className="text-2xl font-bold text-gray-900">
              ₹ {villa.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-600 ml-1">per Night</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Enjoy our property with a minimum stay of 1 Days.</p>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Select Dates</label>
            <DateRange
              ranges={dateRange}
              onChange={item => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              minDate={new Date()}
              rangeColors={["#16a34a"]}
              showDateDisplay={false}
              editableDateInputs={true}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-700">
              <span>
                Check-in:{" "}
                {checkInDate ? (
                  <span className="font-medium">{checkInDate}</span>
                ) : (
                  <span className="text-gray-400">Select</span>
                )}
              </span>
              <span>
                Check-out:{" "}
                {checkOutDate ? (
                  <span className="font-medium">{checkOutDate}</span>
                ) : (
                  <span className="text-gray-400">Select</span>
                )}
              </span>
            </div>
          </div>
          {/* Guests Dropdown */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1">Guests</label>
            <button
              type="button"
              onClick={() => setShowGuestDropdown((v) => !v)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-left focus:outline-none focus:ring-2 focus:ring-green-500 flex justify-between items-center"
            >
              {adults + children > 0
                ? `${adults + children} Guest${adults + children > 1 ? "s" : ""}${infants > 0 ? `, ${infants} Infant${infants > 1 ? "s" : ""}` : ""}`
                : "Select Guests"}
              <ChevronDown className="h-4 w-4 ml-2 text-gray-400" />
            </button>
            {showGuestDropdown && (
              <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 p-4">
                {/* Adults */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-medium text-gray-900">Adults</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      disabled={adults <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center">{adults}</span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      onClick={() => setAdults(adults + 1)}
                      disabled={adults + children >= villa.guests}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {/* Children */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-medium text-gray-900">Children</div>
                    <div className="text-xs text-gray-500 mt-1">Age 3–12 years</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      disabled={children <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center">{children}</span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      onClick={() => setChildren(adults + children < villa.guests ? children + 1 : children)}
                      disabled={adults + children >= villa.guests}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {/* Infants */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-medium text-gray-900">Infants</div>
                    <div className="text-xs text-gray-500 mt-1">Age Under 2</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      disabled={infants <= 0}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-6 text-center">{infants}</span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                      onClick={() => setInfants(infants + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  onClick={() => setShowGuestDropdown(false)}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors mb-4 flex items-center justify-center"
          onClick={handleBookNow}
          disabled={bookingLoading}
        >
          {bookingLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
              </svg>
              Booking...
            </span>
          ) : (
            "Book Now"
          )}
        </button>
        <p className="text-center text-sm text-gray-600">Don't worry, you won't be charged yet</p>
      </div>
    </div>
  </div>
  </div>
  </div>
</div>
  )
}

// Main Component
const AllRooms = () => {
  const [villas, setVillas] = useState([])
  const [filteredVillas, setFilteredVillas] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [sortBy, setSortBy] = useState("Recently Added")
  const [selectedVilla, setSelectedVilla] = useState(null)
  const [currentView, setCurrentView] = useState("list") // 'list' or 'detail'
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [selectedTypes, setSelectedTypes] = useState(["VILLA"])
  const [selectedBedrooms, setSelectedBedrooms] = useState("Any")
  const [selectedBeds, setSelectedBeds] = useState("Any")
  const [selectedAmenities, setSelectedAmenities] = useState([])

  // UI states
  const [showPriceFilter, setShowPriceFilter] = useState(true)
  const [showTypeFilter, setShowTypeFilter] = useState(true)
  const [showRoomsFilter, setShowRoomsFilter] = useState(true)
  const [showAmenitiesFilter, setShowAmenitiesFilter] = useState(true)
const [cardImageIndexes, setCardImageIndexes] = useState({});
  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/villas/`)
        if (!response.ok) throw new Error("Network response was not ok")
        const data = await response.json()

        // Map backend image references to random permutation of imported images
        const transformedData = data.map((villa) => {
          let images = villa.images || []
          if (images.length === 1 && images[0] === "empireAnandVillaImages") {
            images = getRandomImages(empireAnandVillaImages)
          }
          return {
            id: villa._id,
            name: villa.name,
            location: villa.location,
            price: villa.price || 0,
            description: villa.description,
            images,
            guests: villa.guests || 0,
            bedrooms: villa.bedrooms || 0,
            bathrooms: villa.bathrooms || 0,
            rating: villa.rating || 4.5,
            amenities: villa.facilities?.map((f) => f.name) || [],
            type: villa.type || "VILLA",
          }
        })

        setVillas(transformedData)
        setFilteredVillas(transformedData)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchVillas()
  }, [])

  useEffect(() => {
    if (currentView === "list") {
      applyFilters()
    }
  }, [priceRange, selectedTypes, selectedBedrooms, selectedBeds, selectedAmenities, sortBy, currentView])

  const applyFilters = () => {
    const filtered = villas.filter((villa) => {
      // Price filter
      if (villa.price < priceRange[0] || villa.price > priceRange[1]) return false

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(villa.type)) return false

      // Bedrooms filter
      if (selectedBedrooms !== "Any" && villa.bedrooms !== Number.parseInt(selectedBedrooms)) return false

      // Beds filter
      if (selectedBeds !== "Any" && villa.beds !== Number.parseInt(selectedBeds)) return false

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) => villa.amenities.includes(amenity))
        if (!hasAllAmenities) return false
      }

      return true
    })

    // Apply sorting
    if (sortBy === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "Rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredVillas(filtered)
  }

  const clearFilters = () => {
    setPriceRange([0, 50000])
    setSelectedTypes(["VILLA"])
    setSelectedBedrooms("Any")
    setSelectedBeds("Any")
    setSelectedAmenities([])
  }

  const toggleFavorite = (villaId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(villaId)) {
      newFavorites.delete(villaId)
    } else {
      newFavorites.add(villaId)
    }
    setFavorites(newFavorites)
  }

  const handleTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type))
    } else {
      setSelectedTypes([...selectedTypes, type])
    }
  }

  const handleAmenityChange = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const handleViewVilla = (villa) => {
    setSelectedVilla(villa)
    setCurrentView("detail")
  }

  const handleBackToList = () => {
    setSelectedVilla(null)
    setCurrentView("list")
  }

  // Add a search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/villas/search?location=${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results");
      const data = await response.json();
      // Map backend image references to imported images
      const transformedData = data.map((villa) => {
        let images = villa.images || [];
        if (images.length === 1 && images[0] === "empireAnandVillaImages") {
          images = getRandomImages(empireAnandVillaImages);
        }
        return {
          id: villa._id,
          name: villa.name,
          location: villa.location,
          price: villa.price || 0,
          description: villa.description,
          images,
          guests: villa.guests || 0,
          bedrooms: villa.bedrooms || 0,
          bathrooms: villa.bathrooms || 0,
          rating: villa.rating || 4.5,
          amenities: villa.facilities?.map((f) => f.name) || [],
          type: villa.type || "VILLA",
        };
      });
      setVillas(transformedData);
      setFilteredVillas(transformedData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Show villa detail page
  if (currentView === "detail" && selectedVilla) {
    return <VillaDetail villa={selectedVilla} onBack={handleBackToList} />
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading villas...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">Error loading villas: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Show villa listing page
// Show villa listing page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - with subtle entrance animation */}
      <div className="bg-white shadow-sm border-b animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors">
            Luxury Villas by Hireavilla
          </h1>
          {/* Search Bar with focus animation */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full md:w-64 
                  focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
              {searchTerm && (
                <button 
                  type="button" 
                  onClick={() => setSearchTerm('')} 
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 
                transition-colors transform hover:scale-105 duration-200 active:scale-95"
            >
              Search
            </button>
          </form>
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 
                focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-300
                group-hover:shadow-md"
            >
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
            <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400 pointer-events-none 
              group-hover:text-green-600 transition-colors duration-200" />
          </div>
        </div>
      </div>

      {/* Main Content with Staggered Animation for Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-8 mt-[50px] animate-slideUp">
        {/* Sidebar Filters with Slide-in Animation */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow-sm p-6 h-fit 
          animate-slideInLeft sticky top-8 self-start">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 group">
              <svg className="w-5 h-5 group-hover:text-green-600 transition-colors" 
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filter
            </h2>
            <button
              onClick={clearFilters}
              className="text-green-600 hover:text-green-700 text-sm font-medium underline
                hover:scale-105 transform transition-transform"
            >
              Clear Selection
            </button>
          </div>

          {/* Price Filter with Expand Animation */}
          <div className="mb-6 border-b pb-4 hover:bg-gray-50 transition-colors rounded-lg px-2">
            <button
              onClick={() => setShowPriceFilter(!showPriceFilter)}
              className="flex items-center justify-between w-full py-2 text-left font-medium"
            >
              Price Per Night
              <div className={`transform transition-transform duration-200 ${showPriceFilter ? 'rotate-180' : ''}`}>
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
            <div className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden 
              ${showPriceFilter ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="flex gap-4 mb-4">
                <div className="flex-1 group">
                  <input
                    type="number"
                    placeholder="₹ 0"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                      group-hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
                <div className="flex-1 group">
                  <input
                    type="number"
                    placeholder="₹ 50,000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 50000])}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                      group-hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider
                  accent-green-600 hover:accent-green-700 transition-colors"
              />
            </div>
          </div>

          {/* Type Filter with Expand Animation */}
          <div className="mb-6 border-b pb-4 hover:bg-gray-50 transition-colors rounded-lg px-2">
            <button
              onClick={() => setShowTypeFilter(!showTypeFilter)}
              className="flex items-center justify-between w-full py-2 text-left font-medium"
            >
              Type
              <div className={`transform transition-transform duration-200 ${showTypeFilter ? 'rotate-180' : ''}`}>
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
            <div className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden 
              ${showTypeFilter ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-3">
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("VILLA")}
                    onChange={() => handleTypeChange("VILLA")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm group-hover:text-green-700 transition-colors">VILLA</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes("APARTMENT")}
                    onChange={() => handleTypeChange("APARTMENT")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm group-hover:text-green-700 transition-colors">APARTMENT</span>
                </label>
              </div>
            </div>
          </div>

          {/* Rooms & Beds Filter with Expand Animation */}
          <div className="mb-6 border-b pb-4 hover:bg-gray-50 transition-colors rounded-lg px-2">
            <button
              onClick={() => setShowRoomsFilter(!showRoomsFilter)}
              className="flex items-center justify-between w-full py-2 text-left font-medium"
            >
              Rooms & Beds
              <div className={`transform transition-transform duration-200 ${showRoomsFilter ? 'rotate-180' : ''}`}>
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden 
              ${showRoomsFilter ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSelectedBedrooms(
                          selectedBedrooms === "Any" ? "1" : (Number.parseInt(selectedBedrooms) - 1).toString(),
                        )
                      }
                      className="p-1 border border-gray-300 rounded-full hover:bg-green-50 transition-colors
                        active:scale-95 transform duration-100"
                      disabled={selectedBedrooms === "Any" || selectedBedrooms === "1"}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded-md min-w-[60px] text-center text-sm">
                      {selectedBedrooms}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedBedrooms(
                          selectedBedrooms === "Any" ? "1" : (Number.parseInt(selectedBedrooms) + 1).toString(),
                        )
                      }
                      className="p-1 border border-gray-300 rounded-full hover:bg-green-50 transition-colors
                        active:scale-95 transform duration-100"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Beds</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSelectedBeds(selectedBeds === "Any" ? "1" : (Number.parseInt(selectedBeds) - 1).toString())
                      }
                      className="p-1 border border-gray-300 rounded-full hover:bg-green-50 transition-colors
                        active:scale-95 transform duration-100"
                      disabled={selectedBeds === "Any" || selectedBeds === "1"}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 py-1 border border-gray-300 rounded-md min-w-[60px] text-center text-sm">
                      {selectedBeds}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedBeds(selectedBeds === "Any" ? "1" : (Number.parseInt(selectedBeds) + 1).toString())
                      }
                      className="p-1 border border-gray-300 rounded-full hover:bg-green-50 transition-colors
                        active:scale-95 transform duration-100"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities Filter with Expand Animation */}
          <div className="mb-6 hover:bg-gray-50 transition-colors rounded-lg px-2">
            <button
              onClick={() => setShowAmenitiesFilter(!showAmenitiesFilter)}
              className="flex items-center justify-between w-full py-2 text-left font-medium"
            >
              Amenities & Features
              <div className={`transform transition-transform duration-200 ${showAmenitiesFilter ? 'rotate-180' : ''}`}>
                <ChevronDown className="h-4 w-4" />
              </div>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden
              ${showAmenitiesFilter ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="mt-4 space-y-3">
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes("Private Pool")}
                    onChange={() => handleAmenityChange("Private Pool")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm group-hover:text-green-700 transition-colors">Private Pool</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes("Shared Pool")}
                    onChange={() => handleAmenityChange("Shared Pool")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm group-hover:text-green-700 transition-colors">Shared Pool</span>
                </label>
                <label className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes("Pet Friendly")}
                    onChange={() => handleAmenityChange("Pet Friendly")}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm group-hover:text-green-700 transition-colors">Pet Friendly</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={applyFilters}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium 
              hover:bg-green-700 transition-all duration-300 transform hover:scale-[1.02] 
              active:scale-[0.98] shadow hover:shadow-md"
          >
            Show Results
          </button>
        </div>

        {/* Villa Grid with Staggered Animation */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVillas &&
              filteredVillas.slice(0, 6).map((villa, idx) => {
                const images = villa.images || [];
                const currentImageIndex = cardImageIndexes[villa.id] || 0;

                const handlePrev = (e) => {
                  e.stopPropagation();
                  setCardImageIndexes((prev) => ({
                    ...prev,
                    [villa.id]: (currentImageIndex - 1 + images.length) % images.length,
                  }));
                };

                const handleNext = (e) => {
                  e.stopPropagation();
                  setCardImageIndexes((prev) => ({
                    ...prev,
                    [villa.id]: (currentImageIndex + 1) % images.length,
                  }));
                };

                // Add staggered animation delay based on index
                const animationDelay = `${idx * 0.1}s`;

                return (
                  <div
                    key={villa.id || villa._id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg 
                      transition-all duration-300 cursor-pointer transform hover:-translate-y-1 
                      animate-fadeInUp"
                    style={{ animationDelay }}
                    onClick={() => handleViewVilla(villa)}
                  >
                    <div className="relative h-64 overflow-hidden group">
                      {images.length > 0 && (
                        <img
                          src={images[currentImageIndex]}
                          alt={`${villa.name} ${currentImageIndex + 1}`}
                          className="object-cover h-64 w-full rounded transform group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                      {images.length > 1 && (
                        <>
                          <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white 
                              rounded-full p-2 shadow transition-all duration-300 opacity-0 group-hover:opacity-100
                              transform -translate-x-3 group-hover:translate-x-0 hover:scale-110"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white 
                              rounded-full p-2 shadow transition-all duration-300 opacity-0 group-hover:opacity-100
                              transform translate-x-3 group-hover:translate-x-0 hover:scale-110"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {images.map((_, idx) => (
                              <span
                                key={idx}
                                className={`block w-2 h-2 rounded-full transition-all duration-300
                                  ${idx === currentImageIndex ? "bg-green-600 scale-125" : "bg-gray-300"}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(villa.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white 
                          transition-all duration-200 transform hover:scale-110 active:scale-95"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            favorites.has(villa.id) 
                              ? "fill-red-500 text-red-500" 
                              : "text-gray-600 hover:text-red-500"
                          } transition-colors`}
                        />
                      </button>
                      
                      {/* Price tag with pop animation */}
                      <div className="absolute bottom-3 right-3 bg-green-600/90 text-white px-2 py-1 
                        rounded-lg text-sm font-medium backdrop-blur-sm transform 
                        transition-all duration-300 group-hover:scale-110 shadow-lg">
                        ₹ {villa.price.toLocaleString()} 
                        <span className="text-xs font-normal text-white/80"> / night</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 hover:text-green-700 transition-colors">
                        {villa.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 flex items-center">
                        <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {villa.location}
                      </p>
                      <p className="text-gray-600 text-sm mb-3 flex flex-wrap gap-2">
                        <span className="flex items-center bg-gray-100 px-2 py-0.5 rounded-full">
                          <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          {villa.guests} Guests
                        </span>
                        <span className="flex items-center bg-gray-100 px-2 py-0.5 rounded-full">
                          <svg className="w-3 h-3 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {villa.bedrooms} Bedrooms
                        </span>
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">{villa.rating}</span>
                        </div>
                        <button className="text-green-600 text-sm font-medium hover:text-green-700 
                          hover:underline transition-all duration-200 flex items-center">
                          View Details
                          <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" 
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Empty state with animation */}
          {filteredVillas && filteredVillas.length === 0 && (
            <div className="text-center py-12 animate-fadeIn">
              <div className="mb-6 text-gray-400">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">No villas found matching your criteria.</p>
              <p className="text-gray-400 mb-6">Try adjusting your filters for better results.</p>
              <button 
                onClick={clearFilters} 
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700
                  transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) 

}

export default AllRooms
