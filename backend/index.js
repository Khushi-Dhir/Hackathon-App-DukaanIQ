const expiryRoutes = require("./routes/expiryRoutes");
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db');
require('dotenv').config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/batches', require('./routes/batchRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

app.use("/api/expiry", expiryRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
