var express = require('express');
var http = require('http');
var socket = require('socket.io');
var app = express();

var server = http.createServer(app);
var io = socket.listen(server);

app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(client){
	console.log("Client connected...");
	client.on('join', function(name){
		client.nickname = name;
	});

	client.on('messages', function(message){
		//get nickname of this client
		var nickname = client.nickname;
		console.log(message);

		//broad cast message to all client in the chat
		client.broadcast.emit('messages', nickname + ": " + message);

		//send the same message back to our client
		client.emit('messages', nickname + ": " + message);
	});
});


server.listen(5000);