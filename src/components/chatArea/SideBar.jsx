import React, { useState, useRef, useEffect } from "react";
import CreateGroupModal from "./CreateGroupModal";
import JoinGroupModal from "./JoinGroupModal";

export default function SideBar({ onGroupCreate, onGroupJoin }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
    setShowDropdown(false);
  };

  const handleOpenJoinModal = () => {
    setShowJoinModal(true);
    setShowDropdown(false);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCloseJoinModal = () => {
    setShowJoinModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-[80px] h-full border-r-2 border-black flex flex-col items-center py-6 gap-6 bg-[#f7f7f7]">
        {/* Option 1: Chats */}
        <div className="w-12 h-12 bg-[#caffbf] border-2 border-black rounded-[12px] 
                        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                        flex items-center justify-center cursor-pointer 
                        hover:translate-x-[1px] hover:translate-y-[1px] transition">
          <span className="text-xl">💬</span>
        </div>
        
        {/* Add Group Button */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={handleToggleDropdown}
            className="w-12 h-12 bg-[#ffadad] border-2 border-black rounded-[12px] 
                          shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                          flex items-center justify-center cursor-pointer 
                          hover:translate-x-[1px] hover:translate-y-[1px] transition">
            <span className="text-xl">➕</span>
          </div>
          {showDropdown && (
            <div className="absolute left-14 top-0 w-40 bg-white border-2 border-black rounded-[12px] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] z-10">
              <div
                onClick={handleOpenCreateModal}
                className="p-3 hover:bg-gray-200 cursor-pointer rounded-t-[10px]"
              >
                Create Group
              </div>
              <div
                onClick={handleOpenJoinModal}
                className="p-3 hover:bg-gray-200 cursor-pointer rounded-b-[10px]"
              >
                Join Group
              </div>
            </div>
          )}
        </div>

        {/* Option 2: Settings */}
        <div className="w-12 h-12 bg-[#fdffb6] border-2 border-black rounded-[12px] 
                        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                        flex items-center justify-center cursor-pointer 
                        hover:translate-x-[1px] hover:translate-y-[1px] transition">
          <span className="text-xl">⚙️</span>
        </div>
      </div>
      {showCreateModal && <CreateGroupModal onClose={handleCloseCreateModal} onGroupCreate={onGroupCreate} />}
      {showJoinModal && <JoinGroupModal onClose={handleCloseJoinModal} onGroupJoin={onGroupJoin} />}
    </>
  );
}
