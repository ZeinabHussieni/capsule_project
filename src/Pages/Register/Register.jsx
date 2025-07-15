import React from "react";
import { Link } from "react-router-dom";
import Circles from "../../Components/Shared/Circles/Circles";
import RegisterCard from "../../Components/auth/register/RegisterForm";
import RegisterAnimations from "../../Components/auth/register/RegisterAnimation";
import "./register.css";

const Register = () => {
  return (
    <div className="register-container-wrapper">
 
      <Circles />

      <div className="register-title-wrapper">
        <h1 className="register-title">Start your journey to the future</h1>
      </div>

      <div className="register-container">
        <RegisterCard />
        <RegisterAnimations />
      </div>

      <div className="back">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
