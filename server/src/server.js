/**
 * Created on 27.09.16.
 * server.js of server project
 */
"use strict";
import Server from 'socket.io';

export default function startServer(store) {
  const PORT = 8099;
  const io = new Server().attach(PORT);

  store.subscribe(
    () => io.emit('state', JSON.stringify(store.getState()))
  );

  io.on('connection', (socket) => {
    socket.emit('state', JSON.stringify(store.getState()));
    socket.on('action', store.dispatch.bind(store));
  });


  console.log("Server started at port: " + PORT);
}
