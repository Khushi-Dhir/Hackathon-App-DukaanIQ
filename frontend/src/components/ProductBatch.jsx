import React, { useState } from "react";

const ProductBatch = () => {

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    productType: "",
    batchNo: "",
    quantity: "",
    mrp: "",
    selling: "",
    expiryDate: "",
    shopId: "YOUR_SHOP_ID_HERE"
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const submitProductBatch = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:4000/api/products/addproductbatch",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Product & Batch Added Successfully");
        console.log(data);

        // reset form safely
        setFormData({
          productName: "",
          category: "",
          productType: "",
          batchNo: "",
          quantity: "",
          mrp: "",
          selling: "",
          expiryDate: "",
          shopId: localStorage.getItem("shopId") 
        });

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);
      alert("Server error");

    }

  };

  return (

    <div className="product-container">

      <h2>Add Product</h2>

      <form onSubmit={submitProductBatch}>

        <h3>Product Details</h3>

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
          placeholder="Category"
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

        <h3>Batch Details</h3>

        <input
          type="text"
          name="batchNo"
          placeholder="Batch Number"
          value={formData.batchNo}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="mrp"
          placeholder="MRP"
          value={formData.mrp}
          onChange={handleChange}
        />

        <input
          type="number"
          name="selling"
          placeholder="Selling Price"
          value={formData.selling}
          onChange={handleChange}
        />

        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  );
};

export default ProductBatch;