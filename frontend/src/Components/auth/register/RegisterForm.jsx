import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../Shared/Button";
import Input from "../../Shared/Input";


const RegisterForm = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  


  const handleRegister = async (e) => {

    e.preventDefault();
    try{
      const response = await axios.post("http://127.0.0.1:8000/api/v0.1/guest/register",{
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });
     
      setSuccessMessage("Registration successful");
      navigate("/homePage")
    } catch(error){
      setSuccessMessage("Failed to register");
    }
  };

  return (
    <form className="register-form">
      <h2 className="form-title">Create your account</h2>

      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}

      <div className="name-row">
        <div className="input-group">
          <label htmlFor="firstName">First Name</label>
          <div className="firstlast">
            <img src="/icon/person.svg" alt="Title Icon" className="input-icon" />
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
            <img src="/icon/person.svg" alt="Title Icon" className="input-icon" />
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
        <img src="/icon/person.svg" alt="Title Icon" className="input-icon" />
        <Input
          name="email"
          hint="john@example.com"
          onChangeListener={(e) => setEmail(e.target.value)}
          className="input"
        />
      </div>

      <label htmlFor="password">Password</label>
      <div className="input-wrapper">
        <img src="/icon/lock.svg" alt="Title Icon" className="input-icon" />
        <Input
          type="password"
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
