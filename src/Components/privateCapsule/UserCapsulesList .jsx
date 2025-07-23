import React, { useEffect, useState } from "react";
import axios from "axios";
import CapsuleCard from "./CapsuleCard";
import SurpriseCapsuleCard from "../surpriseCapsuleCard/SurpriseCapsuleCard";

const UserCapsulesList = () => {
  const [capsules, setCapsules] = useState([]);
  const [surpriseCapsules, setSurpriseCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = (id) => {
    setCapsules((prevCapsules) => prevCapsules.filter(capsule => capsule.id !== id));
  };

  useEffect(() => {
    const fetchCapsules = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const [capsuleRes, surpriseRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/api/v0.1/user/user_capsules", config),
          axios.get("http://127.0.0.1:8000/api/v0.1/user/surprise_mood", config)
        ]);

        setCapsules(capsuleRes.data.payload || []);
        setSurpriseCapsules(surpriseRes.data.payload || []);
      } catch (error) {
        console.error("Failed to fetch capsules or surprise moods", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  if (loading) return <p>Loading capsules...</p>;
  if (capsules.length === 0 && surpriseCapsules.length === 0) return <p>No capsules found.</p>;

  return (
    <div className="capsules-container">
      {capsules.map(capsule => (
        <CapsuleCard
          key={capsule.id}
          capsule={capsule}
          onDelete={handleDelete}
        />
      ))}
      {surpriseCapsules.map(capsule => (
        <SurpriseCapsuleCard
          key={`surprise-${capsule.id}`}
          capsule={capsule}
        />
      ))}
    </div>
  );
};

export default UserCapsulesList;
