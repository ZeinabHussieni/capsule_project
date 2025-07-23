import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "../Shared/Button";

import "./capsuleDetails.css";

const CapsulesDetails = () => {
  const location = useLocation();
  const capsule = location.state?.capsule;
  const componentRef = useRef();

  const [unlistedLink, setUnlistedLink] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (capsule?.privacy === "unlisted") {
      setLoading(true);
      const token = localStorage.getItem("token");

      axios
        .get(`http://127.0.0.1:8000/api/v0.1/user/unlisted-link/${capsule.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUnlistedLink(res.data.payload || "");
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch capsule link", err);
          setLoading(false);
        });
    }
  }, [capsule]);


  if (!capsule) return <p>No capsule data found. Please go back.</p>;

 
  const formattedDate = new Date(capsule.reveal_date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });


  const handleDownloadPdf = () => {
    if (!componentRef.current) return alert("Nothing to capture!");

    html2canvas(componentRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgRatio = canvas.width / canvas.height;
      const imgHeight = Math.min(pdfWidth / imgRatio, pdfHeight);

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save(`${capsule.title || "capsule-details"}.pdf`);
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(unlistedLink).then(() => {
      alert("Unlisted link copied to clipboard!");
    });
  };

  return (
    <>
      <div className="details-container" ref={componentRef}>
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

            {capsule.audio_path && (
              <div className="voice-note-container">
                <audio
                  controls
                  src={`http://127.0.0.1:8000/storage/public/${capsule.audio_path}`}
                ></audio>
              </div>
            )}

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

            {capsule.mood && (
              <div className="details-mood">
                <img src="/icon/emoji.svg" alt="Emoji Icon" className="user-icon" />
                <span>{capsule.mood}</span>
              </div>
            )}

            {capsule.tags && (
              <div className="details-tags">
                <img src="/icon/tags.svg" alt="tags Icon" className="user-icon" />
                <span>{capsule.tags}</span>
              </div>
            )}

            <div className="details-bottom-row">
              {capsule.location && (
                <div className="details-location">
                  <img src="/icon/location.svg" alt="Location Icon" className="user-icon" />
                  <span>{capsule.location}</span>
                </div>
              )}

              <div className="details-date">
                <img src="/icon/calender.svg" alt="Calendar Icon" className="user-icon" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {capsule.privacy === "unlisted" && (
          <div className="unlisted-link-container">
            <label htmlFor="unlistedLink">Unlisted Link (copy and share):</label>
            {loading ? (
              <p>Loading link...</p>
            ) : (
              <>
                <input
                  id="unlistedLink"
                  type="text"
                  value={unlistedLink}
                  readOnly
                  style={{ width: "100%" }}
                />
                <button onClick={copyToClipboard}>Copy Link</button>
              </>
            )}
          </div>
        )}
      </div>

      <Button text="Download Page as PDF" onClickListener={handleDownloadPdf} />
    </>
  );
};

export default CapsulesDetails;
