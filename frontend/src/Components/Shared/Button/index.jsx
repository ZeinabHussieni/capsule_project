import React from "react";
import "./styles.css";


const Button = ({ text, onClickListener,className  }) => {
  const btnClass = className ? className : "primary-button";
  return (
     <button className={btnClass} onClick={onClickListener}>
      {text}
    </button>
  );
};

export default Button;