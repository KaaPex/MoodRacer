/**
 * Created on 11.10.16.
 * reducer.js of server project
 */
"use strict";
let singleton = require("../src/server-state");

export default function reducer(state = singleton.instance.top, action) {
  switch (action.type) {
    case 'NEW_GAME':
      return singleton.instance.getRoom();
  }
  return state;
}
