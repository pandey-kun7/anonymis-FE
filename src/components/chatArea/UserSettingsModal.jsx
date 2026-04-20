import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSettingsModal({ onClose }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userAlias: "",
    userTag: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function fetchData() {
      try {

        if (!email) return;

        const response = await fetch(
          `http://localhost:8000/api/service/user-info/${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const res = await response.json();

        const user = Array.isArray(res.data) ? res.data[0] : res.data || res;

        if (user) {
          setUserInfo({
            userAlias: user.userAlias || "",
            userTag: user.userTag || "",
            email: user.email || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    }

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const response = await fetch(
      `http://localhost:8000/api/auth/delete-user-account/${email}`,
      { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const res = await response.json();
    if (res.success) {
      localStorage.clear();
      navigate("/login");
    }
  };

  const handleUpdateProfile = async () => {
    setError(null);
    setSuccess(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8000/api/service/update-userInfo",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userInfo),
        },
      );

      const res = await response.json();

      if (res.success) {
        setSuccess("Profile updated successfully!");
      } else {
        setError(res.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while updating the profile.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center font-[cursive]"
      style={{ zIndex: 101 }}
    >
      <div className="bg-white h-[80vh] rounded-[35px] border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.8)] w-[600px] h-[450px] flex overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-2xl font-bold z-20  cursor-pointer"
        >
          &times;
        </button>

        {/* Left Sidebar in Modal */}
        <div className="w-[150px] bg-[#dfe7fd] border-r-2 border-black flex flex-col items-center py-8 ">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-[#ffadad] border-2 border-black rounded-full flex items-center justify-center font-bold text-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]">
              {userInfo.userAlias[0]?.toUpperCase() || "?"}
            </div>
            <span className="font-bold text-xs text-center px-2 mb-[20vh]">
              {userInfo.userAlias}
            </span>
          </div>
          <button
            onClick={handleDeleteAccount}
            className="w-24 px-2 py-2 border-2 border-black rounded-[12px] m-3
                       shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                       bg-[#ffadad] hover:translate-x-[1px] hover:translate-y-[1px] transition
                       font-bold text-sm"
          >
            Delete Account
          </button>
          <button
            onClick={handleLogout}
            className="w-24 px-2 py-2 border-2 border-black rounded-[12px] 
                       shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                       bg-[#ffadad] hover:translate-x-[1px] hover:translate-y-[1px] transition
                       font-bold text-sm"
          >
            Logout
          </button>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8 overflow-y-auto no-scrollbar h-[70vh]">
          <h2 className="text-2xl font-bold mb-6">User Settings</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-4 text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                User Alias (Writable)
              </label>
              <input
                type="text"
                value={userInfo.userAlias}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, userAlias: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-black rounded-[12px] 
                           shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                           bg-[#fefae0] outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                User Tag
              </label>
              <input
                type="text"
                value={userInfo.userTag}
                readOnly
                className="w-full px-4 py-2 border-2 border-black rounded-[12px] 
                           shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                           bg-gray-100 outline-none text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                value={userInfo.email}
                readOnly
                className="w-full px-4 py-2 border-2 border-black rounded-[12px] 
                           shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                           bg-gray-100 outline-none text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleUpdateProfile}
              className="px-6 py-2 border-2 border-black rounded-[12px] 
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] 
                         bg-[#caffbf] hover:translate-x-[1px] hover:translate-y-[1px] transition
                         font-bold"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
