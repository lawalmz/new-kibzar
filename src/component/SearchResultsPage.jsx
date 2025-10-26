import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../firebase'; // Import Firestore instance
import { SearchContext } from '../context/SearchContext'; // Import the context

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get('query')?.toLowerCase() || '';
  const initialLocation = searchParams.get('location')?.toLowerCase() || 'all';

  const { selectedLocation, setSelectedLocation } = useContext(SearchContext); // Use context

  // State for filters
  const [tempLocation, setTempLocation] = useState(selectedLocation);
  const [tempCondition, setTempCondition] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [appliedFilters, setAppliedFilters] = useState({
    location: initialLocation,
    condition: 'all',
  });

  const [listings, setListings] = useState([]); // State to store listings
  const navigate = useNavigate();

  useEffect(() => {
    setTempLocation(selectedLocation);
  }, [selectedLocation]);

  useEffect(() => {
    const fetchListings = async () => {
      let q = collection(db, 'posts');
      const filters = [];

      if (appliedFilters.location !== 'all') {
        filters.push(where('location', '==', appliedFilters.location));
      }

      if (appliedFilters.condition !== 'all') {
        filters.push(where('condition', '==', appliedFilters.condition));
      }

      if (filters.length > 0) {
        q = query(q, ...filters);
      }

      const querySnapshot = await getDocs(q);
      const fetchedListings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(fetchedListings);
    };

    fetchListings();
  }, [appliedFilters]);

  // Apply filters when "Apply Filters" button is clicked
  const handleApplyFilters = () => {
    setSelectedLocation(tempLocation);
    setSelectedCondition(tempCondition);
    setAppliedFilters({
      location: tempLocation,
      condition: tempCondition,
    });
  };

  // Filter listings based on search query
  const filteredListings = listings.filter(
    (item) =>
      item.title.toLowerCase().includes(queryParam) ||
      item.location.toLowerCase().includes(queryParam) ||
      (item.category && item.category.toLowerCase().includes(queryParam)) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(queryParam))
  );

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
      {/* Sidebar Filter Section */}
      <div className="w-full md:w-1/4 md:pr-4 mb-6 md:mb-0">
        <div className="bg-white border rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Filter</h2>

          {/* Location Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Location</label>
            <select
              className="w-full border-gray-300 rounded-md"
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="Lefkosia">Lefkosia</option>
              <option value="Magusa">Magusa</option>
              <option value="Girne">Girne</option>
              <option value="Lefke">Lefke</option>
              <option value="Iskele">Iskele</option>
            </select>
          </div>

          {/* Condition Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Condition</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value="all"
                  checked={tempCondition === 'all'}
                  onChange={(e) => setTempCondition(e.target.value)}
                  className="mr-2"
                />
                All
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value="new"
                  checked={tempCondition === 'new'}
                  onChange={(e) => setTempCondition(e.target.value)}
                  className="mr-2"
                />
                New
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value="used"
                  checked={tempCondition === 'used'}
                  onChange={(e) => setTempCondition(e.target.value)}
                  className="mr-2"
                />
                Used
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="condition"
                  value="other"
                  checked={tempCondition === 'other'}
                  onChange={(e) => setTempCondition(e.target.value)}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>

          <button
            className="bg-red-500 text-white w-full py-2 rounded-md mt-4 hover:bg-red-600"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full md:w-3/4">
        <h1 className="text-2xl font-semibold mb-6">Search Results for "{queryParam}"</h1>
        {filteredListings.length > 0 ? (
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <div
                key={listing.id}
                className="flex flex-col md:flex-row bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => navigate(`/listing/${listing.id}`, { state: { listing } })}
              >
                {/* Image Section */}
                <div className="w-full md:w-1/3">
                  <img
                    src={listing.imageUrl[0]} // Use imageUrl instead of images
                    alt={listing.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <h1 className="text-lg font-semibold text-xl mt-2">{listing.title}</h1>
                    <p className="text-gray-600 text-base mt-2">{listing.description}</p>
                    <p className="text-gray-600 font-semibold text-xl ">
                      {listing.currency}   {Number(listing.price).toLocaleString()}
                    </p>
    
                    <p className="text-gray-500 text-xs mt-1">
                  {listing.location} · {listing.timestamp ? new Date(listing.timestamp).toDateString() : 'No date'}
                </p>                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => window.location.href = `tel:${listing.phoneNumber}`}
                    >
                      Call
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => window.open(`https://wa.me/${listing.phoneNumber}`, '_blank', 'noopener,noreferrer')}
                    >
                      WhatsApp
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No results found for "{queryParam}".</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;