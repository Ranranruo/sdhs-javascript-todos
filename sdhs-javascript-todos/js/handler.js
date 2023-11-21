import { getLocalStorage, setLocalStorage, findIdByMember, editLocalStorage } from "./localstorage.js";
import { setToDo, setEvent, setFilter, setTodoCount, setToggleBtn, setShowUi } from "./set.js";
async function Set() {
    console.log('start!');
    let todos = await getLocalStorage();
    await setShowUi(todos);
    await setTodoCount(todos);
    await setToggleBtn(todos);
    let filtertodo = await setFilter(todos);
    await setToDo(filtertodo);
    await setEvent(filtertodo);
}
async function pressInput(event, Input) {
    if (event.keyCode == 13) {
        if (Input.value.length) {
            let todo = await getLocalStorage();
            if (todo === null) {
                await setLocalStorage('first', Input.value);
            }
            else {
                await setLocalStorage('add', Input.value);
            }
            Input.value = '';
            Set();
        };
    }
}
async function clickFilter() {
    let filterButton = document.querySelectorAll('.filter');
    for (let i = 0; i < filterButton.length; i++) {
        filterButton[i].addEventListener('click', async function () {
            console.log('filter');
            window.location.href = filterButton[i].href
            await Set();
        })
    }
}

async function clickClearBtn() {
    let filter = await findIdByMember('state', 'completed');
    await setLocalStorage('remove', filter);
    Set();
}

async function clickToggleAllBtn(){
    let toggleBtn = document.querySelector('#toggle-all');
    if(toggleBtn.checked){
        await editLocalStorage('state', 'completed');
    }
    else{
        await editLocalStorage('state', 'active');
    }
    Set();
}
export { Set, pressInput, clickFilter, clickClearBtn, clickToggleAllBtn }