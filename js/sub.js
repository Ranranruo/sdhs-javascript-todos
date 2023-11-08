function changeObj(value){
    let Obj={
        value: value,
        state: 'default'
    }
    return Obj;
}
function createToDo(Obj){
    const Ul = document.querySelector('.todo-list');
    let Li = document.createElement('li');
    let View = document.createElement('div');
    let Input = document.createElement('input');
    let Label = document.createElement('label');
    let Button = document.createElement('button');

    Li.classList.add(Obj.state);
    View.classList.add('view');
    Input.classList.add('toggle');
    Input.checked = Obj.state == 'completed';
    Input.type = 'checkbox';
    Label.textContent = Obj.value;
    Button.classList.add('destroy');

    Ul.append(Li);
    Li.append(View);
    View.append(Input);
    View.append(Label);
    View.append(Button);
}
export {changeObj, createToDo}