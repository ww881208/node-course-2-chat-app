var socket = io(); //initiate, create a connection
//var jQuery = jQuery();

socket.on('connect', function () { //client side js does not use lamda expression
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@exmmple.com',
    //     text: 'Hey, this is from client'
    // });
    // socket.emit('createMessage', {
    //     from: 'who',
    //     text: 'Message created by who'
    // })
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newEmail', function (email) {
    console.log('new eamil', email);
});

socket.on('newMessage', function(message){
    console.log('new message from server',message);
    var li = jQuery('<li></li>');
    li.text(message.from + ' : ' + message.text);

    jQuery("#messages").append(li);
});

socket.on('newLocationMessage', function(message){
    cnonsole.log('newLocationMessage', message);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(message.from + ':');
    a.attr('href', message.url);
    li.append(a);
    jQuery("#messages").append(li);

});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// },function(data){
//     console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function(){

    if(!navigator.geolocation){
        return alert('Geolocaton not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position);
        socket.emit('createLocationMessage', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });

    }, function(){
        alert('Cannot get current geo location.')
    });
});