import React from "react";
import Lottie from "lottie-react";
import Animation from "../../../animations/register.json";


const RegisterAnimation = () => {
  return (
    <div className="Animation">
     <Lottie 
      animationData={Animation} 
      loop={true}
     />
    </div>
  );
};

export default RegisterAnimation;
