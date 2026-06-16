import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHome , FaShoppingCart , FaBox , FaUser , FaCog } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function Navbar({
  search,
  setSearch,
})  {
  const navigate = useNavigate();
  const [showAdminMenu, setShowAdminMenu] =
  useState(false);
 

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login" ;
  };

  const userData = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  display: "flex" ,
  alignItems: "center" ,
  gap: "8px"
};

  return (
   <nav style={{
    height: "60px" ,
  display: "flex",
  alignItems: "center",
  padding: "16px 30px",
  backgroundColor: "#0f172a",
}}>
      {/* Logo */}

  <div 
  style={{
    display: "flex",
    alignItems: "center",
    gap: "80px",
  }}
>
  <h2
    style={{
      margin: 0 ,
      color: "#white" , 
      fontSize: "45px" ,
      fontWeight: "730" ,
    
    }}
    > 
    Shop
    <span style={{ color: "#f59e0b"}} >
      EZ
    </span>
    </h2>

<div
  style={{
    position: "relative",
    width: "500px",
    marginLeft: "130px"
  }}
>
  <FaSearch
    style={{
      position: "absolute",
      left: "18px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af",
      fontSize: "16px",
    }}
  />

 <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
    width: "100%",
    padding: "14px 20px 14px 45px",
    borderRadius: "12px",
    border: "1px solid #94a3b8",
    background: "#1e293b",
    color: "white",
    fontSize: "16px",
    outline: "none",
  }}
/>
</div>
</div>

      {/* Navigation */}

    <div
  style={{
    display: "flex",
    gap: "12px",
    alignItems: "center",
    marginLeft: "auto",
  }}
>
      
        <Link
          to="/home"
          style={linkStyle}
        > <FaHome/>
          Home
        </Link>

        <Link to="/cart" style={linkStyle}>
        <FaShoppingCart/>
   
</Link>

<Link
  to="/wishlist"
  style={linkStyle}
>
  <FaHeart />
  
</Link>

        <Link
          to="/orders"
          style={linkStyle}
        > <FaBox/>
          Orders
        </Link>

        <Link
          to="/profile"
          style={linkStyle}
        > <FaUser/>
          Profile
        </Link>

        {userData?.user?.role === "ADMIN" && (
  <div
    style={{
      position: "relative",
    }}
  >
    <span
      onClick={() =>
        setShowAdminMenu(!showAdminMenu)
      }
      style={{
        color: "white",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "500",
      }}
    > 
      Admin ▼
      
    </span>

    {showAdminMenu && (
      <div
        style={{
          position: "absolute",
          top: "35px",
          right: 0,
          backgroundColor: "#1f2937",
          borderRadius: "8px",
          padding: "10px",
          minWidth: "180px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 1000,
        }}
      >
        <Link
          to="/admin"
          style={linkStyle}
        >
          Dashboard
        </Link>

        <Link
          to="/add-product"
          style={linkStyle}
        >
          Add Product
        </Link>

        <Link
          to="/all-products"
          style={linkStyle}
        >
          All Products
        </Link>

        <Link
          to="/all-orders"
          style={linkStyle}
        >
          All Orders
        </Link>
      </div>
    )}
  </div>
)}
            

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;