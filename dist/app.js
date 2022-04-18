'use strict'
const app = document.querySelector('.app');
const newTask = document.querySelector('.app__input-task');
const taskList = document.querySelector('.task-list');
const toggleTheme = document.querySelector('.app__toggle-theme');
const backgroundTheme = document.querySelector('.app__background');
const interactionSection = document.querySelector('.interaction-section');
const btnFiltersMobile = document.querySelector('.button-filters__mobile');

class Task {
  constructor(taskName, state) {
    this.taskName = taskName;
    this.state = state;
  }
}

let taskCount = 0;
let maxTasks = 5
let tasksRemaining = maxTasks - taskCount;

const message = interactionSection.querySelector('.interaction-section__message');
message.textContent = `${tasksRemaining} items left`;

function addTask(e) {
  if (e.key === 'Enter') {
    if (newTask.value != ''){
      const task = new Task(newTask.value, 'unchecked');
      taskCount++;
      tasksRemaining = maxTasks - taskCount;
      message.textContent = `${tasksRemaining} items left`;
      interactionSection.classList.remove('hidden')
      const li = document.createElement('li');
      li.className = 'task-list__task-card';
      li.innerHTML = '<input type="checkbox" class="task-list__checkbox" name="task"> <span class="checkmark"></span>';
      const taskBtn = document.createElement('button');
      taskBtn.className = 'task-list__task';
      saveTaskLocalStorage(task);
      taskBtn.appendChild(document.createTextNode(task.taskName));
      li.appendChild(taskBtn);
      const btnClearTask = document.createElement('button');
      btnClearTask.className = 'task-list__clear-task';
      li.appendChild(btnClearTask);
      taskList.appendChild(li);
      
      console.log(li);
      newTask.value = '';
      console.log(taskCount);
      if (newTask.classList.contains('error')) {
        newTask.classList.remove('error');
      }
    } else {
      newTask.classList.add('error');
      console.log(newTask);
    }

  }
}

function saveTaskLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  console.log(tasks);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskLocalStorage(task) {
  let tasks = [];
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  let index = tasks.indexOf(task);
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask(e) {
  if (e.target.classList.contains('task-list__clear-task')){
    const taskCard = e.target.parentElement;
    const task = taskCard.querySelector(".task-list__task");
    taskCard.remove();
    taskCount--;
    tasksRemaining = maxTasks - taskCount;
    message.textContent = `${tasksRemaining} items left`; 
    removeTaskLocalStorage(task.innerText);
    if (taskCount === 0) {
      interactionSection.classList.add('hidden');
    }
  }
}

function addTaskByLocalStorage(task) {
        const li = document.createElement('li');
        li.className = 'task-list__task-card';
        li.innerHTML = `<input type="checkbox" class="task-list__checkbox" name="task" ${task.state}> <span class="checkmark"></span>`;
        const taskBtn = document.createElement('button');
        taskBtn.className = `task-list__task ${task.state}`;
        taskBtn.appendChild(document.createTextNode(task.taskName));
        li.appendChild(taskBtn);
        const btnClearTask = document.createElement('button');
        btnClearTask.className = 'task-list__clear-task';
        li.appendChild(btnClearTask);
        taskList.appendChild(li);
}

function renderTasks() {
      
  if (localStorage.getItem('tasks') !== null) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    taskCount = tasks.length; 
    tasksRemaining = maxTasks - taskCount;
    message.textContent = `${tasksRemaining} items left`; 
    console.log(taskCount);    
    interactionSection.classList.remove('hidden')
    tasks.forEach(addTaskByLocalStorage);
  } 
}

function changeTaskState(e) {
    if (e.target.classList.contains('task-list__task')) {
      const task = e.target;
      const inputCheckbox = task.parentElement.querySelector('.task-list__checkbox');
      console.log(inputCheckbox.checked);
      if (inputCheckbox.checked) {
        inputCheckbox.checked = false;
        task.classList.remove('checked')
        changeStateLocalStorage(task.textContent, 'unchecked');
      } else {
        inputCheckbox.checked = true;
        e.target.classList.add('checked');
        changeStateLocalStorage(task.textContent, 'checked');
      }
    } else if (e.target.classList.contains('task-list__checkbox')) {
      const inputCheckbox = e.target.parentElement.querySelector('.task-list__checkbox');
      const task = e.target.parentElement.querySelector('.task-list__task');
      if (inputCheckbox.checked) {
        task.classList.add('checked');
        changeStateLocalStorage(task.textContent, 'checked');
      } else {
        task.classList.remove('checked');
        changeStateLocalStorage(task.textContent, 'unchecked');
      }
    }
}

function changeStateLocalStorage(task, state) {
   let tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach(function (taskObj) {
    if (taskObj.taskName === task) {
      taskObj.state = state;
    }
   })
   localStorage.setItem('tasks', JSON.stringify(tasks));
  }

function setTheme() {
  let theme = ''
  if (localStorage.getItem('theme') === null) {
    //Theme default
    theme = 'light';
  } else {
    theme = localStorage.getItem('theme')
  }
  toggleTheme.classList.add(theme);
  backgroundTheme.classList.add(theme);
  interactionSection.classList.add(theme);
  newTask.classList.add(theme);
  taskList.classList.add(theme);
  btnFiltersMobile.classList.add(theme);
  localStorage.setItem('theme', theme);
}

function changeTheme(e) {
   if (toggleTheme.classList.contains('light')){
    toggleTheme.classList.remove('light');
    toggleTheme.classList.add('dark');
    backgroundTheme.classList.remove('light');
    backgroundTheme.classList.add('dark');
    interactionSection.classList.remove('light');
    interactionSection.classList.add('dark');
    newTask.classList.remove('light');
    newTask.classList.add('dark');
    taskList.classList.remove('light');
    taskList.classList.add('dark');
    btnFiltersMobile.classList.remove('light');
    btnFiltersMobile.classList.add('dark');
   
   } else {
    toggleTheme.classList.remove('dark');
    toggleTheme.classList.add('light');
    backgroundTheme.classList.remove('dark');
    backgroundTheme.classList.add('light');
    interactionSection.classList.remove('dark');
    interactionSection.classList.add('light');
    newTask.classList.remove('dark');
    newTask.classList.add('light');
    taskList.classList.remove('dark');
    taskList.classList.add('light');
    btnFiltersMobile.classList.remove('dark');
    btnFiltersMobile.classList.add('light');
   }
  
  let theme = localStorage.getItem('theme');
  
  if (theme === 'light') {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
 }

function clearAllTasks(e) {
  const taskCard = taskList.querySelectorAll('.task-list__task-card');
  if (e.target.classList.contains('interaction-section__clear')){ 
    for (let i = 0; i < taskCard.length; i++) {
      taskCard[i].remove();
      taskCount--;
      tasksRemaining = maxTasks - taskCount;
      message.textContent = `${tasksRemaining} items left`; 
      let task = taskCard[i].querySelector('.task-list__task').textContent;
      removeTaskLocalStorage(task);
      interactionSection.classList.add('hidden');
    }
  }
}

function filterTasks(e) {
  const taskCard = taskList.querySelectorAll('.task-list__task-card');
  if (e.target.classList.contains('filter-active')) {
    console.log(taskCard);
    for (let i = 0; i < taskCard.length; i++) {
      const inputCheckbox = taskCard[i].querySelector('.task-list__checkbox');
      console.log(inputCheckbox);
      if (inputCheckbox.checked) {
        inputCheckbox.parentElement.classList.add('hidden');
      } else if (!inputCheckbox.checked) {
        inputCheckbox.parentElement.classList.remove('hidden');
      }
    }
  }
  if (e.target.classList.contains('filter-completed')) {
    console.log(taskCard);
    for (let i = 0; i < taskCard.length; i++) {
      const inputCheckbox = taskCard[i].querySelector('.task-list__checkbox');
      console.log(inputCheckbox);
      if (inputCheckbox.checked) {
        inputCheckbox.parentElement.classList.remove('hidden');
      } else if (!inputCheckbox.checked) {
        inputCheckbox.parentElement.classList.add('hidden');
      }
    }
  }
  if (e.target.classList.contains('filter-all')) {
    for (let i = 0; i < taskCard.length; i++) {
      const inputCheckbox = taskCard[i].querySelector('.task-list__checkbox');
      inputCheckbox.parentElement.classList.remove('hidden');
      }
    }
}


document.addEventListener('keydown', addTask);
taskList.addEventListener('click', clearTask);
taskList.addEventListener('click', changeTaskState);
toggleTheme.addEventListener('click', changeTheme);
document.addEventListener('DOMContentLoaded', renderTasks);
document.addEventListener('DOMContentLoaded', setTheme);
interactionSection.addEventListener('click', filterTasks);
interactionSection.addEventListener('click', clearAllTasks);
btnFiltersMobile.addEventListener('click', filterTasks);
btnFiltersMobile.addEventListener('click', clearAllTasks);
