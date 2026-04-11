# Anonymis Frontend 🛡️💬

Anonymis is a real-time, group chat application built with **React 19**, **Vite**, and **Tailwind CSS 4**. This repository contains the frontend implementation, featuring a sleek user interface for joining, creating, and participating in anonymous chat groups.

---

## 🚀 Features

- **Anonymous Interaction:** Engage in real-time conversations within various chat groups.
- **Group Management:** Create new groups or join existing ones using group IDs.
- **Secure Authentication:** 
  - User registration and login.
  - OTP (One-Time Password) verification for enhanced security.
  - Protected routes to ensure only authenticated users can access the chat.
- **Real-time Messaging:** Powered by **Socket.io** for instant message delivery and synchronization.
- **Modern UI/UX:** 
  - Responsive layout with a dedicated Sidebar.
  - Dynamic group lists and interactive chat windows.
  - Styled with the latest Tailwind CSS 4 features.

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Real-time Engine:** [Socket.io-client](https://socket.io/)
- **Others:** `react-datepicker` for date selection.

---

## 📂 Project Structure

```text
src/
├── assets/             # Images, icons, and static assets
├── components/         # Reusable UI components
│   ├── chatArea/       # Chat-specific components (ChatLayout, Window, Sidebar)
│   ├── LoginPage.jsx   # Login interface
│   ├── SignUp.jsx      # Registration interface
│   ├── OtpPage.jsx     # OTP verification
│   └── ProtectedRoute.jsx # Route guarding logic
├── App.jsx             # Main application routing and state
└── main.jsx            # Entry point
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd anonymis-fe
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Backend Setup:**
   Ensure the **Anonymis Backend** is running. By default, the frontend expects the API and Socket server at:
   `http://localhost:8000`

### Running the App

Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

---

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Locally previews the production build.

---

## 🛠️ Configuration

The application currently connects to a backend running on `http://localhost:8000`. To change this, you will need to update the API URLs in the following files:
- `src/components/chatArea/ChatLayout.jsx`
- `src/components/chatArea/ChatWindow.jsx`
- `src/components/LoginPage.jsx`
- `src/components/SignUp.jsx`
- `src/components/OtpPage.jsx`

*(Consider moving these to an `.env` file for better environment management.)*


---

## 📄 License

Distributed under the MIT License. See `LICENSE` (if available) for more information.
