const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "mynameisdante@dmc";

router.post("/createuser", [

  body('email', 'invalid email').isEmail(),
  // password must be at least 5 chars long
  body('name', 'username must be of minimum length of 4').isLength({ min: 4 }),
  body('password', 'password must be of minimum length of 5').isLength({ min: 5 })],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {

      await User.create(
        {
          name: req.body.name,
          location: req.body.location,
          email: req.body.email,
          password: secPassword
        }
      )
      res.json({ success: true });

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  });



router.post("/loginuser", [

  body('email', 'invalid email').isEmail(),
  body('password', 'password must be of minimum length of 5').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const email = req.body.email;
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "try logging in with correct credentials: incorrect email" });
      }
      //checking password
      const isCorrectPassword = await bcrypt.compare(req.body.password, userData.password);

      if (!isCorrectPassword) {
        return res.status(400).json({ errors: "try logging in with correct credentials : incorrect password" });
      }
      const data = {
        user: {
          id: userData.id
        }
      };

      const authToken = jwt.sign(data, secretKey);
      return res.json({ success: true, authToken: authToken });

    } catch (error) {
      console.log(error);
      res.json({ success: false });

    }

  });

module.exports = router;