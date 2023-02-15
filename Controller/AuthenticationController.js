const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const UserSchema = mongoose.model('user')

module.exports.login = (request, response, next) => {
  if (
    request.body.email == 'adminD@gmail.com' &&
    request.body.password == '123'
  ) {
    let token = jwt.sign(
      {
        role: 'admin',
        _id: 1,
        email: 'adminD@gmail.com',
      },
      process.env.SECRETKEY,
      { expiresIn: '1h' },
    )
    response.status(200).json({ data: 'Login As Admin', token })
    console.log(token)

  } else {
    UserSchema.findOne({
      email: request.body.email,
      password: request.body.password,
    })
      .then((data) => {
        if (data == null) {
          let error = new Error('Not Authenticated')
          error.status = 401
          throw error
        } else {
          let token = jwt.sign(
            {
              role: 'user',
              _id: data._id,
              email: data.email,
            },
            process.env.SECRETKEY,
            { expiresIn: '1h' },
          )
          response.status(200).json({ data: 'Login As User', token })
          console.log(token)
        }
      })
      .catch((error) => {
        error = new Error('Not Authenticated')
        error.status = 401
        next(error)
      })
  }
}
