// //App.js
// import React, {  createContext } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import MainPage from './component/pages/Homepage';
// import Post from './component/sell/post';
// import Attribute from './component/sell/attribute';
// import SearchResultsPage from "./component/pages/SearchPage";
// import ListingDetails from './component/sell/ListingDetails'; // Adjust the path as necessary
// import SuccessPage from './component/pages/SuccessPage'; // Import SuccessPage
// import ChatPage from './component/pages/ChatPage'; // Import ChatPage
// import ChatListPage from './component/pages/ChatListPage'; // Import ChatListPage
// import MyAds from './component/pages/MyAds'; // Import MyAds
// import PublicProfile from './component/profile/PublicProfile'; // Import PublicProfile
// import PrivacyPolicy from './component/pages/PrivacyPolicy'; // Import PrivacyPolicy
// import TermsAndCondition from './component/pages/TermsAndConditions';
// import ContactUs from './component/pages/ContactUs';
// import AboutUs from './component/pages/AboutUs'; 


// // Create a context for the logged-in user
// export const UserContext = createContext(null);

// const App = () => {
 
  

//   const isAuthenticated = () => {
//     // Check if the user is logged in by verifying the session storage
//     return !!sessionStorage.getItem('loggedInUser');
//   };

//   const ProtectedRoute = ({ element }) => {
//     const navigate = useNavigate();
//     React.useEffect(() => {
//       if (!isAuthenticated()) {
//         navigate('/');
//       }
//     }, [navigate]);

//     if (!isAuthenticated()) {
//       return null;
//     }
//     return element;
//   };



//   return (
//     <UserContext.Provider >
//       <Router>
//         <Routes>
//           <Route path="/" element={<MainPage />} />
//           <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
//           <Route path="/attributes/:category/:subcategory" element={<ProtectedRoute element={<Attribute />} />} />
//           <Route path="/search" element={<SearchResultsPage />} />
//           <Route path="/listing/:id" element={<ListingDetails />} />
//           <Route path="/success" element={<ProtectedRoute element={<SuccessPage />} />} />
//           <Route path="/chat/:postId" element={<ProtectedRoute element={<ChatPage />} />} />
          
//           <Route path="/my-ads" element={<ProtectedRoute element={<MyAds />} />} /> {/* Add MyAds route */}
//           <Route path="/profile/:userId" element={<ProtectedRoute element={<PublicProfile />} />} /> {/* Add PublicProfile route */}
//           <Route path="/privacy-policy" element={<ProtectedRoute element={<PrivacyPolicy />} />} />
//           <Route path="/TermsAndCondition" element={<ProtectedRoute element={<TermsAndCondition />} />} />
//           <Route path="/ContactUs" element={<ProtectedRoute element={<ContactUs/>} />}  />
//           <Route path="/AboutUs" element={<ProtectedRoute element={<AboutUs/>} />}  />
//         </Routes>
//       </Router>
//     </UserContext.Provider>
//   );
// };

// export default App;

//App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged
import MainPage from './component/pages/Homepage';
import Post from './component/sell/post';
import Attribute from './component/sell/attribute';
import SearchResultsPage from "./component/pages/SearchPage";
import ListingDetails from './component/sell/ListingDetails'; // Adjust the path as necessary
import SuccessPage from './component/pages/SuccessPage'; // Import SuccessPage
import ChatPage from './component/pages/ChatPage'; // Import ChatPage
import ChatListPage from './component/pages/ChatListPage'; // Import ChatListPage
import MyAds from './component/pages/MyAds'; // Import MyAds
import PublicProfile from './component/profile/PublicProfile'; // Import PublicProfile
import { auth } from './firebase'; // Import auth
import { createUserDocument } from './firebase'; // Import createUserDocument
import PrivacyPolicy from './component/pages/PrivacyPolicy'; // Import PrivacyPolicy
import TermsAndCondition from './component/pages/TermsAndConditions';
import ContactUs from './component/pages/ContactUs';
import AboutUs from './component/pages/AboutUs'; 

// Create a context for the logged-in user
export const UserContext = createContext(null);

const App = () => {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [loggedInUser, setLoggedInUser] = useState(null); // State to manage logged-in user
  const [loginError, setLoginError] = useState(""); // State to manage login error
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to manage login modal

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const loggedInUser = { email: user.email, uid: user.uid };
        setLoggedInUser(loggedInUser);
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      } else {
        setLoggedInUser(null);
        sessionStorage.removeItem('loggedInUser');
      }
    });
    return () => unsubscribe();
  }, []);

  const isAuthenticated = () => {
    // Check if the user is logged in by verifying the session storage
    return !!sessionStorage.getItem('loggedInUser');
  };

  const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    React.useEffect(() => {
      if (!isAuthenticated()) {
        navigate('/');
      }
    }, [navigate]);

    if (!isAuthenticated()) {
      return null;
    }
    return element;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        throw new Error('Please verify your email before logging in.');
      }
      await createUserDocument(user); // Ensure user document is created or updated in Firestore
      const loggedInUser = { email: user.email, uid: user.uid }; // Include uid in loggedInUser
      setLoggedInUser(loggedInUser);
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser)); // Include uid in session storage
      setIsLoginModalOpen(false);
      setLoginError("");
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={loggedInUser}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/post" element={<ProtectedRoute element={<Post />} />} />
          <Route path="/attributes/:category/:subcategory" element={<ProtectedRoute element={<Attribute />} />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/success" element={<ProtectedRoute element={<SuccessPage />} />} />
          <Route path="/chat/:postId" element={<ProtectedRoute element={<ChatPage />} />} />
          <Route path="/chats" element={<ProtectedRoute element={<ChatListPage />} />} />
          <Route path="/my-ads" element={<ProtectedRoute element={<MyAds />} />} /> {/* Add MyAds route */}
          <Route path="/profile/:userId" element={<PublicProfile />} /> {/* Add PublicProfile route */}
           <Route path="/privacy-policy"  element={<PrivacyPolicy />}  />
           <Route path="/TermsAndCondition"  element={<TermsAndCondition />}  />
          <Route path="/ContactUs"  element={<ContactUs/>}   />
          <Route path="/AboutUs"  element={<AboutUs/>}   />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;