/**
 * Created on 11.10.16.
 * store.js of server project
 */
"use strict";
import {createStore} from 'redux';
import reducer from './reducer';

export default function makeStore() {
  return createStore(reducer);
}
