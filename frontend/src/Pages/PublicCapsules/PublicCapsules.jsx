import React from "react";
import PublicCapsulesList from "../../Components/publicCapsule/PublicCapsulesList";
import Header from "../../Components/publicCapsule/CapsuleHeader"
const PublicCapsules = () => {

  return (
    <>
      <Header/>
     <div className="capsules-container">     
      <PublicCapsulesList />
    </div>
    </>
  );
};

export default PublicCapsules;
