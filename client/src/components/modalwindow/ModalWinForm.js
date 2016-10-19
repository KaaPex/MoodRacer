/**
 * Created on 13.10.16.
 * by NikolaySmekalov
 * ModalWinForm of client project
 */

class ModalWinForm {
    constructor(elem, option, callback) {
        if (!elem) {
            throw new Error("No element selected");
        }

        this._elem = elem;
        this._header = option.header; // заголовок

        this._formElems = option.formElems; // inputs

        this._callback = callback; // обработчик
        
        this._window = null;
        this._bgDiv = null;

        this._initLsn();
    }

    _initLsn() {
        this._elem.addEventListener('click', this._renderWin.bind(this));
    }

    _createBg() {
        this._bgDiv = document.createElement("div");
        this._bgDiv.classList.add("modalBgPl");
        document.body.appendChild(this._bgDiv);
        this._bgDiv.addEventListener('click', this._closeWin.bind(this));
    }

    _renderWin() {
        this._createBg();

        this._window = document.createElement("div");
        this._window.classList.add("modalPl");

        let heading = document.createElement("div");
        heading.classList.add("modalPl_heading");
        heading.innerHTML = this._header;
        this._window.appendChild(heading);

        let form = document.createElement("form");
        form.addEventListener('submit', this._submitForm.bind(this, form));

        form.action = "#";
        form.method = "POST";

        for (let val in this._formElems) {
            let input = document.createElement("input");
            input.classList.add("form-control");
            input.required = true;
            input.name = val;
            input.placeholder = this._formElems[val];
            form.appendChild(input);
        }

        let divBtn = document.createElement("div");
        divBtn.classList.add("modalPl_form_divBtn");


        let btnSubmit = document.createElement("button");
        let btnReset = document.createElement("button");

        btnSubmit.type = "submit";
        btnReset.type = "reset";

        btnSubmit.classList.add("btn", "btn-success");
        btnReset.classList.add("btn", "btn-danger");

        btnSubmit.style.marginRight = "10px";

        btnSubmit.innerHTML = "Отправить";
        btnReset.innerHTML = "Закрыть";

        btnReset.addEventListener('click', this._closeWin.bind(this));

        divBtn.appendChild(btnSubmit);
        divBtn.appendChild(btnReset);

        form.appendChild(divBtn);

        this._window.appendChild(form);

        document.body.appendChild(this._window);
    }

    _submitForm(form) {
        event.preventDefault();
        let objForm = {};

        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].tagName === "INPUT") {
                objForm[form.elements[i].name] = form.elements[i].value;
            }
        }

        let result = this._callback(JSON.stringify(objForm));

        if (result.type) {
            this._closeWin();
        } else { // обработка ошибки
            alert(result.error);
        }
    }

    _closeWin() {
        document.body.removeChild(this._bgDiv);
        document.body.removeChild(this._window);

        this._bgDiv.removeEventListener('click', this._closeWin.bind(this));
    }
}

export default ModalWinForm;