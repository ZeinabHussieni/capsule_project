import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "../../Shared/Button";
import Input from "../../Shared/Input";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("DO Something");
  }, [email]);

  return (
  <>
    <form className="login-form">
      <h2 className="form-title">Login</h2>
   
      <label htmlFor="email">Email</label>

      <div className="input-wrapper">
        <FaUser className="input-icon" />
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
        <FaLock className="input-icon" />
       <Input
         name={"password"}
         hint={"123456"}
         onChangeListener={(e) => {
          setPassword(e.target.value);
        }}
       />
      </div>

     <Button
        text={"Login"}
        onClickListener={async () => {
          console.log(email, password);
          //here we can put the axios
          if (true) {
            // navigate to dashboard
            navigate("/homePage");
          } else {
            // display error on the ui
          }
        }}
      />    
    </form>
    </>
  );
};

export default LoginForm;
