const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(express.json());

// Sample route
app.get('/', (req, res) => res.send('Server is running'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
