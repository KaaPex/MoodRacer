/**
 * Created on 27.09.16.
 * server.js of server project
 */
"use strict";
import Server from 'socket.io';

export default function startServer() {
    const PORT = 8090;
    const io = new Server().attach(PORT);
    console.log("Server started at port: " + PORT);
}