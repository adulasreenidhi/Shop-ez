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


function AllProducts() {
  const [products, setProducts] = useState([]);
const [selectedCategory, setSelectedCategory] =
  useState("All");
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
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const userData = JSON.parse(
        localStorage.getItem("user")
      );

      const token = userData.token;

      await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Deleted");

      getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (product) => {
    try {
      const newName = prompt(
        "Enter Product Name",
        product.name
      );

      const newDescription = prompt(
        "Enter Description",
        product.description
      );

      const newPrice = prompt(
        "Enter Price",
        product.price
      );

      const newCategory = prompt(
        "Enter Category",
        product.category
      );

      if (
        !newName ||
        !newDescription ||
        !newPrice ||
        !newCategory
      ) {
        return;
      }

      const userData = JSON.parse(
        localStorage.getItem("user")
      );

      const token = userData.token;

      await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        {
          name: newName,
          description: newDescription,
          price: newPrice,
          category: newCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Updated");

      getProducts();
    } catch (error) {
      console.error(error);
      toast.error("Update Failed");
    }
  };

  return (
    <div
  style={{
    padding: "30px",
    background: "#3b475d",
    minHeight: "100vh",
  }}
>
     <h1
  style={{
    textAlign: "center",
    fontSize: "52px",
    fontWeight: "700",
    color: "white",
    marginBottom: "30px",
  }}
>
  📦 All Products
</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <div
  style={{
    width: "240px",
    background: "#1e293b",
    padding: "25px",
    borderRadius: "18px",
    height: "fit-content",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  }}
>
  <h2
    style={{
      color: "white",
      marginBottom: "15px",
    }}
  >
    Filters
  </h2>

  <hr
    style={{
      borderColor: "#475569",
      marginBottom: "15px",
    }}
  />

  
   {[
  "All",
  "Electronics",
  "Fashion",
  "Sports",
  "Home Appliances",
].map((item) => (
  <div
    key={item}
    onClick={() =>
      setSelectedCategory(item)
    }
    style={{
      background:
        selectedCategory === item
          ? "#f97316"
          : "#0f172a",
      color: "white",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "10px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    {item}
  </div>
))}
</div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {products
  .filter(
    (product) =>
      selectedCategory === "All" ||
      product.category ===
        selectedCategory
  )
  .map((product) => (
            <div
  key={product._id}
  style={{
    width: "280px",
    background: "#f8fafc",
    borderRadius: "18px",
    padding: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
     transition: "0.3s",
    cursor: "pointer",
  }}
>
  <img
  src={
    productImages[product.name] ||
    samsungImage
  }
  alt={product.name}
    style={{
      width: "100%",
      height: "220px",
      objectFit: "cover",
      borderRadius: "12px",
      marginBottom: "12px",
    }}
  />

  <h2
    style={{
      margin: "8px 0",
      color: "#0f172a",
    }}
  >
    {product.name}
  </h2>

  <p
    style={{
      color: "#64748b",
      minHeight: "40px",
      marginBottom: "10px",
    }}
  >
    {product.description}
  </p>

  <h2
    style={{
      color: "#f97316",
      marginBottom: "8px",
    }}
  >
    ₹{product.price}
  </h2>

  <div
    style={{
      display: "inline-block",
      background: "#e2e8f0",
      padding: "6px 12px",
      borderRadius: "20px",
      marginBottom: "15px",
      fontWeight: "600",
    }}
  >
    {product.category}
  </div>

  <div
    style={{
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    }}
  >
    <button
      onClick={() => updateProduct(product)}
      style={{
        flex: 1,
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      ✏️ Update
    </button>

    <button
      onClick={() => deleteProduct(product._id)}
      style={{
        flex: 1,
        background: "#ef4444",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      🗑 Delete
    </button>
  </div>
</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;