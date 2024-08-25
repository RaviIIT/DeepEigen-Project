const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const fetch = require("node-fetch");
const connectDb = require("./config/connectDb");
const dotenv = require("dotenv");
const app = express();

// config dot env file
dotenv.config();

//database call
connectDb();

//middlewares
app.use(express.json());
app.use(cors());

//routes
//user routes
app.use("/api/v1/users", require("./routes/UserRoute"));

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.REACT_APP_SOCKET_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  let interval;
  socket.on("requestData", async (cryptoId) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}`
      );
      const data = await response.json();
      interval = setInterval(() => {
        socket.emit("cryptoData", data);
      }, 8000);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

  socket.on("disconnect", () => {
    clearInterval(interval);
  });
});


const PORT = 4000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
