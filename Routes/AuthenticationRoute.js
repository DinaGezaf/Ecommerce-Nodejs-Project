const express = require("express");
const controller = require("../Controller/AuthenticationController");

const Authentication_Router = express.Router();
Authentication_Router.post('/login', controller.login);

module.exports = Authentication_Router;