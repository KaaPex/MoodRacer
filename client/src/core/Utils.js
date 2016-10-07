"use strict";

class Utils {

    static getImageSrc(width, height, imageData) {
        if (!imageData) {
            throw new Error("No Image Data");
        }

        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").putImageData(imageData, 0 ,0);
        return canvas.toDataURL("image/png");
    }

    static getFontHeight(font) {
        let parent = document.createElement("span");
        parent.appendChild(document.createTextNode("height"));
        document.body.appendChild(parent);
        parent.style.cssText = "font: " + font + "; white-space: nowrap; display: inline;";
        let height = parent.offsetHeight;
        document.body.removeChild(parent);
        return height;
    }

    static getFontWidth(font, text) {
        let parent = document.createElement("span");
        parent.appendChild(document.createTextNode("width"));
        document.body.appendChild(parent);
        parent.style.cssText = "font: " + font + "; white-space: nowrap; display: inline;";
        parent.innerHTML = text;
        let width = parent.offsetWidth;
        document.body.removeChild(parent);
        return width;
    }

    static roundedRect(ctx, x, y, width, height, radius, color) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

export default Utils;
