"use strict";

import DataManager from './core/DataManager';
import Game from './core/Game';

let test = document.querySelector(".js-test");


let main = document.querySelector(".js-app");
let canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
canvas.className = 'game';

main.appendChild(canvas);

// Load data
let dm = new DataManager();
dm.preLoad()
    .then(launchGame)
    .catch( (error) => {
        console.error(error);
    });

function launchGame() {
    console.log("starting game");
    // start game
    try {
        let options = {fps: 60, debug: true};
        let game = new Game(canvas, dm, options);
        game.start();
        game.togglePause();

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
        console.log(error);
    }
}
