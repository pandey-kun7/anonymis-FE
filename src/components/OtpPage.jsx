import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpPage({ showPopup, email }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    const apiUrl = "http://localhost:8000/api/auth/verify-otp";
    const requestBody = {
      otp,
      email: email || localStorage.getItem("email") || ""
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const res = await response.json();

      if (res.success) {
        localStorage.setItem("token",res["data"]["token"])
        localStorage.setItem("userId",res["data"]["userId"])
        showPopup("OTP verified successfully!");
        navigate("/chat");
      } else {
        showPopup(res.message || "Invalid OTP");
      }
    } catch (error) {
      showPopup("An error occurred. Please try again.");
      console.error("Error during OTP verification:", error);
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

          {/* Big OTP Title */}
          <div className="text-center text-4xl border-2 border-black rounded-[15px] 
                          shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]
                          bg-[#dfe7fd] py-2">
            Enter OTP
          </div>

          {/* OTP Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">OTP</label>
            <input
              type="text"
              placeholder="otp goes here"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-[10px] 
                         shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                         bg-[#fefae0] outline-none"
            />
          </div>

          {/* Verify Button */}
          <button 
            onClick={handleVerifyOtp}
            className="mt-2 px-5 py-2 border-2 border-black rounded-[12px] 
                             shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]
                             bg-[#caffbf]
                             hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer">
            Verify OTP
          </button>

        </div>
      </div>
    </div>
  );
}
