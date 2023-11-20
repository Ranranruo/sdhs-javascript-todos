import { getLocalStorage, setLocalStorage } from "./localstorage.js";
import { setToDo, setEvent, setFilter, setTodoCount } from "./set.js";
async function Set() {
    console.log('start!');
    let todos = await getLocalStorage();
    await setTodoCount(todos);
    let filtertodo = await setFilter(todos);
    let a = await setToDo(filtertodo)
    let b = await setEvent(filtertodo);
}
async function pressInput(event, Input){
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
            Input.value='';
            Set();
        };
    }
}
async function clickFilter(){
    let filterButton = document.querySelectorAll('.filter');
    for(let i = 0; i < filterButton.length; i++){
        filterButton[i].addEventListener('click', async function(){
            console.log('filter');
            window.location.href = filterButton[i].href
            await Set();
        })
    }
}
async function clickClearBtn(){
    let local = await getLocalStorage()
    for(let i = 0; i < local.length; i++){
        local[i].state = 'active';
    }
    localStorage.setItem('sdhs-todo', JSON.stringify(local));
    Set();
}
export { Set, pressInput, clickFilter, clickClearBtn }