import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import {app,  server, io } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001; // Fallback port
const __dirname = path.resolve(); // Get the current directory

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

// Connect to DB first, then start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });