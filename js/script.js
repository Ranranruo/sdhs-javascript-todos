'use strict';
import { changeObj, setLocalStorage, getLocalStorage } from "./sub.js";
let Input = document.querySelector('.new-todo');
// 시작했을때
async function Start() {
    let todos = await getLocalStorage();
    await setToDo(todos)
    await setEvent(todos);
}
// Enter 눌렀을때
Input.addEventListener('keyup', async function (event) {
    if (event.keyCode == 13) {
        if (Input.value.length) {
            let reuslt = await addLocalStorage(Input.value);
            console.log('result', reuslt);
            await setToDo(reuslt);
            await setEvent(reuslt);
        };
    }
})
// 삭제 버튼을 눌렀을때
async function setToDo([...todos]) {
    //원래 li 삭제
    const originLi = Array.from(document.querySelectorAll('.todos'));
    for (let i = 0; i < originLi.length; i++) {
        originLi[i].remove();
    }
    const Ul = document.querySelector('.todo-list');
    for (let i = 0; i < todos.length; i++) {
        let Li = document.createElement('li');
        let View = document.createElement('div');
        let Input = document.createElement('input');
        let Label = document.createElement('label');
        let Button = document.createElement('button');

        Li.classList.add(todos[i].state);
        Li.classList.add('todos');
        View.classList.add('view');
        Input.classList.add('toggle');
        Input.checked = todos[i].state == 'completed';
        Input.type = 'checkbox';
        Label.textContent = todos[i].value;
        Button.classList.add('destroy');

        Ul.append(Li);
        Li.append(View);
        View.append(Input);
        View.append(Label);
        View.append(Button);
    }
}
async function setEvent([...todos]) {
    let destroyBtn = document.querySelectorAll('.destroy');
    for (let i = 0; i < todos.length; i++) {
        destroyBtn[i].addEventListener('click', (event) => {
        })
    }
}
async function addLocalStorage(value) {
    let todo = await getLocalStorage();
    if (todo === null) {
        console.log('do it')
        await setLocalStorage('first', value);
    }
    else {
        await setLocalStorage('add', value);
    }
    return await getLocalStorage();
}
Start();