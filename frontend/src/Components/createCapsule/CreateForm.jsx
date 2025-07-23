import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Shared/Button";
import Input from "../../Components/Shared/Input";
import MediaUpload from "./MediaUpload";
import axios from "axios";

import "./createForm.css";

const CreateForm = () => {
  const navigate = useNavigate();

 
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [reveal_date, setReveal_date] = useState("");
  const [tags, setTags] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [mood, setMood] = useState("");
  const [surpriseMood, setSurpriseMood] = useState(false);
  const [surpriseEnabled, setSurpriseEnabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  
  const [imageBase64, setImageBase64] = useState(null);
  const [audio_path, setAudio_path] = useState("");
  const [text_file, setText_file] = useState("");


  const [selectedMood, setSelectedMood] = useState("");

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😢", label: "Sad" },
    { emoji: "😡", label: "Angry" },
    { emoji: "😎", label: "Confident" },
    { emoji: "😌", label: "Chill" },
    { emoji: "🤩", label: "Excited" },
    { emoji: "🥺", label: "Nostalgic" },
  ];

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("message", message);
    formData.append("reveal_date", reveal_date);
    formData.append("is_revealed", 0);
    formData.append("privacy", privacy);
    formData.append("tags", tags);
    formData.append("color", color);
    formData.append("mood", mood);
    formData.append("surprise_mood", surpriseEnabled ? 1 : 0);
    formData.append("image", imageBase64);
    formData.append("audio", audio_path);
    formData.append("file", text_file);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/v0.1/user/create_or_update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Capsule created successfully!");
      navigate("/usercapsule");
    } catch (error) {
      setSuccessMessage(error.response?.data?.message || "Something went wrong");
    }
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
            <label htmlFor="reveal_date" className="create-label-size">Reveal Date</label>
          </div>
          <div className="create-input-wrapper">
            <Input
              type="datetime-local"
              name="reveal_date"
              hint="e.g 08/15/2026"
              onChangeListener={(e) => setReveal_date(e.target.value)}
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
            <MediaUpload
              setImageBase64={setImageBase64}
              setAudio_path={setAudio_path}
              setText_file={setText_file}
            />
          </div>
        </div>

        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/tags.svg" alt="Tag Icon" className="create-icon" />
            <label htmlFor="tags" className="create-label-size">Tags</label>
          </div>
          <div className="create-input-wrapper">
            <Input
              name="tags"
              hint="e.g. travel, summer, memories"
              onChangeListener={(e) => setTags(e.target.value)}
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
            <option value="unlisted">Unlisted</option>
          </select>
        </div>

       
        <div className="color-picker-group">
          <label htmlFor="color" className="create-label-size">Color</label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-picker-input"
            />
          </div>
        </div>

        
        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/emoji.svg" alt="Emoji Icon" className="create-icon" />
            <label className="create-label-size">Mood</label>
          </div>
          <select
            name="mood"
            value={mood}
            onChange={(e) => {
              setMood(e.target.value);
              setSelectedMood(e.target.value);
            }}
            className="select-input"
          >
            <option value="">Select Mood</option>
            {moods.map((moodemoji, i) => (
              <option key={i} value={moodemoji.label}>
                {moodemoji.emoji} {moodemoji.label}
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
            <span className="toggle-label">{surpriseEnabled ? "on" : "off"}</span>
            <div
              className={`toggle-switch ${surpriseEnabled ? "active" : ""}`}
              onClick={() => {
                setSurpriseMood(!surpriseEnabled ? "surprise" : "");
                setSurpriseEnabled(!surpriseEnabled);
              }}
            />
          </div>
        </div>
      </div>

      
      <Button text="Create Capsule" onClickListener={handleCreate} />
    </form>
  );
};

export default CreateForm;
