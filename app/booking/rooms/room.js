// app/booking/room/page.jsx
"use client";

import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiStar,
  FiDroplet,
  FiWind,
  FiMusic,
  FiThermometer,
  FiVolumeX,
  FiZap,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { CartContext } from "../cartContext";

export default function RoomSelection({ massageRooms }) {
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const { setRoomName, setPrice } = useContext(CartContext);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setRoomName(room.name);
    setPrice((price) => price + room.price);
  };

  const handleContinue = () => {
    if (selectedRoom) {
      router.push("/booking/confirmation");
      setRoomName(selectedRoom.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="max-xs:text-2xl xs:text-2xl md:text-3xl font-normal text-white font-[family-name:var(--font-dancing-script)] mb-4">
            Choose Your Sanctuary
          </h1>
          <p className="text-gray-300 text-sm  max-w-3xl mx-auto">
            Each room is uniquely designed to enhance your massage experience.
            Select an ambiance that speaks to your soul.
          </p>
        </motion.div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <AnimatePresence>
            {massageRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onMouseEnter={() => setHoveredRoom(room.id)}
                onMouseLeave={() => setHoveredRoom(null)}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedRoom?.id === room.id
                    ? "ring-4 ring-blue-500 ring-opacity-50"
                    : ""
                }`}
                onClick={() => handleSelectRoom(room)}
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden border border-gray-700 h-full">
                  {/* Room Image/Header */}
                  <div className="h-48 relative overflow-hidden">
                    {/* Background Image with overlay */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${room.image}')` }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${room.color} opacity-70`}
                      ></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>

                    {/* Room Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <h3 className="text-xl font-bold text-white">
                        {room.name}
                      </h3>
                      <p className="text-gray-300 text-sm">{room.ambiance}</p>
                    </div>

                    {/* Popularity Badge */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center gap-1 text-white">
                        <FiStar className="text-yellow-400" />
                        <span className="font-bold">{room.popularity}%</span>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedRoom?.id === room.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 left-4 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center z-20"
                      >
                        <FiCheck className="text-white text-xl" />
                      </motion.div>
                    )}

                    {/* Price Tag */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white font-bold text-sm">
                        +${room.price}
                      </span>
                    </div>
                  </div>

                  {/* Room Content */}
                  <div className="p-6">
                    <p className="text-gray-300 text-sm mb-4">
                      {room.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {room.features.slice(0, 2).map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-400"
                        >
                          <span className="text-lg">{feature.icon}</span>
                          <span>{feature.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hover Effect Content */}
                    <AnimatePresence>
                      {hoveredRoom === room.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-gray-700">
                            <div className="grid grid-cols-2 gap-2">
                              {room.features.slice(2).map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 text-sm text-gray-400"
                                >
                                  <span className="text-lg">
                                    {feature.icon}
                                  </span>
                                  <span>{feature.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Comparison & Selection Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Selected Room Preview */}
            <div className="lg:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-6">
                {selectedRoom
                  ? `Selected: ${selectedRoom.name}`
                  : "No Room Selected"}
              </h2>

              {selectedRoom ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">
                        Ambiance
                      </h3>
                      <p className="text-gray-300">
                        {selectedRoom.ambiance} atmosphere
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">
                        Special Features
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRoom.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-700 rounded-full text-gray-300 text-sm flex items-center gap-1"
                          >
                            {feature.icon} {feature.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-800/50 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">
                        Why Choose This Room
                      </h3>
                      <p className="text-gray-300">
                        Enhances relaxation through{" "}
                        {selectedRoom.ambiance.toLowerCase()} elements, perfect
                        for deep tissue and stress relief massages.
                      </p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-xl">
                      <h3 className="text-lg font-bold text-white mb-2">
                        Recommended For
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">
                          Stress Relief
                        </span>
                        <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                          Deep Relaxation
                        </span>
                        <span className="px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-sm">
                          Mindfulness
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center mx-auto mb-6">
                    <span className="text-5xl">🏠</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Select Your Sanctuary
                  </h3>
                  <p className="text-gray-300">
                    Choose a room above to see detailed information here
                  </p>
                </div>
              )}
            </div>

            {/* Action Panel */}
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Booking Summary
                </h3>

                <div className="space-y-3">
                  <button
                    onClick={handleContinue}
                    disabled={!selectedRoom}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                      selectedRoom
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:scale-[1.02]"
                        : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {selectedRoom ? "Continue booking" : "Select a Room First"}
                  </button>

                  <button
                    onClick={() => router.back()}
                    className="w-full py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Back to Time Selection
                  </button>
                </div>

                {selectedRoom && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 p-4 bg-green-900/20 border border-green-800 rounded-xl"
                  >
                    <p className="text-green-300 text-sm text-center">
                      Perfect choice! {selectedRoom.name} will enhance your
                      massage experience.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
