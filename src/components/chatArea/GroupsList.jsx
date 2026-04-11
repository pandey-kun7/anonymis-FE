import React, { useState } from "react";

export default function GroupsList({ groups, selectedGroupId, setSelectedGroupId }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-[300px] h-full flex flex-col bg-[#fffdf9]">
      {/* Search Bar */}
      <div className="p-4 border-b-2 border-black bg-[#dfe7fd]">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search groups..."
          className="w-full px-4 py-2 border-2 border-black rounded-[12px] 
                     shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                     bg-[#fefae0] outline-none text-sm"
        />
      </div>

      {/* Groups List */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {groups
          .filter(g => (g.name || g.groupName).toLowerCase().includes(searchTerm.toLowerCase()))
          .map(group => (
            <div
              key={group._id}
              onClick={() => setSelectedGroupId(group._id)}
              className={`p-3 border-2 border-black rounded-[15px] 
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] 
                         flex items-center gap-3 cursor-pointer 
                         hover:translate-x-[1px] hover:translate-y-[1px] transition
                         ${selectedGroupId === group._id ? "bg-blue-200" : ""}`}
              style={{ backgroundColor: group.color }}
            >
              <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center font-bold">
                {(group.name || group.groupName)[0]}
              </div>
              <span className="font-bold text-sm">{group.name || group.groupName}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
