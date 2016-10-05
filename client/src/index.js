"use strict";
<<<<<<< HEAD

import DataManager from './core/DataManager';
import Game from './core/Game';

let test = document.querySelector(".js-test");


let main = document.querySelector(".js-app");
=======
import Game from './core/Game';
let main = document.querySelector(".app");
>>>>>>> origin/master
let canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
canvas.className = 'game';

main.appendChild(canvas);

// Load data
let dm = new DataManager();
dm.preLoad();

// start game
let options = {fps: 60, debug: true};
let game = new Game(canvas, options);
game.start();
<<<<<<< HEAD
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


=======
//game.togglePause();
>>>>>>> origin/master
