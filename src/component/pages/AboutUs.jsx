import React from 'react';
import Header from '../Resuable/Header';
import Footer from '../Resuable/Footer';

export default function AboutUs  ()  {
  return (
    <div className="min-h-screen ">
        <Header />
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">About Kibzar</h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        Kibzar is a modern online marketplace built to simplify local buying and selling. Whether you're posting an item, browsing deals nearby, or connecting with sellers, Kibzar provides a fast, secure, and user-friendly experience — right from your phone or browser.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        From cars and electronics to apartments and furniture, our platform is designed to help individuals and businesses trade easily and safely. We believe local commerce should be simple, trustworthy, and accessible to everyone.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Our Mission</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Our mission is to empower communities by making it easier to exchange goods and services locally — all from the convenience of your mobile device or computer.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Meet the Founders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
        {/* Lawal */}
        <a
          href="https://www.instagram.com/emzel__?igsh=d2VvMHJ6ZmI1eXQ4" // Replace with actual social link
          target="_blank"
          rel="noopener noreferrer"
          className="text-center bg-white shadow-md rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg"
        >
          <img
            src="/IMG_5259.jpg" // Replace with your actual image path
            alt="Lawal Muazu Lawal"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold text-gray-800">Lawal Muazu Lawal</h3>
          <p className="text-sm text-gray-500">Co-founder & Full-Stack Developer</p>
        </a>

        {/* Friend */}
        <a
          href="https://www.linkedin.com/in/aimenalamin/" // Replace with actual social link
          target="_blank"
          rel="noopener noreferrer"
          className="text-center bg-white shadow-md rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg"
        >
          <img
            src="/aimen.jpeg" // Replace with your actual image path
            alt="Aimen Alamin"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold text-gray-800">Aimen Alamin</h3>
          <p className="text-sm text-gray-500">Co-founder & Mobile App Developer</p>
        </a>
      </div>

      <p className="text-gray-700 leading-relaxed mt-8">
        From idea to launch, we built Kibzar together with a shared vision: to make local commerce more seamless and more human.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Thank You</h2>
      <p className="text-gray-700 leading-relaxed">
        Thank you for being part of the Kibzar community. We’re just getting started, and we look forward to growing with you.
      </p>

      
    </div>
    <Footer />
    </div>
  );
};


