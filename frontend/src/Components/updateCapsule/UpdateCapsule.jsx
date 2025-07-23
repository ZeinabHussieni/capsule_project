import React, { useState, useEffect } from "react";
import Button from "../../Components/Shared/Button/index";
import MediaUpload from "../createCapsule/MediaUpload";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../createCapsule/createForm.css";


const UpdateCapsule = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [reveal_date, setReveal_date] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [audio_path, setAudio_path] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [mood, setMood] = useState("");
  const [surpriseMood, setSurpriseMood] = useState(false);
  const [tags, setTags] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [surpriseEnabled, setSurpriseEnabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();
  const { id } = location.state;

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

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v0.1/user/capsule_details/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const capsule = response.data.payload;

        setTitle(capsule.title);
        setMessage(capsule.message);
        setPrivacy(capsule.privacy);
        setReveal_date(capsule.reveal_date);
        setColor(capsule.color);
        setMood(capsule.mood);
        setSurpriseEnabled(capsule.surprise_mood === 1);
        setTags(capsule.tags);
       
      } catch (error) {
        alert("Failed to load capsule");
      }
    };

    fetchCapsule();
  }, [id]);

  const handleUpdate = async (e) => {
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

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v0.1/user/create_or_update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Capsule updated successfully!");
      navigate("/usercapsule");
    } catch (error) {
      setSuccessMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form className="create-form" onSubmit={handleUpdate}>
      <h2 className="create-title">Update your capsule</h2>


      <div className="create-input-row">
        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/title.svg" alt="Title Icon" className="create-icon" />
            <label htmlFor="title" className="create-label-size">
              Title
            </label>
          </div>
          <div className="create-input-wrapper">
            <input
              name="title"
              value={title}
              placeholder="e.g. A letter to my future self"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/calender.svg" alt="Calendar Icon" className="create-icon" />
            <label htmlFor="reveal_date" className="create-label-size">
              Reveal Date
            </label>
          </div>
          <div className="create-input-wrapper">
            <input
              type="datetime-local"
              name="reveal_date"
              value={reveal_date}
              placeholder="e.g 08/15/2026"
              onChange={(e) => setReveal_date(e.target.value)}
            />
          </div>
        </div>
      </div>

      
      <div className="create-input-row">
        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/attach.svg" alt="Upload Icon" className="create-icon" />
            <label htmlFor="mediaUpload" className="create-label-size">
              Media Upload
            </label>
          </div>
          <div className="create-input-wrapper">
            <MediaUpload setImageBase64={setImageBase64} setAudio_path={setAudio_path} />
          </div>
        </div>

        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/tags.svg" alt="Tag Icon" className="create-icon" />
            <label htmlFor="tags" className="create-label-size">
              Tags
            </label>
          </div>
          <div className="create-input-wrapper">
            <input
              name="tags"
              value={tags}
              placeholder="e.g. travel, summer, memories"
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
      </div>

      
      <div className="create-input-group">
        <div className="create-label">
          <img src="/icon/pencil.svg" alt="Pencil Icon" className="create-icon" />
          <label htmlFor="message" className="create-label-size">
            Message
          </label>
        </div>
        <div className="create-textarea-wrapper">
          <textarea
            name="message"
            value={message}
            placeholder="Write something to your future self..."
            className="create-textarea"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      
      <div className="create-row-3">
        <div className="create-input-group">
          <div className="create-label">
            <img src="/icon/security.svg" alt="Privacy Icon" className="create-icon" />
            <label htmlFor="privacy" className="create-label-size">
              Privacy
            </label>
          </div>
          <select
            name="privacy"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="select-input"
          >
            <option value="">Select Privacy</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="unlist">Unlist</option>
          </select>
        </div>

        <div className="color-picker-group">
          <label htmlFor="color" className="create-label-size">
            Color
          </label>
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
            className="select-input"
            name="mood"
            value={mood}
            onChange={(e) => {
              setMood(e.target.value);
              setSelectedMood(e.target.value);
            }}
          >
            <option value="">Select Mood</option>
            {moods.map(({ emoji, label }, i) => (
              <option key={i} value={label}>
                {emoji} {label}
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

      <Button text="Update Capsule" onClickListener={handleUpdate} />
    </form>
  );
};

export default UpdateCapsule;
