const express = require("express");

const router = express.Router();

const {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} = require(
  "../controllers/wishlistController"
);

router.post(
  "/add",
  addToWishlist
);

router.get(
  "/:userId",
  getWishlistItems
);

router.delete(
  "/:id",
  removeFromWishlist
);

module.exports = router;