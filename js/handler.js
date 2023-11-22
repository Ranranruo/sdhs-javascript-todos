'use strict';

import { getLocalStorage, addLocalStorage, removeLocalStorage, findIdByMember, editLocalStorage, createLocalStorage, emptyCheckLocalStorage } from "./localstorage.js";
import { setToDo, setEvent, setFilter, setTodoCount, setToggleBtn, setShowUi } from "./set.js";
 function Set() {
    console.log('start!');
    let todos = getLocalStorage();
    console.log(todos, 'a');
    setShowUi(todos);
    setTodoCount(todos);
    setToggleBtn(todos);
    let filtertodo = setFilter(todos);
    setToDo(filtertodo);
    setEvent(filtertodo);
}
function pressInput(event, Input) {
     console.log('do it!')
    if (event.keyCode == 13) {
        let inputText = Input.value.replaceAll(' ', '');
        if (inputText.length) {
            addLocalStorage(Input.value);
            Input.value = '';
            Set();
        };
    }
}
 function clickFilter() {
    let filterButton = document.querySelectorAll('.filter');
    for (let i = 0; i < filterButton.length; i++) {
        filterButton[i].addEventListener('click',  function () {
            window.location.href = filterButton[i].href
             Set();
        })
    }
}

 function clickClearBtn() {
    let filter =  findIdByMember('state', 'completed');
     removeLocalStorage(filter);
    Set();
}

 function clickToggleAllBtn(){
    let toggleBtn = document.querySelector('#toggle-all');
    if(toggleBtn.checked){
         editLocalStorage('state', 'completed');
    }
    else{
         editLocalStorage('state', 'active');
    }
    Set();
}
function setFirstLocalStorage(){
    let result = emptyCheckLocalStorage()
    if(result) createLocalStorage();
}
export { Set, pressInput, clickFilter, clickClearBtn, clickToggleAllBtn, setFirstLocalStorage }