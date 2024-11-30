const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const betRoutes = require('./routes/betRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Use the bet routes
app.use('/api', betRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
