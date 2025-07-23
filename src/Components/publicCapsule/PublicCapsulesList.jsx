import React, { useEffect, useState } from "react";
import axios from "axios";
import CapsuleCard from "./CapsuleCard";
import Filter from "../../Components/filter/Filter";

const UserCapsulesList = () => {
  const [capsules, setCapsules] = useState([]);
  const [filteredCapsules, setFilteredCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/v0.1/user/all_user_capsules", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const allCapsules = response.data.payload || [];
        setCapsules(allCapsules);
        setFilteredCapsules(allCapsules);
      })
      .catch((error) => {
        console.error("Failed to fetch capsules", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSearch = ({ mood, country, tag }) => {
    const filtered = capsules.filter((capsule) => {
      const matchMood = mood
        ? capsule.mood?.toLowerCase() === mood.toLowerCase()
        : true;

      const matchCountry = country
        ? capsule.location?.toLowerCase().includes(country.toLowerCase())
        : true;

      const matchTag = tag
        ? capsule.tags?.toLowerCase().includes(tag.toLowerCase())
        : true;

      return matchMood && matchCountry && matchTag;
    });

    setFilteredCapsules(filtered);
  };

  if (loading) return <p>Loading capsules...</p>;

  return (
    <div>
      <div className="filter-wrapper">
        <Filter onSearch={handleSearch} />
      </div>

      <div className="capsules-container">
        {filteredCapsules.map((capsule) => (
          <CapsuleCard key={capsule.id} capsule={capsule} />
        ))}
      </div>
    </div>
  );
};

export default UserCapsulesList;
