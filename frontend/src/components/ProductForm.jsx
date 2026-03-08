import React, { useState } from "react";
import './product.css';
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    productType: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product Created Successfully");
        localStorage.setItem("productId", data.product._id);
        navigate('/batch')
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div>

      <h2>Add Product</h2>

      <form onSubmit={submitProduct}>

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Medicine / Grocery"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <select
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="Perishable">Perishable</option>
          <option value="Non-Perishable">Non-Perishable</option>
        </select>

        <button>Add Product</button>

      </form>
    </div>
  );
};

export default ProductForm;