const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//app.set('port', process.env.PORT || 3000);
const port = process.env.PORT || 3000;
app.use(express.static('public'));
console.log(publicPath);

io.on('connection', (socket) => {
    console.log('new user connection');

    // socket.emit('newEmail', {
    //     from: "abc@abc.com",
    //     text: 'hello this is from abc',
    //     createAt: 123

    // });

    socket.emit('newMessage', {
        from: 'someone',
        text: 'Hey!',
        createdAt: 456
    })

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (newMessage) => {
        console.log('new message from client', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('disconnected from client');
    })

});

//app.listen(app.get('port'), () => {
server.listen(port, () => {
    console.log('Server is up on port ' + port); //app.get('port'));
});