import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./batch.css";


const BatchForm = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    prices: {
      costPrice: "",
      sellingPrice: ""
    },
    expiryDate: ""
  });

  const [batchNo, setBatchNo] = useState("");

  useEffect(() => {

    const shopId = localStorage.getItem("shopId");

    // Redirect if shopId not found
    if (!shopId) {
      alert("Please create or select a shop first.");
      navigate("/shop");
      return;
    }

    fetchProducts();
    setBatchNo(generateBatchNo());

  }, []);

  const fetchProducts = async () => {
    try {

      const res = await fetch("http://localhost:4000/api/products/getproduct", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      console.log("Products API Response:", data);

      const productList = Array.isArray(data) ? data : data.data;

      if (Array.isArray(productList)) {
        setProducts(productList);
      } else {
        setProducts([]);
      }

    } catch (err) {
      console.log("Product fetch error:", err);
    }
  };

  const generateBatchNo = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const rand = Math.floor(100 + Math.random() * 900);
    return `BATCH-${date}-${rand}`;
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "costPrice" || name === "sellingPrice") {

      setFormData({
        ...formData,
        prices: {
          ...formData.prices,
          [name]: value
        }
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });

    }
  };

  const submitBatch = async (e) => {

    e.preventDefault();

    const batchData = {
      shop: localStorage.getItem("shopId"),
      productId: formData.productId,
      batchNo: batchNo,
      quantity: Number(formData.quantity),
      prices: {
        costPrice: Number(formData.prices.costPrice),
        sellingPrice: Number(formData.prices.sellingPrice)
      },
      expiryDate: formData.expiryDate
    };

    console.log("Sending batch:", batchData);

    try {

      const response = await fetch("http://localhost:4000/api/batches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(batchData)
      });

      const data = await response.json();

      if (response.ok) {

        alert("Batch Created Successfully");

        setFormData({
          productId: "",
          quantity: "",
          prices: {
            costPrice: "",
            sellingPrice: ""
          },
          expiryDate: ""
        });
        navigate("/inventory")
        setBatchNo(generateBatchNo());

      } else {
        alert(data.message || "Failed to create batch");
      }

    } catch (error) {
      console.error("Batch creation error:", error);
      alert("Error creating batch");
    }
  };

  return (

    <div>

      <h2>Add Product Batch</h2>

      <form onSubmit={submitBatch}>

        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          required
        >

          <option value="">Select Product</option>

          {products.length > 0 &&
            products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.productName}
              </option>
            ))
          }

        </select>

        <input
          type="text"
          value={batchNo}
          readOnly
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
          name="costPrice"
          placeholder="Cost Price"
          value={formData.prices.costPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={formData.prices.sellingPrice}
          onChange={handleChange}
        />

        <label>Expiry Date</label>

        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Batch</button>

      </form>

    </div>
  );
};

export default BatchForm;