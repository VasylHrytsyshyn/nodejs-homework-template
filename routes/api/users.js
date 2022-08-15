const express = require("express");

// const {basedir} = global;

// const ctrl = require(`${basedir}/controllers/auth`);
const ctrl = require('../../controllers/users');

// const {ctrlWrapper} = require(`${basedir}/helpers`);
const {ctrlWrapper} = require('../../helpers');

const router = express.Router();

// signup
// router.post("/register", ctrlWrapper(ctrl.register));
router.post("/signup", ctrlWrapper(ctrl.signup));

// signin
// router.post("/login", ctrlWrapper(ctrl.login));

module.exports = router;