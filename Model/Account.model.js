const { default: mongoose } = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: Number, required: true },
    address: { type: String, required: true },
    initialBalance: { type: Number, required: true },
    adharNo: { type: Number, required: true },
    panNo: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const AccountModel = mongoose.model("/accounts", AccountSchema);

module.exports = {
  AccountModel,
};
