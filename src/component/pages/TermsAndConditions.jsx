import React from 'react';
import { useNavigate } from 'react-router-dom';



export default function TermsAndCondition() {
    const navigate = useNavigate();
   
    return (
        <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-20">
         <button 
                    onClick={() => navigate(-1)} 
                    className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Back
                </button>
            <div className="bg-white shadow-lg rounded-lg p-8 md:p-16">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-gray-800">Kibzar Terms & Conditions</h1>
                <p className="text-sm md:text-base text-gray-500 mb-6"><strong>Last Updated: July 4, 2025</strong></p>
                <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                    Welcome to Kibzar. By accessing or using the platform, you confirm your agreement to these Terms & Conditions. If you do not agree, you must stop using the app immediately. These Terms govern your use of our services and your interaction with other users through the platform.
                </p>
                
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">1. Use of the Platform</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    Kibzar is an online marketplace that enables users to post, browse, and communicate about items for sale. You may use the platform only if you are at least 18 years old and capable of forming a binding legal agreement. When registering, you agree to provide accurate information and to keep your account secure. You are responsible for all activities conducted through your account. Kibzar reserves the right to suspend or remove accounts that violate these Terms or our policies.
                </p>
                
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">2. Listings and User Responsibilities</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    You are solely responsible for all content you post on Kibzar, including item listings, images, descriptions, contact details, and messages. You must not post anything illegal, misleading, fraudulent, offensive, or infringing on third-party rights. All transactions and communication are conducted directly between users, and Kibzar does not verify, endorse, or guarantee any listings.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We may monitor content to enforce platform standards, and we reserve the right to remove or restrict content or accounts at our discretion. Users are expected to act in good faith and comply with applicable laws in all activities conducted through the platform.
                </p>
                
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">3. Communication and Interaction</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    Kibzar provides tools such as in-app chat and optional contact methods like WhatsApp or phone numbers to facilitate communication between buyers and sellers. You agree to use these features responsibly and only in connection with legitimate listings. We may monitor messages to maintain safety and prevent abuse but do not guarantee the accuracy, completeness, or behavior of users during conversations.
                </p>
                
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">4. Paid Services and Featured Listings</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We may offer optional paid features such as listing promotion or visibility boosts. All fees for paid services are non-refundable. While these services are designed to enhance visibility, they do not guarantee any sales, engagement, or outcomes.
                </p>
                
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">5. Content Rights and Platform License</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    By uploading content to Kibzar, you grant us a non-exclusive, worldwide, royalty-free license to use, store, modify, display, and distribute it for platform-related purposes. You retain ownership of your content but acknowledge that it may be publicly visible and shared within the platform. You are responsible for backing up your data and for the legality of your uploaded material.
                </p>
                
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">6. Limitation of Liability</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    Kibzar provides the platform “as is” without any warranties, express or implied. We are not responsible for user-generated content, transaction outcomes, communication between users, or any damages resulting from use or misuse of the app.
                </p>
                
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">7. Termination, Updates, and Changes</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We may suspend or terminate your access to Kibzar at any time for violations of these Terms or other reasons at our discretion. We may also modify these Terms as needed to reflect changes in the platform, law, or business needs. When changes are made, we will update the “last updated” date and notify users through the app or email when appropriate.
                </p>
            </div>
        </div>
    );
};

