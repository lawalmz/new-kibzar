import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ListingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const listing = location.state?.listing;
  const [mainImage, setMainImage] = useState(listing?.imageUrl[0]); // Use imageUrl instead of images
  const [showAllImages, setShowAllImages] = useState(false);

  if (!listing) {
    return <p>No details available.</p>;
  }

  const additionalImagesCount = listing.imageUrl.length - 2; // Use imageUrl instead of images

  // Convert Firestore Timestamp to JavaScript Date
  let datePosted;
  if (listing.timestamp) {
    datePosted = new Date(listing.timestamp);
  } else {
    datePosted = new Date();
  }

  // Function to format the "added" field
  const formatAddedDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 0) {
      return 'now';
    } else if (diffDays === 0) {
      return 'today';
    } else if (diffDays === 1) {
      return 'yesterday';
    } else {
      return date.toDateString();
    }
  };

  const handleChatClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      // Navigate to Play Store for Android users
      window.location.href = "https://play.google.com/store";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // Navigate to Apple Store for iOS users
      window.location.href = "https://apps.apple.com";
    } else {
      // Default fallback (e.g., desktop users)
      window.location.href = "https://www.google.com/search?q=messi";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-6"
      >
        Back to Results
      </button>

      {/* Listing Details */}
      <div className="bg-white border rounded-lg shadow-md p-6">
        {/* Image Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Image */}
          <div className="md:col-span-2">
            <img
              src={mainImage}
              alt={listing.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-2 gap-2">
            {listing.imageUrl.slice(0, 2).map((image, index) => ( // Use imageUrl instead of images
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-32 object-cover rounded-lg cursor-pointer ${mainImage === image ? "border-4 border-yellow-500" : ""
                  }`}
                onClick={() => setMainImage(image)}
              />
            ))}
            {/* +X More Button */}
            {additionalImagesCount > 0 && !showAllImages && (
              <button
                className="bg-gray-100 text-gray-700 text-center flex items-center justify-center rounded-lg w-full h-32 cursor-pointer hover:bg-gray-200"
                onClick={() => setShowAllImages(true)}
              >
                +{additionalImagesCount} more
              </button>
            )}
          </div>
        </div>

        {/* Expanded Gallery */}
        {showAllImages && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {listing.imageUrl.map((image, index) => ( // Use imageUrl instead of images
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg cursor-pointer"
                  onClick={() => setMainImage(image)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Details Section */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
          <h2 className="text-3xl  mb-4">{listing.category}</h2>
          <p className="text-gray-600 mb-2 font-medium text-lg">{listing.location}</p>
          <p className="text-red-500 text-2xl font-semibold mb-6">{listing.price} {listing.currency}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Details</h2>
              <p className="text-sm text-gray-700">Added: {formatAddedDate(datePosted)}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Contact</h2>
              <p className="text-sm font-big text-gray-700 mb-2">
                Name: <span className="text-gray-900">{listing.sellerName}</span>
              </p>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mb-2"
                onClick={() => window.location.href = `tel:${listing.phoneNumber}`}
              >
                Call
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full mb-2"
                onClick={() => window.open(`https://wa.me/${listing.phoneNumber}`, '_blank', 'noopener,noreferrer')}
              >
                WhatsApp
              </button>

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                onClick={handleChatClick}
              >
                Chat
              </button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{listing.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
