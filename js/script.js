'use strict';
import { changeObj } from "./sub.js";
let Input = document.querySelector('.new-todo');
// Enter 눌렀을때
Input.addEventListener('keyup', async function(){
    if(event.keyCode == 13){
        if(Input.value.length){
            let reuslt = await addLocalStorage(Input.value);
            setToDo(reuslt);
            setEvent(reuslt);
        };
    }
})
async function setToDo([...todos]){
    console.log(todos);
    const Ul = document.querySelector('.todo-list');
    const Main = document.querySelector('.main');
    let NewUl = document.createElement('ul');
    NewUl.classList.add('todo-list');
    Ul.remove();
    Main.append(NewUl);
    for(let i = 0; todos.length > i; i++){
    let Li = document.createElement('li');
    let View = document.createElement('div');
    let Input = document.createElement('input');
    let Label = document.createElement('label');
    let Button = document.createElement('button');
    Li.classList.add(todos[i].state);
    View.classList.add('view');
    Input.classList.add('toggle');
    Input.checked = todos[i].state == 'completed';
    Input.type = 'checkbox';
    Label.textContent = todos[i].value;
    Button.classList.add('destroy');
    
    NewUl.append(Li);
    Li.append(View);
    View.append(Input);
    View.append(Label);
    View.append(Button);
    }
}
async function setEvent(){

}
async function addLocalStorage(value){
    let todo = localStorage.getItem('sdhs-todo');
    if(todo === null){
        console.log('do it')
        let Obj = changeObj(value);
        localStorage.setItem('sdhs-todo', JSON.stringify([Obj]));
        todo = [Obj];
    }
    else{
        todo = JSON.parse(todo);
        let Obj = changeObj(value);
        todo.push(Obj);
        localStorage.setItem('sdhs-todo', JSON.stringify(todo));
        console.log(todo);
    }
    return todo;
}

