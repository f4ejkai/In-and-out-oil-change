const {ObjectId} = require("mongodb");
const {getConnection} = require("../../helpers/mongodbClient");
const {BookingsService} = require("./bookings.service");
const COLLECTION = 'bookings';
class BookingsController {
  constructor() {}

  createBooking = async (req, res) => {
    const booking = req.body;
    const user = req.user;
    booking.user = ObjectId(user.id);
    const newBooking = await BookingsService.create(booking);
    res.status(200).json(newBooking);
  }

  getBookings = async (req, res) => {
    const user = req.user;
    const bookings = await BookingsService.getBookings(ObjectId(user.id));
    res.status(200).json(bookings);
  }
}

module.exports = {
  BookingsController: new BookingsController()
}
