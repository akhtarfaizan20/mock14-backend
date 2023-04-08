const express = require("express");
const { connectDB } = require("./Config/db");
const { accountRouter } = require("./Routes/account.routes");
const cors = require("cors");
const { transactionRouter } = require("./Routes/transaction.routes");
const { getEntries } = require("./Model/Statement.model");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/account", accountRouter);
app.use("/transaction", transactionRouter);

app.get("/printStatement/:_id", getEntries);

app.listen(process.env.PORT, async () => {
  try {
    await connectDB;
  } catch (error) {
    console.log(error);
  }
  console.log("Server is running at:- http://localhost:8080");
});
