import React from "react";
import SideBar from "../../Components/Shared/SideBar";
import Navbar from "../../Components/Shared/Navbar";
import Welcome from "../../Components/Landing/Welcome";
import "./Dashbored.css"


const HomePage = () => {

    return(
        <div>
        <Navbar/>
<div className="page-wrapper">
  <SideBar />
  <div className="main-content">
    <Welcome />
    {/* other stuff */}
  </div>
  </div>
</div>

    );


};

export default HomePage;