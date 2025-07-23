import React, { useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import gift from "../../../src/animations/gift.json";
import Button from "../Shared/Button";
import "./unlistedPage.css";

function CapsuleSearch() {
  const [searchLink, setSearchLink] = useState("");
  const [capsule, setCapsule] = useState(null);
  const [error, setError] = useState("");
  

  const handleSearch = async () => {
    try {
      setError("");
      setCapsule(null);

      const url = new URL(searchLink);
      const pathParts = url.pathname.split("/");
      const capsuleId = pathParts[pathParts.length - 1];
      const token = url.searchParams.get("token");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/v0.1/public/unlisted/${capsuleId}?token=${token}`
      );

      setCapsule(response.data.payload);
    } catch (err) {
      console.error(err);
      setError("Capsule not found or link is invalid!");
    }
  };

  const formattedDate = capsule?.reveal_date
    ? new Date(capsule.reveal_date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <div>
      <div className="unlisted-container">
        <div className="unlisted-header">
          <Lottie animationData={gift} loop={true} className="unlisted-animation" />
          <h2 className="unlisted-title">Got a Secret Link? Let’s Unwrap It!</h2>
        </div>

        <input
          type="text"
          placeholder="Paste your unlisted link here..."
          value={searchLink}
          onChange={(e) => setSearchLink(e.target.value)}
          className="unlisted-input"
        />

        <Button text="Search" onClickListener={handleSearch} />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {capsule && (
        <div className="details-container" style={{ marginTop: 30 }}>
          <h2 className="details-title">{capsule.title}</h2>

          <div className="details-content">
            <img
              src={`http://127.0.0.1:8000/${capsule.image}`}
              alt={capsule.title}
              className="details-image"
            />

            <div className="details-info">
              <p className="details-message">
                {capsule.message || "No message provided."}
              </p>

              <div className="voice-note-container">
                <audio
                  controls
                  src={`http://127.0.0.1:8000/storage/public/${capsule.audio_path}`}
                />
              </div>

              {capsule.text_file && (
              <div className="file">
                <img src="/icon/file.svg" alt="file Icon" className="user-icon" />
                <a
                  href={`http://127.0.0.1:8000/storage/public/${capsule.text_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View File
                </a>
              </div>
            )}

              <div className="details-mood">
                <img src="/icon/emoji.svg" alt="Emoji Icon" className="user-icon" />
                <span>{capsule.mood}</span>
              </div>

              <div className="details-tags">
                <img src="/icon/tags.svg" alt="Tags Icon" className="user-icon" />
                <span>{capsule.tags}</span>
              </div>

              <div className="details-bottom-row">
                <div className="details-location">
                  <img src="/icon/location.svg" alt="Location Icon" className="user-icon" />
                  <span>{capsule.location}</span>
                </div>

                <div className="details-date">
                  <img src="/icon/calender.svg" alt="Calendar Icon" className="user-icon" />
                  <span>{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CapsuleSearch;
