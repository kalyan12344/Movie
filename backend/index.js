const express = require("express");
const connection = require("./config/database");
const userRouter = require("./routes/user.router");
const movieRouter = require("./routes/movie_router");
const locationRouter = require("./routes/location_router");
const theaterRouter = require("./routes/theater_router");
const showtimeRouter = require("./routes/showtime_router");
const userdashMovies = require("./routes/userdash_router");
const seat = require("./routes/seat");
const ticketRouter = require("./routes/ticket_router");
const couponRouter = require("./routes/coupon_route");
const stRouter = require("./routes/st_router");

const app = express();
var cors = require("cors");
app.use(cors()); // Use this after the variable declaration
require("dotenv").config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Rest API listening at port ${port}`);
});

app.use(express.json());
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/location", locationRouter);
app.use("/theater", theaterRouter);
app.use("/showtime", showtimeRouter);
app.use("/userdash", userdashMovies);
app.use("/seat", seat);
app.use("/ticket", ticketRouter);
app.use("/coupon", couponRouter);
app.use("/st", stRouter);

module.exports = app;
