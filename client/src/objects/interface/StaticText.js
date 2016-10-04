/**
 * Created on 02.10.16.
 * StaticText of client project
 */
"use strict";
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
        this._text = text;
        this._name = "StaticText";
        this._fontHeight = this.getFontHeight(this._textOpt.font);

        // set canvas size for one line text with margin? if need
        if (this._textOpt.marginLeft * 2 + this._textOpt.lineWidth > this._canvas.width) {
            this.size.width = this._textOpt.marginLeft * 2 + this._textOpt.lineWidth;
        }
        // we need measure text to fit it in multiline
    }

    getFontHeight(font) {
        let parent = document.createElement("span");
        parent.appendChild(document.createTextNode("height"));
        document.body.appendChild(parent);
        parent.style.cssText = "font: " + font + "; white-space: nowrap; display: inline;";
        let height = parent.offsetHeight;
        document.body.removeChild(parent);
        return height;
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
        this._clearCanvas();

        this._2dContext.save();
        this._2dContext.fillStyle = this._textOpt.fillStyle;
        this._2dContext.font = this._textOpt.font;
        this._2dContext.textAlign = this._textOpt.textAlign;

        let line = "";
        let marginTopOffset = this._textOpt.marginTop;
        let words = this._text.split(" ");
        words.map( (word) => {
            let testLine = line + word + " ";
            let testLineWidth = this._2dContext.measureText(testLine).width;

            if (testLineWidth > this._textOpt.lineWidth) {
                this._2dContext.fillText(line, this._textOpt.marginLeft, marginTopOffset);
                line = word + " ";
                marginTopOffset += this._fontHeight;
            } else {
                line = testLine;
            }
        });
        if (line.length > 0) {
            this._2dContext.fillText(line, this._textOpt.marginLeft, marginTopOffset);
        }

        // resize canvas if it too small
        if (marginTopOffset + this._textOpt.marginTop > this._canvas.height) {
            this.size.height = marginTopOffset + this._textOpt.marginTop;
        }
        this._2dContext.restore();

        this._alignText();
        super.render(mainContext, timestamp); // need to comment at all
    }

    update(progress) {
        //overrides

        // nothing, but if we add change text
        // we need call _measure method
    }
}

export default StaticText;
