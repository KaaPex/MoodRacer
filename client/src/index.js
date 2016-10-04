"use strict";
import Game from './core/Game';
let main = document.querySelector(".js-app");
let canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
canvas.className = 'game';

main.appendChild(canvas);

let options = {fps: 60, debug: true};
let game = new Game(canvas, options);
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


