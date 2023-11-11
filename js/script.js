'use strict';
import { Set, pressInput } from "./handler.js";
let Input = document.querySelector('.new-todo');
// 시작했을때
Set();
// Enter 눌렀을때
Input.addEventListener('keyup', pressInput(event));
