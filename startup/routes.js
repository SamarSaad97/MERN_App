const Proudct = require("../Routes/proudct");
var BodyParser = require("body-parser");
var cors = require("cors");
const express = require("express");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({ extended: true }));
  app.use("/proudct", Proudct);
};
