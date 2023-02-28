const express = require('express')
const controller = require('./../Controller/userController')
const {
  addUserValidation,
  updateUserValidation,
  deleteUserValidation,
} = require('./../Core/Validation/UserValidation')
const checkValidation = require('./../Core/Validation/CheckValidation')
const authorizationMW = require('./../Core/Authorization')
const UserRoute = express.Router()

UserRoute.route("/users")
  .get(authorizationMW.checkAdmin, controller.getAllUsers)
  .post(
    authorizationMW.checkAdmin,
    addUserValidation,
    checkValidation,
    controller.addUser
  )
  UserRoute.patch(
    "/users/:id",
    authorizationMW.checkAdminAndUser,
    updateUserValidation,
    checkValidation,
    controller.updateUser
)
UserRoute.delete(
    "/users/:id",
    authorizationMW.checkAdmin,
    checkValidation,
    controller.deleteUser
  );

UserRoute.get(
  '/users/:id',
  authorizationMW.checkAdmin,
  checkValidation,
  controller.getUserById,
)
module.exports = UserRoute
