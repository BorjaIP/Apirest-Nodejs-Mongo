const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
  name: String,
  picture: String,
  price: { type: Number, default: 0 },
  category: { type: String, enum: ['computers', 'phones', 'accesories'] },
  description: String
});

/**
 * Example product
 * 
 * name:MacBook Air
 * picture:macbook_air.png
 * price:2500
 * category:computers
 * description:Best laptop ever
*/

module.exports = mongoose.model('Product', ProductSchema);
