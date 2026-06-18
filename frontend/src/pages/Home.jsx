import { useEffect, useState } from "react";
import axios from "axios";
import samsungImage from "../assets/samsung.jpg";
import iphoneImage from "../assets/iphone.jpg";
import nothingImage from "../assets/nothing.jpg";
import boatImage from "../assets/boat.jpg";
import saleBanner from "../assets/banner.webp";
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

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";


function Home({ search })  {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] =
  useState([]);
  const [selectedCategory, setSelectedCategory] =
  useState("All");
  const navigate = useNavigate();
  

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
  getProducts();
  fetchWishlist();
}, []);

 const getProducts = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/products"
    );

    console.log("API Response:", res.data);

    setProducts(res.data.products);
  } catch (error) {
    console.error(error);
  }
};

const fetchWishlist = async () => {
  try {
    const loggedUser = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await axios.get(
      `http://localhost:5000/api/wishlist/${loggedUser.user._id}`
    );

    const ids = res.data.items.map(
      (item) => item.productId._id
    );

    setWishlistIds(ids);
  } catch (error) {
    console.log(error);
  }
};

  const addToCart = async (productId) => {
    try {
      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          userId: loggedUser.user._id,
          productId,
          quantity: 1,
        }
      );

      toast.success("Added To Cart");

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed To Add Cart");
    }
  };

  const addToWishlist = async (
  productId
) => {
  try {
    const loggedUser = JSON.parse(
      localStorage.getItem("user")
    );

    await axios.post(
      "http://localhost:5000/api/wishlist/add",
      {
        userId:
          loggedUser.user._id,
        productId,
      }
    );

    toast.success("Added To Wishlist");
    setWishlistIds([
  ...wishlistIds,
  productId,
]);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div
  style={{
    maxWidth: "100%",
    margin: "0 auto" ,
    padding: "10px",
    boxSizing: "border-box",
    backgroundColor: "#e2e8f0"
  }}
>     {/* Banner */}

    <img
  src={saleBanner}
  alt="Sale Banner"
  style={{
    width: "100%",
    height: "250px",
    objectFit: "cover",
    backgroundColor: "#ffffff",
    color: "#111827" ,
    borderRadius: "12px",
    marginTop: "2px" ,
    display: "block",
  }}
/>

      {/* Categories */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "10px",
          marginTop: "10px"
        }}
      >
        {[
  "All",
  "Electronics",
  "Fashion",
  "Sports",
  "Home Appliances",
].map((category) => (
          <div
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
  padding: "12px 25px",
  backgroundColor:
    selectedCategory === category
      ? "#ea580c"
      : "#0f172a",
  color: "white",
  borderRadius: "10px",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
}}
          >
            {category}
          </div>
        ))}
      </div>

      {/* Product Grid */}

        <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "18px",
  }}
> 
        {products
  .filter((product) => {
    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  })
  .map((product) => (
    <div
  key={product._id}
  onClick={() =>
    navigate(`/product/${product._id}`)
  }
      style={{
        borderRadius: "12px",
        position: "relative",
        padding: "12px",
        width: "320px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
         cursor: "pointer",
        backgroundColor: "#e5e7eb",
        color: "#111827",
        border: "1px solid #374151",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={productImages[product.name]}
        alt={product.name}
        style={{
          width: "95%",
          height: "280px",
          objectFit: "contain",
          backgroundColor: "#ffffff",
          padding: "5px",
          borderRadius: "12px",
        }}
      />

     <button
  onClick={(e) => {
    e.stopPropagation();
    addToWishlist(product._id);
  }}
  style={{
    position: "absolute",
    top: "15px",
    right: "15px",
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "white",
    cursor: "pointer",
    boxShadow:
      "0 3px 8px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  }}
>
  <FaHeart
    style={{
      color: wishlistIds.includes(
        product._id
      )
        ? "red"
        : "#d1d5db",
      fontSize: "18px",
    }}
  />
</button>

      <h2
        style={{
          color: "#111827",
          fontSize: "18px",
          margin: "6px 0 2px",
        }}
      >
        {product.name}
      </h2>

      <p
        style={{
          fontSize: "13px",
          color: "#6b7280",
          margin: "0",
          lineHeight: "1.3",
        }}
      >
        {product.description}
      </p>

      <p
        style={{
          margin: "2px 0 6px",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        ₹{product.price}
      </p>

     <button
  onClick={(e) => {
    e.stopPropagation();
    addToCart(product._id);
  }}

        
        style={{
          backgroundColor: "#ea580c",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Add To Cart
      </button>

    
    </div>
  ))}
  
    
          
      </div>
    </div>
  );
}

export default Home;