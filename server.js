// Load environment variables
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For front-end integration

// --- Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// --- Middleware ---
app.use(cors());
app.use(express.json()); // Allows handling JSON data from client requests

// --- Database Connection Function ---
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from .env
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully!');

    // Start the server only if the database connection is successful
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
      console.log(`Access the API at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    // Exit process with failure
    process.exit(1); 
  }
};

// --- Main execution ---
connectDB();