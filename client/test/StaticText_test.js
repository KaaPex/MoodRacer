/**
 * Created on 17.10.16.
 * StaticText_test of client project
 */
"use strict";
import {expect} from 'chai';
import StaticText from "../src/objects/interface/StaticText";

describe('StaticText class logic -', () => {
    it ('create new StaticText with name "StaticText"', () => {
        let st = new StaticText();
        expect(st._name).to.equal("StaticText");
    });

    it ('canvas size of StaticText is default', () => {
        let st = new StaticText();
        const width = 240;
        const height = 100;

        expect(st._canvas.width).to.equal(width);
        expect(st._canvas.height).to.equal(height);
    });

    it ('set state value position into StaticText object and state is immutable', () => {
        let st = new StaticText();
        let oldState = st._state;
        const position = {x: 100, y: 100};
        const newState = {
            position: { x: 100, y: 100 },
            size: { width: 240, height: 100 },
            rotation: 0,
            scale: 1,
            clearColor: "#4D4E53"
        };

        st.state = {position};
        expect(st._state).to.deep.equal(newState);

        st.position = position;
        expect(st._state).to.deep.equal(newState);
    });

    it ('set size value into StaticText object and state is immutable', () => {
        let st = new StaticText();
        let oldState = st._state;
        const size = {width: 200, height: 200};
        const newState = {
            position: { x: 0, y: 0 },
            size: { width: 200, height: 200 },
            rotation: 0,
            scale: 1,
            clearColor: "#4D4E53"
        };

        st.size = size;
        expect(st._state).to.deep.equal(newState);
        expect(st._canvas.width).to.equal(size.width);
        expect(st._canvas.height).to.equal(size.height);
        expect(st.size).to.equal(size);

        st.size = {width:40, height:200};
        expect(st.size).to.deep.equal({width: 40, height: 200});

        //console.log(st._canvas.width, st._canvas.height);

    });

    it ('set size value into GameState object thrue the state and state is immutable', () => {
        let st = new StaticText();
        let oldState = st._state;
        const size = {width: 200, height: 200};
        const newState = {
            position: { x: 0, y: 0 },
            size: { width: 200, height: 200 },
            rotation: 0,
            scale: 1,
            clearColor: "#4D4E53"
        };

        st.state = {size};
        expect(st._state).to.deep.equal(newState);
        expect(st._canvas.width).to.equal(size.width);
        expect(st._canvas.height).to.equal(size.height);
        expect(st.size).to.equal(size);

    });
});
