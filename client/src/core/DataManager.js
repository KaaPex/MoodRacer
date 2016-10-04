/**
 * Created on 04.10.16.
 * DataManager of client project
 */


class DataManager {
    constructor(src, config) {
        this._src = src;
        this._config = config;
    }

    _loadData(src) {
        let imgElement = new Image();
        imgElement.src = src;

        // load async image
        return new Promise((resolve, reject) => {
            // если использовать => то потеряется контекст и будет this = DataManager
            imgElement.addEventListener('load', function() {
                if (('naturalHeight' in this && this.naturalHeight + this.naturalWidth === 0) ||
                    (this.width + this.height == 0)) {
                    reject(new Error('Image not loaded:' + this.src));
                } else {
                    resolve(this);
                }
            });

            imgElement.addEventListener('error', function() {
                reject(new Error('Image not loaded:' + this.src));
            });
        });
    }

    preLoad() {
        this._loadData(this._src).then( (data) => {
            // process our data
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            ctx.width = data.width;
            ctx.height = data.height;

            ctx.drawImage(data, 0, 0);

            console.log("Loaded successfully");
        }).catch( (error) => {
            console.error("Error loading: " + error);
        });
    }
}

export default DataManager;