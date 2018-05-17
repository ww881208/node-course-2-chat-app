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

    socket.on('disconnect', () => {
        console.log('disconnected from client');
    })

});

//app.listen(app.get('port'), () => {
server.listen(port, () => {
    console.log('Server is up on port ' + port); //app.get('port'));
});