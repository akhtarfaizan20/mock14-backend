const { default: mongoose } = require("mongoose");

const ledgerSchema = mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    desc: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const LedgerModel = mongoose.model("statement", ledgerSchema);

const createEntry = async (entry) => {
  try {
    let newEntry = new LedgerModel(entry);
    newEntry.save();
  } catch (error) {
    console.log(error);
  }
};

const getEntries = async (req, res) => {
  const { _id } = req.params;
  console.log({ _id });
  try {
    let newEntry = await LedgerModel.find({ userID: _id });
    res.send(newEntry);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

module.exports = {
  createEntry,
  getEntries,
};
