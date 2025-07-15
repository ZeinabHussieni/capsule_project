import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import Button from "../../Components/Shared/Button";
import "./capsuleHeader.css";

const CapsuleHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="capsules-header">
      <h2 className="capsule-title">Your Capsules</h2>

      <Button
        className="new-capsule-button"
        onClickListener={() => navigate("/createCapsule")}
        text={
          <>
            <FaPlus className="input-icon" />
            <span style={{ marginLeft: "0.5rem" }}>New Capsule</span>
          </>
        }
      />
    </div>
  );
};

export default CapsuleHeader;
