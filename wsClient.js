const WebSocket = require('ws');
const { port } = require('./config');

const cred = {
	headers: {
		'sec-websocket-key' : 'SecretKeyForGettingAccessToWebSocketFromESP',
		'DeviceId': 'HeyHereIsDeviceID'
	}
}


const ws = new WebSocket(`ws://localhost:${port}`, {headers: {'deviceId': 'Bekhzod'}});

ws.on('open', function incoming(data) {

  setTimeout(() =>  {
    ws.send(Date.now());
	}, 50);
	

});

// ws.on('open', function open() {
// 	setTimeout(() =>  {
//     ws.send(Date.now());
//   }, 50);
//   // ws.send('Open');
// });
// ws.on('message', function incoming(data) {
//   console.log(data);
// });
