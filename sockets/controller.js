const socketController = socket => {
	console.log('Cliente conectado');

	socket.on('disconnect', () => {
		console.log('Cliente desconectado');
	});

	socket.on('enviar-mensaje', (payload, callback) => {
		callback('Mensaje enviado!');

		socket.broadcast.emit('enviar-mensaje', payload);
	});
};

module.exports = {
	socketController,
};
