const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port_ws: process.env.PORT_WS,
  port_wss: process.env.PORT_WSS,
};
