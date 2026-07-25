const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const addTaskBtn = document.getElementById("addTask");

const searchInput = document.getElementById("searchTask");

const todoList = document.getElementById("todoList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");

const emptyState = document.getElementById("emptyState");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let filter = "all";

/* ==========================
        Save
========================== */

function saveTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));

}

/* ==========================
      Date & Time
========================== */

function currentDate() {

    return new Date().toLocaleString();

}

/* ==========================
      Add Task
========================== */

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        taskInput.focus();

        return;

    }

    todos.unshift({

        id: Date.now(),

        text,

        priority: priority.value,

        completed: false,

        created: currentDate()

    });

    saveTodos();

    renderTasks();

    taskInput.value = "";

    priority.value = "Low";

}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        addTask();

    }

});

/* ==========================
      Toggle Complete
========================== */

function toggleTask(id) {

    todos = todos.map(task =>

        task.id === id

            ? { ...task, completed: !task.completed }

            : task

    );

    saveTodos();

    renderTasks();

}

/* ==========================
      Delete Task
========================== */

function deleteTask(id) {

    if (!confirm("Delete this task?")) return;

    todos = todos.filter(task => task.id !== id);

    saveTodos();

    renderTasks();

}

/* ==========================
      Edit Task
========================== */

function editTask(id) {

    const task = todos.find(t => t.id === id);

    const updated = prompt("Edit Task", task.text);

    if (updated === null) return;

    if (updated.trim() === "") return;

    task.text = updated.trim();

    saveTodos();

    renderTasks();

}

/* ==========================
        Render
========================== */

function renderTasks() {

    let search = searchInput.value.toLowerCase();

    let filtered = todos.filter(task => {

        let matchesSearch = task.text.toLowerCase().includes(search);

        let matchesFilter = true;

        if (filter === "pending")

            matchesFilter = !task.completed;

        if (filter === "completed")

            matchesFilter = task.completed;

        return matchesSearch && matchesFilter;

    });

    todoList.innerHTML = "";

    filtered.forEach(task => {

        let li = document.createElement("li");

        if (task.completed)

            li.classList.add("completed");

        li.innerHTML = `

<div class="task-left">

<input
type="checkbox"
${task.completed ? "checked" : ""}
onchange="toggleTask(${task.id})">

<div class="task-content">

<div class="task-title">

${task.text}

</div>

<div class="task-date">

${task.created}

</div>

</div>

<span class="priority ${task.priority.toLowerCase()}">

${task.priority}

</span>

</div>

<div class="actions">

<button
class="edit-btn"
onclick="editTask(${task.id})">

<i class="fas fa-pen"></i>

</button>

<button
class="delete-btn"
onclick="deleteTask(${task.id})">

<i class="fas fa-trash"></i>

</button>

</div>

`;

        todoList.appendChild(li);

    });

    updateStats();

}

/* ==========================
      Statistics
========================== */

function updateStats() {

    totalTasks.textContent = todos.length;

    completedTasks.textContent = todos.filter(task => task.completed).length;

    pendingTasks.textContent = todos.filter(task => !task.completed).length;

    emptyState.classList.toggle("hidden", todos.length > 0);

}

/* ==========================
      Search
========================== */

searchInput.addEventListener("input", renderTasks);

/* ==========================
      Filters
========================== */

document.querySelectorAll(".filter-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelector(".filter-btn.active").classList.remove("active");

        btn.classList.add("active");

        filter = btn.dataset.filter;

        renderTasks();

    });

});

/* ==========================
      Clear Completed
========================== */

clearCompletedBtn.addEventListener("click", () => {

    todos = todos.filter(task => !task.completed);

    saveTodos();

    renderTasks();

});

/* ==========================
      Clear All
========================== */

clearAllBtn.addEventListener("click", () => {

    if (!confirm("Delete all tasks?")) return;

    todos = [];

    saveTodos();

    renderTasks();

});

/* ==========================
      Keyboard Shortcut
========================== */

document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.key === "Enter") {

        addTask();

    }

});

/* ==========================
      Initialize
========================== */

renderTasks();