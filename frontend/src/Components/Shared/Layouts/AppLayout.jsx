import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";
import "./AppLayout.css"; 

const AppLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="page-wrapper">
        <SideBar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
