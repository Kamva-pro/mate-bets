// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const betRoutes = require('./routes/betRoutes'); // Import the routes

dotenv.config();

const app = express();
app.use(express.json()); // To parse JSON request bodies

// Allow requests from your frontend
app.use(cors({
    origin: 'http://127.0.0.1:5173', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
}));

// Use the routes defined in the 'betRoutes.js'
app.use('/api', betRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
