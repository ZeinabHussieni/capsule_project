import React from "react";
import { Link } from "react-router-dom";
import Circles from "../../Components/Shared/Circles/Circles";
import LoginAnimations from "../../Components/auth/login/LoginAnimation";
import LoginCard from "../../Components/auth/login/LoginForm";
import "./login.css";

const Login = () => {
  return (
    <div className="login-container-wrapper">
   
      <Circles />

      <div className="login-title-wrapper">
        <h1 className="login-title">Your Time Capsule Awaits</h1>
      </div>

      <div className="login-container">
        <LoginAnimations />
        <LoginCard />
      </div>

      <div className="sign_up">
        <p>
          Don’t have an account?{" "}
          <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
