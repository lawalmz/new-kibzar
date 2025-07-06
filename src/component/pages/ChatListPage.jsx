import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, onSnapshot, getDoc, doc, or, updateDoc, getDocs } from 'firebase/firestore'; // Import getDocs
import { db, auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import CryptoJS from 'crypto-js'; // Import CryptoJS

const ChatListPage = () => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const recipientCache = new Map();
  const secretKey = 'Kibzar'; // Replace with your secret key

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, 'chats'),
        or(
          where('userId', '==', user.uid),
          where('recipientId', '==', user.uid)
        )
      );

      const unsubscribe = onSnapshot(
        q,
        async (querySnapshot) => {
          const chatMap = new Map();

          await Promise.all(
            querySnapshot.docs.map(async (chatDoc) => {
              const chatData = chatDoc.data();
              const recipientId = chatData.userId === user.uid ? chatData.recipientId : chatData.userId;

              // Skip chats where the recipient is the authenticated user
              if (recipientId === user.uid) {
                return;
              }

              // Generate unique conversation ID
              const uniqueUsers = [chatData.userId, chatData.recipientId].sort();
              const convId = `${uniqueUsers.join('_')}_${chatData.postId}`;

              // Fetch recipient name (cache if possible)
              let recipientName = recipientCache.get(recipientId);
              if (!recipientName) {
                try {
                  const recipientDoc = await getDoc(doc(db, 'users', recipientId));
                  recipientName = recipientDoc.exists() ? recipientDoc.data().name : 'Unknown';
                  recipientCache.set(recipientId, recipientName);
                } catch (error) {
                  console.error('Error fetching recipient name:', error);
                }
              }

              // Fetch listing details
              let listing = null;
              try {
                const postDoc = await getDoc(doc(db, 'posts', chatData.postId));
                listing = postDoc.exists() ? postDoc.data() : null;
              } catch (error) {
                console.error('Error fetching listing details:', error);
              }

              // Decrypt the message
              let decryptedMessage = '';
              try {
                decryptedMessage = CryptoJS.AES.decrypt(chatData.message, secretKey).toString(CryptoJS.enc.Utf8);
              } catch (error) {
                console.error('Error decrypting message:', error);
              }

              const isRead = chatData.isRead || chatData.userId === user.uid;

              // Update or add chat in the map
              const existingChat = chatMap.get(convId);
              if (
                !existingChat || 
                chatData.timestamp.toMillis() > existingChat.timestamp.toMillis()
              ) {
                chatMap.set(convId, {
                  id: chatDoc.id,
                  ...chatData,
                  recipientName, // Store the recipient name
                  listing,
                  conversationId: convId,
                  message: decryptedMessage,
                  timestamp: chatData.timestamp,
                  hasNewReply: !isRead,
                });
              } else if (!isRead) {
                // Update `hasNewReply` if there's a new unread message
                existingChat.hasNewReply = true;
              }
            })
          );

          // Convert chatMap to an array and update state
          setChats(
            Array.from(chatMap.values()).sort(
              (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
            )
          );
        },
        (error) => {
          console.error('Error fetching chats: ', error);
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  const handleChatClick = async (chat) => {
    console.log("Navigating to chat with conversationId:", chat.conversationId);

    // Mark messages in this conversation as read
    try {
      const q = query(
        collection(db, 'chats'),
        where('conversationId', '==', chat.conversationId)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        if (!doc.data().isRead) {
          await updateDoc(doc.ref, { isRead: true });
        }
      });
    } catch (error) {
      console.error('Error updating read status:', error);
    }

    navigate(`/chat/${chat.postId}`, {
      state: { listing: chat.listing, recipientId: chat.recipientId, conversationId: chat.conversationId },
    });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Chats</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.conversationId}
              className="mb-2 p-2 rounded-lg bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleChatClick(chat)}
            >
              {/* Circle with the first letter of the recipient's name */}
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full text-red-600 font-bold mr-4">
                {chat.recipientName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold">{chat.recipientName}</p>
                {chat.listing ? (
                  <>
                    <p className="text-sm font-bold">{chat.listing.title}</p>
                    <p className="text-sm text-gray-600">{chat.message}</p>
                    <p className="text-xs text-gray-500">{formatTimestamp(chat.timestamp.toMillis())}</p>
                  </>
                ) : (
                  <p className="text-sm text-gray-600">No listing details available</p>
                )}
                {chat.hasNewReply && (
                  <span className="text-xs text-red-500 font-semibold">
                    New Reply
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No chats available</p>
        )}
      </div>
    </div>
  );
};

export default ChatListPage;
