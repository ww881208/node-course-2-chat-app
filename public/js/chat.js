var socket = io(); //initiate, create a connection
//var jQuery = jQuery();
function scrollToBottom() {

    //selector
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    //vars
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }

}
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
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery("#messages").append(html);
    scrollToBottom();
    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // console.log('new message from server',message);
    // var li = jQuery('<li></li>');
    // li.text(message.from + ' ' + formattedTime + ' : ' + message.text);

    // jQuery("#messages").append(li);
});

socket.on('newLocationMessage', function(message){
    //cnonsole.log('newLocationMessage', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var locationTemplate = jQuery('#location-message-template').html();
    var locationHtml = Mustache.render(locationTemplate, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    jQuery("#messages").append(locationHtml);
    scrollToBottom();

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>');
    // li.text(message.from + ' at ' + formattedTime + ':');
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery("#messages").append(li);

});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// },function(data){
//     console.log('Got it', data);
// });

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    });
});

var locationButton = jQuery("#send-location");
locationButton.on('click', function(){

    if(!navigator.geolocation){
        return alert('Geolocaton not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text("Sending Location...");

    navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position);
        locationButton.removeAttr('disabled').text("Send Location");
        socket.emit('createLocationMessage', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });

    }, function(){
        locationButton.removeAttr('disabled').text("Send Location");
        alert('Cannot get current geo location.')
    });
});