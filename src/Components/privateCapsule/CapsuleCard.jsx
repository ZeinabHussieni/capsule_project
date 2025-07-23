import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserCountdown from "./UserCountdown";
import Button from "../../Components/Shared/Button";
import "./capsuleCard.css";

const CapsuleCard = ({ capsule, onDelete }) => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  

  const formattedDate = new Date(capsule.reveal_date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const handleDelete = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://127.0.0.1:8000/api/v0.1/user/delete/${capsule.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Deleted successfully");
      onDelete(capsule.id);
      navigate("/usercapsule");
    } catch (error) {
      setSuccessMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="user-card"
      style={{
        border: `2px solid ${capsule.color || "rgba(77, 110, 205, 0.2)"}`,
      }}
    >
      <div className="card-header">
        <h3 className="card-title">{capsule.title}</h3>
      </div>

      <div className="card-body">
       
        <div className="card-info">
          <img src="/icon/calender.svg" alt="Calendar Icon" className="input-icon" />
          <span className="card-label">Reveal Date:</span>
          <span className="value">{formattedDate}</span>
        </div>

        
        <div className="card-info">
          <img src="/icon/clock.svg" alt="Clock Icon" className="input-icon" />
          <span className="card-label">Time remaining:</span>
          <UserCountdown targetDate={capsule.reveal_date} />
        </div>

        
        <div className="card-info">
          <img src="/icon/security.svg" alt="Security Icon" className="input-icon" />
          <span className="card-label">{capsule.privacy}</span>
        </div>

        
        <div className="card-buttons">
          <Button
            className="learn-more"
            text="Learn More"
            onClickListener={() =>
              navigate("/capsulesDetails", { state: { capsule } })
            }
          />
          <Button
            className="update-button"
            text="Update"
            onClickListener={() =>
              navigate("/update_capsule", { state: { id: capsule.id } })
            }
          />
          <Button
            className="delete-button"
            text="Delete"
            onClickListener={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CapsuleCard;
