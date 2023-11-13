'use strict';
import { Set, pressInput, clickfilter } from "./handler.js";
let Input = document.querySelector('.new-todo');
// 시작했을때
Set();
// Enter 눌렀을때
Input.addEventListener('keyup', (event)=> pressInput(event, Input));
// filter 버튼을 눌렀을떄
clickfilter();