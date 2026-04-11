import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import GroupsList from "./GroupsList";
import ChatWindow from "./ChatWindow";

export default function ChatLayout() {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [initialMessages, setInitialMessages] = useState([]);

  const handleGroupFetch = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const apiUrl = "http://localhost:8000/api/group/get-user-groups";
    const token = localStorage.getItem("token")
    
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const res = await response.json();
      if (res.success) {
        const colors = ["#ffd6a5", "#bdb2ff", "#a0c4ff", "#caffbf", "#ffadad"];
        const groupsWithColors = res.data.map(group => ({
          ...group,
          color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setGroups(groupsWithColors);
      }
    } catch (error) {
      console.error("Error during group fetch:", error);
    }
  };

  const handleOnGroupClick = async (groupId) => {
    setSelectedGroupId(groupId);
    const apiUrl = `http://localhost:8000/api/group/group-messages/${groupId}`;
    const token = localStorage.getItem("token");
    
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const res = await response.json();
      if (res.success) {
        setInitialMessages(res.data);
      } else {
        setInitialMessages([]);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setInitialMessages([]);
    }
  };

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("chat_reloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("chat_reloaded", "true");
      window.location.reload();
    } else {
      handleGroupFetch();
    }
  }, []);

  const handleGroupCreate = (newGroup) => {
    const colors = ["#ffd6a5", "#bdb2ff", "#a0c4ff", "#caffbf", "#ffadad"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGroups((prev) => [...prev, { ...newGroup, name: newGroup.groupName, color: randomColor }]);
  };

  const handleGroupJoin = (joinedGroup) => {
    const colors = ["#ffd6a5", "#bdb2ff", "#a0c4ff", "#caffbf", "#ffadad"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGroups((prev) => [...prev, { ...joinedGroup, name: joinedGroup.groupName, color: randomColor }]);
  };

  return (
    <div className="w-screen h-screen bg-[#f4f1ee] flex items-center justify-center font-[cursive]">
      <div className="w-[98vw] h-[96vh] border-2 border-black rounded-[35px] 
                      shadow-[10px_10px_0px_0px_rgba(0,0,0,0.8)] 
                      flex bg-[#eae7e2] overflow-hidden">
        <SideBar onGroupCreate={handleGroupCreate} onGroupJoin={handleGroupJoin} />
        <ChatWindow groupId={selectedGroupId} initialMessages={initialMessages} />
        <GroupsList groups={groups} selectedGroupId={selectedGroupId} setSelectedGroupId={handleOnGroupClick} />
      </div>
    </div>
  );
}
