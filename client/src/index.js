"use strict";
import Game from './core/Game';
let main = document.querySelector(".app");
let canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
canvas.className = 'game';

main.appendChild(canvas);

let options = {fps: 30, debug: true};
let game = new Game(canvas, options);
game.start();
//game.togglePause();
