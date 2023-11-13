import { getLocalStorage, setLocalStorage } from "./localstorage.js";
import { setToDo, setEvent, setFilter } from "./set.js";
async function Set() {
    console.log('start!');
    let todos = await getLocalStorage();
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
async function clickfilter(){
    let filterButton = document.querySelectorAll('.filter');
    for(let i = 0; i < filterButton.length; i++){
        filterButton[i].addEventListener('click', async function(){
            console.log('filter');
            window.location.href = filterButton[i].href
            await Set();
        })
    }
}

export { Set, pressInput, clickfilter }