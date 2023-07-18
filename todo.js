var todoList = [];

var idStartValue = 1;
var idStartValue = 1;

function create() {
    var task = document.getElementById("taskInput").value;
    if (task !== "") {
      
        var id = idStartValue++;
        var completed = false;

        var todoItem = {
            id: id,
            task: task,
            completed: completed
        };

        todoList.push(todoItem);
        read();
        document.getElementById("taskInput").value = "";
    }
}


function read(filteredList) {
    var ul = document.getElementById("todoUList");
    ul.innerHTML = "";

    var listToDisplay = filteredList || todoList;

    listToDisplay.forEach(todoItem => {
        var li = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todoItem.completed;
        checkbox.addEventListener("change", function () {
            todoItem.completed = this.checked;
        });

        var span = document.createElement("span");
        span.innerText = `ID: ${todoItem.id}, Task: ${todoItem.task}`;

        var editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", function () {
            editTodoItem(todoItem.id);
        });

        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTodoItem(todoItem.id);
            li.remove();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        ul.appendChild(li);
    });
}

function deleteTodoItem(id) {
    todoList = todoList.filter(todoItem => todoItem.id !== id);
}

function clearAll() {
    todoList = [];
    var ul = document.getElementById("todoUList");
    ul.innerHTML = "";
}

function sortTodoList() {
    var sortSelect = document.getElementById("sortSelect");
    var sortValue = sortSelect.value;

    if (sortValue === "asc") {
        todoList.sort((a, b) => a.id - b.id);
    } else if (sortValue === "des") {
        todoList.sort((a, b) => b.id - a.id);
    }
    read();
}

function filterTodoList() {
    var filterSelect = document.getElementById("completedFilter");
    var filterValue = filterSelect.value;

    if (filterValue === "all") {
        read();
    } else {
        var completedStatus = filterValue === "true";
        var filteredList = todoList.filter(todoItem => todoItem.completed === completedStatus);
        read(filteredList);
    }
}

function search() {
    var searchTask = document.getElementById("searchInput");
    var searchValue = searchTask.value;
    //if  todoItem.task == searchvalue search only correct task value but includes search like a % operator
    var searchedList = todoList.filter(todoItem => todoItem.task.includes(searchValue));
    read(searchedList);
}

function editTodoItem(id) {
    var editItem = todoList.find(todoItem => todoItem.id === id);
    if (editItem) {
        var taskInput = document.getElementById("taskInput");

        taskInput.value = editItem.task;
        taskInput.addEventListener("change", function () {
            var editedTask = taskInput.value;
            if (editedTask !== "") {
                editItem.task = editedTask;
                read();
                document.getElementById("taskInput").value = "";
            } else {
                alert("Task cannot be empty");
            }
        });
    } else {
        alert("Edit Didn't not work.");
    }
}

// function generateUniqueId() {
//     return Math.random().toString(36).substring(2, 9);
// }


