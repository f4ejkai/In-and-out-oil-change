const {getConnection} = require("../../helpers/mongodbClient");
const {ObjectId} = require("mongodb");

const COLLECTION = 'bookings';

class BookingsService {
  constructor() {}

  create = async (booking) => {
    const [bookings, client] = await getConnection(COLLECTION);
    const newBooking = await bookings.insertOne(booking);
    await client.close();
    return newBooking;
  }

  getBookings = async (user) => {
    const [bookings, client] = await getConnection(COLLECTION);
    const history = await bookings.find({
      user
    }).toArray();
    await client.close();
    return history;
  }
}

module.exports = {
  BookingsService: new BookingsService()
}
