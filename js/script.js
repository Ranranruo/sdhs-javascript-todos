'use strict';
import { Set, pressInput, clickFilter, clickClearBtn,  clickToggleAllBtn} from "./handler.js";
// 시작했을때
Set();
// Enter 눌렀을때
let Input = document.querySelector('.new-todo');
Input.addEventListener('keyup', (event)=> pressInput(event, Input));
// filter 버튼을 눌렀을떄
clickFilter();

// clear-completed 버튼을 눌렀을때
let clearBtn = document.querySelector('.clear-completed');
clearBtn.addEventListener('click', ()=>{clickClearBtn()});
// ∨ 를 눌렀을떄
let toggleAllBtn = document.querySelector('#toggle-all');
toggleAllBtn.addEventListener('click', ()=>{clickToggleAllBtn()})
