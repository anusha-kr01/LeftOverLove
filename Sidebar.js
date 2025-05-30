import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <nav className="sidebar">
      <h2 >🥡 FoodSaver</h2>
      <NavLink to="/dashboard">🏠 Dashboard</NavLink>
      <NavLink to="/donor">🧑‍🌾 Donor</NavLink>
      <NavLink to="/receiver">🤝 Receiver</NavLink>
      <NavLink to="/organization">🏢 Organization</NavLink>
      <NavLink to="/volunteer">🚗 Volunteer</NavLink>
      <NavLink to="/feedback">💬 Feedback</NavLink>
      <NavLink to="/support">📞 Support</NavLink>
      <NavLink to="/settings">⚙️ Settings</NavLink>
      <button onClick={handleLogout} className="logout-btn">🚪 Logout</button>
    </nav>
  );
}

export default Sidebar;