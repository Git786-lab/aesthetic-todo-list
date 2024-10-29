// Select elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Event listener for adding a task
addBtn.addEventListener("click", addTask);

// Add task function
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        const listItem = createTaskElement(taskText);
        todoList.appendChild(listItem);
        saveTaskToLocalStorage(taskText);
        todoInput.value = "";
        todoInput.focus();
    }
}

// Create task element
function createTaskElement(taskText) {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";

    const task = document.createElement("span");
    task.textContent = taskText;

    // Toggle completed state
    task.addEventListener("click", () => {
        task.classList.toggle("completed");
        updateTaskInLocalStorage(taskText, task.classList.contains("completed"));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteTask(listItem, taskText);

    listItem.appendChild(task);
    listItem.appendChild(deleteBtn);

    return listItem;
}

// Delete task function with animation
function deleteTask(listItem, taskText) {
    listItem.classList.add("removed");
    listItem.addEventListener("animationend", () => {
        listItem.remove();
    });
    removeTaskFromLocalStorage(taskText);
}

// Save task to localStorage
function saveTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task completion state in localStorage
function updateTaskInLocalStorage(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(t => t.text === taskText);
    if (task) task.completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const filteredTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

// Load tasks from localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const listItem = createTaskElement(task.text);
        if (task.completed) {
            listItem.querySelector("span").classList.add("completed");
        }
        todoList.appendChild(listItem);
    });
}

// Clear All Tasks Button
const clearAllBtn = document.createElement("button");
clearAllBtn.textContent = "Clear All";
clearAllBtn.className = "clear-all-btn";
clearAllBtn.onclick = clearAllTasks;
document.querySelector(".container").appendChild(clearAllBtn);

function clearAllTasks() {
    todoList.innerHTML = "";
    localStorage.removeItem("tasks");
}
