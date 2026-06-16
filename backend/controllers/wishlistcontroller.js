const Wishlist = require("../models/Wishlist");

const addToWishlist = async (
  req,
  res
) => {
  try {
    const { userId, productId } =
      req.body;

    const existing =
      await Wishlist.findOne({
        userId,
        productId,
      });

    if (existing) {
      return res.status(400).json({
        message:
          "Already in wishlist",
      });
    }

    const wishlistItem =
      await Wishlist.create({
        userId,
        productId,
      });

    res.status(201).json({
      success: true,
      wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getWishlistItems = async (
  req,
  res
) => {
  try {
    const items =
      await Wishlist.find({
        userId: req.params.userId,
      }).populate("productId");

    const validItems = items.filter(
      (item) => item.productId
    );

    res.status(200).json({
      success: true,
      items: validItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromWishlist =
  async (req, res) => {
    try {
      await Wishlist.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Removed from wishlist",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
};