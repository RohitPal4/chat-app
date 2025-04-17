import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) =>({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    unreadMessages: {},

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data});
            
        } catch (error) {
            toast.error(error.response.data.message || "Failed to fetch users"); 
        }finally {
            set({ isUserLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data});
            //meessage notification
            set((state) => ({
                unreadMessages: {
                    ...state.unreadMessages,
                    [userId]: 0 // Reset unread count for this user
                }
            }));
        } catch (error) {
            toast.error(error.response.data.message || "Failed to fetch messages"); 
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data]});
        } catch (error) {
            toast.error(error.response.data.message);
        }

    },

    subscribeToNewMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
    
        const messageHandler = (newMessage) => {
            const currentState = get();
            const { selectedUser, users } = currentState;
            
            // Always update unread count unless message is from currently selected user
            if (!selectedUser || newMessage.senderId !== selectedUser._id) {
                set({
                    unreadMessages: {
                        ...currentState.unreadMessages,
                        [newMessage.senderId]: (currentState.unreadMessages[newMessage.senderId] || 0) + 1
                    }
                });
    
                // Show notification
                const sender = users.find(u => u._id === newMessage.senderId);
                if (sender) {
                    toast(`${sender.fullname} sent you a message`, {
                        icon: '💬',
                        duration: 3000
                    });
                }
            }
    
            // If message is from selected user, add to messages
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                set({ messages: [...currentState.messages, newMessage] });
            }
        };
    
        socket.on("newMessage", messageHandler);
    
        return () => {
            socket.off("newMessage", messageHandler);
        };
    },
    unsubscribeFromNewMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    


    // optimize this one later
    setSelectedUser: (selectedUser) =>{
        if (selectedUser) {
            set((state) => ({
                selectedUser,
                unreadMessages: {
                    ...state.unreadMessages,
                    [selectedUser._id]: 0
                }
            }));
        } else {
            set({ selectedUser });
        }
    },

    // Add this new method if you need to manually clear notifications
    clearUnread: (userId) => {
        set((state) => ({
            unreadMessages: {
                ...state.unreadMessages,
                [userId]: 0
            }
        }));
    },
}))