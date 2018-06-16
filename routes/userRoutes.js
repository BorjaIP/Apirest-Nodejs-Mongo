const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');
// When user try to access, the middleware verify that authentication
const auth = require('../middlewares/auth');

router.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'You have access' });
});
router.post('/signup', userCtrl.signUp);
router.post('/signin', userCtrl.signIn);

module.exports = router;
