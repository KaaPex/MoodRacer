/**
 * Created on 28.09.16.
 * Game of client project
 */
"use strict";
import Debug from "./Debug";

/**
 * Main game class
 */
class Game {
    constructor(anchor, options = {fps: 60, debug: false} ) {
        if (!anchor) {
            throw "Parent element not set";
        }
        this._canvas = anchor;
        this.__gameId = null;
        this.__tick = options.fps / 3.75 || 16; // 60 fps is roughly 16ms
        this.__lastTick = performance.now();
        this.__lastRender = this.__lastTick;
        this._isPaused = false;
        this._isDebug = options.debug;
        this._debugElem = null;
        this._fps = 0;
    }

    get fps() {
        return this._fps;
    }

    get lastRender() {
        return this.__lastRender;
    }

    /**
     * Init starting state of the game and all game objects
     * @private
     */
    _setInitialState() {

        // init element for debug output
        if (this._isDebug) {
            this._debugElem = new Debug(this._canvas);
            this._debugElem.init();
        }
    }

    /**
     * Update the state of the game for the elapsed time since last render
     * @private
     */
    _update() {
        // change game objects state with this.__lastTick
    }

    _queueUpdates(numTicks) {
        for(let i=0; i < numTicks; i++) {
            this.__lastTick = this.__lastTick + this.__tick; //Now lastTick is this tick.
            this._update();
        }
    }

    _render() {


        // render debug information on main screen
        if (this._isDebug) {
            this._debugElem.render(this);
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
            lastRenderElem.textContent = "Last Render: " + Math.floor(this.__lastRender / 1000);

            let fpsElem = this._debugElem.querySelector(".debug__fps");
            if (!fpsElem) {
                fpsElem = document.createElement("div");
                fpsElem.className = "debug__fps";
                this._debugElem.appendChild(fpsElem);
            }
            fpsElem.textContent = "FPS: " + Math.floor(this._fps);
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
        this._fps = 1000 / (timestamp - this.__lastRender);
        // update  current state
        this._queueUpdates(numTicks);
        // render current frame
        this._render();

        this.__lastRender = timestamp;
        if (!this._isPaused) {
            this.__gameId = window.requestAnimationFrame(this._mainFrame.bind(this)); // it's usually call every 16ms
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
        this._isPaused = !this._isPaused;
        // game is not paused, restore last render to tick
        if (!this._isPaused) {
            this.__lastTick = this.__lastRender;
        }
    }
}

export default Game;
