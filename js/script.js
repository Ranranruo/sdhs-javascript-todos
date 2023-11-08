'use strict';

let Input = document.querySelector('.new-todo');
Input.addEventListener('keyup', ()=>{
    if(event.keyCode == 13){
        if(Input.value.length)createTodo(Input.value);
    }
})
function createTodo(value){
    const Ul = document.querySelector('.todo-list');
    let Li = document.createElement('li');
    let View = document.createElement('div');
    let Input = document.createElement('input');
    let Label = document.createElement('label');
    let Button = document.createElement('button');

    // Li.classList.add('view');
    View.classList.add('view');
    Input.classList.add('toggle');
    Input.type = 'checkbox';
    Label.textContent = value;
    Button.classList.add('destroy');

    Ul.append(Li);
    Li.append(View);
    View.append(Input);
    View.append(Label);
    View.append(Button);
}