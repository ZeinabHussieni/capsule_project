import React, { useState } from "react";
import "./filter.css";

const Filter = ({ onSearch }) => {
  const [mood, setMood] = useState("");
  const [country, setCountry] = useState("");
  const [tag, setTag] = useState("");

  const handleSearch = () => {
    onSearch({ mood, country, tag });
  };

  return (
    <div className="filter">
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">Mood</option>
        <option value="Happy">😊 Happy</option>
        <option value="Sad">😢 Sad</option>
        <option value="Angry">😡 Angry</option>
        <option value="Confident">😎 Confident</option>
        <option value="Chill">😌 Chill</option>
        <option value="Excited">🤩 Excited</option>
        <option value="Nostalgic">🥺 Nostalgic</option>
      </select>

      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <button onClick={handleSearch}>Filter</button>
    </div>
  );
};

export default Filter;
