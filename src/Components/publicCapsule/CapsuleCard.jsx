import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Shared/Button/index";
import "./capsuleCard.css";

const CapsuleCard = ({ capsule }) => {
  const navigate = useNavigate();
  if (!capsule) return null;

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
      className="public-card"
      style={{ border: `2px solid ${capsule.color || "rgba(77, 110, 205, 0.2)"}` }}
    >
      <img
        src={`http://127.0.0.1:8000/${capsule.image}`}
        alt="Capsule"
        className="public-card-image"
      />

      <div className="public-card-body">
        <h3 className="public-card-title">{capsule.title}</h3>

        <div className="public-card-info-row">
          <img src="/icon/calender.svg" alt="Calendar Icon" className="details-icon" />
          <p>
            <strong>Reveal Date:</strong> {formattedDate}
          </p>
        </div>

        <div className="public-card-info-row">
          <img src="/icon/location.svg" alt="Location Icon" className="details-icon" />
          <p>
            <strong>Location:</strong> {capsule.location}
          </p>
        </div>

        <div className="public-card-info-row">
          <img src="/icon/emoji.svg" alt="Emoji Icon" className="details-icon" />
          <p>
            <strong>Mood:</strong> {capsule.mood}
          </p>
        </div>

        <div className="public-card-info-row">
          <img src="/icon/tags.svg" alt="Tags Icon" className="details-icon" />
          <p>
            <strong>Tags:</strong> {capsule.tags}
          </p>
        </div>

        <Button
          className="Public-learn-more"
          text="Learn More"
          onClickListener={() => navigate("/capsulesDetails", { state: { capsule } })}
        />
      </div>
    </div>
  );
};

export default CapsuleCard;
