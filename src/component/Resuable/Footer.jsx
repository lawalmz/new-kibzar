import { Facebook, Instagram } from 'lucide-react';
import { FaTiktok } from "react-icons/fa";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


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
                      navigate(`/privacy-policy`);
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
              <a href="https://www.facebook.com/share/1BHmJpauvN/?mibextid=wwXIfr" className="hover:text-red-400">
                <Facebook size={24} />
              </a>
              <a href="https://www.tiktok.com/@kibzarr?_r=1&_t=ZS-917Wd7y6b4C" className="hover:text-red-400">
                <FaTiktok size={24} />
              </a>
              <a href="https://www.instagram.com/kibzarr?igsh=MW8yMjcwcnZrcXcwYg%3D%3D&utm_source=qr" className="hover:text-red-400">
                <Instagram size={24} />
              </a>
            

            </div>
            <div className="flex flex-col items-start mt-2">
  <div className="flex flex-col items-center" style={{ lineHeight: 0 }}>
  {/* Android Button */}
  <button
    onClick={() =>
      window.open(
        "https://play.google.com/store/apps/details?id=com.kibzar.kibzar",
        "_blank"
      )
    }
    className="focus:outline-none"
    style={{ padding: 0, margin: 0, border: "none" }}
  >
    <img
      src="/A.jpeg"
      alt="Play Store"
      style={{
        width: "150px",
        height: "auto",
        display: "block",
        margin: 0,
        padding: 0,
        objectFit: "contain",
      }}
    />
  </button>

  {/* iOS Button */}
  <button
    onClick={() =>
      window.open(
        "https://apps.apple.com/ca/app/kibzar/id6754494974",
        "_blank"
      )
    }
    className="focus:outline-none"
    style={{ padding: 0, marginTop: "4px", border: "none" }}
  >
    <img
      src="/I.jpeg"
      alt="App Store"
      style={{
        width: "150px",
        height: "auto",
        display: "block",
        margin: 0,
        padding: 0,
        objectFit: "contain",
      }}
    />
  </button>
</div>

</div>


          </div>
        </div>
        
        <div className="mt-8 text-center text-xs md:text-sm">
          © {new Date().getFullYear()} Kibzar North Cyprus. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
