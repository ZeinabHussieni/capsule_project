import React from "react";
import { FaUser, FaLock } from "react-icons/fa";

const RegisterCard = ({firstName, setFirstName,lastName, setLastName, email, setEmail, password, setPassword, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2 className="form-title">Create your account</h2>

     <div className="name-row">
        <div className="input-group">
              <label htmlFor="firstName">First Name</label>
              <div className="firstlast">
                 <FaUser className="input-icon" />
                 <input
                     id="firstName" type="firstName" placeholder="e.g zeinab"
                     value={firstName} onChange={(e) => setFirstName(e.target.value)}
                     required
                    />
             </div>
        </div>
        <div className="input-group">
              <label htmlFor="lastName">Last Name</label>
              <div className="firstlast">
                  <FaUser className="input-icon" />
                  <input
                     id="lastName" type="lastName" placeholder="e.g Kassem"
                     value={lastName} onChange={(e) => setLastName(e.target.value)}
                     required
                   />
              </div>
            </div>
        </div>
   
      <label htmlFor="email">Email</label>
      <div className="input-wrapper">
        <FaUser className="input-icon" />
        <input
          id="email" type="email" placeholder="Enter your email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
      </div>

      
      <label htmlFor="password">Password</label>
      <div className="input-wrapper">
        <FaLock className="input-icon" />
        <input id="password" type="password" placeholder="Enter your password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
      </div>

      <button type="submit" className="register-btn">Register</button>
    </form>
  );
};

export default RegisterCard;
