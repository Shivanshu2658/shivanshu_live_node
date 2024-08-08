const socketIo = require('socket.io');
let io;

const initSocket = (server) => {
    io = socketIo(server);
    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        // Additional socket events can be handled here
    });
};

const getIo = () => {
    if (!io) {
        throw new Error('Socket.IO not initialized');
    }
    return io;
};

module.exports = { initSocket, getIo };
