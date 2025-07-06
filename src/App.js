//App.js
import React, {  createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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
import PrivacyPolicy from './component/pages/PrivacyPolicy'; // Import PrivacyPolicy
import TermsAndCondition from './component/pages/TermsAndConditions';
import ContactUs from './component/pages/ContactUs';
import AboutUs from './component/pages/AboutUs'; 


// Create a context for the logged-in user
export const UserContext = createContext(null);

const App = () => {
 
  

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



  return (
    <UserContext.Provider >
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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/TermsAndCondition" element={<TermsAndCondition />} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;