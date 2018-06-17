const express = require('express');
const app = express();
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine setup
app.set('view engine', 'pug');

app.use('/api/product', productRouter);
app.use('/api', userRouter);

app.get('/', (req, res) => {
  res.render('login');
});

module.exports = app
