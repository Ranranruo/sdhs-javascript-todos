'use strict';
import { addLocalStorage, removeLocalStorage,  editLocalStorage, findObjectById, filteringLocalStorage, getLocalStorage, emptyCheckLocalStorage, createLocalStorage } from "./localstorage.js";
import { Set } from "./handler.js";
function setToDo(todos) {
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
        Li.id = todos[i].id;
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
function setEvent(todos) {
    let destroyBtn = document.querySelectorAll('.destroy');
    let checkInput = document.querySelectorAll('.toggle');
    let todo = document.querySelectorAll('.todos');
    for (let i = 0; i < todos.length; i++) {
        destroyBtn[i].addEventListener('click', (event) => {
            let destroyLi = destroyBtn[i].parentElement.parentElement;
            removeLocalStorage(destroyLi.id);
            console.log(destroyLi)
            Set();
        })
        checkInput[i].addEventListener('click', (event) => {
            let checkInputLi = checkInput[i].parentElement.parentElement;
            let object = findObjectById(checkInputLi.id);
            if (object.state == 'completed') {
                editLocalStorage('state', 'active', checkInputLi.id);
            }
            else {
                editLocalStorage('state', 'completed', checkInputLi.id);
            }
            Set();
        })
        todo[i].addEventListener('dblclick', (event) => {
            let todoLi = event.target.parentElement.parentElement;
            let todoClass = todoLi.classList;
            todoLi.classList = 'editing todos'

            let editInput = document.createElement('input')
            editInput.type = 'text'
            editInput.classList.add('edit')
            editInput.addEventListener('keyup', (event) => {
                if (event.key == 'Enter') { editInput.blur() }
            })
            editInput.addEventListener('focusout', (event) => {
                let todoId = todoLi.id;
                let Value = event.target.value;
                todoLi.classList = todoClass;
                if (Value.replaceAll(" ", '').length) {
                    editLocalStorage('value', Value, todoId);
                    Set();
                }
                else {
                    removeLocalStorage(todoId);
                    Set();
                }
            })
            todoLi.append(editInput);
            editInput.focus();

        })
    }
}
function setTodoCount(todos) {
    let todocount = document.querySelector('.todo-count');
    todocount.textContent = `${todos.length}items left`;
}
function setFilter(todos) {
    let link = location.hash.replace('#/', '');
    if (link == '') link = 'all';
    let filterBtn = document.querySelector(`.${link}-filter`);
    let filterBtnAll = document.querySelectorAll('.filter');
    filterBtnAll.forEach(item => {
        item.classList.remove('selected');
    });
    filterBtn.classList.add('selected');

    let value;
    if (link == 'all') return todos
    else value = (link == 'active') ? 'active' : 'completed';
    let filtertodo = filteringLocalStorage(todos, 'state', [value, 'editing']);
    return filtertodo;
}
function setToggleBtn([...todos]) {
    let toggleBtn = document.querySelector('#toggle-all');
    const result = todos.find((item) => {
        if (item.state == 'active') return true;
        else return false;
    })
    if (result != undefined) {
        toggleBtn.checked = false;
    }
    else {
        toggleBtn.checked = true;
    }
}

function setShowUi(todos) {
    let toggleAllLabel = document.querySelector('.toggle-all-label');
    let footer = document.querySelector('.footer');
    if (todos == null || todos.length <= 0) {
        toggleAllLabel.style.display = 'none';
        footer.style.display = 'none';
    }
    else {
        toggleAllLabel.style.display = '';
        footer.style.display = '';
    }
}
export { setToDo, setEvent, setFilter, setTodoCount, setToggleBtn, setShowUi };