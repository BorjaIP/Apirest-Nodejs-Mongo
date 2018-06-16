const auth = require('../services/authentication');

function isAuth (req, res, next) {
  if (!req.headers.authorization){
    return res.status(403).send({ message: 'You don\'t have authorization, only admin user' });
  }

  // Request the token from the header
  // First you have the 'bearer' and then one space between the token
  const token = req.headers.authorization.split(" ")[1];

  auth.decodeToken(token)
    .then(response => {
      req.user = response,
        next()
    })
    .catch(response => {
      res.status(response.status)
    })
}

module.exports = isAuth;
