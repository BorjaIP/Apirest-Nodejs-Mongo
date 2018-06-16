const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/productController');

const auth = require('../middlewares/auth');

router.get('/product', productCtrl.getProducts);
router.get('/product/:productId', productCtrl.getProduct);
router.post('/product', productCtrl.addProduct);
router.put('/product/:productId', productCtrl.updateProduct);
router.delete('/product/:productId', productCtrl.deleteProduct);
router.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'You have access' });
});

module.exports = router;
