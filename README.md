# DeepEigen-Project
# Overview
The Real-time Bitcoin Tracker is a full-stack application that tracks Bitcoin price data in real-time and displays it visually. <br/>
Demo - https://www.youtube.com/watch?v=VCgpXN4jfT8 <br/>
<br/>
## Technology Stack<br/>
<br/>
# Frontend:<br/>
React.js: User interface development<br/>
Ant Design: UI components and styling<br/>
ApexCharts: Data visualization<br/>
Framer Motion: Animations<br/>
WebSocket: Real-time communication<br/>
React Router: Routing<br/>
<br/>
# Backend:<br/>
Node.js & Express: Server-side logic<br/>
Socket.io: Real-time data exchange<br/>
Mongoose: MongoDB interaction<br/>
JWT: Authentication<br/>
CoinGecko API: Bitcoin price data<br/>
<br/>
# Setup<br/>
Prerequisites:<br/>
Node.js and npm should be installed.<br/>
MongoDB configured with the user schema.<br/>
<br/>
Installation:<br/>
Clone the repository: git clone https://github.com/RaviIIT/DeepEigen-Project/<br/>
Frontend : cd client -> npm install<br/>
Backend : cd server -> npm install<br/>
<br/>
Environment Variables:<br/>
Create .env files in both frontend and backend directories.<br/>
Add the necessary variables:<br/>
(a) Frontend: REACT_APP_URL=your_app_url<br/>
(b) Backend: MONGODB_URI=your_mongodb_connection_string, JWT_SECRET=your_jwt_secret<br/>
<br/>
Running the Application:<br/>
Frontend: npm start (Runs on http://localhost:3000)<br/>
Backend: npm run dev (Runs on http://localhost:4000)<br/>
<br/>
Backend Setup<br/>
Prerequisites: <br/>
-> Node.js and npm should be installed.<br/>
-> Schema of Database for Users in MongoDB created.<br/>
<br/>
# Features<br/>
Real-time Data Tracking: Automatic updates from the CoinGecko API.<br/>
Visualizations: Dynamic charts showing the latest Bitcoin prices.<br/>
User Authentication: JWT-based session management.<br/>
Smooth Animations: Enhancing user experience with Framer Motion.<br/>
