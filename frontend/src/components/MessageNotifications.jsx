import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const MessageNotifications = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { unreadMessages, users, clearUnread, setSelectedUser } = useChatStore();
  
  // Calculate total unread messages
  const totalUnread = Object.values(unreadMessages).reduce((sum, count) => sum + count, 0);
  
  // Get users with unread messages
  const usersWithUnread = users.filter(user => unreadMessages[user._id] > 0);

  const handleNotificationClick = (user) => {
    clearUnread(user._id);
    setSelectedUser(user); // This will trigger your existing chat system
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 rounded-full hover:bg-gray-100 relative"
      >
        <MessageSquare className="w-5 h-5" />
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {totalUnread > 9 ? "9+" : totalUnread}
          </span>
        )}
      </button>
      
      {/* Notification Dropdown */}
      {showDropdown && usersWithUnread.length > 0 && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 text-sm font-medium border-b border-gray-100">
            Unread Messages ({totalUnread})
          </div>
          {usersWithUnread.map((user) => (
            <div 
              key={user._id}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleNotificationClick(user)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img 
                    src={user.profilepic || "/avatar.png"} 
                    alt={user.fullname}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{user.fullname}</span>
                </div>
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadMessages[user._id]}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageNotifications;