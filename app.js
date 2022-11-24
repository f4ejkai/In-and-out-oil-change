require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.static('client'));
app.use(cors());
app.use(express.json());

const UsersRoutes = require("./modules/users/routes");
const BookingsRoutes = require("./modules/bookings/routes");
app.use('/api/users', UsersRoutes);
app.use('/api/bookings', BookingsRoutes);


app.use(function (req, res) {
  res.sendFile(path.resolve(__dirname, './client/index.html'));
});

app.listen(PORT, () => {
  console.log(`The server set up at port ${PORT}`);
})



