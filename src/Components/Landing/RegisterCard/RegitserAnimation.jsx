import React from "react";
import Lottie from "lottie-react";
import RegisterAnimation from "../../../animations/register.json";


const RegisterAnimations = () => {
  return (
    <div className="Animation">

     <Lottie 
      animationData={RegisterAnimation} 
      loop={true}
     />

    </div>
  );
};

export default RegisterAnimations;
