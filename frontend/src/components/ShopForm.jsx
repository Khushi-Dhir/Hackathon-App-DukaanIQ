import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShopForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    addressLine1: "",
    city: "",
    state: "",
    gst: "",
    shopType: "",
    licenseNo: "",
    adharcardNo: "",
    contactNumber: "",
  });

  // Redirect if shop already exists
  useEffect(() => {
    const shopId = localStorage.getItem("shopId");
    if (shopId) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitProfile = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("http://localhost:4000/api/shops/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {

        alert("Shop Registered Successfully");

        // store shop info
        localStorage.setItem("shopId", data.shop._id);
        localStorage.setItem("shopName", data.shop.name);
        localStorage.setItem("shopAddress", data.shop.addressLine1);

        navigate("/dashboard");

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (

    <div style={{ width: "500px", margin: "50px auto" }}>
      <center>
        <h1>Shop Registration</h1>
      </center>

      <div className="form-container">

        <form onSubmit={submitProfile}>

          <div className="form-group">
            <label>Shop Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group">
            <label>GST Number</label>
            <input
              type="text"
              name="gst"
              value={formData.gst}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group">
            <label>Shop Type</label>
            <select
              name="shopType"
              value={formData.shopType}
              onChange={onInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="General">General</option>
              <option value="Pharma">Pharma</option>
            </select>
          </div>

          <div className="form-group">
            <label>License Number</label>
            <input
              type="text"
              name="licenseNo"
              value={formData.licenseNo}
              onChange={onInputChange}
            />
          </div>

          <div className="form-group">
            <label>Aadhar Number</label>
            <input
              type="text"
              name="adharcardNo"
              value={formData.adharcardNo}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone No.</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={onInputChange}
              required
            />
          </div>

          <button className="submit-btn">
            Register Shop
          </button>

        </form>

      </div>

    </div>
  );
};

export default ShopForm;