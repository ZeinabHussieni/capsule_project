import React from "react";
import { useNavigate } from "react-router-dom";
import UserCountdown from "../privateCapsule/UserCountdown";
import Lottie from "lottie-react";
import gift from "../../../src/animations/gift.json";
import "./surpriseCapsuleCard.css";

const SurpriseCapsuleCard = ({ capsule, onDelete }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(capsule.reveal_date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      className="user-surprise-card"
      style={{
        border: `2px solid ${capsule.color || "rgba(77, 110, 205, 0.2)"}`,
      }}
    >
      <div className="card-header-surprise">
        <Lottie animationData={gift} loop={true} className="surprise-animation" />
        <h3 className="card-title-surprise">Surprise mood</h3>
      </div>

      <div className="card-body-surprise">
        <div className="card-info-surprise">
          <img
            src="/icon/calender.svg"
            alt="Calendar Icon"
            className="input-icon"
          />
          <span className="card-label-surprise">Reveal Date:</span>
          <span className="value">{formattedDate}</span>
        </div>

        <div className="card-info-surprise">
          <img src="/icon/clock.svg" alt="Clock Icon" className="input-icon" />
          <span className="card-label-surprise">Time remaining:</span>
          <UserCountdown targetDate={capsule.reveal_date} />
        </div>
      </div>
    </div>
  );
};

export default SurpriseCapsuleCard;
