const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Library bcrypt is a password hashing function
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Library of crypto standards
const CryptoJS = require("crypto-js");

const UserSchema = new Schema ({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  password: { type: String, select: false },
  signUpDate: { type: Date, dafault: Date.now() },
  lastLogin: Date
});

/**
 * Example user
 *
 * email:cool@email.com
 * displayName:Borja
 * password:pass
 *
 */

// Function for encrypt the password before save
UserSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) return next()

  // Generate a salt (random data)
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next()
    // Generate the hash
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in DB
      if (err) return next()
      user.password = hash
      next()
    });
  });
});

// Get the avatar from gravatar
UserSchema.methods.gravatar = function () {
  if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

  // Create a hash in md5 for url in gravatar
  let hash = CryptoJS.MD5(this.email);
  let md5 = hash.toString(CryptoJS.enc.Hex);

  return `htttp://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

module.exports = mongoose.model('User', UserSchema);
