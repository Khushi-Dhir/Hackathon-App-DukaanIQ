import React from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();   // forget everything
    navigate("/login");
  };

  return (
    <div className="navbar">

      <h3 className="logo">DukaanIQ</h3>

      <div className="nav-links">

        <button onClick={() => navigate("/")}>
          Home
        </button>

        {token && (
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        )}

        {!token && (
          <>
            <button onClick={() => navigate("/login")}>
              Login
            </button>

            <button onClick={() => navigate("/signup")}>
              Signup
            </button>
          </>
        )}

        {token && (
          <button onClick={logout}>
            Logout
          </button>
        )}

      </div>

    </div>
  );
};

export default Navbar;