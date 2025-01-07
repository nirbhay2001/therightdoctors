const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:4200', 'https://therightdoctors-assignment.vercel.app'],
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// MongoDB connection
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); 
  }
};

connectDB();

// Routes
const personRoutes = require('./routes/person');
app.use('/person', personRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
