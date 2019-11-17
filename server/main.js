const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path')
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (req,res) => res.sendFile(__dirname + '/dist/index.html'))

io.on('connection', (socket) => {
    socket.username = 'anonymous';
    socket.on('message', (message) => {
        if (message != '') {
            io.emit('message', {
                'user': socket.username,
                'message': message,
            })
        }
    });
    socket.on('join', (username) => {
        if (username != '') {
            socket.username = username;
        }
        socket.broadcast.emit('message', {
            user: 'Server', 
            'message': `${socket.username} has joined!`
        })
    })
})

http.listen(3000, () => {
    console.log('Listing on port 3000!')
})