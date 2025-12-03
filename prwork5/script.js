let tasks = [];
let currentFilter = 'all';
let editingTaskId = null;
window.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    setupEventListeners();
});
function setupEventListeners() {
    const taskInput = document.getElementById('taskInput');
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTasks();
        });
    });
}
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        taskInput.style.borderColor = '#e74c3c';
        setTimeout(() => {
            taskInput.style.borderColor = '#e0e0e0';
        }, 500);
        return;
    }
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
}
function deleteTask(taskId) {
    if (confirm('Ви впевнені, що хочете видалити це завдання?')) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }
}
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}
function startEdit(taskId) {
    editingTaskId = taskId;
    renderTasks();
}
function saveEdit(taskId, newText) {
    const task = tasks.find(t => t.id === taskId);
    if (task && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasks();
    }
    editingTaskId = null;
    renderTasks();
}
function cancelEdit() {
    editingTaskId = null;
    renderTasks();
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
}
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    filteredTasks.sort((a, b) => {
        if (a.completed === b.completed) {
            return b.createdAt.localeCompare(a.createdAt);
        }
        return a.completed ? 1 : -1;
    });
    tasksList.innerHTML = '';
    if (filteredTasks.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div class="empty-state-icon">📝</div>
            <div class="empty-state-text">
                ${currentFilter === 'all' ? 'Немає завдань. Додайте перше!' : 
                  currentFilter === 'active' ? 'Немає активних завдань' : 
                  'Немає виконаних завдань'}
            </div>
        `;
        tasksList.appendChild(emptyState);
    } else {
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            if (editingTaskId === task.id) {
                taskItem.innerHTML = `
                    <div class="task-content">
                        <input 
                            type="text" 
                            class="task-edit-input" 
                            value="${task.text}"
                            id="edit-input-${task.id}"
                        >
                        <div class="task-date">${formatDate(task.createdAt)}</div>
                    </div>
                `;
                tasksList.appendChild(taskItem);
                const editInput = document.getElementById(`edit-input-${task.id}`);
                editInput.focus();
                editInput.select();
                editInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        saveEdit(task.id, editInput.value);
                    }
                });
                editInput.addEventListener('blur', () => {
                    saveEdit(task.id, editInput.value);
                });
                editInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        cancelEdit();
                    }
                });
            } else {
                taskItem.innerHTML = `
                    ${!task.completed ? `<input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>` : ''}
                    <div class="task-content">
                        <div class="task-text">${task.text}</div>
                        <div class="task-date">${formatDate(task.createdAt)}</div>
                    </div>
                    <button class="delete-btn">×</button>
                `;
                if (!task.completed) {
                    const checkbox = taskItem.querySelector('.task-checkbox');
                    checkbox.addEventListener('change', () => toggleTask(task.id));
                }
                const taskText = taskItem.querySelector('.task-text');
                taskText.addEventListener('dblclick', () => {
                    if (!task.completed) {
                        startEdit(task.id);
                    }
                });
                const deleteBtn = taskItem.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => deleteTask(task.id));
                tasksList.appendChild(taskItem);
            }
        });
    }
    updateStats();
}
function updateStats() {
    const total = tasks.length;
    const active = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('activeTasks').textContent = active;
    document.getElementById('completedTasks').textContent = completed;
}
function saveTasks() {
    const tasksData = {
        tasks: tasks,
        savedAt: new Date().toISOString()
    };
    sessionStorage.setItem('todoTasks', JSON.stringify(tasksData));
}
function loadTasks() {
    const savedData = sessionStorage.getItem('todoTasks');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            tasks = data.tasks || [];
        } catch (e) {
            console.error('Помилка завантаження завдань:', e);
            tasks = [];
        }
    }
}