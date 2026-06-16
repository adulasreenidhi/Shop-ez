import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaRupeeSign,
} from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const userData = JSON.parse(
        localStorage.getItem("user")
      );

      const token = userData.token;

      const res = await axios.get(
        "http://localhost:5000/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const cardStyle = {
    background: "#1e293b",
    color: "white",
    padding: "30px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow:
      "0 10px 25px rgba(0,0,0,0.25)",
  };

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "#3b475d",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "60px",
          marginBottom: "50px",
        }}
      >
        Admin Dashboard
      </h1>

      {/* Stats Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <div style={cardStyle}>
          <FaUsers
            size={40}
            style={{ marginBottom: "10px" }}
          />

          <h2>Total Users</h2>

          <h1>{stats.totalUsers}</h1>
        </div>

        <div style={cardStyle}>
          <FaBoxOpen
            size={40}
            style={{ marginBottom: "10px" }}
          />

          <h2>Products</h2>

          <h1>{stats.totalProducts}</h1>
        </div>

        <div style={cardStyle}>
          <FaShoppingCart
            size={40}
            style={{ marginBottom: "10px" }}
          />

          <h2>Orders</h2>

          <h1>{stats.totalOrders}</h1>
        </div>
             { /*
        <div style={cardStyle}>
          <FaRupeeSign
            size={40}
            style={{ marginBottom: "10px" }}
          />

          <h2>Revenue</h2>

          <h1>₹0</h1>
        </div>
        */ }
      </div>

      {/* Quick Actions */}

      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "white",
            marginBottom: "25px",
          }}
        >
          Quick Actions
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            style={buttonStyle}
            onClick={() =>
              navigate("/add-product")
            }
          >
            ➕ Add Product
          </button>

          <button
            style={buttonStyle}
            onClick={() =>
              navigate("/all-products")
            }
          >
            📦 View Products
          </button>

          <button
            style={buttonStyle}
            onClick={() =>
              navigate("/all-orders")
            }
          >
            🛒 View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;