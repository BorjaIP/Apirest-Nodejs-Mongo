const mongoose = require('mongoose');
const User = require('../models/user');
const auth = require('../services/authentication');

function signUp (req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName
  });

  user.avatar = user.gravatar();

  user.save((err) => {
    if (err) res.status(500).send({ message: `Error creating user: ${err}` })

    return res.status(200).send({ token: auth.createToken(user) });
  });
}

function signIn () {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: 'User doesn\'t exists' });

    req.user = user;
    res.status(200).send({
      message: 'You are logged',
      token: auth.createToken(user)
    });
  })
}

module.exports = { signUp, signIn };
