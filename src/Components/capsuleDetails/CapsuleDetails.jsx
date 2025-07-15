import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCalendarDay, FaMapMarkerAlt, FaSmile } from "react-icons/fa";
import "./capsuleDetails.css";

const CapsulesDetails = () => {
  const location = useLocation();
  const capsule = location.state?.capsule;
  const navigate = useNavigate();

  if (!capsule) {
    return <p>No capsule data found. Please go back.</p>;
  }

  const formattedDate = new Date(capsule.revealDate).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="details-container">
      <h2 className="details-title">{capsule.title}</h2>

      <div className="details-content">
        <img
          src={capsule.coverImage}
          alt={capsule.title}
          className="details-image"
        />

        <div className="details-info">
          <p className="details-message">
            {capsule.message || "No message provided."}
          </p>

          {capsule.voiceNote && (
            <div className="voice-note-container">
              <audio controls src={capsule.voiceNote}></audio>
            </div>
          )}

          <div className="details-mood">
            <FaSmile className="icon" />
            <span>{capsule.mood}</span>
          </div>

          <div className="details-bottom-row">
            <div className="details-location">
              <FaMapMarkerAlt className="icon" />
              <span>{capsule.location}</span>
            </div>
            <div className="details-date">
              <FaCalendarDay className="icon" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsulesDetails;
