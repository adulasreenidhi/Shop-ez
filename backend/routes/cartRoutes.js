const express = require("express");

const router = express.Router();

const {
  addToCart , getCartItems , removeFromCart , updateCartQuantity 
} = require("../controllers/cartController");


router.post("/add", addToCart);
router.get("/:userId" , getCartItems);
router.put( "/:id", updateCartQuantity);
router.delete("/:id" , removeFromCart);


module.exports = router;