import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import { toast } from "react-toastify";


function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        user
      );

      toast.success("Registration Successful");


      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);

      toast.error("Registration Failed");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #475569",
    fontSize: "16px",
    background: "#0f172a",
    color: "white",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e2e8f0",
      }}
    >
      <div
        style={{
          width: "450px",
          backgroundColor: "#0f172a",
          padding: "35px",
          borderRadius: "16px",
          boxShadow:
            "0 8px 25px rgba(0,0,0,0.3)",
        }}
      >
        {/* Heading */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "52px",
              margin: 0,
              fontWeight: "700",
            }}
          >
            🛍️ ShopEZ
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "22px",
              marginTop: "18px",
            }}
          >
            Create Your Account
          </p>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            Join thousands of shoppers on ShopEZ
          </p>
        </div>

        {/* Name */}

        <div
          style={{
            position: "relative",
            marginBottom: "15px",
          }}
        >
          <FaUser
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />

          <input
            type="text"
            placeholder="Full Name"
            value={user.name}
            onChange={(e) =>
              setUser({
                ...user,
                name: e.target.value,
              })
            }
            style={{
              ...inputStyle,
              paddingLeft: "45px",
            }}
          />
        </div>

        {/* Email */}

        <div
          style={{
            position: "relative",
            marginBottom: "15px",
          }}
        >
          <FaEnvelope
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            style={{
              ...inputStyle,
              paddingLeft: "45px",
            }}
          />
        </div>

        {/* Password */}

        <div
          style={{
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <FaLock
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
            style={{
              ...inputStyle,
              paddingLeft: "45px",
            }}
          />
        </div>

        {/* Register Button */}

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#f97316",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "18px",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.background =
              "#ea580c")
          }
          onMouseLeave={(e) =>
            (e.target.style.background =
              "#f97316")
          }
        >
          🚀 Create Account
        </button>

        {/* Login Link */}

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "white",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#f97316",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign In →
          </Link>
        </p>

        {/* Footer */}

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          © 2026 ShopEZ • MERN E-Commerce
        </p>
      </div>
    </div>
  );
}

export default Register;