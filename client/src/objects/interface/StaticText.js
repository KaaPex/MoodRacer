/**
 * Created on 02.10.16.
 * StaticText of client project
 */
"use strict";
import Utils from "../../core/Utils";
import GameObject from "../../core/GameObject";

const DEFAULT_STATIC_TEXT_OPT = {
    lineWidth: 200,
    fillStyle: "#fff",
    font: "22px serif",
    textAlign: "left",
    backgroundColor: "gray",
    marginLeft: 20,
    marginTop: 40
};

class StaticText extends GameObject {
    constructor(text = "Static Text", options = DEFAULT_STATIC_TEXT_OPT) {
        super();

        this._textOpt = options;
        this._text = this._formatText(text); // text array splited by width
        this._name = "StaticText";
        this._fontHeight = Utils.getFontHeight(this._textOpt.font); // default 25px
        this._updateText = true;

        // set canvas size for one line text with margin? if need
        if (this._textOpt.marginLeft * 2 + this._textOpt.lineWidth > this.size.width) {
            this.size =Object.assign({}, this.size, { width:  this._textOpt.marginLeft * 2 + this._textOpt.lineWidth});
        }
        // we need measure text to fit it in multiline
    }

    set text(text) {
        this._text = this._formatText(text); // text array splited by width
        this._updateText = true;
    }

    _formatText(text) {
        let textArr = [];

        let line = "";
        let words = text.split(" ");
        words.forEach( (word) => {
            let testLine = line + word + " ";
            let testLineWidth = Utils.getFontWidth(this._textOpt.font, testLine);

            if (testLineWidth > this._textOpt.lineWidth) {
                textArr.push(line);
                line = word + " ";
            } else {
                line = testLine;
            }
        });
        if (line.length > 0) {
            textArr.push(line);
        }
        return textArr;
    }

    _alignText() {
        //TO-DO Need to think about how to align it
        switch (this._textOpt.textAlign) {
            case "left":
                break;
            case "right":
                this._2dContext.translate(this.size.width * this._state.scale / 2, this.size.height * this._state.scale / 2);
                break;
            case "center":
                this._2dContext.translate(this.size.width * this._state.scale / 2, this.size.height * this._state.scale / 2);
                break;
        }
    }

    render(mainContext, timestamp) {
        //overrides
        if (this._updateText) {

            let textHeight = this._textOpt.marginTop  + this._text.length * this._fontHeight;
            // resize canvas if it too small, but it reset context
            if (textHeight > this._canvas.height) {
                this.size = Object.assign({}, this.size, { height: textHeight });
            }

            this._clearCanvas();

            this._2dContext.save();
            this._2dContext.fillStyle = this._textOpt.fillStyle;
            this._2dContext.font = this._textOpt.font;
            this._2dContext.textAlign = this._textOpt.textAlign;

            // fill context with text
            let marginTopOffset = this._textOpt.marginTop;
            this._text.forEach ( (line, index) => {
                 this._2dContext.fillText(line, this._textOpt.marginLeft, marginTopOffset);
                marginTopOffset += this._fontHeight;
            });

            this._2dContext.restore();

            this._alignText();

            // set status to not render, while we didnt change font or text
            this._updateText = false;
        }

        // main render
        super.render(mainContext, timestamp);
    }

    update(lastTick) {
        //overrides

        // nothing, but if we add change text
        // we need call _measure method
    }
}

export default StaticText;
