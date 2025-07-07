import { Facebook, Twitter, Instagram } from 'lucide-react';
import React from 'react';
import { Link,  useNavigate } from 'react-router-dom';


export default function Footer() {
  const navigate = useNavigate();

  
  return (
    <footer className="bg-gray-300 text-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Kibzar</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a>
                  <button
                    className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/AboutUs`);
                    }}
                  >
                    About Us
                  </button>
                </a>
              </li>            <li>
                <a>
                  <button
                    className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/ContactUs`);
                    }}
                  >
                    Contact Us
                  </button>
                </a>
              </li>
             <li>
                <a>
                  <button
                    className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/TermsAndCondition`);
                    }}
                  >
                    Terms & Conditions
                  </button>
                </a>
              </li>
              <li>
                <a>
                  <button
                    className="hover:text-gray-800 border-b-2 border-transparent hover:border-red-500"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/Privacy-policy`);
                    }}
                  >
                    Privacy Policy
                  </button>
                </a>
              </li>
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
