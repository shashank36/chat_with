const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');



const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);

var io = socketIO.listen(server);
io.on('connection',(socket) => {
	console.log("New user connected !");

	// New user joins in 
	socket.emit('newMessage', generateMessage('Admin','Welcome new user'));

	// Broadcast that a new user is here
	socket.broadcast.emit('newMessage',generateMessage('Admin', 'New User joined'));

	// socket.emit('newMessage', {
	// 	from: "Mike",
	// 	text: "something happened at that place",
	// 	createdAt: 12 
	// });


	//logging a user message in terminal
	socket.on('createMessage', (message,callback) =>{
		console.log('createMessage', message);
		callback("server got the message");
		io.emit('newMessage',generateMessage(message.from,message.text));

		// socket.broadcast.emit('newMessage',{
		// 	from: message.from,
		// 	text: message.text
		// })
		//  actual message from one user to another
	});

	socket.on('createLocationMessage',(coords) => {
		io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
	});


	socket.on('disconnect', () => {
		console.log("Disconnected from client !");
	});
});



app.use(express.static(publicPath));

server.listen(port,() => {
	console.log("Server is running!!");
});