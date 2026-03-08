import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>

      <div className="sidebar-header">
        <h2 className="logo">{collapsed ? "DQ" : "DUKAANIQ"}</h2>

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          ☰
        </button>
      </div>

      <ul className="sidebar-menu">

        <li>
          <Link to="/Dashboard">
            <span className="icon">📊</span>
            <span className="text">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/products">
            <span className="icon">➕</span>
            <span className="text">Add Products</span>
          </Link>
        </li>

        <li>
          <Link to="/batch">
            <span className="icon">📦</span>
            <span className="text">Add Batches</span>
          </Link>
        </li>

        <li>
          <Link to="/inventory">
            <span className="icon">📈</span>
            <span className="text">Inventory Analysis</span>
          </Link>
        </li>

        <li>
          <Link to="/ExpiryAlert">
            <span className="icon">⚠</span>
            <span className="text">Expiry Alerts</span>
          </Link>
        </li>

      </ul>

    </div>
  );
};

export default Sidebar;