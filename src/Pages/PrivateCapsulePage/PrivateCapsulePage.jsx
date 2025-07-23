import React, { useEffect, useState } from "react";

import CapsuleHeader from "../../Components/privateCapsule/CapsuleHeader";
import UserCapsulesList from "../../Components/privateCapsule/UserCapsulesList ";
import "./privateCapsulePage.css";

const PrivateCapsulePage = () => {
  return (
    
    <div className="private-capsule-page">
      <CapsuleHeader />
      <UserCapsulesList />
    </div>
  );
};

export default PrivateCapsulePage;
