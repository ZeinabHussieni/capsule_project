import React from "react";
import "./styles.css";

const Input = ({ name, hint, required, onChangeListener }) => {
  return (
    <div className="InputStyle">
     <input
       type="text"
       name={name}
       placeholder={hint}
       className="primary-input"
       required={required}
       onChange={onChangeListener}
    />
    </div>
  );
};

export default Input;
