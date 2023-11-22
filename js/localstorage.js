'use strict';

/**
 * todo value 를 넣으면 object 형태로 반환함
 * @param {String} value todo value
 * @returns {object} local obj
 */
function changeObj(value) {
    let Id = createRandomId();
    let Obj = {
        value: value,
        state: 'active',
        id: Id
    }
    return Obj;
}

/** localstorage에 todo 공간을 만듬
 */
function createLocalStorage() {
    localStorage.setItem('sdhs-todo', JSON.stringify([]));
}

/** localstorage 에 저장된 배열을 가져옴
 * @returns {object} localstorage 에 있는 todo를 객체 배열형태로 반환함
*/
function getLocalStorage() {
    return JSON.parse(localStorage.getItem('sdhs-todo'));
}

/** todo value를 넣으면 object 형태로 바꿔 localstorage에 추가한다.
 * @param {string} value 
 */
function addLocalStorage(value) {
    let local = getLocalStorage();
    let Obj = changeObj(value);
    local.push(Obj);
    localStorage.setItem('sdhs-todo', JSON.stringify(local));
}

/**삭제할 todo 의 id 값을 넣으면 id 값에 해당하는 todo를 localstorage 에서 삭제한다
 * 배열 형태로 id 를 넣으면 배열 안에 있는 모든 id 의 todo를 삭제한다
 * @param {number} Id 삭제할 todo의 id 값
 */
function removeLocalStorage(Id) {
    if (Array.isArray(Id)) {
        let local = getLocalStorage();
        let result = local.filter((item) => {
            for (let i = 0; i <Id.length; i++) {
                if (item.id == Id[i]) return false;
            }
            return true;
        })
        localStorage.setItem('sdhs-todo', JSON.stringify(result));
    }
    else {
        let local = getLocalStorage();
        let indexNumber = local.findIndex((item) => {
            if (item.id == Id) return true;
            else return false;
        })
        local.splice(indexNumber, 1);
        localStorage.setItem('sdhs-todo', JSON.stringify(local));
    }
}

/** 수정될 오브젝트id 와 멤버변수 수정할 값을 넣으면 수정해준다. 오브젝트 인자를 비울 경우 모든 오브젝트가 수정된다.
 * @param {string} variable 수정될 member variabel
 * @param {any} value 수정할 value
 * @param {number} Id 수정될 todo의 id 값
 */
function editLocalStorage(variable, value, Id) {
    if (object == undefined) {
        let local = getLocalStorage();
        const result = local.map(obj => {
            return { ...obj, [variable]: value }
        });
        localStorage.setItem('sdhs-todo', JSON.stringify(result))
    }
    else {
        let local = getLocalStorage();
        let indexNumber = local.findIndex((item) => {
            if (item.id == Id) return true;
            else return false;
        })
        local[indexNumber][variable] = value;
        localStorage.setItem('sdhs-todo', JSON.stringify(local));
    }
}

/** 필터링할 todo 을 넣고 어떤 멤버변수의 값을 기준으로 필터링할지 variable에 적고
 * 어떤 값으로 필터링 할껀지 value 에 적는다 value는 배열형태로 보내고 값이 여러개면
 * 여러개의 조건으로 필터링 하고 필터링된 객체배열을 반환 한다
 * @param {object} todos 필터링할 todo
 * @param {string} variable 필터링 할 memberVariable
 * @param {any} param2 필터링할 value
 * @returns {onject} 필터링된 객체배열
 */
function filteringLocalStorage(todos, variable, [...value]) {
    // let arr = todos.filter((item) => item[variable] == value);
    console.log('a')
    console.log(value)
    let arr = todos.filter((item) => {
        for (let i = 0; i < value.length; i++) {
            if (item[variable] == value[i]) return true;
        }
        return false;
    })
    return arr;
}

/**0 ~ 99999 사이의 랜덤 숫자를 반환함 
 * @returns {number} number 랜덤 숫자
 */
function createRandomId() {
    let todo = getLocalStorage();
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

/** 찾을 todo 의 id를 넣으면 id에 맞는 todo의 객체를 반환한다
 * @param {number} Id todo id
 * @returns {object} todo object
 */
function findObjectById(Id) {
    let local = getLocalStorage();
    let indexNumber = local.findIndex((item) => {
        if (item.id == Id) return true;
        else return false;
    })
    return local[indexNumber];
}

/**
 멤버변수와 찾을 변수의 값을 보내면 멤버 변수에 변수값이 일치하는 객체의 id 를 배열로 반환함
 @param {string} variable member variable
 @param {value} value todo value
 */
function findIdByMember(variable, value) {
    let local = getLocalStorage();
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
/** 로컬스토리지가 생성되었다면 1을 생성되지 않았다면 0 을 반환함 */
function emptyCheckLocalStorage() {
    let local = getLocalStorage()
    if (local == null) {
        return true
    }
    return false;
}
export { changeObj, addLocalStorage, removeLocalStorage, getLocalStorage, editLocalStorage, findObjectById, filteringLocalStorage, findIdByMember, createLocalStorage, emptyCheckLocalStorage }