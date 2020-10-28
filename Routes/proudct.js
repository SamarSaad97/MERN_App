const Proudct = require("../Models/Proudct");
const express = require("express");
const router = express.Router();

//add proudct to cart (I used insomnia to add proudct as no front end was requierd for this step)
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
    PriceInEGP: parseFloat(req.body.PriceInEGP),
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
// Calculate the shoes discount 
router.post("/ShoesDis", async (req, res) => {
  const proudcts = await Proudct.find();
  if (proudcts.length < 1) return res.status(404).send("No Proudcts found");
var shoesDis=0

for(let val of proudcts) {
  if(val["name"]==="shoes"){
   if(val["NumOfItemsInCart"]){
    shoesDis= shoesDis+val["NumOfItemsInCart"]*val["price"]*0.1
   }
  }
}
return res.send(String(shoesDis));
});

// Calculate the buy to tshirt get a 50% a jacket discount 
router.post("/TshirtDis", async (req, res) => {
  const proudcts = await Proudct.find();
  if (proudcts.length < 1) return res.status(404).send("No Proudcts found");
var TshirtDis=0
var jacketPrice=0
for(let val of proudcts) {
  if(val["name"]==="jacket"){
    if(val["NumOfItemsInCart"]>0){
      jacketPrice=val["price"]
    
    }
   }
}
for(let val of proudcts) {
  if(val["name"]==="tshirt"){
   if(val["NumOfItemsInCart"]>=2){

      TshirtDis= jacketPrice*0.5
   
   }
  }
}
return res.send(String(TshirtDis));
});


//view proudcts in cart
router.get("/viewProudcts", async (req, res) => {
  const proudcts = await Proudct.find();
  if (proudcts.length < 1) return res.status(404).send("No Proudcts found");

  return res.status(200).send(proudcts);
});

// calculate subtotal
router.post("/SubTotalPrice", async (req, res) => {
  const proudcts = await Proudct.find();
  if (proudcts.length === 0) res.status(404).send("proudcts are not found");

  var total = 0;

  for (let index = 0; index < proudcts.length; index++) {
    total =
      total + proudcts[index]["NumOfItemsInCart"] * proudcts[index]["price"];
      
  }
 
  return res.send(String(total));
}),
  // calculate taxes
  router.post("/Taxes", async (req, res) => {
    var taxes = 0;
    if (!req.body.total) return res.status(400).send("BAD REQUEST");
    else {
      taxes = req.body.total * 0.14;
    
    }

    return res.send(String(taxes));
  }),
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

  //remove proudct from cart
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
