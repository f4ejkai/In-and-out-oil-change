// connect services, communicate with frontend and services

const {UsersService} = require("./users.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// The separation of concern using controllers and services is nice to have.
// But it seems like some of your controller logic actually belongs to services.
// And you have database CRUD logic in your service.
// I would suggest reorganize your code this way:
// 1. Move database logic to another layer called "DAO" which is database access object.
// 2. Your service should handle logic that requires multiple database access. For example
//    you can have a service method called signUp(), and move your logic of checking old
//    users and creating new users to the service.
// At the end, this is the optimal layout:
// Controllers should know nothing about business logic, its main concern should be handling
// requests and calling the corresponding services, and return the result based on the result
// from the service call. And services should be all about business logic, without having to
// know whether the request comes from http or the underlying database is mongo. The DAOs
// should be all about database logic, with simple functions like addBooking, getBookingById,
// getBookingByUser, etc.
// In the long run the code will be more maintainable.
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
