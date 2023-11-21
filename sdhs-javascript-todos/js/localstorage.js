
async function changeObj(value) {
    let Id = await createRandomId();
    let Obj = {
        value: value,
        state: 'active',
        id: Id
    }
    console.log(Obj);
    return Obj;
}


/** 로컬스토리지 에 저장된 배열을 가져옴 */
async function getLocalStorage() {
    return JSON.parse(localStorage.getItem('sdhs-todo'));
}


/** 첫번째 인자로 어떤 작업을 할지 정하고 두번째 인자로 첫번째 작업을 수행하기위해 필요한 값을 넣는다 [first] 경우 todo 의 내용을 넣고 [add] 경우 추가할 todo 내용 을 넣고 [remove] 경우 삭제할 todo 의 id 를 넣는다 [remove] 경우 배열을 통해 여러개의 값을 보낼 수 있다. 
 * @param {first|add|remove} work 
 * @param {값} value 
 */
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
        if (Array.isArray(value)) {
            let local = await getLocalStorage();
            let result = local.filter((item) => {
                for (let i = 0; i < value.length; i++) {
                    if (item.id == value[i]) return false;
                }
                return true;
            })
            localStorage.setItem('sdhs-todo', JSON.stringify(result));
        }
        else {
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
}

/** 수정될 오브젝트id 와 멤버변수 수정할 값을 넣으면 수정해준다. 오브젝트 인자를 비울 경우 모든 오브젝트가 수정된다.
 * @param {수정될멤버변수} variable 
 * @param {수정할값} value 
 * @param {수정할오브젝트id} object 
 */
async function editLocalStorage(variable, value, object) {
    if(object == undefined){
        console.log('do it! undefined');
        let local = await getLocalStorage();
        const result = local.map(obj => {
            return {...obj, [variable]: value}
        });
        localStorage.setItem('sdhs-todo', JSON.stringify(result))
    }
    else{
        console.log('do it! not undefined');
        let local = await getLocalStorage();
        let indexNumber = local.findIndex((item) => {
            if (item.id == object.id) return true;
            else return false;
        })
        local[indexNumber][variable] = value;
        localStorage.setItem('sdhs-todo', JSON.stringify(local));
    }
}


async function filteringLocalStorage(todos, variable, value) {
    let arr = todos.filter((item) => item[variable] == value);
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


async function findObjectById(Id) {
    let local = await getLocalStorage();
    let indexNumber = local.findIndex((item) => {
        if (item.id == Id) return true;
        else return false;
    })
    return local[indexNumber];
}

/**
 멤버변수와 찾을 변수의 값을 보내면 멤버 변수에 변수값이 일치하는 객체의 id 를 배열로 반환함
 @param {멤버변수} variable 
 @param {변수값} value 
 */
async function findIdByMember(variable, value) {
    let local = await getLocalStorage();
    let reuslt = local.filter((item) => {
        if (item[variable] == value) return true
        else return false
    })
    let Arr = [];
    for (let i = 0; i < reuslt.length; i++) {
        Arr.push(reuslt[i].id)
    }
    return Arr;
}

export { changeObj, setLocalStorage, getLocalStorage, editLocalStorage, findObjectById, filteringLocalStorage, findIdByMember }