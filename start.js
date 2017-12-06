
//  Include Library ============================================================
//var datetime = require('node-datetime');
var express   = require("express");
var fs = require("fs");
// Setup =======================================================================
var app       = express();
var port      = process.env.PORT  ||  7777;
var port_ssl	=	process.env.port || 443;
//var conf = require("./config/conf.js");
// Configuration================================================================

  // Set up our express application
  //app.use(express.static("public"));
  //app.set("view engine","ejs"); // Set up ejs for templating
  //app.set("views","./views"); // Set up dir views

  //require("./app/routes.js")(app,conf);

  var ssl_options = {
  	key: fs.readFileSync('./certificate/private.key'),
  	cert: fs.readFileSync('./certificate/certificate.crt'),
  	ca: fs.readFileSync('./certificate/ca_bundle.crt'),
  	//requestCert: true
  }

  var http = require("http").Server(app);
  // SSL
  var https = require("https").Server(ssl_options,app);

  var io = require("socket.io")(https);

  https.listen(port, function(){
  	console.log("Server is running on port " + port);
  });

  // https.listen(port_ssl,function(){
  // 	console.log("Server SSL is running on port " + port_ssl);
  // });

  io.on('connection' , function(socket){
  	console.log(socket.id + " has just connected.");

  	socket.on('SOCKET_CTS',function(response){
  		io.sockets.emit("SOCKET_SAU",{
  			idSocket : socket.id,
  			msg  : socket.id + " has just connected."
  		})
  	});


  });