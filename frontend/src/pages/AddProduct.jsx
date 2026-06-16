import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] =
    useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("");

  const addProduct = async () => {
    try {
      const userData = JSON.parse(
        localStorage.getItem("user")
      );

      const token = userData.token;

      await axios.post(
        "http://localhost:5000/api/products",
        {
          name,
          description,
          price,
          category,
          image,
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Added Successfully");

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");
      setStock("");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed To Add Product");
    }
  };

  const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "1px solid #475569",
  background: "#0f172a",
  color: "white",
  fontSize: "15px",
  outline: "none",
};

  return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      padding: "40px",
      background: "#3b475d",
    minHeight: "100vh",
    }}
  >
    <div
      style={{
       width: "760px",
background: "#1e293b",
        padding: "30px",
        borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}
    >
      <h1
  style={{
    textAlign: "center",
    fontSize: "52px",
    fontWeight: "700",
    color: "white",
    marginBottom: "25px",
  }}
>
  ➕ Add Product
</h1>

      {/* Preview */}

      <div
        style={{
  width: "100%",
  height: "180px",
  background: "#334155",
  border: "2px dashed #64748b",
  borderRadius: "12px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "20px",
  color: "#cbd5e1",
}}
      >
        📷 Product Preview
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          style={inputStyle}
        />
      </div>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        style={inputStyle}
      />

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          style={inputStyle}
        />
      </div>

      <input
        type="text"
        placeholder="Image URL (Optional)"
        value={image}
        onChange={(e) =>
          setImage(e.target.value)
        }
        style={inputStyle}
      />

      <button
  onClick={addProduct}
  onMouseEnter={(e) =>
    (e.target.style.backgroundColor = "#ea580c")
  }
  onMouseLeave={(e) =>
    (e.target.style.backgroundColor = "#f97316")
  }
  style={{
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    backgroundColor: "#f97316",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  }}
>
  Add Product
</button>
    </div>
  </div>
);
}

export default AddProduct;