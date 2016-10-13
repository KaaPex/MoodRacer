/**
 * Created on 13.10.16.
 * ModalWinForm of client project
 */
import ModalWinForm from "../modalwindow/ModalWinForm";
import GameForm from "../gameform/GameForm";
const template = require('./main.pug');

class Main {
    constructor(elem) {
        if (!elem) {
            throw new Error("No element selected");
        }
        this._elem = elem;
        this._startAllone = null;
        this._setRoom = null;
        this._bestResult = null;
    }

    _setModal() {
        // создаем модальные окна
        // пока так, но надо будет переделать

        new ModalWinForm(this._startAllone, {
            header: "Играть одному",
            formElems: {
                name: "Укажите Ваше имя"
            }
        }, (function (data) {
            let gameForm = new GameForm(this._elem);
            gameForm.render();
            gameForm.show();
            //alert(data); что-то делаем с data по итогу вернем объект
            return {
                type: true
            };
        }).bind(this));

        new ModalWinForm(this._setRoom, {
            header: "Создать комнату",
            formElems: {
                name: "Укажите Ваше имя",
                room: "Название комнаты"
            }
        }, function (data) {
            //alert(data); что-то делаем с data по итогу вернем объект
            return {
                type: false,
                error: "Ошибка при обработке"
            };
        });
    }

    _init() {
        this._elem.innerHTML = template();
        this._startAllone = document.querySelector(".startAllone");
        this._setRoom = document.querySelector(".setRoom");
        this._setModal();

        // only for test, don't forget deleted it !!!
        let testBtn = document.querySelector(".js-test-game");
        testBtn.onclick = () => {
            let gameForm = new GameForm(this._elem);
            gameForm.render();
            gameForm.show();
        };
    }
}

export default Main;