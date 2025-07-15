import React from "react";
import FeaturesCard from "./FeaturesCard";
import "./featureCard.css";

const FeaturesText = () => {
  return (
    <div className="features-section">
      <FeaturesCard
        image="/message.svg"
        title="Create Personal Time Capsules"
        description="Save memories and messages to revisit in the future."
      />
      <FeaturesCard
        image="/date.svg"
        title="Set Reveal Dates & Privacy"
        description="Choose when your capsule opens and who sees it."
      />
      <FeaturesCard
        image="/people.svg"
        title="Explore Revealed Capsules"
        description="Discover stories from people around the world."
      />
    </div>
  );
};

export default FeaturesText;
