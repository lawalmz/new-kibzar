import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const formRef = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,  // Use service ID from .env
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // Use template ID from .env
      formRef.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY   // Use public key from .env
    )
    .then(() => {
      setIsSent(true);
      formRef.current.reset();
    })
    .catch((error) => {
      console.error('Email failed to send:', error);
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-6">
        Have a question or suggestion? We'd love to hear from you.
      </p>

      <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
        <input type="text" name="user_name" placeholder="Your Name" required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" />
        <input type="email" name="user_email" placeholder="Your Email" required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" />
        <textarea name="message" rows="5" placeholder="Your Message" required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500" />

        <button type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition duration-300">
          Send Message
        </button>
      </form>

      {isSent && (
        <p className="mt-4 text-green-600 font-medium">
          ✅ Message sent successfully!
        </p>
      )}

    </div>
  );
};


