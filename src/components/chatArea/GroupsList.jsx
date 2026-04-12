import React, { useState, useEffect } from "react";

export default function GroupsList({
  groups,
  selectedGroupId,
  setSelectedGroupId,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.startsWith("@")) {
        const query = searchTerm.slice(1);
        if (query.length > 0) {
          try {
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");
            const apiUrl = "http://localhost:8000/api/service/get-users";

            const response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                userSearch: query,
                email
              }),
            });

            const res = await response.json();

            if (res.success) {
              setUserList(res.data);
            }
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        } else {
          setUserList([]);
        }
      } else {
        setUserList([]);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOnGroupClick = async (groupId) => {
    setSelectedGroupId(groupId);
  };

  return (
    <div className="w-[300px] h-full flex flex-col bg-[#fffdf9]">
      {/* Search Bar */}
      <div className="p-4 border-b-2 border-black bg-[#dfe7fd]">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInput}
          placeholder="Search groups..."
          className="w-full px-4 py-2 border-2 border-black rounded-[12px] 
                     shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                     bg-[#fefae0] outline-none text-sm"
        />
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {searchTerm.startsWith("@") ? (
          // Render Users List
          userList.length > 0 ? (
            userList.map((user) => (
              <div
                key={user._id}
                className="p-3 border-2 border-black rounded-[15px] 
                           shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] 
                           flex items-center gap-3 cursor-pointer 
                           hover:translate-x-[1px] hover:translate-y-[1px] transition
                           bg-white"
              >
                <div className="w-10 h-10 bg-yellow-200 border-2 border-black rounded-full flex items-center justify-center font-bold">
                  {user.userAlias ? user.userAlias[0] : "?"}
                </div>
                <span className="font-bold text-sm">{user.userAlias}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-sm">No users found</div>
          )
        ) : (
          // Render Groups List
          groups
            .filter((g) =>
              (g.name || g.groupName)
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((group) => (
              <div
                key={group._id}
                onClick={() => handleOnGroupClick(group._id)}
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
                <span className="font-bold text-sm">
                  {group.name || group.groupName}
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
