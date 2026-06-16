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

function Wishlist() {
  const [wishlistItems, setWishlistItems] =
    useState([]);

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

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `http://localhost:5000/api/wishlist/${loggedUser.user._id}`
      );

      setWishlistItems(res.data.items);
    } catch (error) {
  console.error(error);
  toast.error("Failed To Load Wishlist");
}
    
  };

  const removeFromWishlist = async (
    id
  ) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/${id}`
      );

      toast.success(
        "Removed From Wishlist"
      );

      fetchWishlist();
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed To Remove Item"
      );
    }
  };

  const moveToCart = async (item) => {
    try {
      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userId:
            loggedUser.user._id,
          productId:
            item.productId._id,
          quantity: 1,
        }
      );

      await axios.delete(
        `http://localhost:5000/api/wishlist/${item._id}`
      );

      toast.success("Moved To Cart");

      fetchWishlist();
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed To Move Item"
      );
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#e2e8f0",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#0f172a",
          fontSize: "48px",
          fontWeight: "700",
        }}
      >
        ❤️ My Wishlist
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {wishlistItems.length === 0 ? (
  <h2
    style={{
      color: "#64748b",
    }}
  >
    Your Wishlist Is Empty ❤️
  </h2>
) : (
  wishlistItems
    .filter((item) => item.productId)
    .map((item) => (
            <div
              key={item._id}
              style={{
                width: "300px",
                background: "#f8fafc",
                borderRadius: "18px",
                padding: "15px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={
  productImages[
    item.productId?.name
  ]
}
                  
                
                alt={
  item.productId?.name
}
                
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "contain",
                  background: "white",
                  borderRadius: "12px",
                  marginBottom: "12px",
                }}
              />

              <h2
                style={{
                  color: "#0f172a",
                  marginBottom: "6px",
                }}
              >
                {item.productId?.name}
              </h2>

              <p
                style={{
                  color: "#64748b",
                  minHeight: "40px",
                }}
              >
                {
                  item.productId?.description
                }
              </p>

              <h2
                style={{
                  color: "#f97316",
                  marginBottom: "15px",
                }}
              >
                ₹
                {
                  item.productId?.price
                }
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() =>
                    removeFromWishlist(
                      item._id
                    )
                  }
                  style={{
                    flex: 1,
                    background:
                      "#ef4444",
                    color: "white",
                    border: "none",
                    padding:
                      "10px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                    fontWeight:
                      "bold",
                  }}
                >
                  Remove
                </button>

                <button
                  onClick={() =>
                    moveToCart(item)
                  }
                  style={{
                    flex: 1,
                    background:
                      "#f97316",
                    color: "white",
                    border: "none",
                    padding:
                      "10px",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                    fontWeight:
                      "bold",
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;