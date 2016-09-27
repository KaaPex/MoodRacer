/**
 * Created on 27.09.16.
 * gamestate_test of server project
 */
"use strict";
import {expect} from 'chai';
import GameState from "../src/gamestate";

describe('GameState class logic', () => {
    it ('create new GameState class with empty room', () => {
        let gameState = new GameState();
        const rooms = [];
        expect(gameState.rooms).to.deep.equal(rooms);
    });

    it ('return new room with name "Room#1" and 1 user', () => {
        let gameState = new GameState();
        const room = { name: "Room#01", users: 1};
        expect(gameState.getRoom()).to.deep.equal(room);
    });
});