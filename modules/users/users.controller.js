// connect services, communicate with frontend and services

const {UsersService} = require("./users.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class UsersController {
  constructor() {}

  signUp = async (req, res) => {
    try {
      let newUser;
      const user = req.body;
      let oldUser = await UsersService.getUserByEmail(user.email);
      // check user if exist
      if (oldUser) {
        return res.status(409).send("User already exist. Please login.");
      }

      // create new user
      user.passwordHash = await bcrypt.hash(user.password, 10);
      newUser = await UsersService.createUser(user);
      let token = jwt.sign({
        email: newUser.email,
        id: newUser._id
      }, process.env.JWT_SECRET)
      res.status(201).json({
        token
      });
    } catch (err) {
      console.log(err)
      res.status(500).send(err.message);
    }
  }

  signIn = async (req, res) => {
    try {
      let oldUser,
        token;
      const {email, password} = req.body;
      // check user if exist
      oldUser = await UsersService.getUserByEmail(email);
      if (!oldUser) {
        return res.status(404).send("User not exist!");
      }

      // check password if correct
      if (await bcrypt.compare(password, oldUser.passwordHash)) {
        token = jwt.sign({
          email: oldUser.email,
          id: oldUser._id
        }, process.env.JWT_SECRET)
      } else {
        return res.status(400).send("Invalid Credentials");
      }
      res.status(200).json({token, user: oldUser});
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = {
  UsersController: new UsersController()
}
