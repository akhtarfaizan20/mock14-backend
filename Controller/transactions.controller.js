const { AccountModel } = require("../Model/Account.model");
const { createEntry } = require("../Model/Statement.model");

const depositMoney = async (req, res) => {
  const { _id } = req.params;
  const { amount } = req.body;
  try {
    const holder = await AccountModel.findById(_id);
    let initialBalance = holder.initialBalance + amount;
    await AccountModel.findByIdAndUpdate(_id, {
      initialBalance,
    });
    let entry = {
      userID: holder._id,
      amount: amount,
      type: "credit",
      desc: `Amount Deposited into the back by the user`,
    };
    await createEntry(entry);
    let upHolder = { ...holder._doc, initialBalance };
    res.send({
      msg: "Amount deposited Successfully",
      holder: upHolder,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
const withdrawMoney = async (req, res) => {
  const { _id } = req.params;
  const { amount } = req.body;
  try {
    let holder = await AccountModel.findById(_id);
    let initialBalance = holder.initialBalance - amount;
    if (initialBalance < 0) {
      res.status(400).send({ msg: "Not enough Balance" });
    } else {
      await AccountModel.findByIdAndUpdate(_id, {
        initialBalance,
      });
      let entry = {
        userID: holder._id,
        amount: amount,
        type: "debit",
        desc: `Amount withdrawn from the back by the user`,
      };
      await createEntry(entry);
      let upHolder = { ...holder._doc, initialBalance };

      res.send({ msg: "Amount is successfully withdrawn", holder: upHolder });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
const transferMoney = async (req, res) => {
  const { _id } = req.params;
  const { email, panNo, amount } = req.body;
  try {
    let holder = await AccountModel.findById(_id);
    let initialBalance = holder.initialBalance - amount;
    if (initialBalance < 0) {
      res.status(400).send({ msg: "Not enough Balance" });
    } else {
      let receiver = await AccountModel.find({ $and: [{ email }, { panNo }] });
      if (receiver.length) {
        await AccountModel.findByIdAndUpdate(receiver[0]._id, {
          initialBalance: receiver[0].initialBalance + amount,
        });
        await AccountModel.findByIdAndUpdate(holder._id, {
          initialBalance: holder.initialBalance - amount,
        });
        let entry = {
          userID: holder._id,
          amount: amount,
          type: "debit",
          desc: `Amount sent to  ${receiver[0].name}.`,
        };
        await createEntry(entry);
        entry = {
          userID: receiver[0]._id,
          amount,
          type: "credit",
          desc: `Amount received from the ${holder.name}.`,
        };
        await createEntry(entry);
        let upHolder = { ...holder._doc, initialBalance: initialBalance };

        res.send({ msg: "Transaction Successful", holder: upHolder });
      } else {
        res.status(400).send({ msg: "Invalid credentials" });
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

module.exports = {
  depositMoney,
  withdrawMoney,
  transferMoney,
};
