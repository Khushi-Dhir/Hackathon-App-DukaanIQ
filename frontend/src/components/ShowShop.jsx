import React, { useEffect, useState } from "react";
import "./shopshow.css";

const ShowShop = () => {

  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {

    try {

      const res = await fetch("http://localhost:4000/api/shops");

      const data = await res.json();

      setShops(data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="shop-container">

      <h2>All Shops</h2>

      <table>

        <thead>

          <tr>
            <th>Shop Name</th>
            <th>Owner Name</th>
            <th>City</th>
            <th>State</th>
            <th>Type</th>
            <th>GST</th>
            <th>License</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {shops.map((shop) => (

            <tr key={shop._id}>

              <td>{shop.shopName}</td>

              <td>{shop.shopOwnerName}</td>

              <td>{shop.city}</td>

              <td>{shop.state}</td>

              <td>{shop.shopType}</td>

              <td>{shop.gstNo}</td>

              <td>{shop.licenseNo}</td>

              <td className={shop.status}>{shop.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
};

export default ShowShop;