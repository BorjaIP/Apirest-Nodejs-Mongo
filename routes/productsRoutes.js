const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/productsController');

router.get('/product', productCtrl.getProducts);
router.get('/product/:productId', productCtrl.getProduct);
router.post('/product', productCtrl.addProduct);
router.put('/product/:productId', productCtrl.updateProduct);
router.delete('/product/:productId', productCtrl.deleteProduct);

module.exports = router;
