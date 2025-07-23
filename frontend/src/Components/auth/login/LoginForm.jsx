import React from "react";
import {useState } from "react";
import Button from "../../Shared/Button";
import Input from "../../Shared/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
   e.preventDefault();

   try {
    const response = await axios.post("http://127.0.0.1:8000/api/v0.1/guest/login", {
      email,
      password,
    });

    const token = response.data.payload.token;

    localStorage.setItem("token", token);

    setSuccessMessage("Login successful");
    navigate("/homePage");
   } catch (error) {
      setSuccessMessage("Login Failed");
    }
  };

  return (
  <>
    <form className="login-form">
      <h2 className="form-title">Login</h2>
      
      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
  
      <label htmlFor="email">Email</label>

      <div className="input-wrapper">
        <img src="/icon/person.svg" alt="Title Icon" className="input-icon" />
        <Input
          name={"email"}
          hint={"john@example.com"}
          onChangeListener={(e) => {
           setEmail(e.target.value);
         }}
       />
      </div>

      <label htmlFor="password">Password</label>

      <div className="input-wrapper">
      <img src="/icon/lock.svg" alt="Title Icon" className="input-icon" />
       <Input
         type="password"
         name={"password"}
         hint={"123456"}
         onChangeListener={(e) => {
          setPassword(e.target.value);
        }}
       />
      </div>

     <Button text="Login" onClickListener={handleLogin} />    
    </form>
    </>
  );
};

export default LoginForm;
