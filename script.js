// Select elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Event listener for adding a task
addBtn.addEventListener("click", addTask);

// Add task function
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        const listItem = document.createElement("li");
        listItem.className = "todo-item";

        const task = document.createElement("span");
        task.textContent = taskText;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => listItem.remove();

        listItem.appendChild(task);
        listItem.appendChild(deleteBtn);
        todoList.appendChild(listItem);

        todoInput.value = "";
        todoInput.focus();
    }
}

// Press Enter to add a task
todoInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
