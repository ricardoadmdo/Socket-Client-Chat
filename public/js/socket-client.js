// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');
const mensajeContainer = document.querySelector('#mensajeContainer');

const socket = io();

socket.on('connect', () => {
	// console.log('Conectado');

	lblOffline.style.display = 'none';
	lblOnline.style.display = '';
});

socket.on('disconnect', () => {
	// console.log('Desconectado del servidor');

	lblOnline.style.display = 'none';
	lblOffline.style.display = '';
});

socket.on('enviar-mensaje', payload => {
	const mensajeRecibido = payload.mensaje;
	// Crear un nuevo elemento de párrafo
	const nuevoMensaje = document.createElement('p');
	nuevoMensaje.textContent = mensajeRecibido;

	// Agregar el nuevo mensaje al contenedor
	mensajeContainer.appendChild(nuevoMensaje);

	// Hacer scroll hacia abajo para mostrar el último mensaje
	mensajeContainer.scrollTop = mensajeContainer.scrollHeight;
});

btnEnviar.addEventListener('click', () => {
	const mensaje = txtMensaje.value;
	const payload = {
		mensaje,
		id: '123ABC',
		fecha: new Date().getTime(),
	};

	socket.emit('enviar-mensaje', payload, msg => {
		const mensajeConfirmado = msg;

		// Crear un nuevo elemento de párrafo
		const nuevoMensaje = document.createElement('p');
		nuevoMensaje.textContent = mensajeConfirmado;

		// Establecer el color verde al nuevo mensaje
		nuevoMensaje.style.color = 'green';

		// Agregar el nuevo mensaje al contenedor
		mensajeContainer.appendChild(nuevoMensaje);

		// Hacer scroll hacia abajo para mostrar el último mensaje
		mensajeContainer.scrollTop = mensajeContainer.scrollHeight;
	});
});
