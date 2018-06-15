const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/productsController');

router.get('/', productCtrl.getProducts);

router.get('/:productId', productCtrl.getProduct);

router.post('', productCtrl.addProduct);

router.put('/:productId', productCtrl.updateProduct);

router.delete('/:productId', productCtrl.deleteProduct);

module.exports = router;
