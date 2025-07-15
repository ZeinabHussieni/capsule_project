import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Button from "../../Components/Shared/Button";
import "./capsuleHeader.css";

const CapsuleHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="publicCapsules-header">
      <h2 className="publicCapsules-title">Explore Public Capsules</h2>

      <Button
        className="filter-capsule-button"
        onClickListener={() => navigate("/filter")}
        text={
          <>
            <FaSearch className="search-icon" />
            <span style={{ marginLeft: "0.5rem" }}>Filter</span>
          </>
        }
      />
    </div>
  );
};

export default CapsuleHeader;
