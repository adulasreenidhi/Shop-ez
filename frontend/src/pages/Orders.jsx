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

function Orders() {
  const [orders, setOrders] = useState([]);

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
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const loggedUser = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.get(
        `http://localhost:5000/api/order/${loggedUser.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`,
          },
        }
      );

      setOrders(response.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#e2e8f0",
      
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#0f172a",
          fontSize: "60px",
          marginBottom: "40px",
          fontWeight: "bold",
          
        }}
      >
        📦 My Orders
      </h1>

      {orders.length === 0 ? (
        <h3
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          No Orders Found
        </h3>
      ) : (
        orders
          .filter((order) => order.productId)
          .map((order) => (
            <div
              key={order._id}
              style={{
                background: "#ffffff",
                color: "#111827",
                borderRadius: "18px",
                padding: "20px",
                marginBottom: "25px",
                display: "flex",
                gap: "25px",
                alignItems: "center",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={
                  productImages[
                    order.productId.name
                  ]
                }
                alt={order.productId.name}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    margin: "0 0 8px",
                    fontSize: "32px",
                    color: "#111827",
                  }}
                >
                  {order.productId.name}
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "18px",
                    marginBottom: "12px",
                  }}
                >
                  {
                    order.productId
                      .description
                  }
                </p>

                <p
                  style={{
                    color: "#f97316",
                    fontSize: "28px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  ₹
                  {
                    order.productId
                      .price
                  }
                </p>

                <p
                  style={{
                    margin: "4px 0",
                    fontSize: "17px",
                  }}
                >
                  Quantity: {order.quantity}
                </p>

                <p
                  style={{
                    margin: "4px 0",
                    fontSize: "17px",
                  }}
                >
                  Total: ₹
                  {order.totalPrice}
                </p>

                <div
                  style={{
                    marginTop: "12px",
                  }}
                >
                  <span
                    style={{
                      background:
                        order.status ===
                        "Delivered"
                          ? "#dcfce7"
                          : "#fef3c7",
                      color:
                        order.status ===
                        "Delivered"
                          ? "#166534"
                          : "#92400e",
                      padding:
                        "8px 16px",
                      borderRadius:
                        "20px",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {order.status}
                  </span>
                </div>

                <p
                  style={{
                    marginTop: "12px",
                    color: "#6b7280",
                    fontSize: "15px",
                  }}
                >
                  Ordered On:{" "}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default Orders;