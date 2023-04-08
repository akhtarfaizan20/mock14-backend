const { default: mongoose } = require("mongoose");

require("dotenv").config();
mongoose.set("strictQuery", false);

const connectDB = mongoose.connect(process.env.mongoURl);
module.exports = {
  connectDB,
};
