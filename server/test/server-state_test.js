/**
 * Created on 28.09.16.
 * server-state_test of server project
 */
"use strict";
import {expect} from 'chai';
let singleton = require("../src/server-state");

describe('Game state singleton', () => {
    it ('only one object', () => {
      let  newSingleton = require("../src/server-state");
      expect(singleton.instance).to.equal(newSingleton.instance);
    });

    it ('same romms', () => {
      let  newSingleton = require("../src/server-state");
      singleton.instance.getRoom();
      newSingleton.instance.getRoom();
      expect(singleton.instance.rooms).to.equal(newSingleton.instance.rooms);
    });
});

