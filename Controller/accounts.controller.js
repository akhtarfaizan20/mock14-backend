const { AccountModel } = require("../Model/Account.model");
const { createEntry } = require("../Model/Statement.model");

const openAccount = async (req, res) => {
  const holder = req.body;
  try {
    const existingHolder = await AccountModel.find({
      $or: [{ email: holder.email }, { panNo: holder.panNo }],
    });
    if (existingHolder.length) {
      if (
        existingHolder[0].email === holder.email &&
        existingHolder[0].panNo === holder.panNo
      ) {
        res.send({ msg: "User logged In", holder: existingHolder[0] });
      } else {
        res.sendStatus(400);
      }
    } else {
      let newHolder = new AccountModel(holder);
      await newHolder.save();
      let entry = {
        userID: newHolder._id,
        amount: newHolder.initialBalance,
        type: "credit",
        desc: `Account opened with the initial balance of ${newHolder.initialBalance}`,
      };
      await createEntry(entry);
      res.send({ msg: "Account Opened Successfully", holder: newHolder });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const updateKYC = async (req, res) => {
  const details = req.body;
  const { _id } = req.params;
  try {
    await AccountModel.findByIdAndUpdate(_id, details);
    res.send({ msg: "KYC updated successfully" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const closeAccount = async (req, res) => {
  const { _id } = req.params;
  try {
    await AccountModel.findByIdAndDelete(_id);
    res.send({ msg: "Account is closed" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

module.exports = {
  openAccount,
  updateKYC,
  closeAccount,
};
