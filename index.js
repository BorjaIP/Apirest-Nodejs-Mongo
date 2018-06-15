const express = require('express');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db)
  .then(db => {
    console.log('Connect to database')
    app.listen(config.port, () => {
      console.log(`API REST run in http://localhost:${config.port}`);
    })})
  .catch(err => console.error(err));
