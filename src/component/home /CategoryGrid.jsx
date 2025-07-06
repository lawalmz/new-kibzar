import { Car, Home, Briefcase, ShoppingBag, Smartphone, Sofa } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'car', icon: Car },
  { name: 'Property for Sale', icon: Home },
  { name: 'Property for Rent', icon: Home },
  { name: 'Jobs', icon: Briefcase },
  { name: 'Mobiles', icon: Smartphone },
  { name: 'Electronics', icon: ShoppingBag },
  { name: 'Furniture', icon: Sofa },
];

export default function CategoryGrid() {
  const navigate = useNavigate(); // Add useNavigate hook

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Browse by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center p-4 bg-white rounded-md shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/search?query=${category.name}`)} // Add onClick handler
          >
            <category.icon size={36} className="text-red-600 mb-2" />
            <span className="text-center text-sm md:text-base">{category.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
