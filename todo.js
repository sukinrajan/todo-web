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

        todoList.push(todoItem);
        console.log(todoItem)

        //to clear the old given values
        idInput.value = "";
        taskInput.value = "";
        completedInput.checked = false;
    }
}

function read() {
    var ul = document.getElementById("todoUList");
    ul.innerHTML = "";

    todoList.forEach(todoItem => {
        var li = document.createElement("li");
        li.innerText = `ID: ${todoItem.id}, Task: ${todoItem.task}, Completed: ${todoItem.completed}`;
        
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTodoItem(todoItem.id);
            ul.removeChild(li);
        });
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

    var ul = document.getElementById("todoUList");
    ul.innerHTML = ""; 

    if (filterValue === "all") {
        read();
    } else {
        var completedStatus = filterValue === "true";
        var filteredList = todoList.filter(todoItem => todoItem.completed === completedStatus);
        filteredList.forEach(todoItem => {
            var li = document.createElement("li");
            li.innerText = `ID: ${todoItem.id}, Task: ${todoItem.task}, Completed: ${todoItem.completed}`;

            var deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", function () {
                deleteTodoItem(todoItem.id);
                ul.removeChild(li);
            });
            li.appendChild(deleteButton);
            ul.appendChild(li);
        });
    }
}



