const { default: mongoose } = require("mongoose");

require("dotenv").config();
mongoose.set("strictQuery", false);

const connectDB = mongoose.connect(
  "mongodb+srv://faizan:faizan@cluster0.7vwn8xg.mongodb.net/mock14?retryWrites=true&w=majority"
);
module.exports = {
  connectDB,
};
