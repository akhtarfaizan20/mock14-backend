const express = require("express");
const {
  depositMoney,
  withdrawMoney,
  transferMoney,
} = require("../Controller/transactions.controller");

const transactionRouter = express.Router();

transactionRouter.patch("/depositMoney/:_id", depositMoney);
transactionRouter.patch("/withdrawMoney/:_id", withdrawMoney);

transactionRouter.patch("/transferMoney/:_id", transferMoney);

module.exports = {
  transactionRouter,
};
