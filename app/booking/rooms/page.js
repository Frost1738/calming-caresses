// app/booking/rooms/page.js
import React, { Suspense } from "react";
import RoomSelection from "./room";
import { getRooms } from "@/app/ApiServices/getFunctions";
import Loader from "@/app/loading";

export default async function Page() {
  try {
    const roomsData = await getRooms();

    console.log("Raw rooms data:", roomsData);
    console.log("Type:", typeof roomsData);

    // Transform the data to ensure it's always an array with the correct structure
    let massageRooms = [];

    if (Array.isArray(roomsData)) {
      // If it's already an array, use it
      massageRooms = roomsData;
    } else if (roomsData && Array.isArray(roomsData.data)) {
      // If it's an object with a data array
      massageRooms = roomsData.data;
    } else if (roomsData && Array.isArray(roomsData.rooms)) {
      // If it's an object with a rooms array
      massageRooms = roomsData.rooms;
    } else if (roomsData && typeof roomsData === "object") {
      // If it's an object, try to extract array from values
      const values = Object.values(roomsData);
      const arrayValue = values.find((v) => Array.isArray(v));
      if (arrayValue) {
        massageRooms = arrayValue;
      } else {
        // Convert object keys to array
        massageRooms = Object.entries(roomsData).map(([key, value]) => ({
          id: key,
          ...(typeof value === "object" ? value : {}),
        }));
      }
    }

    // Ensure each room has the required structure for your client component
    const transformedRooms = massageRooms.map((room, index) => ({
      id: room.id || room._id || `room-${index}`,
      name: room.name || room.roomName || `Massage Room ${index + 1}`,
      ambiance: room.ambiance || room.atmosphere || room.type || "Serene",
      description:
        room.description ||
        `A peaceful ${room.type || "massage"} room designed for ultimate relaxation.`,
      price: room.price || room.additionalPrice || room.hourlyRate || 0,
      image:
        room.image ||
        room.imageUrl ||
        room.photo ||
        `https://picsum.photos/seed/room${index}/400/300`,
      popularity:
        room.popularity || room.rating || Math.floor(Math.random() * 30) + 70,
      color: getRoomColor(room),
      features: getRoomFeatures(room),
    }));

    console.log(`Transformed ${transformedRooms.length} rooms`);

    return (
      <div className="h-auto w-auto">
        <RoomSelection massageRooms={transformedRooms} />
      </div>
    );
  } catch (error) {
    console.error("Error loading rooms:", error);
    // Return empty array in case of error
    return (
      <div className="h-auto w-auto">
        <RoomSelection massageRooms={[]} />
      </div>
    );
  }
}

// Helper function to determine room color based on type or ambiance
function getRoomColor(room) {
  const colorMap = {
    // Room types
    standard: "from-blue-900/50 to-indigo-900/50",
    premium: "from-purple-900/50 to-pink-900/50",
    luxury: "from-amber-900/50 to-orange-900/50",
    zen: "from-emerald-900/50 to-teal-900/50",
    spa: "from-rose-900/50 to-pink-900/50",
    therapy: "from-cyan-900/50 to-blue-900/50",

    // Ambiance types
    serene: "from-blue-900/50 to-indigo-900/50",
    calm: "from-emerald-900/50 to-teal-900/50",
    tranquil: "from-purple-900/50 to-pink-900/50",
    peaceful: "from-cyan-900/50 to-blue-900/50",
    relaxing: "from-amber-900/50 to-orange-900/50",
  };

  const roomType = (room.type || room.ambiance || "").toLowerCase();
  return colorMap[roomType] || "from-gray-900/50 to-gray-800/50";
}

// Helper function to generate features array
function getRoomFeatures(room) {
  // Default features
  const defaultFeatures = [
    { icon: "💆", label: "Massage Table" },
    { icon: "🎵", label: "Ambient Music" },
    { icon: "🕯️", label: "Aromatherapy" },
    { icon: "🌡️", label: "Climate Control" },
    { icon: "💧", label: "Humidifier" },
    { icon: "🔇", label: "Soundproof" },
  ];

  // If room has features property, use them
  if (room.features && Array.isArray(room.features)) {
    return room.features
      .map((feature, idx) => ({
        icon: getFeatureIcon(feature),
        label:
          typeof feature === "string"
            ? feature.charAt(0).toUpperCase() + feature.slice(1)
            : `Feature ${idx + 1}`,
      }))
      .slice(0, 6); // Limit to 6 features
  }

  // Otherwise return default features (shuffled for variety)
  return [...defaultFeatures].sort(() => Math.random() - 0.5).slice(0, 4);
}

function getFeatureIcon(feature) {
  const iconMap = {
    music: "🎵",
    aromatherapy: "🕯️",
    heated: "🌡️",
    humidifier: "💧",
    chromotherapy: "🌈",
    soundproof: "🔇",
    lighting: "💡",
    ventilation: "💨",
    table: "💆",
    chair: "🪑",
    oils: "🫙",
    towels: "🧻",
  };

  if (typeof feature === "string") {
    const lowerFeature = feature.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerFeature.includes(key)) {
        return icon;
      }
    }
  }

  // Random fallback icons
  const fallbackIcons = ["✨", "🌟", "⭐", "💫", "⚡"];
  return fallbackIcons[Math.floor(Math.random() * fallbackIcons.length)];
}
