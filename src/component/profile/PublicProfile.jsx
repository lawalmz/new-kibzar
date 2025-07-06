import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function PublicProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for userId:", userId); // Add logging
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Profile data:", docSnap.data()); // Add logging
          setProfile(docSnap.data());
        } else {
          console.error("Profile not found for userId:", userId); // Add logging
          setError("Profile not found.");
        }
      } catch (err) {
        console.error("Error fetching profile: ", err); // Add logging
        setError("Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    } else {
      console.error("No userId provided"); // Add logging
      setError("No userId provided.");
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Public Profile</h1>
      </div>
      <div className="bg-white shadow-md rounded-md p-6 space-y-6 max-w-2xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">About</h3>
          <p className="text-gray-600">{profile.about}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Listings</h3>
          {/* Add code to display user's listings */}
        </div>
      </div>
    </div>
  );
}
