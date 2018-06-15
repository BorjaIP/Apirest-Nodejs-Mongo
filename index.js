const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;

const router = require('./routes/productsRoutes');

const URI = 'mongodb://localhost/shop';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/product', router);

mongoose.connect(URI)
  .then(db => {
    console.log('Connect to database')
    app.listen(port, () => {
      console.log(`API REST run in http://localhost:${port}`);
    })})
  .catch(err => console.error(err));
