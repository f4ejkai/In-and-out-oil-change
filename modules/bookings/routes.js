const express = require("express");
const {verifyUser} = require("../../middlewares/verifyAuth");
const {BookingsController} = require("./bookings.controller");

const router = express.Router();

router.post('', verifyUser, BookingsController.createBooking);
router.get('', verifyUser, BookingsController.getBookings);

module.exports = router;
