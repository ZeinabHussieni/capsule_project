import React from "react";
import capsules from "../../fakeCapsules";
import PublicCapsuleCard from "../../Components/publicCapsule/CapsuleCard"
import Header from "../../Components/publicCapsule/CapsuleHeader"
const PublicCapsules = () => {
  const publicCapsules = capsules.filter(c => c.type === "public");

  return (
    <>
      <Header/>
     <div className="capsules-container">     
      {publicCapsules.map(capsule => (
        <PublicCapsuleCard key={capsule.id} capsule={capsule} />
      ))}
    </div>
    </>
  );
};

export default PublicCapsules;
