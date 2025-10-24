import { useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronDown, Search, Menu, X
 
} from 'lucide-react';
import { SearchContext } from '../../context/SearchContext';
// Import the createUserDocument function
import { toast } from 'react-toastify'; // Import toast

import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { selectedLocation, setSelectedLocation } = useContext(SearchContext);
  const navigate = useNavigate();



  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}&location=${selectedLocation}`);
    }
  };

  

  const handleSellClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      // Navigate to Play Store for Android users
      window.location.href = "https://play.google.com/store/apps/details?id=com.kibzar.kibzar";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // Navigate to Apple Store for iOS users
      window.location.href = "https://apps.apple.com";
    } else {
      // Default fallback (e.g., desktop users)
      toast.info("This feature is only available on the mobile app. Scan the QR code to download.");
    }
  };

  return (
    <header className="bg-white mt-0">
      <div className="container mx-auto px-4 py-4 flex items-center">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img src="/k1.jpeg" alt="Logo" className="w-[120px] h-auto" />
          </Link>
          {/* Dropdown for Location */}
          <div className="relative hidden md:block">
            <button
              onClick={toggleDropdown}
              className="flex items-center text-gray-600 hover:text-gray-800 space-x-2"
            >
              <span className="text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zM12 11v3m6-6a9 9 0 11-6-6c1.488-.276 2.815 0.374 3.514 1.47M6.343 6.343l1.414 1.414M15.88 15.88a3 3 0 004.243 0 3 3 0 00.273-4.01m0 0l-1.414-1.414M18 18v3m0 0h-3m3 0a9 9 0 11-9-9m6-6v3"
                  />
                </svg>
              </span>
              {selectedLocation} <ChevronDown size={16} />
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md w-48 z-50 border border-gray-200">
                <ul>
                  {['All', 'Lefkosia', 'Magusa', 'Girne', 'Guzelyurt', 'Lefke', 'Iskele'].map((location) => (
                    <li
                      key={location}
                      onClick={() => handleLocationChange(location)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Middle Section: Search Bar */}
        <div className="flex-grow mx-6">
          <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find Cars, Mobile Phones and more..."
              className="flex-grow p-2 bg-transparent focus:outline-none"
            />
            <button type="submit" className="p-2 bg-red-500 text-white rounded-r-md">
              <Search size={24} />
            </button>
          </form>
        </div>

        {/* Right Section: Options */}
        <div className="flex items-center space-x-4">
          {/* Toggler for Mobile Menu */}
          <button
            onClick={toggleMobileMenu}
            className="block md:hidden text-gray-600 hover:text-gray-800"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
     
            <Link
              to="#"
              onClick={handleSellClick}
              className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Download App
            </Link>
        
          <Link
            to="#"
            onClick={handleSellClick}
            className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Post Ad
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4">
            {/* Dropdown for Location */}
            <div className="relative mb-4">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-600 hover:text-gray-800 space-x-2"
              >
                <span>{selectedLocation}</span> <ChevronDown size={16} />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 bg-white shadow-lg rounded-md w-full z-50 border border-gray-200">
                  <ul>
                    {['Lefkosia', 'Magusa', 'Girne', 'Guzelyurt', 'Lefke', 'Iskele'].map((location) => (
                      <li
                        key={location}
                        onClick={() => handleLocationChange(location)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {location}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Other Options */}
            <div className="space-y-4">
             
                <Link
                   to="#"
                   onClick={handleSellClick}
                  className="block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Download App
                </Link>
            
              <Link
                to="#"
                onClick={handleSellClick}
                className="block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Post Ad
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Categories (Optional) */}
      <div className="container mx-auto px-4 py-2 border-t border-gray-200">
        <div className="flex flex-wrap space-x-4 text-gray-600 justify-center">
          <button
            className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
            onClick={() => navigate(`/search?query=car `)}
          >
            Vehicles
          </button>
          <button
            className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
            onClick={() => navigate(`/search?query=Properties`)}
          >
            Properties
          </button>
          <button
            className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
            onClick={() => navigate(`/search?query=Mobile & Tablets`)}
          >
            Mobiles & Tablets
          </button>
          <button
            className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
            onClick={() => navigate(`/search?query=Jobs`)}
          >
            Jobs
          </button>
          <button
            className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
            onClick={() => navigate(`/search?query=Electronics & Appliances`)}
          >
            Electronics & Appliances
          </button>
          <button
            className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
            onClick={() => navigate(`/search?query=Furniture & Decor`)}
          >
            Furniture & Decor
          </button>
          <button
            className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
            onClick={() => navigate(`/search?query=More Categories`)}
          >
            More Categories
          </button>
        </div>
      </div>

     
    </header>
  );
}