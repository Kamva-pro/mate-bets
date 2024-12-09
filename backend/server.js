// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const betRoutes = require('./routes/betRoutes');
const signupRoutes = require('./routes/signupRoutes');
const signinRoutes = require('./routes/signinRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow both origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers

}));

// Use the Routes
app.use('/api', betRoutes);
app.use('/api', signupRoutes);
app.use('/api', signinRoutes);
app.use('/api', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
