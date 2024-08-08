const express = require("express");
const env = require("dotenv");
const mongoConnet = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const http = require('http'); // Import the http module
const socketConfig = require('./socket'); // Import the socket module

env.config();

mongoConnet();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
socketConfig.initSocket(server);

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/chat', chatRoutes);

app.get("/", (req, res) => {
    res.status(200).send("Checking the first deployment");
});

server.listen(process.env.PORT || 4500, () => {
    console.log("Server Started");
});
