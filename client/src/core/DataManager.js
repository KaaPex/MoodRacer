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
        imgElement.src = src;

        // load async image
        return new Promise( (resolve, reject) => {
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

    _loadConfig() {
        let rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        //call async request
        rawFile.open("GET", this._configSrc, true);
        rawFile.send(null);

        return new Promise( (resolve, reject) => {
            rawFile.addEventListener("readystatechange", function(event) {
                let target = event.target;
                if (target.readyState === 4 && target.status === 200) {
                    resolve(target.responseText);
                }
            });

            rawFile.addEventListener('error', function(event) {
                reject(new Error('JSON not loaded: ' + event.target.src));
            });
        });
    }

    _createCarData(car, ctx) {

        this.cars[car.name] = car;
        this.cars[car.name].frames = car.frames.map( (frame) => {
            frame.data = ctx.getImageData(frame.x, frame.y, frame.width, frame.height);
            return frame;
        });

    }

    _loadCarsData() {
        let carsData = this._config.carsData;
        this._loadData(carsData.source).then((data) => {
            // create context of cars data
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            ctx.width = data.width;
            ctx.height = data.height;
            ctx.drawImage(data, 0, 0);

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
        this._loadConfig().then( (jsonData) => {
            this._config = JSON.parse(jsonData);
            console.log("Json loaded successfully");

            // load cars
            this._loadCarsData();
            console.dir(this.cars);

        }).catch( (error) => {
            console.error("Error loading: " + error);
        });
    }
}

export default DataManager;
