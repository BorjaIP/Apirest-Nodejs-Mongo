var express = require('express');
var mongoose = require('mongoose');
var Product = require ('./models/product');

var app = express();
var port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/product', (req, res) => {

  Product.find({}, (err, products) => {
    if (err) res.status(500).send({ message: `Error: ${err}` })

    if (!products) res.status(404).send({ message: `Error product not found: ${err}` })

    res.status(200).send({ products });
  });
})

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ message: `Error: ${err}` })

    if (!product) res.status(404).send({ message: `Error product not found: ${err}` })

    res.status(200).send({ product })
  });
});

app.post('/api/product', (req, res) => {

  let product = new Product();

  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.descrption = req.body.descrption;

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error data base: ${err}` })

    res.status(200).send({ product: productStored })
  })
});

app.put('/api/product/:productId', (req, res) => {

  let productId = req.params.productId
  let productUpdate = req.body

  Product.findByIdAndUpdate(productId, productUpdate, (err, productStored) => {
    if (err) res.status(500).send({ message: `Error data base: ${err}` })

    res.status(200).send({ product: productStored })
  })
});

app.delete('/api/product/:productId', (req, res) => {

  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ message: `Error: ${err}` })

    if (!product) res.status(404).send({message: `Error product not found: ${err}`})

    product.remove(err => {
      if (err) res.status(500).send({ message: `Error: ${err}` })

      res.status(200).send({ message: 'Product has been deleted' })
    })
  });
});

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) throw console.error(err);
  console.log('Connect to data base');

  app.listen(port, () => {
    console.log(`API REST run in http://localhost:${port}`);
  });
})
