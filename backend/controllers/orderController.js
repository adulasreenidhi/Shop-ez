 const Order = require("../models/Order");

const placeOrder = async (req, res) => {
    try {

        const {
            userId,
            productId,
            quantity,
            totalPrice,
            address
        } = req.body;

        const order = await Order.create({
            userId,
            productId,
            quantity,
            totalPrice,
            address
        });

        res.status(201).json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ userId })
      .populate("productId");

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("productId");

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
    placeOrder,
    getOrders , 
    getAllOrders , 
    updateOrderStatus
};