/**
 * Created on 02.10.16.
 * StaticText of client project
 */
"use strict";
import GameObject from "../../core/GameObject";

const DEFAULT_STATIC_TEXT_OPT = {
    length: 50,
    fillStyle: "white",
    font: "22px serif",
    textAlign: "left",
    backgroundColor: "gray"
};

class StaticText extends GameObject {
    constructor(text = "Static Text", options = DEFAULT_STATIC_TEXT_OPT) {
        super();

        this._textOpt = options;
        this._text = text;
        this._name = "StaticText";

        // we need measure text to fit it in multiline
        this._lengthPerLine = 0;
        this._measure();
    }

    _measure() {
        this._2dContext.save();
        this._2dContext.font = this._textOpt.font;
        this._2dContext.textAlign = this._textOpt.textAlign;
        let textMetrics = this._2dContext.measureText(this._text);
        console.log(textMetrics);
        this._2dContext.restore();
    }

    render(mainContext, timestamp) {
        //overrides
        super.render(mainContext, timestamp); // need to comment at all
    }

    update(lastTick) {
        //overrides
        super.update(lastTick); // need to comment at all

        // nothing, but if we add change text
        // we nwwd call _measure method
    }
}

export default StaticText;