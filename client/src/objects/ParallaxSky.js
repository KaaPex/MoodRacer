/**
 * Created on 17.10.16.
 * ParallaxSky.js of client project
 */

import GameObject from "../core/GameObject";

class ParallaxSky extends GameObject {
    constructor(...clouds) {
        super();
        this._clouds = clouds;

    }


}

export default ParallaxSky;
