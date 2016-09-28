/**
 * Created on 28.09.16.
 * Game of client project
 */
"use strict";

/**
 * Main game class
 */
class Game {
    constructor(window, options = {fps: 60, debug: false} ) {
        if (!window) {
            throw "Window canvas not set";
        }
        this._canvas =  window;
        this.__gameId = null;
        this.__tick = options.fps / 3.75 || 16; // 60 fps is exact 16ms
        this.__lastTick = this.__lastRender = performance.now();
        this.isPaused = false;
        this._debug = options.debug;
        this._debugElem = null;
    }

    /**
     * Init starting state of the game and all game objects
     * @private
     */
    _setInitialState() {

        // init element for debug output
        if (this._debug) {
            let rect = this._canvas.getBoundingClientRect();
            let debugElement = document.createElement("div");
            debugElement.className = "debug";
            debugElement.style.position = "absolute";
            debugElement.style.opacity = 0.7;
            debugElement.style.color = "#fff";
            debugElement.style.background = "gray";
            debugElement.style.top = rect.top + 'px';
            debugElement.style.left = rect.left + 'px';
            debugElement.innerHTML = "Debug Mode";
            this._debugElem = debugElement;
            document.body.appendChild(this._debugElem);
        }
    }

    /**
     * Update the state of the game for the elapsed time since last render
     * @private
     */
    _update() {

    }

    _queueUpdates(numTicks) {
        for(let i=0; i < numTicks; i++) {
            this.__lastTick = this.__lastTick + this.__tick; //Now lastTick is this tick.
            this._update();
        }
    }

    _render() {


        // render debug information on main screen
        if (this._debug) {
            this._debugRender();
        }
    }

    _debugRender() {
        if (this._debugElem) {
            let lastRenderElem = this._debugElem.querySelector(".debug__last-render");
            if (!lastRenderElem) {
                lastRenderElem = document.createElement("div");
                lastRenderElem.className = "debug__last-render";
                this._debugElem.appendChild(lastRenderElem);
            }
            lastRenderElem.textContent = "Last Render: " + Math.floor(this.__lastRender);
        }
    }

    /**
     * This is main frame of our game
     * @param {number} timestamp
     * @private
     */
    _mainFrame(timestamp) {
        // evaluate when will be next render
        let nextTick = this.__lastTick + this.__tick;
        let numTicks = 0;

        //If timestamp < nextTick then 0 ticks need to be updated (0 is default for numTicks).
        //If timestamp = nextTick then 1 tick needs to be updated (and so forth).
        if (timestamp > nextTick) {
            let timeSinceTick = timestamp - this.__lastTick;
            numTicks = Math.floor( timeSinceTick / this.__tick );
        }

        // update  current state
        this._queueUpdates(numTicks);
        // render current frame
        this._render();

        this.__lastRender = timestamp;
        if (!this.isPaused) {
            this.__gameId = window.requestAnimationFrame(this._mainFrame.bind(this));
        }
    }

    start() {
        this._setInitialState();
        this._mainFrame(performance.now());
    }

    stop() {
        window.cancelAnimationFrame(this.__gameId);
    }

    /**
     * Pause the game
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        // game is not paused, restore last render to tick
        if (!this.isPaused) {
            this.__lastTick = this.__lastRender;
        }
    }
}

export default Game;