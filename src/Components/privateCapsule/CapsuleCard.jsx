import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarDay } from "react-icons/fa";
import UserCountdown from "./UserCountdown";
import Button from "../../Components/Shared/Button/index";
import "./capsuleCard.css";

const CapsuleCard = ({ capsule }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(capsule.revealDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="user-card">

      <div className="card-header">
        <h3 className="card-title">{capsule.title}</h3>
      </div>

      <div className="card-body">
        <div className="card-info">
          <FaCalendarDay className="input-icon" />
          <span className="card-label">Reveal Date:</span>
          <span className="value">{formattedDate}</span>
        </div>

        <div className="card-info">
          <span className="card-label">Time remaining:</span>
          <UserCountdown targetDate={capsule.revealDate} />
        </div>

        <div className="card-buttons">
          <Button
            className="learn-more"
            text="Learn More"
            onClickListener={() =>
              navigate("/capsulesDetails", { state: { capsule } })
            }
          />
          <Button
            className="delete-button"
            text="Delete"
            onClickListener={() => navigate("/userprivateCard")}
          />
        </div>
      </div>
    </div>
  );
};

export default CapsuleCard;
