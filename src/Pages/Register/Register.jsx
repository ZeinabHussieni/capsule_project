import React, { useState } from "react";
import RegisterCard from "../../Components/Landing/RegisterCard/RegisterCard";
import RegisterAnimations from "../../Components/Landing/RegisterCard/RegitserAnimation";
import "./Register.css"


const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", firstName, lastName, email, password);
  };

  return (
    <div className="register-container-wrapper">
        <div className="circles circle1"></div>
        <div className="circles circle2"></div>
        <div className="circles circle3"></div>

       <div className="register-title-wrapper">
         <h1 className="register-title">Start your journey to the future</h1>
       </div>
       <div className="register-container">
         <RegisterCard
             firstName={firstName}
             setFirstName={setFirstName}
             lastName={lastName}
             setLastName={setLastName}
             email={email}
             setEmail={setEmail}
             password={password}
             setPassword={setPassword}
             handleSubmit={handleSubmit}
          />
          <RegisterAnimations/>
      </div>
      <div className="back">
        <p>Already have an account?<a href="/login">Login</a></p>
      </div>
   </div>


  );
};

export default Login;
