import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Button from "../../Shared/Button";
import Input from "../../Shared/Input";

const RegisterForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("DO Something");
  }, [firstName]);

  const handleRegister = async () => {
    console.log(firstName, lastName, email, password);
    // TODO: Add axios request here

    if (true) {
      navigate("/homePage");
    } else {
      // TODO: handle error
    }
  };

  return (
    <form className="register-form">
      <h2 className="form-title">Create your account</h2>

      <div className="name-row">
        <div className="input-group">
          <label htmlFor="firstName">First Name</label>
          <div className="firstlast">
            <FaUser className="input-icon" />
            <Input
              name="firstName"
              hint="e.g Zeinab"
              onChangeListener={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="lastName">Last Name</label>
          <div className="firstlast">
            <FaUser className="input-icon" />
            <Input
              name="lastName"
              hint="e.g Hassan"
              onChangeListener={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <label htmlFor="email">Email</label>
      <div className="input-wrapper">
        <FaUser className="input-icon" />
        <Input
          name="email"
          hint="john@example.com"
          onChangeListener={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>

      <label htmlFor="password">Password</label>
      <div className="input-wrapper">
        <FaLock className="input-icon" />
        <Input
          name="password"
          hint="123456"
          onChangeListener={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>

      <Button text="Register" onClickListener={handleRegister} />
    </form>
  );
};

export default RegisterForm;
