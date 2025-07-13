import React from "react";
import { Link } from "react-router-dom"; 
import "../../Styles/SideBar.css";


const SideBar = () => {
  return (
    <div className="Sidebar">
      <div className="sidebar-links">
        <Link to="/homePage"><p>Home</p></Link>
        <Link to="/userCapsule"><p>View Your Capsules</p></Link>
        <Link to="/usersCapsule"><p>View Capsules</p></Link>
      </div>

      <div className="sidebar-logout">
        <Link to="/logout"><p>Log Out</p></Link>
      </div>
    </div>
  );
};


export default SideBar;