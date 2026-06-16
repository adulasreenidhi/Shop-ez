const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      image,
      stock
    } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image,
      stock
    });

    res.status(201).json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { createProduct , getProducts , getProductById , updateProduct , deleteProduct };