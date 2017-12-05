
//  Include Library ============================================================
//var datetime = require('node-datetime');
var express   = require("express");
// Setup =======================================================================
var app       = express();
var port      = process.env.PORT  ||  7777;
//var conf = require("./config/conf.js");
// Configuration================================================================

  // Set up our express application
  app.use(express.static("public"));
  app.set("view engine","ejs"); // Set up ejs for templating
  app.set("views","./views"); // Set up dir views

  //require("./app/routes.js")(app,conf);

  var server = require("http").Server(app);
  var io = require("socket.io")(server);

  server.listen(port, function(){
  	console.log("Server is running on port " + port);
  });

  io.on('connection' , function(socket){
  	console.log(socket.id + " has just connected.");

  	socket.on('ex_changed',function(response){

  	});


  });