// --- a/file:///Users/lawalmlawal/Desktop/new-kibzar/src/component/sell/ListingDetails.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust if necessary
import { toast } from 'react-toastify'; // Import toast


function ListingDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [listing, setListing] = useState(location.state?.listing || null);
  const [mainImage, setMainImage] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [loading, setLoading] = useState(true);
  

  // Fetch listing if accessed via direct link
  useEffect(() => {
    const fetchListing = async () => {
     

      if (!listing && id) {
        try {
          const docRef = doc(db, 'posts', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setListing(data);
            if (data.imageUrl && data.imageUrl.length > 0) {
              setMainImage(data.imageUrl[0]);
              
            }
          } else {
            console.error("No such document!");
            setListing(null);
          }
        } catch (error) {
          console.error("Error fetching listing:", error);
        } finally {
          setLoading(false);
        }
      } else {
        const localListing = location.state?.listing;
        setMainImage(localListing?.imageUrl?.[0] || null);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, listing, location.state]);
  // Ensure mainImage is set anytime listing changes and has imageUrl
useEffect(() => {
  if (listing && Array.isArray(listing.imageUrl) && listing.imageUrl.length > 0) {
    setMainImage(listing.imageUrl[0]);
  }
}, [listing]);


  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>No details available.</p>;

  const additionalImagesCount = listing.imageUrl.length - 2;
  const datePosted = listing.timestamp ? new Date(listing.timestamp) : new Date();

  const formatAddedDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    return date.toDateString();
  };

  const handleChatClick = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location.href = "https://play.google.com/store/apps/details?id=com.kibzar.kibzar";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = "https://apps.apple.com";
    } else {
      toast.error("You can only chat using the Kibzar app. Please download our app to use chat.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mb-6"
      >
        Back to Results
      </button>

      <div className="bg-white border rounded-lg shadow-md p-6">
        {/* Image Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {mainImage ? (
              <img
                src={mainImage}
                alt={listing.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500">
                Loading image...
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {listing.imageUrl.slice(0, 2).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-full h-32 object-cover rounded-lg cursor-pointer ${mainImage === image ? "border-4 border-yellow-500" : ""}`}
                onClick={() => setMainImage(image)}
              />
            ))}
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

        {/* Gallery Section */}
        {showAllImages && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {listing.imageUrl.map((image, index) => (
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

        {/* Details */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
          <h2 className="text-3xl mb-4">{listing.category}</h2>
          <p className="text-gray-600 mb-2 font-medium text-lg">{listing.location}</p>
          <p className="text-red-500 text-2xl font-semibold mb-6">
            {listing.price} {listing.currency}
          </p>

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

              {/* Phone Only or Both */}
              {(listing.contactMethod === 'Phone' || listing.contactMethod === 'Both') && (
                <>
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
                </>
              )}

              {/* Chat Only or Both */}
              {(listing.contactMethod === 'Chat' || listing.contactMethod === 'Both') && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                  onClick={handleChatClick}
                >
                  Chat
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{listing.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
