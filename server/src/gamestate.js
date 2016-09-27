/**
 * Created on 27.09.16.
 * gamestate of server project
 */
"use strict";

class GameState {
    constructor() {
        this._rooms = [];
    }

    getRoom() {
        let lastFreeRoom = this._rooms.pop();

        if (lastFreeRoom && lastFreeRoom.users < 4) {
            // если есть свободная комната и в ней меньше 4х игроков,
            // то увеличиваем число игроков и возвращаем ее
            lastFreeRoom.users += 1;
            return lastFreeRoom;
        } else {
            // не нашли, тогда создаем новую комнату, добавляем ее в массив и возвращаем
            lastFreeRoom = {
                name: "Room#" + this._rooms.length + 1,
                users: 1
            };
            this._rooms.push(lastFreeRoom);
            return lastFreeRoom;
        }
    }

    get rooms() {
        return this._rooms;
    }
}

export  default GameState;