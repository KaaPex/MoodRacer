/**
 * Created on 27.09.16.
 * index of server project
 */
import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();

startServer(store);





//store.dispatch({type: 'NEW_GAME'});
