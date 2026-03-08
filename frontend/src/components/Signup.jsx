import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const api = "http://localhost:4000/api/auth/signup";

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {

      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {

        alert("Signup successful");

        localStorage.setItem("token", data.token);

        navigate("/shop");

      } else {

        alert(data.message || "Signup failed");

      }

    } catch (error) {

      console.error("Error:", error);

    }
  };

  return (

    <div className="signup-container">

      <div className="signup-card">

        <h1 className="signup-title">Create Account</h1>

        <form onSubmit={handleSubmit} className="signup-form">

          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            required
          />

          <button type="submit" className="signup-btn">
            Signup
          </button>

          <p className="login-text">
            Already have an account? <a href="/login">Login instead</a>
          </p>

        </form>

      </div>

    </div>

  );
};

export default Signup;