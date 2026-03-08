import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="home-container">

      
      <main className="main">
        <div className="hero">
          <h1>Welcome to the Future of Shopping</h1>

          <p>
            Connect with local shops and pharmacies instantly.
            <br />
            Streamline your inventory and sales.
          </p>

          <button
            className="btn-primary"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </main>

      <footer className="footer">
        © 2023 Hackathon Competition Project. All rights reserved.
      </footer>

    </div>
  );
};

export default Home;