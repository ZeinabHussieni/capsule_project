import React from "react";
import "../../Styles/FeatureCard.css";

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="feature-card">
      <img src={image} alt="Feature icon" className="feature-image" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;