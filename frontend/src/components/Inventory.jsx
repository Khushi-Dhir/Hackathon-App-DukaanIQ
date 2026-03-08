import React, { useEffect, useState } from "react";
import "./inventory.css";

const Inventory = () => {

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {

    try {

      const res = await fetch("http://localhost:4000/api/inventory/analytics", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();

      let token = localStorage.getItem("token")
      console.log(token)
      console.log("API Response:", data);

      // use analytics array
      if (Array.isArray(data.totalStockPerProduct)) {
        setInventory(data.totalStockPerProduct);
      } else {
        setInventory([]);
      }

    } catch (error) {
      console.log(error);
    }

  };

  const getStockStatus = (quantity) => {
    if (quantity < 10) return "low-stock";
    return "ok";
  };

  return (

    <div className="inventory-container">

      <h2>Inventory</h2>

      <table>

        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Product Type</th>
            <th>Total Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {inventory.map((item) => (

            <tr key={item.productId}>

              <td>{item.productName}</td>

              <td>{item.category}</td>

              <td>{item.productType}</td>

              <td>{item.totalQuantity}</td>

              <td className={getStockStatus(item.totalQuantity)}>
                {item.totalQuantity < 10 ? "Low Stock" : "OK"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Inventory;