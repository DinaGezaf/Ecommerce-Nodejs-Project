const { body } = require('express-validator')

module.exports.addUserValidation = [
  body('username')
    .isAlpha()
    .withMessage('Username should be String')
    .isLength({ min: 3, max: 15 })
    .withMessage('Username should be less than 15'),
  body('email').isEmail().withMessage('Invalid Email'),
  body('password')
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 3,
      minSymbols: 1,
    })
    .withMessage('Invalid Password')
    .isLength({ min: 10 })
    .withMessage('User password should be less than 10'),
  body('img').optional().isString().withMessage('Invalid Image'),
]

module.exports.updateUserValidation = [
  body('username')
    .isAlpha()
    .withMessage('Username should be String')
    .isLength({ min: 3, max: 15 })
    .withMessage('Username should be less than 15'),
  body('email').isEmail().withMessage('Invalid Email'),
  body('password')
    .isStrongPassword({
      minLength: 10,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 3,
      minSymbols: 1,
    })
    .withMessage('Invalid Password')
    .isLength({ min: 10 })
    .withMessage('User password should be less than 10'),
  body('img').optional().isString().withMessage('Invalid Image'),
]
module.exports.deleteUserValidation = [
  body('_id').isMongoId().withMessage('User Id should be Entered'),
]
