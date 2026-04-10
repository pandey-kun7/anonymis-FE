import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ showPopup }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const apiUrl = "http://localhost:8000/api/auth/login";
    const requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/otp");
      } else {
        showPopup(data.message || "Login failed");
      }
    } catch (error) {
      showPopup("An error occurred. Please try again.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-[#f4f1ee] flex items-center justify-center font-[cursive]">
      
      {/* Outer Container (Wider) */}
      <div className="w-[99vw] max-w-6xl h-[90vh] border-2 border-black rounded-[35px] 
                      shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] 
                      flex items-center justify-center bg-[#eae7e2]">
        
        {/* Inner Card */}
        <div className="w-[30vw] p-8 border-2 border-black rounded-[25px] 
                        shadow-[5px_5px_0px_0px_rgba(0,0,0,0.8)] 
                        bg-[#fffdf9] flex flex-col gap-6">

          {/* Big Login Title */}
          <div className="text-center text-4xl border-2 border-black rounded-[15px] 
                          shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]
                          bg-[#dfe7fd] py-2">
            Login
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Email</label>
            <input
              type="email"
              placeholder="email goes here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-[10px] 
                         shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                         bg-[#fefae0] outline-none"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Password</label>
            <input
              type="password"
              placeholder="password goes here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-[10px] 
                         shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                         bg-[#fefae0] outline-none"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="mt-2 px-5 py-2 border-2 border-black rounded-[12px] 
                             shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]
                             bg-[#caffbf]
                             hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer">
            Login
          </button>

        </div>
      </div>
    </div>
  );
}