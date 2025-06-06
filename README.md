# Chatty - Real-Time Chat Application

A modern, real-time chat application built with React, Socket.IO, and Node.js. Features include instant messaging, image sharing, online status tracking, and message notifications.

## 🚀 Features

- **Real-time messaging** - Instant message delivery using Socket.IO
- **Image sharing** - Send and receive images in chat
- **Online status** - See who's currently online
- **Message notifications** - Get notified of unread messages
- **Responsive design** - Works seamlessly on desktop and mobile
- **User authentication** - Secure login and registration
- **Contact list** - Browse and chat with all users
- **Message history** - Persistent chat history

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Lucide React (icons)
- Socket.IO Client
- React Hot Toast (notifications)
- Zustand (state management)

**Backend:**
- Node.js
- Express.js
- Socket.IO
- MongoDB
- JWT Authentication
- Cloudinary (image storage)
- bcryptjs (password hashing)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account (for image uploads)

### Clone the repository
```bash
git clone https://github.com/yourusername/chatty-app.git
cd chatty-app
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

## 🚀 Usage

1. Register a new account or login with existing credentials
2. Browse the contact list to see all users
3. Click on a user to start chatting
4. Send text messages or share images
5. See real-time online status of other users
6. Get notifications for unread messages

## 📱 Screenshots

### Chat Interface
- Clean, modern design with message bubbles
- Real-time message delivery
- Image sharing capabilities
- Online/offline status indicators

### Features Showcase
- Responsive sidebar with contact list
- Message notifications dropdown
- Skeleton loading states
- Welcome screen for new users

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status

### Messages
- `GET /api/messages/:userId` - Get chat history with specific user
- `POST /api/messages/send/:userId` - Send message to user

### Users
- `GET /api/users` - Get all users for contact list

## 🌐 Socket Events

### Client Events
- `join_room` - Join user-specific room
- `send_message` - Send new message
- `disconnect` - Handle user disconnect

### Server Events
- `new_message` - Receive new message
- `user_online` - User came online
- `user_offline` - User went offline

## 🎨 Component Structure

```
src/
├── components/
│   ├── ChatContainer.jsx       # Main chat interface
│   ├── ChatHeader.jsx          # Chat header with user info
│   ├── MessageInput.jsx        # Message input with image upload
│   ├── MessageNotifications.jsx # Notification dropdown
│   ├── NoChatSelected.jsx      # Welcome screen
│   └── skeletons/
│       ├── MessageSkeleton.jsx # Loading skeleton for messages
│       └── SidebarSkeleton.jsx # Loading skeleton for sidebar
├── store/
│   ├── useAuthStore.js         # Authentication state
│   └── useChatStore.js         # Chat and messaging state
└── lib/
    └── utils.js                # Utility functions
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Input validation and sanitization
- Secure image upload to Cloudinary
- Protected API routes

## 🌟 Performance Optimizations

- Lazy loading of chat messages
- Optimized image compression
- Efficient socket connection management
- Skeleton loading states for better UX
- Responsive design for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Socket.IO](https://socket.io/) for real-time communication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Cloudinary](https://cloudinary.com/) for image management

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact [your-email@example.com].

---

⭐ **Star this repository if you found it helpful!**
