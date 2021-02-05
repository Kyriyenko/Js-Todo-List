const toDoInput = document.querySelector('.task_input');
const findToDoInput = document.querySelector('.find_task_Item');
const toDoBtn = document.querySelector('.btn_submit');
const btnFind = document.querySelector('.btn_find');
const toDoListItem = document.querySelector('.todo_list');
const cancelFindBtn = document.querySelector('.btn_cancel');
const tasksStatuses = document.querySelector('.todo_list_statuses');


tasksStatuses.addEventListener('click', filterTasks);
toDoBtn.addEventListener('click', addTodo);
toDoListItem.addEventListener('click', deleteOrMark);
document.addEventListener('DOMContentLoaded', getTodo);
btnFind.addEventListener('click', findItem);
cancelFindBtn.addEventListener('click', cancelFind);


function deleteOrMark(e) {
    const item = e.target;
    if (item.classList[0] === 'crashe-btn') {
        const list = item.parentElement;
        removeLocalTodos(list);

        list.remove();
    }

    if (item.classList[0] === 'complete-btn') {
        const list = item.parentElement;
        list.classList.toggle('completed');
    }


}


function addTodo(event) {
    event.preventDefault();

    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add("todo");

    const newToDo = document.createElement('li');
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    saveLocaltoDo(toDoInput.value);

    const complete = document.createElement('button');
    complete.innerText = 'DONE'
    complete.classList.add('complete-btn');
    toDoDiv.appendChild(complete);


    const crashe = document.createElement('button');
    crashe.innerText = 'DELETE'
    crashe.classList.add('crashe-btn');
    toDoDiv.appendChild(crashe);


    toDoListItem.appendChild(toDoDiv);

    toDoInput.value = "";


}


function saveLocaltoDo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodo() {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.forEach(function(todo) {
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add("todo");

        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);


        const complete = document.createElement('button');
        complete.innerText = 'DONE'
        complete.classList.add('complete-btn');
        toDoDiv.appendChild(complete);


        const crashe = document.createElement('button');
        crashe.innerText = 'DELETE'
        crashe.classList.add('crashe-btn');
        toDoDiv.appendChild(crashe);


        toDoListItem.appendChild(toDoDiv);

    });

}


function removeLocalTodos(todo) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const toDoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(toDoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}



function findItem(event) {
    event.preventDefault();
    let findString = findToDoInput.value;
    let content = toDoListItem.children;
    for (let i = 0; i < content.length; i++) {
        if (content[i].children[0].innerText !== findString) {
            content[i].style.display = "none";
        }
    }

    if (findToDoInput.value === " ")
        cancelFind();
}


function cancelFind(event) {
    event.preventDefault();
    let content = toDoListItem.children;
    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "flex";
    }

    findToDoInput.value = "";
}


function filterTasks(event) {
    const statuses = tasksStatuses.children;
    let content = toDoListItem.children;
    switch (event.target.value) {
        case "all":
            for (let i = 0; i < content.length; i++) {
                content[i].style.display = "flex";
            }
            break;

        case "done":
            for (let i = 0; i < content.length; i++) {
                if (content[i].classList.contains('completed')) {
                    content[i].style.display = "flex";
                } else {
                    content[i].style.display = "none";
                }
            }
            break;

        case "undone":
            for (let i = 0; i < content.length; i++) {
                content[i].style.display = "flex";
                if (content[i].classList.contains('completed')) {
                    content[i].style.display = "none";
                }
            }
            break;

    }

}