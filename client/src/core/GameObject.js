/**
 * Created on 29.09.16.
 * GameObject of client project
 */
"use strict";

const DEFAULT_GAME_OBJECT_STATE = {
    position: {
        x: 0,
        y: 0
    },
    size: {
        width: 100,
        height: 100
    },
    rotation: 0,
    scale: 1,
    clearColor: "#4D4E53"
};

class GameObject {
    constructor(state = DEFAULT_GAME_OBJECT_STATE) {
        this._state = state;

        this._name = "object";

        this._canvas = document.createElement('canvas');

        this._2dContext = this._canvas.getContext('2d');
    }

    _clearCanvas() {
        this._canvas.width = this.size.width;
        this._canvas.height = this.size.height;
        // default gray color
        this._2dContext.save();
        this._2dContext.fillStyle = this._state.clearColor;
        this._2dContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._2dContext.restore();
    }

    set state(state) {
        this._state = Object.assign({}, this._state, state);
    }

    set size(size) {
        this.state = {size};
    }

    get size() {
        return this._state.size;
    }

    set position(position) {
        this.state = {position};
    }

    get position() {
        return this._state.position;
    }

    render(mainContext, timestamp) {

        // add to main game context
        if (this.position.x > mainContext.canvas.width) {
            this.position.x -= mainContext.canvas.width;
        }

        let imgData = this._2dContext.getImageData(0, 0, this.size.width, this.size.height);
        mainContext.putImageData(imgData,
                                                       this.position.x, this.position.y,
                                                       0, 0,
                                                       this.size.width * this._state.scale,
                                                       this.size.height * this._state.scale);
    }

    update(progress) {

        this.position.x += progress / 8; // to make a little slowly

        this._clearCanvas();
        this._2dContext.save();
        this._2dContext.translate(this.size.width * this._state.scale / 2, this.size.height * this._state.scale / 2); // move to center of the canvas
        //this._2dContext.rotate((Math.PI/180) * progress);
        this._2dContext.fillStyle = "#FFF";
        this._2dContext.font = '22px serif';
        this._2dContext.textAlign = 'center';

        this._2dContext.fillText(this._name, 0, 6);
        this._2dContext.restore();
    }
}

export default GameObject;
