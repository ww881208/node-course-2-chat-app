var socket = io(); //initiate, create a connection
socket.on('connect', function () { //client side js does not use lamda expression
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@exmmple.com',
    //     text: 'Hey, this is from client'
    // });
    socket.emit('createMessage', {
        from: 'who',
        text: 'Message created by who'
    })
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newEmail', function (email) {
    console.log('new eamil', email);
});

socket.on('newMessage', function(message){
    console.log('new message from server',message);
});