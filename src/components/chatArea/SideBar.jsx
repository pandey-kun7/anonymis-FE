import React, { useState, useRef, useEffect } from "react";
import CreateGroupModal from "./CreateGroupModal";
import JoinGroupModal from "./JoinGroupModal";
import UserSettingsModal from "./UserSettingsModal";

export default function SideBar({ onGroupCreate, onGroupJoin }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [memoryMessages, setMemoryMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
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

  const fetchMemory = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/service/memory", {
        headers: {
            "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setMemoryMessages(data.data);
        setShowMemoryModal(true);
      }
    } catch (error) {
      console.error("Error fetching memory:", error);
    }
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

  const handleCloseMemoryModal = () => {
    setShowMemoryModal(false);
    setSelectedGroup(null);
  };

  const groupedMemories = memoryMessages.reduce((acc, msg) => {
    if (!acc[msg.groupName]) acc[msg.groupName] = [];
    acc[msg.groupName].push(msg);
    return acc;
  }, {});

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
        {/* Option 1: Chats
        <div className="w-12 h-12 bg-[#caffbf] border-2 border-black rounded-[12px] 
                        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                        flex items-center justify-center cursor-pointer 
                        hover:translate-x-[1px] hover:translate-y-[1px] transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div> */}
        
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

        {/* Option 3: Memory */}
        <div 
          onClick={fetchMemory}
          className="w-12 h-12 bg-[#bdb2ff] border-2 border-black rounded-[12px] 
                        shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] 
                        flex items-center justify-center cursor-pointer 
                        hover:translate-x-[1px] hover:translate-y-[1px] transition"
          title="Memory Box"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      </div>

      {showMemoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#fffdf9] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b-4 border-black bg-[#dfe7fd] flex justify-between items-center">
              <div className="flex items-center gap-3">
                {selectedGroup && (
                  <button 
                    onClick={() => setSelectedGroup(null)}
                    className="p-1 border-2 border-black rounded-full hover:bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    title="Back to Groups"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                  </button>
                )}
                <h2 className="text-2xl font-bold italic">
                  {selectedGroup ? `Memory: ${selectedGroup}` : "Memory Box"}
                </h2>
              </div>
              <button onClick={handleCloseMemoryModal} className="font-bold text-xl hover:text-red-500 cursor-pointer">X</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 no-scrollbar">
              {!selectedGroup ? (
                /* Group Grid View */
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(groupedMemories).map((groupName) => (
                    <div 
                      key={groupName}
                      onClick={() => setSelectedGroup(groupName)}
                      className="border-4 border-black p-6 rounded-[20px] bg-[#caffbf] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                                 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                                 transition-all cursor-pointer flex flex-col items-center justify-center gap-2"
                    >
                      <span className="text-xl font-black uppercase text-center">{groupName}</span>
                      <span className="text-sm font-bold bg-white/50 px-2 py-0.5 rounded-full border-2 border-black">
                        {groupedMemories[groupName].length} items
                      </span>
                    </div>
                  ))}
                  {Object.keys(groupedMemories).length === 0 && (
                    <div className="col-span-2 text-center py-10 text-gray-500 italic">
                      No memories yet... Start starring messages!
                    </div>
                  )}
                </div>
              ) : (
                /* Starred Messages View */
                <div className="flex flex-col gap-4">
                  {groupedMemories[selectedGroup].map((msg) => (
                    <div 
                      key={msg.messageId} 
                      className="bg-white border-4 border-black p-4 rounded-[15px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex justify-between items-start mb-2 border-b-2 border-black/10 pb-1">
                        <span className="font-black text-[#fb8500]">@{msg.senderTag}</span>
                        <span className="text-[10px] font-bold uppercase text-gray-500">
                          {new Date(msg.pinnedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium leading-relaxed">{msg.messageContent}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCreateModal && <CreateGroupModal onClose={handleCloseCreateModal} onGroupCreate={onGroupCreate} />}
      {showJoinModal && <JoinGroupModal onClose={handleCloseJoinModal} onGroupJoin={onGroupJoin} />}
      {showSettingsModal && <UserSettingsModal onClose={handleCloseSettingsModal} />}
    </>
  );
}
