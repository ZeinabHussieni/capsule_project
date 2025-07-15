import React from "react";
import capsules from "../../fakeCapsules";
import CapsuleHeader from "../../Components/privateCapsule/CapsuleHeader";
import CapsuleCard from "../../Components/privateCapsule/CapsuleCard";
import "./privateCapsulePage.css";

const PrivateCapsulePage = () => {
  const userCapsules = capsules.filter(c => c.type === "user");

  return (
    <div className="private-capsule-page">
      <CapsuleHeader />

      <div className="capsules-container">
       {userCapsules.map(capsule => (
         <CapsuleCard key={capsule.id} capsule={capsule} />
         ))}
      </div>
    </div>
  );
};

export default PrivateCapsulePage;
