const dotenv = require("dotenv");
dotenv.config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
const URI = process.env.MONGO_URI;

// MongoDB connection
  const connection = async ()=>{
    try {
        await mongoose.connect(URI)
        console.log("database connected")
        
    } catch (error) {
        console.log(error)
    }
  }

  connection()
// Routes
const personRoutes = require('./routes/person');
app.use('/person', personRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
