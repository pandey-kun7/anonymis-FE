import React, { useState } from "react";
import SideBar from "./SideBar";
import GroupsList from "./GroupsList";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  const [groups, setGroups] = useState([
    { _id: "1", name: "Public Group", color: "#ffd6a5" },
    { _id: "2", name: "Friends Only", color: "#bdb2ff" },
    { _id: "3", name: "Dev Team", color: "#a0c4ff" },
  ]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleGroupCreate = (newGroup) => {
    const colors = ["#ffd6a5", "#bdb2ff", "#a0c4ff", "#caffbf", "#ffadad"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGroups([...groups, { ...newGroup, name: newGroup.groupName, color: randomColor }]);
  };

  const handleGroupJoin = (joinedGroup) => {
    const colors = ["#ffd6a5", "#bdb2ff", "#a0c4ff", "#caffbf", "#ffadad"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGroups([...groups, { ...joinedGroup, name: joinedGroup.groupName, color: randomColor }]);
  };

  return (
    <div className="w-screen h-screen bg-[#f4f1ee] flex items-center justify-center font-[cursive]">
      <div className="w-[98vw] h-[96vh] border-2 border-black rounded-[35px] 
                      shadow-[10px_10px_0px_0px_rgba(0,0,0,0.8)] 
                      flex bg-[#eae7e2] overflow-hidden">
        <SideBar onGroupCreate={handleGroupCreate} onGroupJoin={handleGroupJoin} />
        <ChatWindow groupId={selectedGroupId} />
        <GroupsList groups={groups} selectedGroupId={selectedGroupId} setSelectedGroupId={setSelectedGroupId} />
      </div>
    </div>
  );
}
