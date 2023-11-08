'use strict';
import { changeObj, createToDo } from "./sub.js";
let Input = document.querySelector('.new-todo');
// Enter 눌렀을때
Input.addEventListener('keyup', async function(){
    if(event.keyCode == 13){
        if(Input.value.length){
            let reuslt = await addLocalStorage(Input.value);
            await setToDo(reuslt);
        };
    }
})
function setToDo([...todos]){
    for(let i = 0; todos.length > 0; i++){
        createToDo(todos[i])
    }
}
async function addLocalStorage(value){
    let todo = JSON.parse(localStorage.getItem('sdhs-todo'));
    let Obj = changeObj(value);
    if(todo == '' || todo == null){
        console.log('do it')
        localStorage.setItem('sdhs-todo', JSON.stringify([Obj]));
    }
    else{
        todo.push(Obj);
        localStorage.setItem('sdhs-todo', JSON.stringify(todo));
        console.log(todo);
    }
    return todo;
}
