const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const { string } = require("joi");
const ProudctSchema = new mongoose.Schema({
  name: String,
  image: String, //img url
  description: String,
  price: Number,
  PriceInEGP: Number,
  NumOfItemsInCart: {
    type: Number,
    default: 0,
  },
  totalPrice: Number,
});
autoIncrement.initialize(mongoose);
ProudctSchema.plugin(autoIncrement.plugin, "Proudct");
module.exports = mongoose.model("Proudct", ProudctSchema);
