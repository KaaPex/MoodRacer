/**
 * Created on 04.10.16.
 * DataManager of client project
 */
"use strict";

class DataManager {
    constructor(configSrc = "./data/data.json") {
        this._configSrc = configSrc;
        this._config = null;
        this.cars = {};
    }

    _loadData(src) {
        let imgElement = new Image();

        // load async image
        return new Promise( (resolve, reject) => {
            // если использовать => то потеряется контекст и будет this = DataManager
            imgElement.addEventListener('load', (event) => {
                let imageElement = event.target;
                if (('naturalHeight' in imageElement && imageElement.naturalHeight + imageElement.naturalWidth === 0) ||
                    (imageElement.width + imageElement.height == 0)) {
                    reject(new Error('Image not loaded:' + imageElement.src));
                } else {
                    resolve(imageElement);
                }
            });

            imgElement.addEventListener('error', (event) => {
                let imageElement = event.target;
                reject(new Error('Image not loaded:' + imageElement.src));
            });

            imgElement.src = src;
        });
    }

    _loadConfig() {
        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        //call async request
        rawFile.open("GET", this._configSrc, true);

        return new Promise( (resolve, reject) => {
            rawFile.addEventListener("readystatechange", (event) => {
                let target = event.target;
                if (target.readyState === 4 && target.status === 200) {
                    resolve(target.responseText);
                }
            });

            rawFile.addEventListener('error', (event) => {
                reject(new Error('JSON not loaded: ' + event.target.src));
            });

            rawFile.send(null);
        });
    }

    _createCarData(car, ctx) {
        this.cars[car.name] = car;
        this.cars[car.name].frames = car.frames.map( (frame) => {
            frame.imgData = ctx.getImageData(frame.x, frame.y, frame.width, frame.height);
            return frame;
        });
    }

    _loadCarsData() {
        let carsData = this._config.carsData;

        return this._loadData(carsData.source).then((imgData) => {
            // create context of cars data
            let canvas = document.createElement("canvas");
            canvas.width = imgData.width;
            canvas.height = imgData.height;

            let ctx = canvas.getContext("2d");
            ctx.drawImage(imgData, 0, 0);

            // process cars
            let cars = carsData.cars;
            cars.forEach( (car) => {
                this._createCarData(car, ctx);
            });

            console.log("Cars loaded successfully");
        }).catch( (error) => {
            console.error("Cars data load error:" + error);
        });
    }

    preLoad() {
        return new Promise( (resolve, reject) => {
            this._loadConfig()
            .then( (jsonData) => {
                this._config = JSON.parse(jsonData);
                console.log("Json loaded successfully");
            })
            .then(this._loadCarsData.bind(this))
            .then(resolve)
            .catch( (error) => {
                reject("Error loading: " + error);
            });
        });
    }
}

export default DataManager;
