const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var {generateMessage, generateLocationMessage} = require('./utils/message');

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

    // socket.emit('newMessage', {
    //     from: 'someone',
    //     text: 'Hey!',
    //     createdAt: 456
    // })

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('createMessage', (message, callback) => {
        console.log('new message from client', message);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app.'));
        socket.emit('newMessage', generateMessage(message.from, message.text));

        socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

        //callback('this is from the server.');
        callback();


        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
        console.log(coords.longitude);
    })

    socket.on('disconnect', () => {
        console.log('disconnected from client');
    })

});

//app.listen(app.get('port'), () => {
server.listen(port, () => {
    console.log('Server is up on port ' + port); //app.get('port'));
});