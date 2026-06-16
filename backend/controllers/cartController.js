const Cart = require("../models/Cart");


const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity
    });

    res.status(201).json({
      success: true,
      cartItem
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cartItems = await Cart.find({ userId })
  .populate("productId");

    res.status(200).json({
      success: true,
      cartItems
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item removed from cart"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateCartQuantity = async (
  req,
  res
) => {
  try {
    const { quantity } = req.body;

    const cartItem =
      await Cart.findByIdAndUpdate(
        req.params.id,
        { quantity },
        { new: true }
      );

    res.status(200).json({
      success: true,
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCartItems , 
  removeFromCart ,
  updateCartQuantity 
};