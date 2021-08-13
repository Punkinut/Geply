const io = require('socket.io')(8900, {
    cors:{
        origin: 'http://localhost:3000',
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some(user=>user.userId === userId ) &&
    users.push({ userId, socketId})
};

const removeUser = (sokcetId) => {
    users = users.filter(user => user.socketId !== sokcetId)
}

io.on('connection', (socket) => {
    io.emit('Welcome, this is socket.io')
    socket.on('addUser', userId => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected')
        removeUser(socket.id)
        io.emit('getUsers', users)
    })
})
