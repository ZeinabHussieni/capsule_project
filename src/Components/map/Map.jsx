import React, {useRef, useEffect, useState, useCallback, useMemo,} from "react";
import axios from "axios";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import CapsuleCard from "../publicCapsule/CapsuleCard";

maptilersdk.config.apiKey = "2FDCIBUHdivK6h0mbnkY";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [capsules, setCapsules] = useState([]);
  const [cardPositions, setCardPositions] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);

  const defaultLocation = { lng: 139.753, lat: 35.6844 };
  const zoom = 2;
  const mapStyle = useMemo(() => maptilersdk.MapStyle.STREETS, []);

 //we fetch all capsules
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://127.0.0.1:8000/api/v0.1/user/all_user_capsules", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCapsules(res.data.payload || []))
      .catch((err) => console.error("Error fetching capsules:", err));
  }, []);

  
  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [defaultLocation.lng, defaultLocation.lat],
      zoom,
    });

    map.current.on("load", () => setMapLoaded(true));
  }, [mapStyle]);

  // Update capsule marker positions acc to capsules
  const updatePositions = useCallback(() => {
    if (!map.current || !mapLoaded || capsules.length === 0) return;

    const positions = capsules
      .map((capsule) => {
        const lat = parseFloat(capsule.latitude);
        const lng = parseFloat(capsule.longitude);
        if (isNaN(lat) || isNaN(lng)) return null;

        const point = map.current.project([lng, lat]);
        if (!point) return null;

        return {
          id: capsule.id,
          capsule,
          x: point.x,
          y: point.y,
        };
      })
      .filter(Boolean);

    setCardPositions(positions);
  }, [capsules, mapLoaded]);

  
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    updatePositions();
    map.current.on("move", updatePositions);
    map.current.on("zoom", updatePositions);
    window.addEventListener("resize", updatePositions);

    return () => {
      map.current.off("move", updatePositions);
      map.current.off("zoom", updatePositions);
      window.removeEventListener("resize", updatePositions);
    };
  }, [mapLoaded, updatePositions]);

  useEffect(() => {
    updatePositions();
  }, [capsules, mapLoaded, updatePositions]);

  const toggleCard = (id) => {
    setOpenedCards((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />

      {cardPositions.map(({ id, x, y, capsule }) => (
        <div
          key={id}
          className="marker-pen"
          style={{ top: y, left: x }}
          onClick={() => toggleCard(id)}
          title={capsule.title}
        >
          <img src="/icon/pin.svg" alt="Pin Icon" className="create-icon" />

          {openedCards.includes(id) && (
            <div className="capsule-popup" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => toggleCard(id)}>Close</button>
              <CapsuleCard capsule={capsule} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Map;
