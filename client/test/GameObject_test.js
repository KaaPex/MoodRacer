/**
 * Created on 30.09.16.
 * GameState_test of client project
 */
import {expect} from 'chai';
import GameObject from "../src/core/GameObject";

describe('GameObject class logic -', () => {
    it ('create new GameObject with name "object"', () => {
        let gameObject = new GameObject();
        expect(gameObject._name).to.equal("object");
    });

    it ('canvas size of GameObject is default', () => {
        let gameObject = new GameObject();
        const width = 100;
        const height = 100;

        expect(gameObject._canvas.width).to.equal(width);
        expect(gameObject._canvas.height).to.equal(height);
    });

    it ('set state value into GameObject object and state is immutable', () => {
        let gameObject = new GameObject();
        let oldState = gameObject._state;
        const position = {x: 100, y: 100};
        const newState = {
            position: { x: 100, y: 100 },
            size: { width: 100, height: 100 },
            rotation: 0,
            scale: 1,
            clearColor: "#4D4E53"
        };

        gameObject.state = {position};
        expect(gameObject._state).to.deep.equal(newState);

        gameObject.position = position;
        expect(gameObject._state).to.deep.equal(newState);
    });

    it ('set size value into GameObject object and state is immutable', () => {
        let gameObject = new GameObject();
        let oldState = gameObject._state;
        const size = {width: 200, height: 200};
        const newState = {
            position: { x: 0, y: 0 },
            size: { width: 200, height: 200 },
            rotation: 0,
            scale: 1,
            clearColor: "#4D4E53"
        };

        gameObject.size = size;
        expect(gameObject._state).to.deep.equal(newState);
        expect(gameObject._canvas.width).to.equal(size.width);
        expect(gameObject._canvas.height).to.equal(size.height);
        expect(gameObject.size).to.equal(size);

        gameObject.size.width = 40;
        expect(gameObject.size.width).to.equal(40);
        //console.log(gameObject._canvas.width, gameObject._canvas.height);

    });

    it ('set size value into GameObject object thrue the state and state is immutable', () => {
        let gameObject = new GameObject();
        let oldState = gameObject._state;
        const size = {width: 200, height: 200};
        const newState = {
            position: { x: 0, y: 0 },
            size: { width: 200, height: 200 },
            rotation: 0,
            scale: 1,
            clearColor: "#4D4E53"
        };

        gameObject.state = {size};
        expect(gameObject._state).to.deep.equal(newState);
        expect(gameObject._canvas.width).to.equal(size.width);
        expect(gameObject._canvas.height).to.equal(size.height);
        expect(gameObject.size).to.equal(size);

    });
});
