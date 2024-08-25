# DeepEigen-Project
# Overview
The Real-time Bitcoin Tracker is a full-stack application that tracks Bitcoin price data in real-time and displays it visually. < br / >
Demo - https://www.youtube.com/watch?v=VCgpXN4jfT8 < br / >

## Technology Stack

# Frontend:
React.js: User interface development
Ant Design: UI components and styling
ApexCharts: Data visualization
Framer Motion: Animations
WebSocket: Real-time communication
React Router: Routing

# Backend:
Node.js & Express: Server-side logic
Socket.io: Real-time data exchange
Mongoose: MongoDB interaction
JWT: Authentication
CoinGecko API: Bitcoin price data

# Setup
Prerequisites:
Node.js and npm should be installed.
MongoDB configured with the user schema.

Installation:
Clone the repository: git clone https://github.com/RaviIIT/DeepEigen-Project/
Frontend : cd client -> npm install
Backend : cd server -> npm install

Environment Variables:
Create .env files in both frontend and backend directories.
Add the necessary variables:
(a) Frontend: REACT_APP_URL=your_app_url
(b) Backend: MONGODB_URI=your_mongodb_connection_string, JWT_SECRET=your_jwt_secret

Running the Application:
Frontend: npm start (Runs on http://localhost:3000)
Backend: npm run dev (Runs on http://localhost:4000)

Backend Setup
Prerequisites: 
-> Node.js and npm should be installed.
-> Schema of Database for Users in MongoDB created.

# Features
Real-time Data Tracking: Automatic updates from the CoinGecko API.
Visualizations: Dynamic charts showing the latest Bitcoin prices.
User Authentication: JWT-based session management.
Smooth Animations: Enhancing user experience with Framer Motion.
