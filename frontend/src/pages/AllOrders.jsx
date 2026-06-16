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

function AllOrders() {
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
      const userData = JSON.parse(
        localStorage.getItem("user")
      );

      const token = userData.token;

      const res = await axios.get(
        "http://localhost:5000/api/order",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const userData = JSON.parse(
        localStorage.getItem("user")
      );

      const token = userData.token;

      await axios.put(
        `http://localhost:5000/api/order/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status Updated");

      fetchOrders();
    } catch (error) {
      console.error(error);
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
        fontSize: "64px",
        fontWeight: "700",
        color: "white",
        marginBottom: "35px",
      }}
    >
      📋 All Orders
    </h1>

    {orders.length === 0 ? (
      <h2
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        No Orders Found
      </h2>
    ) : (
      orders.map((order) => (
        <div
          key={order._id}
          style={{
            background: "#f8fafc",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.15)",
              transition: "0.3s",
          }}
        >
          {/* Product Image */}

          <img
            src={
              productImages[
                order.productId?.name
              ]
            }
            alt={
              order.productId?.name
            }
            style={{
              width: "130px",
              height: "130px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />

          {/* Details */}

          <div style={{ flex: 1 }}>
            <h2
              style={{
                color: "#0f172a",
                marginBottom: "5px",
              }}
            >
              {order.productId?.name ||
                "Product Deleted"}
            </h2>

            <p
              style={{
                color: "#64748b",
                marginBottom: "8px",
              }}
            >
              {
                order.productId
                  ?.description
              }
            </p>

            <h2
              style={{
                color: "#f97316",
                marginBottom: "10px",
              }}
            >
              ₹{order.totalPrice}
            </h2>

           <p style={{ color: "#334155" }}>
  <strong>User:</strong> {order.userId?.name}
</p>

<p style={{ color: "#334155" }}>
  <strong>Email:</strong> {order.userId?.email}
</p>

<p style={{ color: "#334155" }}>
  <strong>Quantity:</strong> {order.quantity}
</p>

<p style={{ color: "#334155" }}>
  <strong>Address:</strong> {order.address}
</p>
          </div>

          {/* Status */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background:
                  order.status ===
                  "Delivered"
                    ? "#dcfce7"
                    : order.status ===
                      "Shipped"
                    ? "#dbeafe"
                    : "#fef3c7",

                color:
                  order.status ===
                  "Delivered"
                    ? "#15803d"
                    : order.status ===
                      "Shipped"
                    ? "#2563eb"
                    : "#b45309",

                padding:
                  "8px 16px",
                borderRadius:
                  "20px",
                fontWeight: "600",
              }}
            >
              {order.status}
            </div>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(
                  order._id,
                  e.target.value
                )
              }
              style={{
                padding: "10px",
                borderRadius:
                  "8px",
                border:
                  "1px solid #cbd5e1",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              <option>
                Pending
              </option>

              <option>
                Shipped
              </option>

              <option>
                Delivered
              </option>
            </select>
          </div>
        </div>
      ))
    )}
  </div>
);
  
}

export default AllOrders;