/**
 * Created on 29.09.16.
 * Debug of client project
 */
"use strict";

const DEFAULT_DEBUG_OPT = {
    last_render: true,
    fps: true
};

class Debug {
    constructor(anchor, options = DEFAULT_DEBUG_OPT) {
        if (!anchor) {
            throw "Parent element not set";
        }

        this._options = options;

        let rect = anchor.getBoundingClientRect();
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

    init() {
        if (this._options.last_render) {
            let lastRenderElem = document.createElement("div");
            lastRenderElem.className = "debug__last-render";
            this._debugElem.appendChild(lastRenderElem);
            this._lastRenderElem = lastRenderElem;
        }

        if (this._options.fps) {
            let fpsElem = document.createElement("div");
            fpsElem.className = "debug__fps";
            this._debugElem.appendChild(fpsElem);
            this._fpsElem = fpsElem;
        }
    }

    render(game) {
        if (this._options.last_render) {
            this._lastRenderElem.textContent = "Last Render: " + Math.floor(game.lastRender / 1000);
        }

        if (this._options.fps) {
            this._fpsElem.textContent = "FPS: " + Math.floor(game.fps);
        }
    }
}

export default Debug;
