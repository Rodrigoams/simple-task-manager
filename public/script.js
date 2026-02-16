document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    const task = { text: taskText, completed: false, id: Date.now() };
    saveTask(task);
    renderTask(task);
    taskInput.value = '';
}

function renderTask(task) {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <span>${task.text}</span>
        <div>
            <button class="complete-btn">✓</button>
            <button class="delete-btn">X</button>
        </div>
    `;
    li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(task.id));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));
    taskList.appendChild(li);
}

function toggleComplete(id) {
    const tasks = getTasks();
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload(); // Simples reload para atualizar
}

function deleteTask(id) {
    const tasks = getTasks().filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload();
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
    const tasks = getTasks();
    tasks.forEach(renderTask);
}