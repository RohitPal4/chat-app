import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const { selectedUser, subscribeToNewMessages, unsubscribeFromNewMessages } = useChatStore();

  useEffect(() => {
      // Subscribe to messages when component mounts
      const cleanup = subscribeToNewMessages();
      
      // Cleanup on unmount
      return () => {
          cleanup(); // Use the returned cleanup function
          unsubscribeFromNewMessages(); // Additional cleanup
      };
  }, [subscribeToNewMessages, unsubscribeFromNewMessages]);
  

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage