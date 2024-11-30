// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const betRoutes = require('./routes/betRoutes');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Use the betRoutes
app.use('/api', betRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
