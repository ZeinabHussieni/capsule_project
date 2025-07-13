import React from "react";
import "../../Styles/Welcome.css";


const Welcome = () => {
  return (
    <section className="welcome-section">
      <div className="welcome-title">
        <h1>Welcome to Unseal</h1>
      </div>

      <div className="welcome-description">
        <ul>
          <li>Send a message to your future self — and let time keep it safe</li>
          <li>Capture a moment, seal it with love — and open it when the time is right</li>
          <li>Share your voice with the future — or keep it locked just for you</li>
        </ul>
      </div>
    </section>
  );
};

export default Welcome;
