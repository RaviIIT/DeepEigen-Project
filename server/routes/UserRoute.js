const express = require("express");
const {
  loginController,
  registerController,
} = require("../controller/UserController");

//router object
const router = express.Router();

//routers
// POST || LOGIN USER
console.log("reached routes file");
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

module.exports = router;
