const socket = require('socket.io');
const dotenv = require('dotenv');

dotenv.config({
  path: './config.env'
});


process.on('uncaughtException', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
const app = require('./app');


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const io = socket(server, {
  cors:{
    origin:["http://localhost:3000", "https://fridge.in.ngrok.io"]
    //origin:"https://fridge-rotated.vercel.app"
    //origin: "https://fridge.in.ngrok.io"
  }
})


// Listen for the connection

io.on('connection', function(socket) {
  console.log('hello')
  console.log('made socket connection')

  console.log(socket.id);

  socket.on('game', function() {
    console.log('clicked on the play button')
    socket.broadcast.emit('game')
  })

  socket.on('shop', function() {
    console.log('clicked on the Shop button')
    socket.broadcast.emit('shop')
  })

  socket.on('welcome', function() {
    console.log('a user opened the welcome page')
    socket.broadcast.emit('welcome')
  })

  socket.on('update', function() {
    console.log('update function triggered on the game')
    socket.broadcast.emit('update')
  })

  socket.on('launch', function(data) {

    console.log('launch function triggered on the game')
    console.log(data)
    socket.broadcast.emit('launch', data)
  })

  socket.on('createball', function(data) {

    console.log('create ball function triggered on the game')
    console.log(data)
    socket.broadcast.emit('createball', data)
  })

  socket.on('left', function() {

    console.log('left clicked on mobile')
    socket.broadcast.emit('left')
  })
  socket.on('right', function() {

    console.log('right clicked on mobile')
    socket.broadcast.emit('right')
  })

  socket.on('top', function() {

    console.log('top clicked on mobile')
    socket.broadcast.emit('top')
  })

  socket.on('bottom', function() {

    console.log('bottom clicked on mobile')
    socket.broadcast.emit('bottom')
  })

  socket.on('ok', function() {

    console.log('ok clicked on mobile')
    socket.broadcast.emit('ok')
  })
  
})

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  server.close(() => {
    process.exit(1)
  });
});
