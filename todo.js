var todoList = [];

function create() {
    var id = document.getElementById("idInput").value;
    var task = document.getElementById("taskInput").value;
    var completed = document.getElementById("completedInput").checked;

    if (id && task !== "") {
        var todoItem = {
            id: id,
            task: task,
            completed: completed
        };

        var existingItem = todoList.find(item => item.id === id);
        if (existingItem) {
            existingItem.task = task;
            existingItem.completed = completed;
        } else {
            todoList.push(todoItem);
        }

        //to clear the old given values
        idInput.value = "";
        taskInput.value = "";
        completedInput.checked = false;
    }
}

function read(filteredList) {
    var ul = document.getElementById("todoUList");
    ul.innerHTML = "";

    var listToDisplay = filteredList || todoList; // Use filteredList if !null, else use todoList

    listToDisplay.forEach(todoItem => {
        var li = document.createElement("li");
        li.innerText = `ID: ${todoItem.id}, Task: ${todoItem.task}, Completed: ${todoItem.completed}`;

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
        li.appendChild(deleteButton);
        li.appendChild(editButton);
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
    var searchValue = searchTask.value
    var searchedList = todoList.filter(todoItem => todoItem.task === searchValue);
    read(searchedList);
}

function editTodoItem(id) {
    var editItem = todoList.find(todoItem => todoItem.id === id);
    if (editItem) {
        var idInput = document.getElementById("idInput");
        var taskInput = document.getElementById("taskInput");
        var completedInput = document.getElementById("completedInput");

        idInput.value = editItem.id;
        taskInput.value = editItem.task;
        completedInput.checked = editItem.completed;
    }
}