import Task from './task.js';
import buildElement from '../utils/buildElement.js';
import classChange from '../utils/classList.js';
import removeValue from '../utils/removeValue.js';
import {homeIdentifier, getCurrentProject, FilterTaskMethods} from './filter.js';
import {saveToStorage} from './localStorage.js';

class Project {
   constructor(name, id) {
      this.name = name;
      this.id = id;
      this.taskArray = [];
   } 
}

class taskMethods {
   #id;
   constructor() {}
   addNewTask(project, title, description, dueDate, priority, isDone) {
      this.#id = Date.now();
      const task = new Task(title, description, dueDate, priority, isDone, this.#id);
      project.taskArray.push(task);
      this.generateNewId();
   }

   removeTask(project, id) {
      project.taskArray = project.taskArray.filter(task => task.id != id);
   }

   editTask(project, id, newTitle, newDescription, newDueDate) {
      const taskIndex = project.taskArray.findIndex(task => task.id == id);
      if (taskIndex !== -1) {
         project.taskArray[taskIndex].title = newTitle;
         project.taskArray[taskIndex].description = newDescription;
         project.taskArray[taskIndex].dueDate = newDueDate;
      }
   }

   editPriority(project, id) {
      const taskIndex = project.taskArray.findIndex(task => task.id == id);
      if (taskIndex !== -1) {
         const priority = project.taskArray[taskIndex].priority;
         const newPrio = priority == 'Normal' ? 'Important': 'Normal';
         project.taskArray[taskIndex].priority = newPrio;
      }
   }

   editIsDone(project, id) {
      const taskIndex = project.taskArray.findIndex(task => task.id == id);
      if (taskIndex !== -1) {
         const isDoneStatus = project.taskArray[taskIndex].isDone;
         const newStatus = !isDoneStatus;
         project.taskArray[taskIndex].isDone = newStatus;
      }
   }

   generateNewId() {
      this.#id = Date.now() + 5;
   }

   getTasks(project) {
      return project.taskArray;
   }

   getTaskName(project) {
      return project.name;
   }
}

class TaskUI {
   constructor() {
      // TaskContainer
      this.tasksContainer = document.querySelector('.tasks-container');;
   }

   displayTitle(name) {
      document.querySelector('.title-container h1').textContent = name;
   }

   displayTasks(tasks) {
      this.tasksContainer.innerHTML = '';
      tasks.forEach(task => {
         const taskDiv = buildElement('div', 'task', '', {id: task.id});
         if (task.isDone) taskDiv.classList.add('task-done');

         const taskInput = document.createElement('input');
               taskInput.type = 'checkbox';
               taskInput.setAttribute('taskId', task.id);
               taskInput.checked = task.isDone;

         const taskDetails = buildElement('div', 'taskdetails')
         const detailsH1 = buildElement('h1', 'details-h1', task.title);
         const descriptionH1 = buildElement('p', 'description-h1', task.description.slice(0, 20));
         taskDetails.append(detailsH1, descriptionH1);

         const taskInfo = buildElement('div', 'task-info');
         const infoP = buildElement('p', 'info-p', task.dueDate);
         const infoSpan1 = document.createElement('span');
         const infoI1 = task.priority == 'Normal' ? buildElement('i', 'ri-star-line'): buildElement('i', 'ri-star-fill');
               infoI1.classList.add('star');
         infoSpan1.append(infoI1);
         const infoSpan2 = document.createElement('span');
         const infoI2 = buildElement('i', 'ri-more-2-line');
         infoI2.id = 'menu-I-2';
         infoSpan2.append(infoI2);
         taskInfo.append(infoP, infoSpan1, infoSpan2);

         taskDiv.append(taskInput, taskDetails, taskInfo);
         this.tasksContainer.append(taskDiv);
      })
   }
}

class TaskEventHandler {
   constructor(projectManager) {
      this.handleEventListeners();
      //Toggles When You Are In a Home Div
      this.inHomeDiv = homeIdentifier;
      //Fetches the FilterTaskMethod for Identifying when Im in a Home Section
      this.projectManager = projectManager;
      this.filter = new FilterTaskMethods(this.projectManager);
   }

   getProject(project) {
      //Changes TaskDOMMethods Value everytime 
      this.TaskDOMMethods = new TaskDOMMethods(project, new TaskUI(), this.projectManager, this.filter);
   }

   handleEventListeners() {
      //Only one set of Event Listeners, Just the TaskDOMMethods value is changed everytime
      const taskSubmit = document.querySelector('.task-submit');
            taskSubmit.addEventListener('click', (e) => this.TaskDOMMethods.addTask(e));
      const taskContainer = document.querySelector('.tasks-container');
      const taskForm = document.querySelector('.add-task-form');
      document.querySelector('.add-task').addEventListener('click', () => taskForm.style.display = 'flex');
      taskContainer.addEventListener('click', (e) => {
         //CheckIfYOureInAHomeDiv
         if (this.inHomeDiv.getHomeDiv()) {
            getCurrentProject(e.target, this.projectManager, this.getProject.bind(this));
            this.TaskDOMMethods.removeDeleteTask(e.target);
            this.TaskDOMMethods.editPriority(e.target);
            this.TaskDOMMethods.editIsDone(e.target);
         } else if (!this.inHomeDiv.getHomeDiv()) {
            this.TaskDOMMethods.removeDeleteTask(e.target);
            this.TaskDOMMethods.editPriority(e.target);
            this.TaskDOMMethods.editIsDone(e.target);
         }
         })
      const cancelButton = document.querySelector('.task-cancel');
      cancelButton.addEventListener('click', () => this.TaskDOMMethods.cancelAddTask());
      };
}

class TaskDOMMethods {
   constructor(project, taskUI, projectManager, filter) {
      this.projectManager = projectManager;
      this.taskManager = project;
      //Newww feature
      this.taskMethods = new taskMethods();
      this.taskUI = taskUI;
      //Toggles When You Are In a Home Div
      this.inHomeDiv = homeIdentifier;
      this.filter = filter;
      // fetch the elements
      this.taskForm = document.querySelector('.add-task-form');
      this.addTaskTitle = document.querySelector('.add-task-title');
      this.addTaskDescription = document.querySelector('.add-task-description');
      this.addTaskDate = document.querySelector('.add-task-date');
   }

   addTask(e) {
      e.preventDefault();
      this.taskMethods.addNewTask(this.taskManager, this.addTaskTitle.value, this.addTaskDescription.value, this.addTaskDate.value, 'Normal', false);
      removeValue(this.addTaskTitle, this.addTaskDescription, this.addTaskDate);
      this.taskUI.displayTasks(this.taskMethods.getTasks(this.taskManager));
      this.taskForm.style.display = 'none';
      this.toggle = false;
      saveToStorage(`${this.taskManager.name}`, this.taskManager);
      console.log(this.taskManager, this.taskMethods.getTasks(this.taskManager));
   }

   removeDeleteTask(target) {
      const infoSpan = document.querySelector('.info2');
      if (infoSpan) infoSpan.remove();
      if (target.id == 'menu-I-2' && !this.toggle) {
         const infoSpan2 = buildElement('span', 'info2');
         const infoEdit =  buildElement('button', 'edit', 'Edit');
               infoEdit.onclick = () => this.editTask(target);
         const infoDelete = buildElement('button', 'delete', 'Delete');
               infoDelete.onclick = () => this.deleteTask(target);
         infoSpan2.append(infoEdit, infoDelete);
         target.appendChild(infoSpan2);
         this.toggle = true;
      } else if (this.toggle) {
         if (infoSpan) {
            infoSpan.remove();
            this.toggle = false;
         }
      }
   }

   editTask(target) {
      const getClosest = target.closest('.task');
      const targetId = getClosest.getAttribute('id');
      const tasks = this.taskMethods.getTasks(this.taskManager);
      const task = tasks.find(task => task.id == targetId);

      this.taskForm.style.display = 'flex';

      classChange(this.taskForm, 'add-task-form', 'edit-task-form');
      classChange(this.addTaskTitle, 'add-task-title', 'edit-task-title');
      classChange(this.addTaskDescription, 'add-task-description', 'edit-task-description');
      classChange(this.addTaskDate, 'add-task-date', 'edit-task-date');

      this.addTaskTitle.value = task.title;
      this.addTaskDescription.value = task.description;
      this.addTaskDate.value = task.dueDate;

      const editAdd = document.querySelector('.edit-task-form div button.task-submit');
      const newBtn = editAdd.cloneNode(true);
      const div = document.querySelector('.edit-task-form div');
            div.replaceChild(newBtn, editAdd);
            newBtn.onclick = () => {
               this.taskMethods.editTask(this.taskManager, targetId, this.addTaskTitle.value, this.addTaskDescription.value, this.addTaskDate.value);
               classChange(this.taskForm, 'edit-task-form', 'add-task-form');
               classChange(this.addTaskTitle, 'edit-task-title', 'add-task-title');
               classChange(this.addTaskDescription, 'edit-task-description', 'add-task-description');
               classChange(this.addTaskDate, 'edit-task-date', 'add-task-date');
               div.replaceChild(editAdd, newBtn);
               this.taskForm.style.display = 'none';
               this.taskUI.displayTasks(this.taskMethods.getTasks(this.taskManager));
               if (this.inHomeDiv.getHomeDiv()) {
                  this.filter.display(this.projectManager.getProjects(), this.inHomeDiv.getSection());
               }
               saveToStorage(`${this.taskManager.name}`, this.taskManager);
            }
      
   }

   deleteTask(target) {
      const getClosest = target.closest('.task');
      const targetId = getClosest.getAttribute('id');
      getClosest.remove();
      this.taskMethods.removeTask(this.taskManager, targetId);
      this.taskUI.displayTasks(this.taskMethods.getTasks(this.taskManager));
      if (this.inHomeDiv.getHomeDiv()) {
         this.filter.display(this.projectManager.getProjects(), this.inHomeDiv.getSection());
      }
      saveToStorage(`${this.taskManager.name}`, this.taskManager);
   }

   editPriority(target) {
      if (target.classList.contains('star')) {
         const getClosest = target.closest('.task');
         const targetId = getClosest.getAttribute('id');
         this.taskMethods.editPriority(this.taskManager, targetId);
         this.taskUI.displayTasks(this.taskMethods.getTasks(this.taskManager));
         if (this.inHomeDiv.getHomeDiv()) {
            this.filter.display(this.projectManager.getProjects(), this.inHomeDiv.getSection());
         }
         saveToStorage(`${this.taskManager.name}`, this.taskManager);
      }
   }

   editIsDone(target) {
      if (target.type == 'checkbox') {
         const getClosest = target.closest('.task');
         const targetId = getClosest.getAttribute('id');
         this.taskMethods.editIsDone(this.taskManager, targetId);
         this.taskUI.displayTasks(this.taskMethods.getTasks(this.taskManager));
         if (this.inHomeDiv.getHomeDiv()) {
            this.filter.display(this.projectManager.getProjects(), this.inHomeDiv.getSection());
         }
         saveToStorage(`${this.taskManager.name}`, this.taskManager);
      }
   }

   cancelAddTask() {
      this.taskForm.style.display = 'none';
      removeValue(this.addTaskTitle, this.addTaskDescription, this.addTaskDate);
   }
}

export {Project, TaskUI, TaskEventHandler};