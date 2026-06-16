const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    placeOrder,
    getOrders , 
    getAllOrders ,
    updateOrderStatus
} = require("../controllers/orderController");

router.post("/add", protect, placeOrder);

router.get(
  "/",
  protect,
  adminOnly,
  getAllOrders
);

router.get(
  "/:userId",
  protect,
  getOrders
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateOrderStatus
);


module.exports = router;