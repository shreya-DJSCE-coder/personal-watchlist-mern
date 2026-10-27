const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/watchlist_db';
    // Set a short server selection timeout (2.5 seconds) so it doesn't hang indefinitely if local MongoDB isn't running
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2500
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️ Local MongoDB not detected (${error.message}).`);
    console.warn(`💡 Running in In-Memory Mode with dummy data so you can test the application right away in your browser!`);
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
