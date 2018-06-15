const Product = require ('../models/product');

function getProducts (req, res) {
  Product.find({}, (err, products) => {
    if (err) res.status(500).send({ message: `Error: ${err}` });

    if (!products) res.status(404).send({ message: `Error product not found: ${err}` });

    res.status(200).send({ products });
  });
}

function getProduct (req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ message: `Error: ${err}` });

    if (!product) res.status(404).send({ message: `Error product not found: ${err}` });

    res.status(200).send({ product });
  });
}

function addProduct (req, res) {
  let product = new Product();

  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.descrption = req.body.descrption;

  product.save((err, productStored) => {
    if (err) res.status(500).send({ message: `Error data base: ${err}` });

    res.status(200).send({ product: productStored });
  });
}

function updateProduct (req, res) {
  let productId = req.params.productId;
  let productUpdate = req.body;

  Product.findByIdAndUpdate(productId, productUpdate, (err, productStored) => {
    if (err) res.status(500).send({ message: `Error data base: ${err}` });

    res.status(200).send({ product: productStored });
  });
}

function deleteProduct (req, res) {
  let productId = req.params.productId;

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({ message: `Error: ${err}` });

    if (!product) res.status(404).send({message: `Error product not found: ${err}`});

    product.remove(err => {
      if (err) res.status(500).send({ message: `Error: ${err}` });

      res.status(200).send({ message: 'Product has been deleted' });
    });
  });
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
}
