const Proudct = require("../Models/Proudct");
const express = require("express");
const router = express.Router();

//add proudct to cart (I used insomnia to add proudct as no front end was requierd)
router.post("/addProudct", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.price ||
    !req.body.NumOfItemsInStock
  )
    return res.status(404).send("BAD REQUEST");

  const result = await Proudct.find({
    $or: [{ name: req.body.name }],
  });
  if (result.length > 0) {
    console.log("already exists");
    return res.status(400).send("Already  Exists");
  }
  const proudct = new Proudct({
    name: req.body.name,
    status: "Available",
    description: req.body.description,
    NumOfItemsInStock: parseInt(req.body.NumOfItemsInStock),
    price: parseFloat(req.body.price),
    image: req.body.image,
  });

  try {
    const results = await proudct.save();
    console.log(results);
    return res.send(results);
  } catch (error) {
    console.log("error");
    return res.status(400).send("error");
  }
});
//view proudcts in cart
router.get("/viewProudcts", async (req, res) => {
  const proudcts = await Proudct.find();
  if (proudcts.length < 1) return res.status(404).send("No Proudcts found");

  return res.status(200).send(proudcts);
});

//Decrement proudcts from cart
router.post("/TakeOffCart", async (req, res) => {
  if (!req.body.name) return res.status(400).send("BAD REQUEST");
  proudct = await Proudct.findOne({ name: req.body.name });

  if (!proudct) return res.status(404).send("item not found in db");
  if (proudct.NumOfItemsInCart > 0) {
    try {
      await Proudct.updateOne(
        { _id: proudct._id },
        {
          $set: {
            NumOfItemsInStock: proudct.NumOfItemsInStock + 1,
            NumOfItemsInCart: proudct.NumOfItemsInCart - 1,
          },
        }
      );
    } catch (error) {
      res.status(400).send(" could not be updatezz");
    }
  }
  if (proudct.NumOfItemsInStock > 0) {
    try {
      await Proudct.updateOne(
        { _id: proudct._id },
        { $set: { status: "Available" } }
      );
    } catch (error) {
      res.status(400).send(" could not be update");
    }

    res.status(200).send(proudct);
  } else {
    const newreq = await Proudct.findOne({ name: req.body.name });
    res.status(200).send(newreq);
  }
});
// calculate subtotal
router.post("/totalPrice", async (req, res) => {
  const proudcts = await Proudct.find();
  if (proudcts.length === 0) res.status(404).send("proudcts are not found");

  var total = 0;

  for (let index = 0; index < proudcts.length; index++) {
    total =
      total + proudcts[index]["NumOfItemsInCart"] * proudcts[index]["price"];
  }

  return res.send(String(total));
}),
  //remoe proudct from cart
  router.post("/RemoveProudct", async (req, res) => {
    if (!req.body.name) return res.status(400).send("Bad Request");
    const proudct = await Proudct.findOne({ name: req.body.name });
    if (!proudct) return res.status(404).send("No Proudct were found");

    const deletedProudct = await Proudct.findByIdAndDelete({
      _id: proudct._id,
    });
    return res.status(200).send(deletedProudct);
  });
// incremnt number of items in cart
router.post("/addToCart", async (req, res) => {
  if (!req.body.name) return res.status(400).send("BAD REQUEST");
  proudct = await Proudct.findOne({ name: req.body.name });

  if (!proudct) return res.status(404).send("item not found in db");
  if (proudct.NumOfItemsInStock < 1) {
    try {
      await Proudct.updateOne(
        { _id: proudct._id },
        { $set: { status: "Out Of Stock" } }
      );
    } catch (error) {
      res.status(400).send(" could not be update");
    }

    res.status(200).send(proudct);
  } else {
    try {
      await Proudct.updateOne(
        { _id: proudct._id },
        {
          $set: {
            NumOfItemsInStock: proudct.NumOfItemsInStock - 1,
            NumOfItemsInCart: proudct.NumOfItemsInCart + 1,
          },
        }
      );
    } catch (error) {
      res.status(400).send(" could not be updatezz");
    }
    const newreq = await Proudct.findOne({ name: req.body.name });
    res.status(200).send(newreq);
  }
});
module.exports = router;
