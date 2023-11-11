async function Set() {
    console.log('start!');
    let todos = await getLocalStorage();
    await setToDo(todos)
    await setEvent(todos);
}
async function pressInput(event){
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
            Set();
        };
    }
}
export { Set, pressInput }