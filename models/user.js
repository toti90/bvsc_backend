const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
  email: {type: String, unique: true },
  password: {type: String, required: true},
  refreshToken: {type: String},
  resetPasswordToken: {type: String},
  emailConfirmed: {type: Boolean}
});

module.exports = mongoose.model('User', userSchema);