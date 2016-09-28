/**
 * Created on 27.09.16.
 * gamestate of server project
 */
"use strict";

/** Class representing a game state on the server */
class GameState {
    /**
     * Constructs the object.
     */
    constructor() {
        this._rooms = [];
        this._topPlayers = [];
    }

    /**
     * Init class data
     * load top 10 players from gamestate.json file
     */
    init() {
        this._topPlayers = require('../gamestate.json');
    }

    /**
     * Return top 10 players
     *
     * @return     {array}  Array of 10 top players and his score
     */
    get top() {
        return this._topPlayers;
    }

    /**
     * Gets the last free room.
     *
     * @return     {object}  The room.
     */
    getRoom() {
        let length = this._rooms.length;
        let lastFreeRoom = this._rooms[length - 1];

        if (lastFreeRoom && lastFreeRoom.users < 4) {
            // если есть свободная комната и в ней меньше 4х игроков,
            // то увеличиваем число игроков и возвращаем ее
            lastFreeRoom.users += 1;
            this._rooms[length - 1] = lastFreeRoom;
            return lastFreeRoom;
        } else {
            // не нашли, тогда создаем новую комнату, добавляем ее в массив и возвращаем
            lastFreeRoom = {
                name: "Room#" + ( length + 1 ),
                users: 1
            };
            this._rooms.push(lastFreeRoom);
            return lastFreeRoom;
        }
    }

    /**
     * Return all rooms
     *
     * @return     {array}  The array of server rooms
     */
    get rooms() {
        return this._rooms;
    }
}

export  default GameState;
