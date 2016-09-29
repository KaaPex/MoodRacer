/**
 * Created on 29.09.16.
 * GameObject of client project
 */
"use strict";

class GameObject {
    constructor() {
        this._position = {
            x: 0,
            y: 0
        };
        this._size = {
            width: 100,
            height: 100
        };

        this._scale = 1; // min 0 - max 1

        this._name = "object";

        this._canvas = document.createElement('canvas');
        this._canvas.width = this._size.width;
        this._canvas.height = this._size.height;

        this._2dContext = this._canvas.getContext('2d');
    }

    _clearCanvas() {
        // gray color
        this._2dContext.fillStyle = "#4D4E53";
        this._2dContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    set position(position) {
        this._position = position;
    }

    setSize(size) {
        this._size = size;
        this._canvas.width = this._size.width;
        this._canvas.height = this._size.height;
    }

    render(mainContext, tFrame) {
        // add to main game context
        let imgData = this._2dContext.getImageData(0, 0, this._size.width, this._size.height);
        mainContext.putImageData(imgData, this._position.x, this._position.y, 0, 0, this._size.width * this._scale, this._size.height * this._scale);
    }

    update(progress) {
        this._clearCanvas();
        this._2dContext.translate(this._size.width * this._scale / 2, this._size.height * this._scale / 2); // move to center of the canvas
        //this._2dContext.save();
        this._2dContext.fillStyle = "#FFF";
        this._2dContext.font = '24px serif';
        this._2dContext.fillText(this._name, -30, 0);
        //this._2dContext.rotate(Math.PI/180);
        //this._2dContext.restore();
    }
}

export default GameObject;
