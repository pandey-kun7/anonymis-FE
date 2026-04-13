import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
  auth: { token: localStorage.getItem("token") }
});

export default function ChatWindow({ groupId, initialMessages = [] }) {

  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(null);
  const userTag = localStorage.getItem("userTag");
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored userId:", storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
    }

    socket.on("connect", () => {
      console.log("Socket connected!");
      setConnectionStatus("connected");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
      setConnectionStatus("disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket Connection Error:", err.message);
      setConnectionStatus("disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, []);

  useEffect(() => {
    console.log("ChatWindow useEffect triggered. groupId:", groupId, "userId:", userId, "status:", connectionStatus);
    if (!groupId || !userId || connectionStatus !== "connected") {
      console.log("Not joining room. Conditions not met.");
      return;
    }

    console.log(`Emitting "join" for groupId: ${groupId} and userId: ${userId}`);
    socket.emit("join", { groupId, userId ,userTag });

    socket.on("receive-message", (msg) => {
      console.log("Received message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("group-deleted",()=>{
      // alert("Group Expired");
      setMessages((prev)=>[])
      // navigate("/chat")
      location.reload();
    })

    return () => {
      console.log(`Cleaning up "receive-message" listener for groupId: ${groupId}`);
      socket.off("receive-message");
    };
  }, [groupId, userId, connectionStatus]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "" || !groupId || !userId) {
      return;
    }

    const newMessage = {
      groupId,
      text: input,
      senderTag: userTag,
    };

    if(!navigator.onLine || connectionStatus!=="connected"){
      const pendingMsgs = JSON.parse(localStorage.getItem("pendingMsgs") || "[]");
      pendingMsgs.push(newMessage);
      localStorage.setItem("pendingMsgs",JSON.stringify(pendingMsgs));
      setInput("");
    }else{
      socket.emit("send-message", newMessage);
      setInput("");
    }

    // Add message to local state immediately for better UX
    // setMessages((prev) => [...prev, { ...newMessage, _id: Date.now().toString(), userId: userId, text: input }]);
  };

  useEffect(()=>{

     function handleOnline(){
      const pendingMsgs = JSON.parse(localStorage.getItem("pendingMsgs") || []);
      if(pendingMsgs.length){
        for(const msg of pendingMsgs){
          socket.emit("send-message",msg);
        }
      }
      localStorage.removeItem("pendingMsgs")
    }

    window.addEventListener("online",handleOnline);

    return ()=> window.removeEventListener("online",handleOnline);
  

  },[])

  const statusColors = {
    connecting: "bg-yellow-500",
    connected: "bg-green-500",
    disconnected: "bg-red-500",
  };

  return (
    <div className="flex-1 flex flex-col bg-[#eae7e2] overflow-hidden border-r-2 border-black">
      {/* Header */}
      <div className="p-4 border-b-2 border-black bg-[#dfe7fd] flex justify-between items-center">
        <h2 className="text-2xl font-bold">Chat Room</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm">{connectionStatus}</span>
          <div className={`w-4 h-4 rounded-full ${statusColors[connectionStatus]} border border-black`}></div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto no-scrollbar flex flex-col gap-4">
        {connectionStatus !== "connected" && (
          <div className="text-center text-gray-500">
            Could not connect to the chat server. Please make sure the server is running.
          </div>
        )}
        {messages.map((msg, index) => (
          <div
            key={msg._id || index}
            className={`max-w-[70%] wrap-break-word p-3 rounded-[15px] border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] ${
              msg.senderId === userId
                ? "self-end bg-[#caffbf]"
                : "self-start bg-[#fffdf9]"
            }`}
          >
            <strong>{msg.senderId === userId ? "You" : msg.senderTag}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSendMessage}
        className="p-4 border-t-2 border-black bg-[#fffdf9] flex gap-4"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={connectionStatus === 'connected' ? "Type a message..." : "Disconnected"}
          className="flex-1 px-4 py-2 border-2 border-black rounded-[12px] 
                     shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                     bg-[#fefae0] outline-none"
          disabled={connectionStatus !== "connected"}
        />
        <button
          type="submit"
          className="px-6 py-2 border-2 border-black rounded-[12px] 
                     shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]
                     bg-[#fdffb6] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
          disabled={connectionStatus !== "connected"}
        >
          Send
        </button>
      </form>
    </div>
  );
}