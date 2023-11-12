
async function changeObj(value) {
    let Id = await createRandomId();
    let Obj = {
        value: value,
        state: 'default',
        id: Id
    }
    console.log(Obj);
    return Obj;
}
async function getLocalStorage() {
    return JSON.parse(localStorage.getItem('sdhs-todo'));
}
async function setLocalStorage(work, value) {
    if (work == 'first') {
        let Obj = await changeObj(value);
        localStorage.setItem('sdhs-todo', JSON.stringify([Obj]));
    }
    else if (work == 'add') {
        let local = await getLocalStorage();
        console.log(local.length);
        let Obj = await changeObj(value);
        local.push(Obj);
        localStorage.setItem('sdhs-todo', JSON.stringify(local));
    }
    else if (work == 'remove') {
        let Id = value.id;
        let local = await getLocalStorage();
        console.log("id", Id, 'local', local)
        let indexNumber = local.findIndex((item) => {
            if (item.id == Id) return true;
            else return false;
        })
        local.splice(indexNumber, 1);
        localStorage.setItem('sdhs-todo', JSON.stringify(local));
    }
}
async function editLocalStorage(object, variable, value){
    let local = await getLocalStorage();
    let indexNumber = local.findIndex((item) => {
        if (item.id == object.id) return true;
        else return false;
    })
    local[indexNumber][variable] = value;
    localStorage.setItem('sdhs-todo', JSON.stringify(local));
}
async function filteringLocalStorage(todos, variable, value){
    let arr = todos.filter((item)=>item[variable] == value);
    return arr;
}
async function createRandomId() {
    let todo = await getLocalStorage();
    let number, count;
    if (todo == null) {
        return Math.floor(Math.random() * 99999);
    }
    else {
        do {
            number = Math.floor(Math.random() * 99999);
            count = 0;
            for (let j = 0; j < todo.length; j++) {
                if (number === todo[j].id) {
                    count++;
                    break; // 중복이 발견되면 루프 종료
                }
            }
        } while (count !== 0);

        return number;
    }
}
async function findObjectById(Id){
    let local = await getLocalStorage();
    let indexNumber = local.findIndex((item) => {
        if (item.id == Id) return true;
        else return false;
    })
    return local[indexNumber];
}
export { changeObj, setLocalStorage, getLocalStorage, editLocalStorage, findObjectById, filteringLocalStorage}