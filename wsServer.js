const WebSocket = require('ws');
import 'fs' from 'fs'
const { port } = require('./config');
const wss = new WebSocket.Server({ port }, () =>{
	console.log('WebSocket is running on ' + port)
});

// wss.on('upgrade', (req,socket) => {
// 	console.log('This is upgrade');

// 	// Read the websocket key provided by the client: 
//   const acceptKey = req.headers['sec-websocket-key']; 
//   // Generate the response value to use in the response: 
//   const hash = generateAcceptValue(acceptKey); 
//   // Write the HTTP response into an array of response lines: 
//   const responseHeaders = [ 'HTTP/1.1 101 Web Socket Protocol Handshake', 'Upgrade: WebSocket', 'Connection: Upgrade', `Sec-WebSocket-Accept: ${hash}` ]; 
//   // Write the response back to the client socket, being sure to append two 
//   // additional newlines so that the browser recognises the end of the response 
//   // header and doesn't continue to wait for more header data: 
//   socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');
// })

// function generateAcceptValue (acceptKey) {
//   return crypto
//   .createHash('sha1')
//   .update(acceptKey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', 'binary')
//   .digest('base64');
// }

wss.on('connection', (ws, req, client) => {
	console.log('New connection in WS')
	
  ws.on('message', (msg) => {
		console.log(`Received Message ${msg}. \n From ${ JSON.stringify(req.headers['deviceid'])}`)
	});
	
	ws.on('data', (data) => {
		console.log('Received data ' + data.toString)
  });
});



//------------------------------------------------------------Second version -----------------------------------------------------
// const http = require('http');
// const ws = require('ws');
// const { port } = require('./config.js');
// const server = http.createServer();
// const wss = new ws.Server({noServer: true});

// server.on('connection', (req) => {
// 	server.on('message', (msg)=> {
// 		console.log(`Received message ${msg} from user ${client}`);
// 	});
// })


// server.on('upgrade', (req, socket, head) => {
// 	console.log('New Connection (Verification on Process).........')


// 	if (!(req.headers['deviceid']) && req.headers['sec-websocket-key'] != 'SecretKeyForGettingAccessToWebSocketFromESP') {
// 			console.log('Credentials was wrong, Device Disconnected!')
//       socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
//       socket.destroy();
// 			return; }

// 	console.log(`${req.headers['deviceid']} - was Successfully verified!`)

	
	
//   wss.handleUpgrade(req, socket, head, (ws) => {
// 		console.log("new websocket");
//     wss.emit('connection', ws, req, ...args);
//   });
	
// 	});
	
	

// server.listen(port, () => {
// 	console.log('WebSocket Up and Listening on port - ' + port)
// });