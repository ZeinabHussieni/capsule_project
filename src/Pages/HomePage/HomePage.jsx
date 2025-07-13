import React from "react";
import SideBar from "../../Components/Shared/SideBar";
import Navbar from "../../Components/Shared/Navbar";
import Welcome from "../../Components/Landing/Welcome";
import FeaturesSection from "../../Components/Landing/FeaturesSection";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <div className="page-wrapper">
        <SideBar />

        <main className="main-content">
          <Welcome />
          <FeaturesSection />
        </main>
      </div>
    </>
  );
};

export default HomePage;
