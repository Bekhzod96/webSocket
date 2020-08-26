const WebSocket = require('ws');
const { createServer } = require('wss');
const fs = require('fs');
const { port_wss, port_ws } = require('./config');

const ws = new WebSocket.Server({ port: port_ws }, () => {
  console.log('WebSocket is running on ' + port_ws);
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

ws.on('connection', (ws, req, client) => {
  console.log('New connection in WS');

  ws.on('message', (msg) => {
    console.log(
      `Received Message ${msg}. \n From ${JSON.stringify(
        req.headers['deviceid']
      )}`
    );
    let time = new Date().toISOString();
    fs.appendFile('./Logs/messageLogs.txt', `${time} ->  ${msg} \n`, (err) => {
      if (err) throw err;
      console.log('Saved!');
    });
  });

  ws.on('data', (data) => {
    console.log('Received data ' + data.toString);
    let time = new Date().toISOString();
    fs.appendFile('./Logs/dataLogs.txt', `${time} ->  ${msg} \n`, (err) => {
      if (err) throw err;
      console.log('Saved!');
    });
  });
});

//------------------------------------------------------------Second version -----------------------------------------------------

const https = require('https');

const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/dev3.arc.lv/privkey.pem',
  'utf8'
);
const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/dev3.arc.lv/cert.pem',
  'utf8'
);
const ca = fs.readFileSync(
  '/etc/letsencrypt/live/dev3.arc.lv/chain.pem',
  'utf8'
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

const server = https.createServer({ credentials });
const wss = new WebSocket.Server({ server });

wss.listen(port_wss, () => {
  console.log('WebSocket Secure Up and Listening on port - ' + port_wss);
});

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
