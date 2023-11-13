import { setLocalStorage, editLocalStorage, findObjectById, filteringLocalStorage } from "./localstorage.js";
import { Set } from "./handler.js";
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
async function setEvent([...todos]) {
    let destroyBtn = document.querySelectorAll('.destroy');
    let checkInput = document.querySelectorAll('.toggle');
    for (let i = 0; i < todos.length; i++) {
        destroyBtn[i].addEventListener('click', async (event) => {
            let destroyLi = destroyBtn[i].parentElement.parentElement;
            await setLocalStorage('remove', destroyLi);
            Set();
        })
        checkInput[i].addEventListener('click', async (event) => {
            let checkInputLi = checkInput[i].parentElement.parentElement;
            let object = await findObjectById(checkInputLi.id);
            if (object.state == 'completed') {
                await editLocalStorage(checkInputLi, 'state', 'active');
            }
            else {
                await editLocalStorage(checkInputLi, 'state', 'completed');
            }
            Set();
        })
    }
}
async function setFilter([...todos]){
    let link = location.hash.replace('#/', '');
    let value;
    if(link == '') return todos
    else value = (link == 'active') ? 'active' : 'completed';
    let filtertodo = await filteringLocalStorage(todos, 'state', value);
    return filtertodo;
}
export { setToDo, setEvent, setFilter};