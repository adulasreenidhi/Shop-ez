import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import samsungImage from "../assets/samsung.jpg";
import iphoneImage from "../assets/iphone.jpg";
import nothingImage from "../assets/nothing.jpg";
import boatImage from "../assets/boat.jpg";

import shirtImage from "../assets/shirt.jpg";
import tshirtImage from "../assets/tshirt.jpg";
import jeansImage from "../assets/jeans.jpg";
import dressImage from "../assets/dress.jpg";

import shoesImage from "../assets/shoes.jpg";
import batImage from "../assets/bat.jpg";
import ballImage from "../assets/ball.webp";
import sportsBagImage from "../assets/sportsbag.jpg";

import airFryerImage from "../assets/Airfryer.webp";
import clockImage from "../assets/clock.jpg";
import lampImage from "../assets/lamp.jpg";
import coffeeMakerImage from "../assets/coffemaker.webp";

import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  
    const productImages = {
    "Samsung a31": samsungImage,
    "Iphone 16": iphoneImage,
    "Nothing 4a": nothingImage,
    "Boat earpods": boatImage,
  
    "White Shirt": shirtImage,
    "Oversized T-Shirt": tshirtImage,
    "Nifty Jeans": jeansImage,
    "Frock": dressImage,
  
    "Sports Shoes": shoesImage,
    "Cricket Bat": batImage,
    "Basket Ball": ballImage,
    "Gym Bag": sportsBagImage,
  
    "Air Fryer": airFryerImage,
    "CLOCK": clockImage,
    "Bed Lamp": lampImage,
    "Coffee Maker": coffeeMakerImage,
  };
  

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(res.data.product);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async () => {
  try {
    const loggedUser = JSON.parse(
      localStorage.getItem("user")
    );

    await axios.post(
      "http://localhost:5000/api/cart/add",
      {
        userId: loggedUser.user._id,
        productId: product._id,
        quantity: 1,
      }
    );

    toast.success("Added To Cart");
  } catch (error) {
    console.error(error);
    toast.success("Failed To Add Cart");
  }
};

  if (!product) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

 return (
  <div
    style={{
      background: "#e2e8f0",
      minHeight: "100vh",
      padding: "40px",
    }}
  >
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        background: "white",
        borderRadius: "20px",
        padding: "40px",
        display: "flex",
        gap: "50px",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left Side Image */}

      <div style={{ flex: 1 }}>
        <img
          src={productImages[product.name]}
          alt={product.name}
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "contain",
            background: "#f8fafc",
            borderRadius: "15px",
            padding: "20px",
          }}
        />
      </div>

      {/* Right Side Details */}

      <div style={{ flex: 1 }}>
        <h1
          style={{
            color: "#111827",
            fontSize: "40px",
            marginBottom: "15px",
          }}
        >
          {product.name}
        </h1>

        <div
  style={{
    color: "#f59e0b",
    fontSize: "18px",
    marginBottom: "10px",
  }}
>
  ⭐⭐⭐⭐⭐ (4.8)
</div>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px",
            lineHeight: "1.7",
          }}
        >
          {product.description}
        </p>

        <h2
          style={{
            color: "#f97316",
            fontSize: "36px",
            marginTop: "20px",
          }}
        >
          ₹{product.price}
        </h2>

        <div
          style={{
            display: "inline-block",
            background: "#031935",
            padding: "8px 15px",
            borderRadius: "20px",
            marginTop: "10px",
            fontWeight: "600",
          }}
        >
          {product.category}
        </div>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
            fontWeight: "600",
            color:
              product.stock > 0
                ? "#16a34a"
                : "#dc2626",
          }}
        >
          {product.stock > 0
            ? `✓ In Stock (${product.stock})`
            : "Out Of Stock"}
        </p>
          
          <p
  style={{
    color: "#475569",
    marginTop: "10px",
  }}
>
  🚚 Free Delivery in 2-3 Days
</p> 

        <button
        onClick={addToCart}
          style={{
            marginTop: "25px",
            background: "#f97316",
            color: "white",
            border: "none",
            padding: "14px 30px",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          🛒 Add To Cart
        </button>

         { /*

        <button
  style={{
    marginTop: "15px",
    marginLeft: "10px",
    background: "#0f172a",
    color: "white",
    border: "none",
    padding: "14px 30px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "600",
  }}
>
  ⚡ Buy Now
</button> */}

      </div>
    </div>
  </div>
);

}


export default ProductDetails;