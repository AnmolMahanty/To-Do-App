let tasks=[];

const addTask=() => {
    const taskInput= document.getElementById('taskInput');
    const text = taskInput.value.trim()
    if(text){
        tasks.push({text:text, completed: false});
        updateTaskList();
    }
    // console.log(tasks);
    
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''

    tasks.forEach((task,index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML=`
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <P>${task.text}</P>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onclick="editTask(${index})"/>
                <img src="./img/bin.png" onclick="deleteTask(${index})"/>
            </div>
        </div>  
        `;
        listItem.addEventListener('change',()=>toggleTaskCompleted(index));
        taskList.appendChild(listItem);
});

}

document.getElementById('newTask').addEventListener('click',function(e){
    e.preventDefault();
    addTask();
});
