require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');
const enquiryRoutes = require('./routes/enquiries');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Root Endpoint
app.get('/', (req, res) => {
    res.json({ message: "API is working" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});