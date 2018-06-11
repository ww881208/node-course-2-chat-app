const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//app.set('port', process.env.PORT || 3000);
const port = process.env.PORT || 3000;
var users = new Users();

app.use(express.static('public'));
console.log(publicPath);

io.on('connection', (socket) => {
    console.log('new user connection');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required.');
        }

        socket.join(params.room); //join the room
        users.removeUser(socket.id); //ensure that the user is removed from other rooms.
        users.addUser(socket.id, params.name, params.room); //update the users

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.leave('The office fan'); //leave a room

        //io.emit -> io.to('The office fan').emit //emit to the users of the room
        //socket.broadcase.emit -> socket.broadcase.to('The office fan').emit
        //socket.emit //to the user who just join

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', params.name + ' has joined'));
        callback();
    })

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
        //console.log('createMessage', message);

        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            //io.emit('newMessage', generateMessage(message.from, message.text)); //this sends message to everyone regardless chat rooms
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); //send message to specific room 
        }
        callback();


        //socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app.'));
        //socket.emit('newMessage', generateMessage(message.from, message.text));

        //socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));
        //callback('this is from the server.');

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
        var user = users.getUser(socket.id);

        if(user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
            //console.log(coords.longitude);
        }
    })

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);
        console.log(user);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', user.name + ' has left.'));
        } else {
            console.log('no user removed');
        }
    })

});

//app.listen(app.get('port'), () => {
server.listen(port, () => {
    console.log('Server is up on port ' + port); //app.get('port'));
});