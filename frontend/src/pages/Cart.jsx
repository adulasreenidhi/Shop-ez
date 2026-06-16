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

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] =
  useState("");
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
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.get(
        `http://localhost:5000/api/cart/${loggedUser.user._id}`
      );

      setCartItems(response.data.cartItems);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (
  id,
  quantity
) => {
  try {
    await axios.put(
      `http://localhost:5000/api/cart/${id}`,
      { quantity }
    );

    fetchCartItems();
  } catch (error) {
    console.error(error);
  }
};

  const removeItem = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${id}`
      );

      toast.success("Item Removed");

      fetchCartItems();
    } catch (error) {
      console.error(error);
    }
  };

  const placeOrder = async () => {
    try {
      if (!address.trim()) {
  toast.warning("Please enter delivery address");
  return;
}
      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (cartItems.length === 0) {
        toast.warning("Cart is empty");
        return;
      }
       console.log(cartItems);
     for (const item of cartItems.filter(
  (item) => item.productId
)) {
  await axios.post(
    "http://localhost:5000/api/order/add",
    {
      userId: loggedUser.user._id,
      productId: item.productId._id,
      quantity: item.quantity,
      totalPrice:
        item.productId.price *
        item.quantity,
      address: address,
    },
    {
      headers: {
        Authorization: `Bearer ${loggedUser.token}`,
      },
    }
  );
}

      for (const item of cartItems.filter(
  (item) => item.productId
)) {
        await axios.delete(
          `http://localhost:5000/api/cart/${item._id}`
        );
      }

      fetchCartItems();
      setAddress("");

      toast.success("Order Placed Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed To Place Order");
    }
  };

 const totalPrice = cartItems.reduce(
  (total, item) =>
    total +
    (item.productId
      ? item.productId.price * item.quantity
      : 0),
  0
);
const discount = totalPrice * 0.1; // 10%

const finalPrice =
  totalPrice - discount;

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
      🛒 Shopping Cart
    </h1>

    <div
      style={{
        display: "flex",
        gap: "25px",
        alignItems: "flex-start",
      }}
    >
      {/* Cart Items */}

      <div style={{ flex: 2 }}>
        {cartItems.length === 0 ? (
          <h2 style={{ color: "white" }}>
            Your Cart Is Empty
          </h2>
        ) : (
          cartItems
            .filter((item) => item.productId)
            .map((item) => (
              <div
                key={item._id}
                style={{
                  display: "flex",
                  gap: "25px",
                  alignItems: "center",
                  background: "#f8fafc",
                  padding: "25px",
                  borderRadius: "16px",
                  marginBottom: "20px",
                  border: "1px solid #d1d5db",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={
                    productImages[
                      item.productId.name
                    ]
                  }
                  alt={item.productId.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    padding: "20px" ,
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "32px",
                      color: "#111827",
                    }}
                  >
                    {item.productId.name}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#6b7280",
                      fontSize: "18px",
                    }}
                  >
                    {
                      item.productId
                        .description
                    }
                  </p>

                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "28px",
                      fontWeight: "bold",
                      color: "#f97316",
                    }}
                  >
                    ₹
                    {
                      item.productId
                        .price
                    }
                  </p>

                 <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "12px",
  }}
>
  <button
    onClick={() =>
      updateQuantity(
        item._id,
        Math.max(
          1,
          item.quantity - 1
        )
      )
    }
    style={{
      width: "35px",
      height: "35px",
      border: "none",
      borderRadius: "50%",
      background: "#f97316",
color: "white",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
    }}
  >
    −
  </button>

  <span
    style={{
      fontSize: "18px",
      fontWeight: "600",
      color: "black"
    }}
  >
    {item.quantity}
  </span>

  <button
    onClick={() =>
      updateQuantity(
        item._id,
        item.quantity + 1
      )
    }
    style={{
      width: "35px",
      height: "35px",
      border: "none",
      borderRadius: "50%",
      background: "#f97316",
color: "white",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
    }}
  >
    +
  </button>
</div>
                  <button
                    onClick={() =>
                      removeItem(item._id)
                    }
                    style={{
                      width: "120px",
                      marginTop: "10px",
                      background:
                        "#ef4444",
                      color: "white",
                      border: "none",
                      padding:
                        "10px 15px",
                      borderRadius:
                        "8px",
                      cursor: "pointer",
                      fontWeight:
                        "bold",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
        )}
      </div>

      {/* Price Details */}

      <div
        style={{
          flex: 1,
          background: "#f8fafc",
          padding: "30px",
          borderRadius: "16px",
          position: "sticky",
          top: "20px",
          border: "1px solid #d1d5db",
         boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#111827",
          }}
        >
          Price Details
        </h2>

        <hr />

        
        <p
  style={{
    fontSize: "18px",
    color: "#374151",
    marginBottom: "10px",
  }}
>
          Total Items:{" "}
          {
            cartItems.filter(
              (item) =>
                item.productId
            ).length
          }
        </p>

       <p
  style={{
    fontSize: "18px",
    color: "#374151",
  }}
>
  Total Items: {
    cartItems.filter(
      (item) => item.productId
    ).length
  }
</p>

<p
  style={{
    fontSize: "18px",
    color: "#374151",
  }}
>
  Total Price: ₹{totalPrice}
</p>

<p
  style={{
    fontSize: "18px",
    color: "#16a34a",
    fontWeight: "bold",
  }}
>
  🎉Offer Applied
</p>

<p
  style={{
    fontSize: "18px",
    color: "#16a34a",
    fontWeight: "600",
  }}
>
  Discount (10%): -₹
  {discount.toFixed(0)}
</p>

<p
  style={{
    fontSize: "18px",
    color: "#374151",
  }}
>
  Delivery Charges: ₹0
</p>

<hr />

<h2
  style={{
    color: "#f97316",
    marginTop: "20px",
  }}
>
  Final Price: ₹
  {finalPrice.toFixed(0)}
</h2>

<input
  type="text"
  placeholder="Enter Delivery Address"
  value={address}
  onChange={(e) =>
    setAddress(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginTop: "15px",
    marginBottom: "15px",
    fontSize: "16px",
  }}
/>

       

        <button
          onClick={placeOrder}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            background: "#f97316",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  </div>
);
}

export default Cart;