import * as http from 'http';
import { Server } from 'socket.io';
import { messageAPI } from '../apis/messagesapi';

// Socket Server
export const ioServer = (server: http.Server) => {
	const io = new Server(server);
	io.on('connection', async (socket) => {
		console.log('Client Connected OKs');

		try {
			
			socket.on('sendMessage', async (message) => {
				try {
					await messageAPI.addMessage(message)
				} catch (error) {
					console.log(error);
				}
				io.emit('messages', await messageAPI.getMessages());
			});

			socket.emit('messages', await messageAPI.getMessages());
		} catch (error) {
			console.log(error);
		}
	});

	return io;
};
