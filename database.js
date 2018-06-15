const mongoose = require('mongoose');
const URI = 'mongodb://localhost/shop';

mongoose.connect(URI)
    .then(db => console.log('Connect to database'));
    .catch(err => console.error(err));

module.exports = mongoose;
