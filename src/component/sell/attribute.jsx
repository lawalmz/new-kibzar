import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { auth, db, storage } from "../../firebase"; // Import auth, db, and storage
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods
import { onAuthStateChanged } from "firebase/auth"; // Import auth state change method
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Storage methods
import { doc, getDoc } from "firebase/firestore"; // Import getDoc
import PhoneInput from "react-phone-input-2"; // Make sure this is at the top
import 'react-phone-input-2/lib/style.css'; 

export default function PostAttributesPage({ onPhoneNumberChange }) {
  const { category, subcategory } = useParams(); // Get both category and subcategory from useParams
  const navigate = useNavigate(); // Initialize useNavigate
  const [user, setUser] = useState(null); // State to store user
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(""); // State to manage error messages
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: category,
    subCategory: subcategory, // Add subCategory to formData
    location: "",
    images: [], // Ensure images is initialized as an array
    paymentOptions: [], // Ensure this is an array
    phoneNumber: "",
    contactMethod: [], // Ensure this is an array
    currency: "USD", // Add currency to formData
    condition: "new", // Add condition to formData 
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (value) => {
    // Ensure the phone number starts with '+'
    const formattedPhoneNumber = value.startsWith('+') ? value : `+${value}`;
    
    setPhoneNumber(formattedPhoneNumber); // Store the phone number with the '+'
    setFormData((prevData) => ({ ...prevData, phoneNumber: formattedPhoneNumber })); // Update formData with formatted phone number
    if (onPhoneNumberChange) {
      onPhoneNumberChange(formattedPhoneNumber); // Pass the full phone number to the parent
    }
  };
  
  
  


  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, category: category, subCategory: subcategory }));
  }, [category, subcategory]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For price field, ensure it's stored as a number
    if (name === "price") {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 }); // Use parseFloat to ensure the value is a number
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => {
      const updatedOptions = checked
        ? [...prevData[name], e.target.value]
        : prevData[name].filter((option) => option !== e.target.value);
      return { ...prevData, [name]: updatedOptions };
    });
  };



  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevData) => ({ ...prevData, images: [...prevData.images, ...files] }));
  };

  const isFormValid = () => {
    const requiredFields = ["title", "description", "price", "location", "phoneNumber"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    if (formData.images.length === 0) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to post an ad.");
      return;
    }

    if (!isFormValid()) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true); // Set loading to true
    setError(""); // Clear any previous error messages

    const uploadImage = async (image) => {
      const imageRef = ref(storage, `images/${user.uid}/${image.name}`);
      await uploadBytes(imageRef, image);
      return getDownloadURL(imageRef);
    };

    try {
      const userDocRef = doc(db, "users", user.uid); // Reference to the user's document
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        throw new Error("User data not found in Firestore.");
      }

      const imageUrls = await Promise.all(formData.images.map(uploadImage));
      const { name } = userDoc.data();
      const postData = {
        ...formData,
        phoneNumber,
        imageUrl: imageUrls, // Save image URLs under the imageUrl field
        userId: user.uid,
         sellerName: name ,

        timestamp: new Date().toISOString(), // Set timestamp in the correct format
      };

      // Clear the images field in formData to avoid storing custom File objects
      delete postData.images;

      await addDoc(collection(db, "posts"), postData);
      setLoading(false); // Set loading to false
      navigate("/success"); // Redirect to success page
    } catch (error) {
      console.error("Error adding document: ", error.message); // Log the error message
      console.error("Error details: ", error); // Log the full error object for more details
      setLoading(false); // Set loading to false
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Post Your Ad</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md p-6 space-y-6 max-w-2xl mx-auto"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={formData.category}
            readOnly
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Subcategory</label>
          <input
            type="text"
            value={formData.subCategory}
            readOnly
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Images</label>
          <div className="grid grid-cols-4 gap-4 mt-2">
            {formData.images.map((image, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-20 w-20 border border-gray-300 rounded-md overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <div>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="upload"
              />
              <label
                htmlFor="upload"
                className="flex items-center justify-center h-20 w-20 border border-dashed border-gray-300 text-gray-400 text-sm rounded-md cursor-pointer hover:border-gray-500 hover:text-gray-700"
              >
                +
              </label>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            For the cover picture, we recommend using the landscape mode.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ad Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Mention the key features of your item (e.g. brand, model)"
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          />
          <p className="text-sm text-gray-500 mt-1">1/70</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the item you’re selling"
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          />
          <p className="text-sm text-gray-500 mt-1">0/4096</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location*</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="">Select Location</option>
            {['Lefkosia', 'Magusa', 'Girne', 'Guzelyurt', 'Lefke', 'Iskele'].map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Payment Options</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["Cash", "Exchange", "Installments"].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  value={option}
                  name="paymentOptions"
                  checked={formData.paymentOptions.includes(option)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label className="ml-2 text-gray-800">{option}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price*</label>
          <div className="flex">
          
          <select
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className="ml-2 border border-gray-300 rounded-md px-4 py-2"
            >
              {["USD", "EUR", "GBP", "TRY"].map((currency) => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter Price"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
           
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Condition*</label>
          <div className="flex gap-4 mt-2">
            {["New", "Used", "Other"].map((condition) => (
              <div key={condition} className="flex items-center">
                <input
                  type="radio"
                  value={condition.toLowerCase()}
                  name="condition"
                  checked={formData.condition === condition.toLowerCase()}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label className="ml-2 text-gray-800">{condition}</label>
              </div>
            ))}
          </div>
        </div>

      <div>
      <label className="block text-sm font-medium text-gray-700">
        Mobile Phone Number*
      </label>
      <PhoneInput
        country={"us"} // Default country
        value={phoneNumber}
        onChange={handlePhoneChange}
        inputProps={{
          name: "phoneNumber",
          required: true,
          autoFocus: true,
          
        }}
      />
    </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Method</label>
          <div className="flex gap-4 mt-2">
            {["Phone Number", "Kibzar Chat","Whatsapp", "Both"].map((method) => (
              <div key={method} className="flex items-center">
                <input
                  type="checkbox"
                  value={method}
                  name="contactMethod"
                  checked={formData.contactMethod.includes(method)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label className="ml-2 text-gray-800">{method}</label>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md ${loading ? 'bg-gray-500' : 'bg-red-500'} text-white hover:bg-blue-600`}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Posting...' : 'Post Now'}
        </button>

        {error && (
          <div className="mt-4 text-center text-red-500">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}

