import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import OtpPage from './components/OtpPage';
import ChatArea from './components/ChatArea';
import './App.css';

function App() {
  const [popup, setPopup] = useState({ message: '', visible: false });

  const showPopup = (message) => {
    setPopup({ message, visible: true });
  };

  useEffect(() => {
    if (popup.visible) {
      const timer = setTimeout(() => {
        setPopup({ message: '', visible: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const renderWithProps = (element) => {
    return React.cloneElement(element, { showPopup });
  };

  return (
    <>
      <Routes>
        <Route path="/" element={renderWithProps(<SignUp />)} />
        <Route path="/login" element={renderWithProps(<LoginPage />)} />
        <Route path="/otp" element={renderWithProps(<OtpPage />)} />
        <Route path="/chat" element={<ChatArea />} />
      </Routes>
      {popup.visible && (
        <div className="fixed top-5 right-5 bg-red-500 text-white p-3 rounded shadow-lg">
          {popup.message}
        </div>
      )}
    </>
  );
}

export default App;
