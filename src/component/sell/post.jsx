import React, { useState } from "react";
import {
  ChevronRight,
  ArrowLeft,
  Car,
  Home,
  Smartphone,
  Briefcase,
  Sofa,
  Shirt,
  ShoppingCart as Refrigerator, // Using ShoppingCart instead of Fridge
  Book,
  Joystick,
  Heart,
  Heart as Paw,
  Wrench as Tools,
  Search
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Vehicles",
    icon: <Car className="w-6 h-6 text-red-500" />,
    subcategories: [
      "Cars for Sale",
      "Cars for Rent",
      "Tyres, Batteries, Oils, & Accessories",
      "Car Spare Parts",
      "Motorcycles & Accessories",
      "Boats - Watercraft",
      "Heavy Trucks, Buses & Other Vehicles"
    ],
  },
  {
    name: "Real Estate",
    icon: <Home className="w-6 h-6 text-green-500" />,
    subcategories: [
      "Apartments",
      "Houses",
      "Land",
      "Room Rentals",
      "Commercial Properties",
      "Other Real Estate"
    ],
  },
  {
    name: "Electronics",
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    subcategories: [
      "Mobile Phones",
      "Laptops",
      "Tablets",
      "Gaming Consoles",
      "Accessories",
      "Other Electronics"
    ],
  },
  {
    name: "Home Appliances",
    icon: <Refrigerator className="w-6 h-6 text-yellow-500" />,
    subcategories: [
      "Microwaves & Ovens",
      "Blenders",
      "Water Boilers",
      "Pans & Cookware",
      "Dishes & Utensils",
      "Irons",
      "Vacuum Cleaners",
      "Heaters",
      "Fans",
      "Routers",
      "Other Appliances"
    ],
  },
  {
    name: "Furniture",
    icon: <Sofa className="w-6 h-6 text-purple-500" />,
    subcategories: [
      "Desks & Chairs",
      "Beds & Mattresses",
      "Sofas",
      "Blankets & Bedding",
      "Home Decor",
      "Carpets",
      "Curtains",
      "Other Furniture"
    ],
  },
  {
    name: "Education",
    icon: <Book className="w-6 h-6 text-orange-500" />,
    subcategories: [
      "Calculators",
      "Lab Coats & Medical Supplies",
      "Engineering Tools",
      "Stationery & Art Supplies",
      "Books & Study Notes",
      "Bags & Backpacks",
      "Online Courses & Tutorials",
      "eBooks & Digital Resources",
      "Tutoring Services",
      "Other Study Supplies"
    ],
  },
  {
    name: "Fashion",
    icon: <Shirt className="w-6 h-6 text-pink-500" />,
    subcategories: [
      "Men's Clothing & Shoes",
      "Women's Clothing & Shoes",
      "Men's Accessories",
      "Women's Accessories"
    ],
  },
  {
    name: "Hobbies & Entertainment",
    icon: <Joystick className="w-6 h-6 text-teal-500" />,
    subcategories: [
      "Musical Instruments",
      "Board Games",
      "Video Games",
      "Art Supplies",
      "Posters",
      "Camping Gear"
    ],
  },
  {
    name: "Self-Care",
    icon: <Heart className="w-6 h-6 text-indigo-500" />,
    subcategories: [
      "Skincare",
      "Haircare",
      "Makeup"
    ],
  },
  {
    name: "Pets",
    icon: <Paw className="w-6 h-6 text-brown-500" />,
    subcategories: [
      "Cats",
      "Dogs",
      "Other Pets & Animals",
      "Accessories & Pet Care Products"
    ],
  },
  {
    name: "Jobs",
    icon: <Briefcase className="w-6 h-6 text-gray-500" />,
    subcategories: [
      "Part-time",
      "Full-time",
      "Internships",
      "Freelance Work",
      "Remote Work",
      "Campus Jobs"
    ],
  },
  {
    name: "Services",
    icon: <Tools className="w-6 h-6 text-cyan-500" />,
    subcategories: [
      "Cooking & Baking",
      "Tutoring",
      "Photography",
      "Event Assistance",
      "Home Cleaning",
      "Other Services"
    ],
  },
  {
    name: "Lost & Found",
    icon: <Search className="w-6 h-6 text-black" />,
    subcategories: [
      "Lost Items",
      "Found Items"
    ],
  },
];

export default function PostAdPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow py-4 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 text-gray-700" aria-label="Go back">
          <ArrowLeft className="w-6 h-6" />
          <span className="text-sm">Back</span>
        </Link>
        <Link to="/">
          <img src="/k1.jpeg" alt="Logo" className="w-[100px] h-auto" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <h1 className="text-center text-xl font-semibold mb-6">POST YOUR AD</h1>

        {/* Categories or Subcategories */}
        {selectedCategory ? (
          <div className="bg-white shadow-md rounded-md">
            <header className="flex items-center px-4 py-3 border-b space-x-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h2 className="text-gray-600 font-medium">{selectedCategory.name}</h2>
            </header>
            <ul>
              {selectedCategory.subcategories.map((subcategory) => (
                <li key={subcategory}>
                  <Link to={`/attributes/${selectedCategory.name}/${subcategory}`} className="flex items-center space-x-2 p-4 hover:bg-gray-100 cursor-pointer">
                    <span className="text-gray-700">{subcategory}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-md">
            <ul>
              {categories.map((category) => (
                <li key={category.name} onClick={() => setSelectedCategory(category)}>
                  <div className="flex items-center space-x-2 p-4 hover:bg-gray-100 cursor-pointer">
                    {category.icon}
                    <span className="text-gray-700">{category.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}







