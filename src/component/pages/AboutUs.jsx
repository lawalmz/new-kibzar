import React from 'react';
import Header from '../Resuable/Header';
import Footer from '../Resuable/Footer';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto p-6">
        {/* Title */}
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">
          About Us
        </h1>

        {/* About Section */}
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Kibzar</strong> is North Cyprus’ all-in-one online marketplace, designed to make buying and selling simple, fast, and accessible to everyone. Whether you’re searching for a new home, selling your car, offering services, or buying secondhand items — Kibzar brings <em>Kıbrıs Pazar</em> straight to your fingertips.
        </p>

        {/* Story */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Before Kibzar, buying or selling in North Cyprus meant navigating scattered social media groups, forums, and offline networks. Finding what you needed wasn’t easy or efficient. We saw a clear need for a centralized platform that organizes everything in one place — where anyone can list, search, and connect with ease.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Kibzar was built to solve that. A modern, user-friendly platform that reflects the way people actually buy, sell, and offer services today. Designed for residents, students, expats, and businesses alike — Kibzar is built for the community.
        </p>

        {/* Mission */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          To empower people in North Cyprus with a trusted platform where they can buy, sell, or trade anything — without barriers, without complexity, and without wasted time.
        </p>

        {/* Vision */}
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-3">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          To become the leading marketplace in North Cyprus — the first app people think of when they want to rent a flat, find a job, sell furniture, or offer a service. Kibzar aims to support everyday life and local commerce through simplicity and accessibility.
        </p>

        <div className="border-t border-gray-300 my-10" />

        {/* Founders */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Founders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {/* Aimen */}
          <a
            href="https://www.linkedin.com/in/aimenalamin/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center bg-white shadow-md rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src="/aimen.jpeg"
              alt="Aimen Alamin"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800">Aimen Alamin</h3>
            <p className="text-sm text-gray-500">Founder</p>
          </a>

          {/* Lawal */}
          <a
            href="https://www.instagram.com/emzel__?igsh=d2VvMHJ6ZmI1eXQ4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center bg-white shadow-md rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src="/IMG_5259.jpg"
              alt="Lawal Muazu Lawal"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-800">Lawal Muazu Lawal</h3>
            <p className="text-sm text-gray-500">Co-Founder</p>
          </a>
        </div>

        <div className="border-t border-gray-300 my-10" />

        {/* Closing Line */}
        <p className="text-gray-700 text-center leading-relaxed mt-6">
          Start exploring <strong>Kibzar</strong> today — your marketplace in North Cyprus.
        </p>
      </div>
      <Footer />
    </div>
  );
}
