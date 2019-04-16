var socket = io();
button.onclick = function () {
  var message = document.getElementById('message').value;
  if (message) {
    socket.emit('chat message', message);
  }

}
socket.on('chat message', function(msg){
    $('.chat').append($('<div class="message">').text(msg));
});
