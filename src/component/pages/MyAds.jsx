import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const MyAds = () => {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'posts'), where('userId', '==', user.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const adsArray = [];
        querySnapshot.forEach((doc) => {
          adsArray.push({ id: doc.id, ...doc.data() });
        });
        setAds(adsArray);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
      setAds(ads.filter((ad) => ad.id !== id));
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">My Ads</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ads.length > 0 ? (
          ads.map((ad) => (
            <div key={ad.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <img src={ad.imageUrl} alt={ad.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                <p className="text-lg font-bold">{ad.title}</p>
                <p className="text-sm text-gray-600">{ad.description}</p>
              </div>
              <button
                onClick={() => handleDelete(ad.id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No ads available</p>
        )}
      </div>
    </div>
  );
};

export default MyAds;
