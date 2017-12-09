//  Include Library ============================================================
//var datetime = require('node-datetime');
const express = require("express");
const fs = require("fs");
const config = require("./config.js")(fs);
const request = require('request');

const coinmarketcap = require("./services/coinmarketcap.js");

// Setup =======================================================================
const app = express();
const port = process.env.PORT || config.port;
const port_ssl = process.env.port || 443;
// Configuration================node================================================
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'));


// HTTPS
const https = require("https").Server(config.ssl_options, app);
// SOCKET.IO
const io = require("socket.io")(https);

https.listen(port, function () {
  console.log("Server is running on port " + port);
});


var fc_data = null;

app.get('/fce.history', (req, res, next) => {
  res.render('index');
});

var fc_url = 'https://api.coinmarketcap.com/v1/ticker/firstcoin/';
setInterval(() => {
  request(fc_url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      fc_data = JSON.parse(body);
    } else {
      console.log("Got an error: ", error, ", status code: ", response.statusCode);
    }
  });
}, 3000);

setInterval(() => {
  io.sockets.emit("STC_UPFCMC", { data: fc_data, lastedUpdate: new Date() });
}, 3000);
// SOCKET IO ======================================================
io.on('connection', function (socket) {
  console.log(socket.id + " has just connected.");
  socket.on('SOCKET_CTS', function (response) {


    socket.emit("SOCKET_STC", {
      idSocket: socket.id,
      msg: socket.id + " say ." + response.msg
    })
  });


});
