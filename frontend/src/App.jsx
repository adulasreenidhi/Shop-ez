import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AllProducts from "./pages/AllProducts";
import AllOrders from "./pages/AllOrders"
import Profile from "./pages/Profile";
import AdminRoute from "./components/AdminRoute";
import { useState } from "react";
import ProductDetails from "./pages/ProductDetails";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Wishlist from "./pages/Wishlist";

function App() {
  const isLoggedIn = localStorage.getItem("user");
   const [search, setSearch] = useState("");
  

  return (
    <BrowserRouter>
      {isLoggedIn && (
  <Navbar
    search={search}
    setSearch={setSearch}
  />
)}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
  path="/home"
  element={<Home search={search} />}
/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      

        <Route
          path="/add-product"
          element={
            <AdminRoute>
  <AddProduct />
</AdminRoute>
          }
        />

        <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

<Route
  path="/all-products"
  element={
    <AdminRoute>
      <AllProducts />
    </AdminRoute>
  }
/>

<Route
  path="/all-orders"
  element={
    <AdminRoute>
      <AllOrders />
    </AdminRoute>
  }
/>
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/product/:id"
  element={<ProductDetails />}
/>

<Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>

      </Routes>

  

      <ToastContainer
  position="top-right"
  autoClose={3000}
/>
    </BrowserRouter>
  );
}

export default App;