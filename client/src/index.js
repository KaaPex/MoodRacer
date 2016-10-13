/**
 * Created on 28.09.16.
 * index.js of client project
 */

import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Main from "./components/main/Main";

let main = new Main(document.querySelector(".app"));
main._init();
