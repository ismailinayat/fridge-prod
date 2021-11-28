const path = require('path');
const express = require('express');


const cors = require('cors');
/*
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true

}
*/
const app = express();

//app.use(cors(corsOptions));


app.use(express.static(path.join(__dirname, 'public')));

__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "build", "index.html"))
  })
}

console.log(__dirname)


module.exports = app;
