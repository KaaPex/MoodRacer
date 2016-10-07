/**
 * Created by NikolaySmekalov
 */

"use strict";

/*

index.html - <div class="testDivButton"></div>

index.js   -
import Button from "./core/Button";
let button = new Button(".testDivButton", {
    text: "Ссылка",
    title: "Перейти по клику",
    upperCase: false
);

 */


import Utils from "./Utils";

class Button {

    constructor(elem, options) {
        if (!elem) {
            throw "Parent element not set";
        }

        this.elem = document.querySelector(elem);
        this.text  = options.text || "Button";

        this.upperCase = options.upperCase || true;

        if(this.upperCase) {
            this.text = this.text.toUpperCase();
        }

        this.title = options.title;

        this.bgColor = options.bgColor || "#ff0000";
        this.bgColorOver = options.bgColorOver || "#00ff00";

        this.txtColor = options.txtColor || "#000000";
        this.fontSize = options.fontSize || 12;
        this.fontFamily = options.fontFamily || "san-serif";

        this.defaultPadding = 10;
        this.paddingTop = options.paddingTop || this.defaultPadding;
        this.paddingRight = options.paddingRight || this.defaultPadding;
        this.paddingBottom = options.paddingBottom || this.defaultPadding;
        this.paddingLeft = options.paddingLeft || this.defaultPadding;

        this.radius = options.radius || 6;

        this.click = options.click;

        this.flagToMouse = 0;

        this._render(this.bgColor);
    }

    _initLsn(el) {
        el.addEventListener('click', this._onClick.bind(this));
        el.addEventListener('mouseover', this._onMouseOver.bind(this));
        el.addEventListener('mouseout', this._onMouseOut.bind(this));
    }

    _render(color) {
        this.elem.innerHTML = "";

        let font = this.fontSize+"px "+this.fontFamily;

        let canvas = document.createElement("canvas");
        canvas.style.cursor = "pointer";
        canvas.title = this.title;

        this._initLsn(canvas);
        this.elem.appendChild(canvas);
        let ctx = canvas.getContext('2d');

        this.width = Utils.getFontWidth(font, this.text) + this.paddingLeft + this.paddingRight;
        this.height = Utils.getFontHeight(font) + this.paddingTop + this.paddingBottom;

        canvas.width = this.width;
        canvas.height = this.height;

        this.utlis.roundedRect(ctx, 0, 0, this.width, this.height, this.radius, color);

        ctx.save();
        ctx.font = font;
        ctx.textAlign = "left";
        ctx.textBaseline = "center";
        ctx.fillStyle = this.txtColor;
        ctx.fillText(this.text, this.paddingLeft, this.paddingTop + this.fontSize - 1);
        ctx.restore();
    }

    _onClick() {
        this.click();
    }

    _onMouseOver() {
        if(this.flagToMouse === 0) {
            this._render(this.bgColorOver);
            this.flagToMouse = 1;
        }
    }

    _onMouseOut() {
        if(this.flagToMouse === 1) {
            this._render(this.bgColor);
            this.flagToMouse = 0;
        }
    }
}

export default Button;
