const mongoose = require("mongoose");

const validatePassword = function (password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  return regex.test(password)
}

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return regex.test(email)
}
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: [validateEmail, 'Please enter a valid Email'],
  },
  password: {
    type: String,
    required: true,
    validate: [validatePassword, 'Please enter a valid password'],
  },
  img: { type: String },
})
mongoose.model('user', UserSchema);
