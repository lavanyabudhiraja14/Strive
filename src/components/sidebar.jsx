import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import defaultPfp from "../assets/Default_pfp.jpg";
import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  FaHome,
  FaBullseye,
  FaBook,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
  
} from "react-icons/fa";

function Sidebar() {
  const [user, setUser] = useState(null);
const [island, setIsland] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const res = await API.get("/auth/me");
  
      setUser(res.data.user);
      setIsland(res.data.island);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="logo">
        <span className="logo-icon">🌱</span>
        <h1>STRIVE</h1>
      </div>

      <div className="divider"></div>

      <nav className="nav-links">

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/goals"
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <FaBullseye />
          <span>Goals</span>
        </NavLink>

        <NavLink
          to="/skills"
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <FaBook />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <FaCalendarAlt />
          <span>Calendar</span>
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <FaChartBar />
          <span>Progress</span>
        </NavLink>

      </nav>

      <div className="divider"></div>

      <nav className="nav-links">

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

      <div className="sidebar-footer">

        <p className="footer-title">
          CURRENT STREAK
        </p>

        <div className="streak-card">
  🔥 {island?.currentStreak || 0} Days
</div>

        <div className="profile">

        <img
  src={
    user?.profilePicture ||
    defaultPfp
  }
  alt="profile"
/>

          <div>
            <h4>
              {user?.name || "User"}
            </h4>

            <p>
              {user?.email}
            </p>
          </div>

        </div>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;