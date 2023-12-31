import './index.scss';

import viewTasks from './modules/ViewTask.js';
import addNewTask from './modules/AddNewTask.js';
import removeTask from './modules/RemoveTask.js';
import editTask from './modules/EditTask.js';
import taskStatusUpdate from './modules/TaskStatusUpdate.js';
import clearCompletedTasks from './modules/ClearCompletedTasks.js';

let tasks = JSON.parse(localStorage.getItem('toDoList')) || [];
window.addEventListener('load', viewTasks(tasks));
const input = document.querySelector('.input');
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && input.value !== '') {
    const description = input.value;
    tasks.push(addNewTask(description, tasks.length));
    viewTasks(tasks);
    input.value = '';
  }
});

document.addEventListener('click', (event) => {
  // Remove task functionality
  const deleteIcons = document.querySelectorAll('.delete-img');
  deleteIcons.forEach((icon, index) => {
    if (event.target === icon) {
      removeTask(tasks, index);
      viewTasks(tasks);
    }
  });

  // Edit task functionality
  const descriptions = document.querySelectorAll('.description');
  descriptions.forEach((task, index) => {
    if (event.target === task) {
      const parentLi = event.target.parentNode;
      parentLi.classList.add('edit-bg');
      const oldTask = tasks[index].description;
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.className = 'description edit-bg';
      inputField.value = oldTask;
      task.innerHTML = '';
      task.appendChild(inputField);
      inputField.focus();

      inputField.addEventListener('blur', () => {
        const newTask = inputField.value;
        task.removeChild(inputField);
        task.innerText = newTask;
        editTask(tasks, index, newTask);
        viewTasks(tasks);
      });
    }
  });

  // Checkbox status functionality
  const checkBoxes = document.querySelectorAll('.check-box');
  checkBoxes.forEach((checkBox, index) => {
    checkBox.addEventListener('change', () => {
      taskStatusUpdate(tasks, index);
      viewTasks(tasks);
    });
  });

  // Clear completed tasks functionality
  const clearBtn = document.querySelector('.clear');
  if (event.target === clearBtn) {
    tasks = clearCompletedTasks(tasks);
    viewTasks(tasks);
  }
});