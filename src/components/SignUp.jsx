import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function generateUserTag(){
    const validChars = `qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890`;
    let userTag = `user_`;
    for(let i = 0 ; i < 12 ; i++){
      const randomIndex = Math.ceil((validChars.length-2)*Math.random() + 1);
      userTag+=validChars[randomIndex];
    }
    console.log(userTag);
    return userTag;
    
}

export default function SignUp({ showPopup }) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const [userTag, setUserTag] = useState(generateUserTag());

  const handleGenerateTag = () => {
    setUserTag(generateUserTag());
  };

  const handleSignUp = async () => {
    const apiUrl = "http://localhost:8000/api/auth/signup";
    const requestBody = {
      email,
      password,
      userAlias,
      userTag
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
        localStorage.setItem("email", email);
        navigate("/otp");
      } else {
        showPopup(data.message || "Sign up failed");
      }
    } catch (error) {
      showPopup("An error occurred. Please try again.");
      console.error("Error during sign up:", error);
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
            Sign up
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

          <div className="flex flex-col gap-1">
            <label className="text-sm">Alias</label>
            <input
              type="text"
              placeholder="password goes here"
              value={userAlias}
              onChange={(e) => setUserAlias(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-[10px] 
                         shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                         bg-[#fefae0] outline-none"
            />
          </div>


          <div className="flex flex-col gap-1">
            <label className="text-sm">User Tag</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="tag will appear here"
                value={userTag}
                className="flex-1 px-4 py-2 border-2 border-black rounded-[10px] 
                           shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                           bg-[#fefae0] outline-none"
                disabled
              />
              <button
                onClick={handleGenerateTag}
                type="button"
                className="px-3 py-1 border-2 border-black rounded-[10px] 
                           shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]
                           bg-[#ffcfd2] hover:translate-x-[1px] hover:translate-y-[1px] 
                           transition cursor-pointer text-sm"
              >
                Generate
              </button>
            </div>
          </div>

          {/* Sign up Button */}
          <button 
            onClick={handleSignUp}
            className="mt-2 px-5 py-2 border-2 border-black rounded-[12px] 
                             shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)]
                             bg-[#caffbf]
                             hover:translate-x-[1px] hover:translate-y-[1px] transition cursor-pointer">
            Sign up
          </button>
          
          <div className="text-center mt-2">
            Already have an account? Go to <span>
             <Link to="/login" className="text-sm text-blue-600 hover:underline">
                Login Page
            </Link>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}