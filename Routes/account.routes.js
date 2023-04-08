const express = require("express");
const {
  openAccount,
  updateKYC,
  closeAccount,
} = require("../Controller/accounts.controller");

const accountRouter = express.Router();

accountRouter.post("/openAccount", openAccount);

accountRouter.patch("/updateKYC/:_id", updateKYC);

accountRouter.delete("/closeAccount/:_id", closeAccount);

module.exports = {
  accountRouter,
};
