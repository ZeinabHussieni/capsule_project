import React from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../../animations/loginn.json";


const LoginAnimation = () => {
  return (
    <div className="login-animation">

     <Lottie 
      animationData={loginAnimation} 
      loop={true}
     />

    </div>
  );
};

export default LoginAnimation;
