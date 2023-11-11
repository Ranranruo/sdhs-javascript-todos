'use strict';
import { changeObj, setLocalStorage, getLocalStorage } from "./sub.js";
import { setToDo, setEvent } from "./set.js";
let Input = document.querySelector('.new-todo');
// 시작했을때
async function Set() {
    console.log('start!');
    let todos = await getLocalStorage();
    await setToDo(todos)
    await setEvent(todos);
}
// Enter 눌렀을때
Input.addEventListener('keyup', async function (event) {
    if (event.keyCode == 13) {
        if (Input.value.length) {
            let todo = await getLocalStorage();
            if (todo === null) {
                console.log('do it')
                await setLocalStorage('first', Input.value);
            }
            else {
                await setLocalStorage('add', Input.value);
            }
            Set();
        };
    }
})
// 삭제 버튼을 눌렀을때
Set();
