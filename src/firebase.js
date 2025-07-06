// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence, doc, setDoc, getDoc } from 'firebase/firestore'; // Import Firestore and enableIndexedDbPersistence
import { getStorage } from 'firebase/storage'; // Import Storage

const firebaseConfig = {
    // apiKey: "AIzaSyBHv4pv2N0N7iH5mGa0Bwz38ZZ68rR5mrk",
    // authDomain: "kibzer-14cb5.firebaseapp.com",
    // projectId: "kibzer-14cb5",
    // storageBucket: "kibzer-14cb5.firebasestorage.app",
    // messagingSenderId: "93956284913",
    // appId: "1:93956284913:web:423e74c4c3cef4aba02450",
    // measurementId: "G-0S01S3TC29"


    apiKey: 'AIzaSyCqzSh6CnbAM2E9gfiIB8zacshh3otIEBM',
    appId: '1:256002788432:web:d2b8c0726f427b0d365555',
    messagingSenderId: '256002788432',
    projectId: 'kibzar-ea8f8',
    authDomain: 'kibzar-ea8f8.firebaseapp.com',
    storageBucket: 'kibzar-ea8f8.firebasestorage.app',
    measurementId: 'G-Y7KBE8G4EL',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
export const storage = getStorage(app); // Initialize Storage

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.error('Failed to enable offline persistence: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
        console.error('Failed to enable offline persistence: Browser does not support it');
    }
});

// Function to create or update user document in Firestore
export const createUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);

    const userData = {
        email: user.email,
        ...additionalData, // Include additional data such as name
    };

    try {
        await setDoc(userRef, userData, { merge: true });
    } catch (error) {
        console.error('Error creating user document:', error);
    }
};
