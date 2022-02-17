const express = require('express');
const app = express();
const database = require('./database');
const productRoutes = require('./routes/product');

database.connect();

app.use(express.json());
app.use('/products', productRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));