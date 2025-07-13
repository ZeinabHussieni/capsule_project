import React, { useState } from "react";
import LoginCard from "../../Components/Landing/LoginCard/LoginCard";
import LoginAnimations from "../../Components/Landing/LoginCard/LoginAnimations";
import "./Login.css"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="login-container-wrapper">
        <div className="circles circle1"></div>
        <div className="circles circle2"></div>
        <div className="circles circle3"></div>

       <div className="login-title-wrapper">
         <h1 className="login-title">Your Time Capsule Awaits</h1>
       </div>
       <div className="login-container">
         <LoginAnimations/>
         <LoginCard
             email={email}
             setEmail={setEmail}
             password={password}
             setPassword={setPassword}
             handleSubmit={handleSubmit}
          />
      </div>
      <div className="sign_up">
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
   </div>


  );
};

export default Login;
