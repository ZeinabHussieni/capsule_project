import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarDay, FaMapMarkerAlt, FaSmile } from "react-icons/fa";

import Button from "../../Components/Shared/Button/index";
import "./capsuleCard.css";

const CapsuleCard = ({ capsule }) => {
  const navigate = useNavigate();
  if (!capsule) return null;

  const imageUrl = capsule.coverImage;

  const formattedDate = new Date(capsule.revealDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="public-card">
      {imageUrl && (
        <img src={imageUrl} alt="Capsule" className="public-card-image" />
      )}

      <div className="public-card-body">
        <h3 className="public-card-title">{capsule.title}</h3>

        <div className="public-card-info-row">
          <FaCalendarDay className="public-card-icon" />
          <p>
            <strong>Reveal Date:</strong> {formattedDate}
          </p>
        </div>

        <div className="public-card-info-row">
          <FaMapMarkerAlt className="public-card-icon" />
          <p>
            <strong>Location:</strong> {capsule.location}
          </p>
        </div>

        <div className="public-card-info-row">
          <FaSmile className="public-card-icon" />
          <p>
            <strong>Mood:</strong> {capsule.mood}
          </p>
        </div>

        <Button
          className="learn-more"
          text="Learn More"
          onClickListener={() =>
            navigate("/capsulesDetails", { state: { capsule } })
          }
        />
      </div>
    </div>
  );
};

export default CapsuleCard;
