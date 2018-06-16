const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config')

function createToken (user) {
  // In this case, I use this user._id which is the one created by MongoDB
  // iat and exp indicate when the token was created and when will over
  const payload = { 
    sub: user._id,
    iat: moment().unix(),  // Request the token when we create it in format unix
    exp: moment().add(14, 'days').unix()  // Add 14 days expire
  };

  // Encode (default the algorithm to encode is HS256)
  return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken (token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      // Decode
      const payload = jwt.decode(token, config.SECRET_TOKEN); 
      // Check if token has been deprecated
      if(payload.exp <= moment().unix()) {
        reject({
          status: 401,
          message: 'Token has expired'
        }) 
      }

      resolve(payload.sub);
    } 
    catch (err) {
      reject({
        status: 500,
        message: 'Invalid token'
      })
    }
  });

  return decoded;
}

module.exports = {createToken, decodeToken};
