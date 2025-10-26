import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../../firebase'; // Import Firestore instance

export default function FeaturedListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(10)); // Use timestamp instead of datePosted
        const querySnapshot = await getDocs(q);
        const fetchedListings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setListings(fetchedListings);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Featured Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative cursor-pointer"
              onClick={() => navigate(`/listing/${listing.id}`, { state: { listing } })}
            >
              {listing.imageUrl && listing.imageUrl.length > 0 ? (
                <img
                  src={listing.imageUrl[0]} // Use images instead of imageUrl
                  alt={listing.title}
                  width={300}
                  height={200}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                  No Image Available
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold mb-1 text-sm md:text-base truncate">
                  {listing.title}
                </h3>
                <p className="text-red-600 font-bold text-lg">
                  {Number(listing.price).toLocaleString()} {listing.currency}
                </p>
                <div className="text-gray-600 text-xs md:text-sm mt-2">

                  <span>{listing.year}</span>
                </div>
                <p className="text-gray-500 text-xs mt-1">
                  {listing.location} · {listing.timestamp ? new Date(listing.timestamp).toDateString() : 'No date'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </section>
  );
}
