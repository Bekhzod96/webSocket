const WebSocket = require('ws');
const { port } = require('./config');

const cred = {
  headers: {
    'sec-websocket-key': 'SecretKeyForGettingAccessToWebSocketFromESP',
    DeviceId: 'HeyHereIsDeviceID',
  },
};

const ws = new WebSocket(`ws://localhost:1337`);

ws.on('open', function incoming(data) {
  ws.send('This is message');
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
