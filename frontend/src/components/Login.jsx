import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const api = "http://localhost:4000/api/auth/login";
    const email = e.target.email.value;
    const password = e.target.password.value;

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem("token", data.token);
         navigate("/dashboard");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">

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
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="register-text">
            Don't have an account? <a href="/">Register</a>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;