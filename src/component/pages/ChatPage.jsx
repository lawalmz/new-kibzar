import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, doc, getDoc, updateDoc, orderBy } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import CryptoJS from 'crypto-js'; // Import CryptoJS

const ChatPage = () => {
  const { postId } = useParams();
  const location = useLocation();
  const listing = location.state?.listing;
  const initialRecipientId = location.state?.recipientId; // Get recipientId from route state
  const initialConversationId = location.state?.conversationId; // Get conversationId from route state
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientId, setRecipientId] = useState(initialRecipientId);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [conversationId, setConversationId] = useState(initialConversationId || ''); // Initialize with initialConversationId
  const messagesEndRef = useRef(null);

  const secretKey = 'Kibzar'; // Replace with your secret key

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRecipientDetails = async () => {
      try {
        const recipientDoc = await getDoc(doc(db, 'users', recipientId));
        if (recipientDoc.exists()) {
          setRecipientEmail(recipientDoc.data().email);
          setRecipientName(recipientDoc.data().name); // Set recipient name
          console.log("Fetched recipient email:", recipientDoc.data().email); // Add logging
        }
      } catch (error) {
        console.error("Error fetching recipient details: ", error);
      }
    };

    if (recipientId) {
      fetchRecipientDetails();
    }
  }, [recipientId]);

  useEffect(() => {
    if (user) {
      const fetchSenderEmail = async () => {
        try {
          const senderDoc = await getDoc(doc(db, 'users', user.uid));
          if (senderDoc.exists()) {
            setSenderEmail(senderDoc.data().email);
            setSenderName(senderDoc.data().name); // Set sender name
          }
        } catch (error) {
          console.error("Error fetching sender details: ", error);
        }
      };
      fetchSenderEmail();
    }
  }, [user]);

  useEffect(() => {
    console.log("Initial recipientId:", initialRecipientId); // Add logging
    if (user && recipientId && !initialConversationId) { // Only generate conversationId if not provided
      const uniqueUsers = [user.uid, recipientId].sort().filter((v, i, a) => a.indexOf(v) === i); // Ensure unique user IDs
      const convId = [...uniqueUsers, postId].join('_'); // Generate a unique conversationId
      setConversationId(convId);
      console.log("Generated conversationId:", convId); // Add logging
    } else if (initialConversationId) {
      console.log("Using provided conversationId:", initialConversationId); // Add logging
    }
  }, [postId, user, recipientId, initialConversationId]);

  useEffect(() => {
    if (user && recipientId && conversationId) {
      console.log("Setting up onSnapshot for conversationId:", conversationId); // Add logging
      const q = query(
        collection(db, 'chats'),
        where('conversationId', '==', conversationId),
        orderBy('timestamp', 'asc') // Order messages by timestamp
      );
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        console.log("onSnapshot query executed for conversationId:", conversationId); // Add logging
        const msgs = await Promise.all(querySnapshot.docs.map(async (chatDoc) => {
          const data = chatDoc.data();
          console.log("Fetched message:", data); // Add detailed logging here
          let decryptedMessage = '';
          try {
            decryptedMessage = CryptoJS.AES.decrypt(data.message, secretKey).toString(CryptoJS.enc.Utf8); // Decrypt message
          } catch (error) {
            console.error("Error decrypting message:", error);
          }
          const senderDoc = await getDoc(doc(db, 'users', data.userId));
          const senderEmail = senderDoc.exists() ? senderDoc.data().email : 'Unknown';
          return { ...data, message: decryptedMessage, senderEmail };
        }));
        console.log("Total fetched messages:", msgs.length); // Log the total number of fetched messages
        setMessages(msgs);
        scrollToBottom(); // Scroll to bottom when messages are updated
      });
      return () => unsubscribe();
    }
  }, [user, recipientId, conversationId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to send a message.');
      return;
    }
    if (newMessage.trim() === '') return;

    let encryptedMessage = '';
    try {
      encryptedMessage = CryptoJS.AES.encrypt(newMessage, secretKey).toString(); // Encrypt message
    } catch (error) {
      console.error("Error encrypting message:", error);
      return;
    }

    const messageData = {
      postId,
      userId: user.uid,
      recipientId,
      conversationId,
      message: encryptedMessage,
      timestamp: serverTimestamp(),
    };

    console.log("Sending message:", messageData); // Add logging

    // Clear the text input immediately
    setNewMessage('');

    try {
      await addDoc(collection(db, 'chats'), messageData);
      console.log("Message sent successfully:", messageData); // Add logging

      // Check if the recipient document exists before updating
      const recipientDocRef = doc(db, 'users', recipientId);
      const recipientDoc = await getDoc(recipientDocRef);
      if (recipientDoc.exists()) {
        await updateDoc(recipientDocRef, {
          hasNewMessage: true,
        });
      } else {
        console.warn("Recipient document does not exist.");
      }

      scrollToBottom(); // Scroll to bottom when a new message is sent

    } catch (error) {
      console.error("Error sending message: ", error);
      
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col h-screen">
      <h1 className="text-2xl font-semibold mb-4">Chat</h1>
      {listing ? (
        <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-start">
          {listing.imageUrl && listing.imageUrl.length > 0 && (
            <img
              src={listing.imageUrl[0]} // Display the first image
              alt={listing.title}
              className="w-48 h-48 object-cover rounded-lg mr-4" // Adjust size and add spacing
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">{listing.title}</h2>
            <p className="text-gray-600">{listing.description}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No listing details available</p>
      )}

      <div className="flex-grow overflow-y-auto bg-white p-4 rounded-lg shadow-md mb-4">
        <p className="text-sm text-gray-600 mb-4">Chatting with: {recipientName || recipientEmail}</p>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded-lg flex ${msg.userId === user.uid ? 'justify-end bg-blue-100' : 'justify-start bg-gray-100'
                }`}
            >
              <div className="max-w-sm">
                <p className="text-sm mb-2">{msg.message}</p>
                <p className="text-xs text-gray-500">{formatTimestamp(msg.timestamp)}</p> {/* Display message timestamp */}
              </div>

              {msg.imageUrl && (
                <div className="ml-4 text-right flex flex-col items-end">
                  <img
                    src={msg.imageUrl}
                    alt="Sent image"
                    className="w-24 h-24 object-cover rounded-lg mb-2" // Small image
                  />
                  {msg.title && <p className="text-xs text-gray-700">{msg.title}</p>} {/* Title under the image */}
                  {msg.description && <p className="text-xs text-gray-500">{msg.description}</p>} {/* Description */}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No messages available</p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
