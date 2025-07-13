
import React from "react";
import FeatureCard from "./FeatureCard";
import "../../Styles/FeatureCard.css";

const FeaturesSection = () => {
  return (
    <div className="features-section">
      <FeatureCard
        image="/message.svg"
        title="Create Personal Time Capsules"
        description="Save memories and messages to revisit in the future."
      />
      <FeatureCard
        image="/date.svg"
        title="Set Reveal Dates & Privacy"
        description="Choose when your capsule opens and who sees it."
      />
      <FeatureCard
        image="/people.svg"
        title="Explore Revealed Capsules"
        description="Discover stories from people around the world."
      />
    </div>
  );
};

export default FeaturesSection;
