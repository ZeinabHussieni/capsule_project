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
            <img src="/icon/plus.svg" alt="Title Icon" className="input-icon" />
            <span>New Capsule</span>
          </>
        }
      />
    </div>
  );
};

export default CapsuleHeader;
