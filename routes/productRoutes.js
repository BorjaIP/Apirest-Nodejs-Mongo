const express = require('express');
const router = express.Router();

const productCtrl = require('../controllers/productController');
// When user try to access, the middleware verify that authentication
const auth = require('../middlewares/auth');

router.get('/', auth,  productCtrl.getProducts);
router.get('/:productId', productCtrl.getProduct);
router.post('/', auth, productCtrl.addProduct);
router.put('/:productId', auth, productCtrl.updateProduct);
router.delete('/:productId', auth, productCtrl.deleteProduct);

module.exports = router;
