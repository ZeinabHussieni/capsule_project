import React from "react";
import { FaUser, FaLock } from "react-icons/fa";

const LoginCard = ({ email, setEmail, password, setPassword, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="form-title">Login</h2>

   
      <label htmlFor="email">Email</label>
      <div className="input-wrapper">
        <FaUser className="input-icon" />
        <input
          id="email" type="email" placeholder="Enter your email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      
      <label htmlFor="password">Password</label>
      <div className="input-wrapper">
        <FaLock className="input-icon" />
        <input id="password" type="password" placeholder="Enter your password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="login-btn">Login</button>
    </form>
  );
};

export default LoginCard;
