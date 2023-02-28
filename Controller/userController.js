const mongoose = require("mongoose");
require("./../Model/userModel");
const UserSchema = mongoose.model("user");

////Get All Users
module.exports.getAllUsers = (request, response, next) => {
  UserSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
/////Get User By Id
module.exports.getUserById = (request, response, next) => {
  UserSchema.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) {
        throw new Error("User doen't exist");
      } else {
        response.status(200).json({ data });
      }
    })
    .catch((error) => {
      next(error);
    });
};
////Add New User
module.exports.addUser = (request, response, next) => {
  let UserObject = new UserSchema({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
    img: request.body.img,
  });
  UserObject.save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
///Update User
module.exports.updateUser = (request, response, next) => {
  let UserObject = {
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
    img: request.body.img,
  };
  UserSchema.updateOne({ _id: request.params.id }, { $set: UserObject })
    .then((data) => {
      response.status(201).json({ data: "Updated" });
    })
    .catch((error) => {
      next(error);
    });
};
///Delete User
module.exports.deleteUser = (request, response, next) => {
  UserSchema.deleteOne({ _id: request.params.id })
    .then(() => {
      response.status(200).json({ data: "Deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
