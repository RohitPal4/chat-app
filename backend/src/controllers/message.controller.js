import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io, getReceiverSocketId } from "../lib/socket.js";
export const getUsersForSiderbar = async (req, res) => {
    try {
        const loginUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loginUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
              ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error fetching messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
        
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        if(image){
            // base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();
        
        const receiverSocketId = getReceiverSocketId(receiverId); // Get the socket ID for the receiver
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage); // Emit the new message to the receiver
        }
        res.status(201).json(newMessage);

    } catch (error) {
        
        console.log("Error sending message:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}