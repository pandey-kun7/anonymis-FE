import React, { useState } from "react";

export default function ChatArea() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", sender: "system" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#f4f1ee] flex items-center justify-center font-[cursive]">
      <div className="w-[99vw] max-w-6xl h-[90vh] border-2 border-black rounded-[35px] 
                      shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] 
                      flex flex-col bg-[#eae7e2] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b-2 border-black bg-[#dfe7fd] flex justify-between items-center">
          <h2 className="text-2xl font-bold">Chat Room</h2>
          <div className="w-4 h-4 rounded-full bg-green-500 border border-black"></div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[70%] p-3 rounded-[15px] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] ${
                msg.sender === "user"
                  ? "self-end bg-[#caffbf]"
                  : "self-start bg-[#fffdf9]"
              }`}
            >
              {msg.text}
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
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border-2 border-black rounded-[12px] 
                       shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                       bg-[#fefae0] outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 border-2 border-black rounded-[12px] 
                       shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]
                       bg-[#fdffb6] hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
