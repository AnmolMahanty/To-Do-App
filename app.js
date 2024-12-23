document.addEventListener('DOMContentLoaded', () => {
    const StoredTasks = JSON.parse(localStorage.getItem('tasks'));

    if (StoredTasks) {
        StoredTasks.forEach(task => {
            tasks.push(task);
        });
        updateTaskList();
        updateStats();
    }
});

let tasks = [];

// LocalStorage
const saveTask = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTaskList();
        updateStats();
        saveTask();
    }
};

// Toggle task completion
const toggleTaskCompleted = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTask();
};

// Delete task
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTask();
};

// Edit task
const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);  // Removes task after editing
    updateTaskList();
    updateStats();
    saveTask();
};

// Update stats and progress
const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks === 0 ? 0 : (completeTasks / totalTasks) * 100;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;

    if (tasks.length && completeTasks === totalTasks) {
        congrats();
    }
}

// Update task list
const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? "completed" : ""}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${index})" alt="Edit"/>
                    <img src="./img/bin.png" onclick="deleteTask(${index})" alt="Delete"/>
                </div>
            </div>
        `;
        // Ensure the checkbox triggers the completion toggle
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskCompleted(index));
        taskList.appendChild(listItem);
    });
}

// Event listener for adding tasks
document.getElementById('newTask').addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
});

// Congratulatory confetti animation when all tasks are completed
const congrats = () => {
    const end = Date.now() + 15 * 250;
    const colors = ["#FFD700", "#00FFFF"];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 90,
            spread: 55,
            origin: { y: 1 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}
