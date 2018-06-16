const express = require('express');
const app = express();
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/product', productRouter);
app.use('/api', userRouter);

module.exports = app
