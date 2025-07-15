import React from "react";
import { Link, useNavigate, Outlet } from "react-router-dom"; 
import "./sideBar.css";


const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   // localStorage.removeItem("token");
   // sessionStorage.clear();
   navigate("/login");
  };

  return (
    <div className="Sidebar">
      <div className="sidebar-links">
        <Link to="/homePage"><p>Home</p></Link>
        <Link to="/usercapsule"><p>View Your Capsules</p></Link>
        <Link to="/publiccapsules"><p>View Capsules</p></Link>
      </div>

      <div className="sidebar-logout">
        <a onClick={handleLogout}>LogOut</a>
      </div>
      
    </div>
  );
};


export default SideBar;