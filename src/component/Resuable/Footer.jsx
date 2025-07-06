import { Facebook, Twitter, Instagram } from 'lucide-react';
import React from 'react';


export default function Footer() {
  return (
    <footer className="bg-gray-300 text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Kibzar</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><a href="/AboutUs" className="hover:underline">About Us</a></li>
              <li><a href="/ContactUs" className="hover:underline">Contact Us </a></li>
              <li><a href="/TermsAndCondition" className="hover:underline">Terms & Condition</a></li>
              <li><a href="/Privacy-policy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><a href="#" className="hover:underline">Cars for Sale</a></li>
              <li><a href="#" className="hover:underline">Apartments for Rent</a></li>
              <li><a href="#" className="hover:underline">Jobs</a></li>
              <li><a href="#" className="hover:underline">Mobile Phones</a></li>
              <li><a href="#" className="hover:underline">Furniture</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-red-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-red-400">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-4 text-center">
          Built by Muazu Lawal Lawal & Aimen Alamin
 
        </div>
        <div className="mt-8 text-center text-xs md:text-sm">
          © {new Date().getFullYear()} Kibzar North Cyprus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
