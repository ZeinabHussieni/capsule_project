import React from "react";
import Lottie from "lottie-react";
import loginAnimation from "../../../animations/loginn.json";


const LoginAnimations = () => {
  return (
    <div className="Animation">

     <Lottie 
      animationData={loginAnimation} 
      loop={true}
     />

    </div>
  );
};

export default LoginAnimations;
