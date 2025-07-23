import React, { useRef, useState } from "react";
import "./mediaUpload.css";

const MediaUpload = ({ setImageBase64, setAudio_path, setText_file }) => {
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);
  const textInputRef = useRef(null);

  const [selectedFileName, setSelectedFileName] = useState("");

  const openImagePicker = () => imageInputRef.current?.click();
  const openAudioPicker = () => audioInputRef.current?.click();
  const openTextPicker = () => textInputRef.current?.click();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // base64 image string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setAudio_path(file);
    }
  };

  const handleTextChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      setText_file(file);
    }
  };

  return (
    <div className="media-upload-container">
      <div className="media-upload-box">
      
        <button type="button" onClick={openImagePicker} className="media-upload-icon-button">
          <img src="/icon/camera.svg" alt="Camera Icon" />
        </button>

       
        <button type="button" onClick={openAudioPicker} className="media-upload-icon-button">
          <img src="/icon/audio.svg" alt="Mic Icon" />
        </button>

      
        <button type="button" onClick={openTextPicker} className="media-upload-icon-button">
          <img src="/icon/file.svg" alt="File Icon" />
        </button>

       
        {selectedFileName && (
          <div className="selected-file-name">{selectedFileName}</div>
        )}

        {/*this open files*/}
        <input
          type="file"
          accept="image/*,video/*"
          ref={imageInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        <input
          type="file"
          accept="audio/*"
          ref={audioInputRef}
          style={{ display: "none" }}
          onChange={handleAudioChange}
        />

        <input
          type="file"
          accept=".txt,.doc,.pdf"
          ref={textInputRef}
          style={{ display: "none" }}
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
};

export default MediaUpload;
