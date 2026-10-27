const mongoose = require('mongoose');

const DEFAULT_URI = 'mongodb+srv://shreyayadav9619573842_db_user:r6hE7x9VfuPPydgC@cluster0.4mm8slo.mongodb.net/watchlist?retryWrites=true&w=majority';

// Global cache for serverless environments (prevents connection leaks across lambda invocations)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || DEFAULT_URI;

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000
    };

    cached.promise = mongoose
      .connect(mongoUri, opts)
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB Connected to: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      })
      .catch((err) => {
        console.error(`❌ MongoDB Connection Error: ${err.message}`);
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
};

const getIsConnected = () => mongoose.connection.readyState === 1;

module.exports = { connectDB, getIsConnected };
