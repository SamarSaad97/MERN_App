const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const { string } = require("joi");
const ProudctSchema = new mongoose.Schema({
  name: String,
  image: String, //img url
  status: {
    type: String,
    enum: ["Available", "Out Of Stock"],
  },
  description: String,
  price: Number,

  NumOfItemsInStock: {
    type: Number,
  },
  NumOfItemsInCart: {
    type: Number,
    default: 1,
  },
  totalPrice: Number,
});
autoIncrement.initialize(mongoose);
ProudctSchema.plugin(autoIncrement.plugin, "Proudct");
module.exports = mongoose.model("Proudct", ProudctSchema);
