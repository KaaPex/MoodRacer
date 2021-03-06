/**
 * Created on 14.10.16.
 * GameForm.js of client project
 */
import io from 'socket.io-client';
import DataManager from '../../core/DataManager';
import Game from '../../core/Game';

class GameForm {
    constructor(elem) {

        this._elem = elem;
    }

    render() {
        this._elem.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-xs-4 col-md-2 js-test">
                    <button type="button" class="btn btn-primary btn-block js-pause">Pause</button>
                    <button type="button" class="btn btn-primary btn-block js-new-game">New Game</button>
                </div>
                <div class="col-xs-4 col-md-2 js-app"></div>
            </div>
        </div>`;
    }

    show() {
        /*
        const location = {
            protocol: 'http:',
            hostname: 'localhost'
        };

        const socket = io(`${location.protocol}//${location.hostname}:8099`);
// subscribing to server state
        socket.on('state', state =>
            console.log(state)
        );

// if connection lost, trying to reconnect
        [
            'connect',
            'connect_error',
            'connect_timeout',
            'reconnect',
            'reconnecting',
            'reconnect_error',
            'reconnect_failed'
        ].forEach(ev =>
            socket.on(ev, () => console.log(ev, socket.connected))
        );
        */

        let newGame = document.querySelector(".js-new-game");
        newGame.addEventListener("click", () => {
            // get new game from server
            socket.emit('action', {
                meta: {remote: true},
                type: 'NEW_GAME'
            });
        });

        let main = document.querySelector(".js-app");
        let canvas = document.createElement("canvas");
        canvas.width = 800;
        canvas.height = 600;
        canvas.className = 'game';

        main.appendChild(canvas);

        console.log("=== INIT ===");
// Load data
        let dm = new DataManager();
        dm.preLoad()
            .then(launchGame)
            .catch( (error) => {
                console.error(error);
            });

        function launchGame() {
            console.log("=== Starting Game ===");
            // start game
            try {
                let options = {fps: 60, debug: true};
                let game = new Game(canvas, dm, options);
                game.start();
                //game.togglePause(); // this is for test

                let pauseBtn = document.querySelector(".js-pause");
                pauseBtn.addEventListener("click", (event) => {
                    game.togglePause();
                    if (event.target.innerHTML === "Pause") {
                        event.target.innerHTML = "Start";
                    } else {
                        event.target.innerHTML = "Pause";
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }
}

export default GameForm;