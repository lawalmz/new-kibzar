import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-20">
            <div className="bg-white shadow-lg rounded-lg p-8 md:p-16">
                <button 
                    onClick={() => navigate(-1)} 
                    className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                    Back
                </button>
                <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-gray-800">Kibzar Privacy Policy</h1>
                <p className="text-sm md:text-base text-gray-500 mb-6"><strong>Last Updated: July 4, 2025</strong></p>

                <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                    Welcome to Kibzar (referred to as “we”, “us”, or “our”), a marketplace app that provides a platform for users to post, browse, and interact regarding items for sale. This Privacy Policy explains how we collect, use, protect, and manage your personal data when you use our app and the responsibilities you assume when using our platform.
                </p>
                <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                    We take privacy seriously and are committed to safeguarding your personal information. Please read this policy carefully to understand how your data is handled and your rights concerning it.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We collect only the data necessary to provide, maintain, and improve the services offered through Kibzar. This includes information that you provide directly and limited information accessed through permissions you grant within the app.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    When you create an account, you may provide your name and email address. This information is used to identify you, communicate with you, and allow access to your account.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    When you post an item for sale, you provide content such as the title, description, price, contact number, preferred contact method, and photos of the item. We store and display this information as part of your listings. You may also use features like favorites to save listings, and we store this activity to improve your experience.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    If you send messages to other users within the app, we store the content of those conversations to enable chat functionality.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    You may also customize your experience by adjusting app settings like notifications. These settings are saved and tied to your account for as long as your account remains active.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    When you use certain features, the app may request permission to access specific device functions. For example, we may request access to your device’s media when uploading images to your listings. We may also request permission to send push notifications or to allow you to make direct calls to other users from within the app. All such permissions are optional and can be changed at any time through your device settings.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    To respect your privacy, Kibzar does not collect your IP address, device type, browser, operating system, or use tracking technologies such as cookies or advertising IDs.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We use the information you provide to operate and improve the Kibzar platform. This includes creating and managing your account, allowing you to post and browse listings, and helping you connect with other users based on your preferences and selected locations.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    Your information enables us to facilitate communication between buyers and sellers through in-app messaging. If you choose to include contact details, we allow optional communication through phone or WhatsApp. Push notifications may be sent to inform you about new messages, listing activity, or important app updates, depending on your notification settings.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We may also use general usage data to enhance app performance, identify trends, and improve user experience. This includes maintaining platform safety through features such as user blocking and reporting, offering customer support, and fulfilling legal requirements as outlined in our terms of service.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities and Content Guidelines</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    As a Kibzar user, you are responsible for ensuring that the content you post complies with our platform’s standards. We aim to provide a safe, respectful, and trustworthy environment for all users. Content that violates legal regulations, misleads others, or creates harm is strictly prohibited. This includes listings involving illegal products or services, content that is obscene or offensive, and any false or misleading claims about an item’s condition or availability. Fraudulent or unethical behavior is also not permitted.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We reserve the right to remove any content that does not align with these guidelines. This may include deleting individual listings, suspending accounts, or permanently banning users at our sole discretion. These measures help maintain the integrity and safety of the Kibzar platform.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">4. Data Retention and Storage</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We retain your personal data only for as long as necessary to operate the Kibzar platform, provide a consistent user experience, and comply with legal and regulatory obligations. Information associated with your account and listings remains available until you choose to delete it. Chat messages are stored as long as both users maintain access to the conversation.
                </p>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    You have control over your data and can delete your listings or account at any time through the app. When your account is deleted, associated personal data and stored preferences are also removed from our system.
                </p>

                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">5. Changes to This Privacy Policy</h2>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                    We may update this Privacy Policy periodically to reflect changes in our services, legal requirements, or data handling practices. When material changes are made, we will inform you by displaying a notice within the app, sending an email, or providing other appropriate in-app communication. The “Last Updated” date at the top of this policy will always indicate the most recent revision.
                </p>
            </div>
        </div>
    );
};


