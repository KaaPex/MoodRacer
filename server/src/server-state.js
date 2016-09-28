/**
 * Created on 27.09.16.
 * server-state.js of server project
 * singleton of our server, creates once
 */
"use strict";
import GameState from "./gamestate";

// создаем уникальний Symbol для нашего синглтона
const GAME_KEY = Symbol.for("Mood.Racer.server.state");

// проверяем есть ли уже такой Symbol в глобальном объекте
let globalSymbols = Object.getOwnPropertySymbols(global);
let hasGame = (globalSymbols.indexOf(GAME_KEY) > -1);

// если не нашли, то создаем
if (!hasGame){
    global[GAME_KEY] = new GameState();
    global[GAME_KEY].init();
}

// объявляем синглтон
let singleton = {};

Object.defineProperty(singleton, "instance", {
    get: function(){
        return global[GAME_KEY];
    }
});

// делаем так что наш синглтон никогда н еизменится
Object.freeze(singleton);

// экспортируем наш объект
module.exports = singleton;


