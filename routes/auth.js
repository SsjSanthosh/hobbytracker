const express = require("express");
const User = require("./../models/Users");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uniqid = require("uniqid");
const { check, validationResult } = require("express-validator");
const auth = require("./../middlewares/auth");
const router = express.Router();

// return jwt user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name _id avatar");

    res.json({ user });
  } catch (err) {
    res.status(400).json({ msg: "Invalid user" });
  }
});
// Signing up a new user
router.post(
  "/register",
  [
    // checking for name,email and password

    check("name", "Name is required")
      .not()
      .isEmpty(),

    check("email", "Please enter a valid email").isEmail(),

    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // check for errors
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      const avatar = `https://avatars.dicebear.com/v2/:identicons/${uniqid()}.svg`;
      try {
        //   check if user exists
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        } else {
          // create a new user
          // generate salt for password encryption
          const salt = await bcrypt.genSalt(10);
          // hash password
          let encryptedPass = await bcrypt.hash(password, salt);
          //   create new user
          user = new User({ name, email, password: encryptedPass, avatar });
          //   commit to DB
          await user.save();
          //   JWT part
          //   payload to decrypt and log in user
          const payload = { user: { id: user.id } };
          const secret = config.get("jwtSecret");
          jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              return res.status(500).json({ msg: "JWT fail" });
            } else {
              res.send(token).status(200);
            }
          });
        }
      } catch (err) {
        return res.status(500).json({ msg: "DB error" });
      }
    }
  }
);

// logging in an existing user
router.post(
  "/login",
  [
    // checking for email and password
    check("email", "Invalid email").isEmail(),

    check("password").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const { email, password } = req.body;
      try {
        // checking for email
        let user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
          return res.status(400).json({ message: "Invalid credentials" });
        } else {
          const payload = { user: { id: user.id } };
          const secret = config.get("jwtSecret");
          jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              return res.status(400).json({ message: "Invalid credentials" });
            }
            res.status(200).send(token);
          });
        }
      } catch (err) {
        return res.status(500).json({ msg: "DB error" });
      }
    }
  }
);

module.exports = router;
