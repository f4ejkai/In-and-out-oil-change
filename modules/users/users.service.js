// connect database, communicate with database
const {getConnection} = require("../../helpers/mongodbClient");

const COLLECTION = 'users';

class UsersService {
  getUserByEmail = async (email) => {
    const [users, client] = await getConnection(COLLECTION);
    const user = await users.findOne({
      email
    });
    await client.close();
    return user;
  }

  createUser = async (newUser) => {
    const [users, client] = await getConnection(COLLECTION);
    const user = await users.insertOne(newUser);
    await client.close();
    return user;
  }
}

module.exports = {
  UsersService: new UsersService()
}
