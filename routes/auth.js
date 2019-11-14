const router = require("express").Router();
const User = require("../model/User.JS");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("./verifyToken");
const { registerValidtion, lognValidation } = require("../validation");

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {}
});

router.post("/register", async (req, res) => {
  //Validate the data before create user
  const { error } = registerValidtion(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Cheacking if the user is already in the DB
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email is already exists");

  //Hase password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECTET);
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //Validate the data before create user
  const { error } = lognValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Cheacking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email or password is worng");
  //password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("invalid password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECTET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
