const express = require("express");
const {
  getAllSweet,
  deleteSweet,
  updateSweet,
  createNewSweet,
  getSearchedSweet,
  purchaseSweet,
  restockSweet,
} = require("../controller/SweetController");
const { isLogin } = require("../utils/isLogin");
const SweetRoute = express.Router();

SweetRoute.get("/sweets", isLogin, getAllSweet);
SweetRoute.get("/sweets/:search", isLogin, getSearchedSweet);
SweetRoute.post("/sweets", isLogin, createNewSweet);
SweetRoute.put("/sweets/:id", isLogin, updateSweet);
SweetRoute.delete("/sweets/:id", isLogin, deleteSweet);
SweetRoute.post("/sweets/:id/purchase", isLogin, purchaseSweet);
SweetRoute.post("/sweets/:id/restock", isLogin, restockSweet);

module.exports = { SweetRoute };
