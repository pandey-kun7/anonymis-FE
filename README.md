# Anonymis Frontend

Anonymis is a modern, real-time chat application built with React 19 and Vite. It features a unique, high-contrast UI design with a focus on real-time communication through groups and individual interaction.

## 🚀 Features

- **Real-time Messaging**: Powered by Socket.io for instantaneous message delivery.
- **Authentication System**: Complete flow including Sign-up, Login, and OTP (One-Time Password) verification.
- **Group Management**: Users can create new chat groups or join existing ones.
- **Protected Routes**: Secure access to the chat interface ensuring only authenticated users can participate.
- **Offline Resilience**: Basic support for handling message sending during network interruptions.
- **Unique Aesthetic**: A "Neubrutalist" inspired design with bold borders, custom shadows, and a playful "cursive" font style.
- **Modern Tech Stack**: Built with React 19 and Tailwind CSS 4 for high performance and rapid styling.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Real-time Communication**: [Socket.io-client](https://socket.io/)
- **Linting**: [ESLint](https://eslint.org/)

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd anonymis-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Setup:
   Ensure your backend server is running (default expectation is `http://localhost:8000`).

### Running the Project

To start the development server:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

## 📂 Project Structure

```text
src/
├── assets/             # Images and static assets
├── components/         # Reusable UI components
│   ├── chatArea/       # Core chat functionality (Layout, Window, Sidebar)
│   ├── LoginPage.jsx   # Authentication components
│   ├── SignUp.jsx
│   └── ...
├── App.jsx             # Main application component & routing
├── main.jsx            # Entry point
└── index.css           # Global styles and Tailwind imports
```

## 📡 Backend Integration

This frontend is designed to communicate with the Anonymis Backend API. It expects the following:
- **API Base URL**: `http://localhost:8000/api`
- **Socket Server**: `http://localhost:8000`
- **Authentication**: JWT-based (stored in `localStorage`)

## 🎨 UI/UX Philosophy

Anonymis uses a distinctive styling approach:
- **Borders**: Heavy 2px black borders on most elements.
- **Shadows**: Hard, non-blurred shadows (`10px 10px 0px 0px rgba(0,0,0,0.8)`).
- **Colors**: A vibrant yet soft pastel palette for message bubbles and group avatars.
- **Typography**: Playful font-family choices to give a friendly, approachable feel.
