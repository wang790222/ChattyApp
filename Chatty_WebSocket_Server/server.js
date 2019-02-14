const express = require('express');
const WebSockets = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  broadcastOnlineUserNum(wss.clients.size);
  setColorOfUserName(ws);

  ws.on("message", function msgComing(msg) {
    const msgJsonObj = JSON.parse(msg);
    msgJsonObj.id = uuidv1();
    wss.broadcast(msgJsonObj);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    broadcastOnlineUserNum(wss.clients.size);
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSockets.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

const broadcastOnlineUserNum = (numOfUsers) => {
  const numObj = {
    usersNum: numOfUsers
  };

  wss.broadcast(numObj);
};

const setColorOfUserName = (ws) => {
  const colorOptions = ["#FF0000", "#808080", "#008000", "#1E90FF"];
  const colorObj = {
    color: colorOptions[Math.floor(Math.random() * 4)]
  }
  ws.send(JSON.stringify(colorObj));
}
