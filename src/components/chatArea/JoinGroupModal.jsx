import React, { useState } from "react";

export default function JoinGroupModal({ onClose, onGroupJoin }) {
  const [groupCode, setGroupCode] = useState("");
  const [error, setError] = useState(null);
  const token  = localStorage.getItem("token");

  const handleJoinGroup = async () => {
    if (!groupCode) {
      setError("Please enter a group code.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/group/join-group", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ groupCode }),
      });

      const res = await response.json();

      if (res.success) {
        onGroupJoin(res.data);
        onClose();
      } else {
        setError(res.message || "Failed to join group.");
      }
    } catch (error) {
      console.error("Error joining group:", error);
      setError("An error occurred while joining the group.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-[cursive]"
      style={{ zIndex: 101 }}
    >
      <div className="bg-white p-8 rounded-[35px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.8)] w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Join Group</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Group Code
          </label>
          <input
            type="text"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black rounded-[12px] 
                       shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                       bg-[#fefae0] outline-none text-sm"
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleJoinGroup}
            className="w-1/2 px-4 py-2 border-2 border-black rounded-[12px] 
                       shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                       bg-[#caffbf] hover:translate-x-[1px] hover:translate-y-[1px] transition"
          >
            Join
          </button>
          <button
            onClick={onClose}
            className="w-1/2 px-4 py-2 border-2 border-black rounded-[12px] 
                       shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                       bg-[#ffadad] hover:translate-x-[1px] hover:translate-y-[1px] transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
