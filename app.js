const express = require('express'),
      app     = express(),
      fs      = require('fs'),
      http = require('http').Server(app),
      io = require('socket.io')(http);





app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));


app.get('/', (req, res) => {
  let dataMessage;
  fs.readFile('db.txt', 'utf-8', (err, data) => {
    if(err) throw err;
    dataMessage = data.split('|');
    res.render('index', {dataMessage})
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    fs.appendFile('db.txt', msg + '|', (err) => {
      if(err) throw err;
      io.emit('chat message', msg);
    })
  });
});
http.listen(3000, () => console.log('Server work!'));
