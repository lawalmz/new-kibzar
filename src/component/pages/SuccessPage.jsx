import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-semibold text-gray-900">Post Submitted Successfully!</h1>
      <p className="text-gray-700 mt-4">Your ad has been posted successfully.</p>
      <Link to="/" className="mt-6 inline-block bg-red-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Go to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
