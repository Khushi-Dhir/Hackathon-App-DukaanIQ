import React from "react";
import Sidebar from "../components/Sidebar";
import "./dashboard.css";

const Dashboard = () => {

  const shopName = localStorage.getItem("shopName");
  const shopAddress = localStorage.getItem("shopAddress");

  const products = [
    { name: "Paracetamol", category: "Medicine", type: "Perishable" },
    { name: "Milk", category: "Grocery", type: "Perishable" },
    { name: "Soap", category: "Cosmetic", type: "Non-Perishable" }
  ];

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">

        {/* Shop Info */}
        <div className="shop-card">
          <h2>{shopName}</h2>
          <p>{shopAddress}</p>
        </div>


        {/* Quick Stats */}
        <div className="stats-container">

          <div className="stat-box">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>

          <div className="stat-box">
            <h3>
              {products.filter(p => p.type === "Perishable").length}
            </h3>
            <p>Perishable</p>
          </div>

          <div className="stat-box">
            <h3>
              {products.filter(p => p.type === "Non-Perishable").length}
            </h3>
            <p>Non-Perishable</p>
          </div>

        </div>


        {/* Product Table */}
        <div className="table-section">

          <h3>Recent Products</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p, index) => (
                <tr key={index}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.type}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>


        {/* Alerts Section */}
        <div className="alerts">

          <h3>Alerts</h3>

          <div className="alert-box">
            ⚠ Expiry alerts will appear here
          </div>

          <div className="alert-box">
            📦 Low stock alerts will appear here
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;