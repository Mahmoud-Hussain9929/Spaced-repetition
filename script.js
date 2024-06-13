document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskName = document.getElementById('taskName').value;
    if (taskName === '') return;

    const task = {
        name: taskName,
        periods: {
            day: false,
            week: false,
            twoWeeks: false,
            month: false
        }
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    document.getElementById('taskName').value = '';
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const taskItem = document.createElement('div');
    taskItem.className = 'task';
    taskItem.style.animation = 'slideIn 0.5s ease-out';

    taskItem.innerHTML = `
        <div class="task-name">${task.name}</div>
        <div class="task-periods">
            <label><input type="checkbox" ${task.periods.day ? 'checked' : ''} data-period="day" onclick="updateTaskPeriod('${task.name}', 'day', this.checked)"> يوم</label>
            <label><input type="checkbox" ${task.periods.week ? 'checked' : ''} data-period="week" onclick="updateTaskPeriod('${task.name}', 'week', this.checked)"> أسبوع</label>
            <label><input type="checkbox" ${task.periods.twoWeeks ? 'checked' : ''} data-period="twoWeeks" onclick="updateTaskPeriod('${task.name}', 'twoWeeks', this.checked)"> أسبوعين</label>
            <label><input type="checkbox" ${task.periods.month ? 'checked' : ''} data-period="month" onclick="updateTaskPeriod('${task.name}', 'month', this.checked)"> شهر</label>
        </div>
        <button class="delete-button" onclick="deleteTask(this)">حذف</button>
    `;

    taskList.appendChild(taskItem);
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    const taskName = taskItem.querySelector('.task-name').textContent;
    taskItem.style.animation = 'fadeOut 0.5s ease-out';
    setTimeout(() => {
        taskItem.remove();
        removeTaskFromLocalStorage(taskName);
    }, 500);
}

function removeTaskFromLocalStorage(taskName) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskPeriod(taskName, period, isChecked) {
    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.name === taskName);
    if (task) {
        task.periods[period] = isChecked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// كود الحذف المتحرك

const tasksContainer = document.querySelector('.tasks-container');
tasksContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-button')) {
        const task = e.target.closest('.task');
        task.classList.add('deleting');
        setTimeout(function() {
            task.remove();
        }, 500); // يمكن تغيير 500 الى الوقت الذي تريده 
    }
});
