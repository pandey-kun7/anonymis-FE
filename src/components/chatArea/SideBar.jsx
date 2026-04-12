import React, { useState, useRef, useEffect } from "react";
import CreateGroupModal from "./CreateGroupModal";
import JoinGroupModal from "./JoinGroupModal";
import UserSettingsModal from "./UserSettingsModal";

export default function SideBar({ onGroupCreate, onGroupJoin }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
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

  const handleOpenSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCloseJoinModal = () => {
    setShowJoinModal(false);
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
        
        {/* Add Group Button */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={handleToggleDropdown}
            className="w-12 h-12 bg-[#ffadad] border-2 border-black rounded-[12px] 
                          shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                          flex items-center justify-center cursor-pointer 
                          hover:translate-x-[1px] hover:translate-y-[1px] transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
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
        <div 
          onClick={handleOpenSettingsModal}
          className="w-12 h-12 bg-[#fdffb6] border-2 border-black rounded-[12px] 
                        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                        flex items-center justify-center cursor-pointer 
                        hover:translate-x-[1px] hover:translate-y-[1px] transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
      </div>
      {showCreateModal && <CreateGroupModal onClose={handleCloseCreateModal} onGroupCreate={onGroupCreate} />}
      {showJoinModal && <JoinGroupModal onClose={handleCloseJoinModal} onGroupJoin={onGroupJoin} />}
      {showSettingsModal && <UserSettingsModal onClose={handleCloseSettingsModal} />}
    </>
  );
}
