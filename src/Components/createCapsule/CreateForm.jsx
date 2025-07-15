import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Shared/Button/index";
import Input from "../../Components/Shared/Input/index";

import "./createForm.css";

const CreateForm = () => {

  const [title, setTitle] = useState("");
  const [revealDate, setRevealDate] = useState("");
  const [mediaUpload, setMediaUpload] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [surpriseMood, setSurpriseMood] = useState("");
  const [mood, setMood] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [surpriseEnabled, setSurpriseEnabled] = useState(false);

  const navigate = useNavigate();

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😎", label: "Confident" },
    { emoji: "😌", label: "Chill" },
    { emoji: "🤩", label: "Excited" },
    { emoji: "🥺", label: "Nostalgic" },
  ];

  const handleForm = async () => {
    console.log(title, revealDate, mediaUpload, location, message, privacy, surpriseMood, mood);
    // TODO: Add your backend API call here

    navigate("/usercapsules");
  };

  return (
    <form className="create-form">
      <h2 className="create-title">Create your capsule</h2>


      <div className="create-input-row">
        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/title.svg" alt="Title Icon" className="create-icon" />
            <label htmlFor="title" className="create-label-size">Title</label>
          </div>
          <div className="create-input-wrapper">
            <Input
              name="title"
              hint="e.g. A letter to my future self"
              onChangeListener={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/calender.svg" alt="Calendar Icon" className="create-icon" />
            <label htmlFor="revealDate" className="create-label-size">Reveal Date</label>
          </div>
          <div className="create-input-wrapper">
            <Input
              type="datetime-local"
              name="revealDate"
              hint="e.g 08/15/2026"
              onChangeListener={(e) => setRevealDate(e.target.value)}
            />
          </div>
        </div>
      </div>

    <div className="create-input-row">
        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/attach.svg" alt="Upload Icon" className="create-icon" />
            <label htmlFor="mediaUpload" className="create-label-size">Media Upload</label>
          </div>
          <div className="create-input-wrapper">
            <Input
              type="file"
              name="mediaUpload"
              hint="Attach something meaningful"
              onChangeListener={(e) => setMediaUpload(e.target.files[0])}
            />
          </div>
        </div>

        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/location.svg" alt="Location Icon" className="create-icon" />
            <label htmlFor="location" className="create-label-size">Location</label>
          </div>
          <div className="create-input-wrapper">
            <Input
              name="location"
              hint="e.g. Beirut, Lebanon"
              onChangeListener={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="create-input-group">
        <div className="create-label">
          <img src="/icon/pencil.svg" alt="Pencil Icon" className="create-icon" />
          <label htmlFor="message" className="create-label-size">Message</label>
        </div>
        <div className="create-textarea-wrapper">
          <textarea
            name="message"
            className="create-textarea"
            placeholder="Write something to your future self..."
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>


      <div className="create-row-3">
        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/security.svg" alt="Privacy Icon" className="create-icon" />
            <label htmlFor="privacy" className="create-label-size">Privacy</label>
          </div>
          <select
            name="privacy"
            onChange={(e) => setPrivacy(e.target.value)}
            className="select-input"
          >
            <option value="">Select Privacy</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="unlist">Unlist</option>
          </select>
        </div>

        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/emoji.svg" alt="Emoji Icon" className="create-icon" />
            <label className="create-label-size">Mood</label>
          </div>
          <select
            className="select-input"
            name="mood"
            value={mood}
            onChange={(e) => {
              setMood(e.target.value);
              setSelectedMood(e.target.value);
            }}
          >
            <option value="">Select Mood</option>
            {moods.map((moodObj, i) => (
              <option key={i} value={moodObj.label}>
                {moodObj.emoji} {moodObj.label}
              </option>
            ))}
          </select>
        </div>

    
        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/gift.svg" alt="Gift Icon" className="create-icon" />
            <label className="create-label-size">Surprise Mood</label>
          </div>
          <div className="toggle-wrapper">
            <span className="toggle-label">{surpriseEnabled ? "On" : "Off"}</span>
            <div
              className={`toggle-switch ${surpriseEnabled ? "active" : ""}`}
              onClick={() => {
                setSurpriseMood(surpriseEnabled ? "" : "surprise");
                setSurpriseEnabled(!surpriseEnabled);
              }}
            />
          </div>
        </div>
      </div>

      <Button text="Create Capsule" onClickListener={handleForm} />
    </form>
  );
};

export default CreateForm;
