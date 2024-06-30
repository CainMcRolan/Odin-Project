import {TaskUI, TaskEventHandler} from './project.js';
import Project from './project.js';
import { addDays, format } from 'date-fns';

class FilterTask {
   constructor(projectManager) {
      this.handleEventListeners();
      this.FilterTaskMethods = new FilterTaskMethods(projectManager);
   }

   handleEventListeners() {
      const homeContainer = document.querySelector('.home');
      homeContainer.addEventListener('click', (e) => {
         document.querySelectorAll('.projects-div, .home-div').forEach(div => {
            div.classList.remove('projects-div-selected');
         });
         this.FilterTaskMethods.switchHome(e.target);
      })
   }
}

class FilterTaskMethods {
   constructor(projectManager) {
      this.projectManager = projectManager;
      //Initialize TaskUI
      this.TaskUI = new TaskUI();
      //Toggles When You Are In a Home Div
      this.inHomeDiv = homeIdentifier;
    }

   switchHome(target) {
      //Get Date
      this.currentDate = new Date();
      this.formattedDate = format(this.currentDate, 'yyyy-MM-dd')
      const getClosest = (target && target.closest('.home-div')) || document.querySelector('.all-task');
      if (!getClosest) return;
      //Add Styling
      getClosest.classList.add('projects-div-selected');
      //Toggle inHomeDiv to True to Show I am in a home div
      this.inHomeDiv.trueHomeDiv();
      this.inHomeDiv.section = getClosest.id;
      // Pinpoint Task
      const projectArray = this.projectManager.getProjects();
      //Loop through all Project task array and push all the task to one big array
      this.display(projectArray, this.inHomeDiv.getSection());
      
   }

   display(projectArray, section) {
      
      let taskArray = [];
      switch(section) {
         case 'Today': 
               taskArray = this.filterToday(projectArray, taskArray);
               break;
         case 'Next 7 Days':
               taskArray = this.filterNextDays(projectArray, taskArray);
               break;
         case 'Important':
               taskArray = this.filterImportant(projectArray, taskArray);
               break; 
         default:
               taskArray = this.getAll(projectArray, taskArray);
               break;
      }
      //Display the Contents of the Array
      this.TaskUI.displayTitle(section);
      this.TaskUI.displayTasks(taskArray);
   }

   getAll(projectArray, taskArray) {
      //Default behavior, get all task from all projects
      projectArray.forEach(project => {
         project.taskArray.forEach(task => {
            taskArray.push(task);
         })
      })

      return taskArray;
   }
   
   filterToday(projectArray, taskArray) {
      //Get the Task that dueDate matches current Day
      projectArray.forEach(project => {
         project.taskArray.forEach(task => {
            if (task.dueDate == this.formattedDate) {
               taskArray.push(task);
            }
         })
      })

      return taskArray;
   }

   filterNextDays(projectArray, taskArray) {
      const getNextSevenDays = () => {
         const today = new Date();
         // Initialize an array to store the dates
         const daysArray = [];
         // Push each day from tomorrow to the next 7 days
         for (let i = 1; i <= 7; i++) {
           const day = addDays(today, i);
           daysArray.push(format(day, 'yyyy-MM-dd'));
         }
         return daysArray;
      };
      const daysArray = getNextSevenDays();
      projectArray.forEach(project => {
         project.taskArray.forEach(task => {
            if (daysArray.find((day) => day == task.dueDate)) taskArray.push(task);
         })
      })
      return taskArray;
   }

   filterImportant(projectArray, taskArray) {
      //Get the Task whose priority is important
      projectArray.forEach(project => {
         project.taskArray.forEach(task => {
            if (task.priority == 'Important') taskArray.push(task); 
         })
      })
      return taskArray;
   }
}

class homeIdentify {
   constructor() {
      this.inHomeDiv = false;
      this.section = 'All Task';
   }

   getHomeDiv() {
      return this.inHomeDiv;
   }

   trueHomeDiv() {
      this.inHomeDiv = true;
   }

   falseHomeDiv() {
      this.inHomeDiv = false;
   }

   section(value) { 
      this.section = value;
   }

   getSection() {
      return this.section;
   }
}

const homeIdentifier = new homeIdentify();

function getCurrentProject(target, projectManager, getProject) {
   const getClosest = target.closest('.task');
   const targetId = getClosest.getAttribute('id');
   const projectArray = projectManager.getProjects();
   projectArray.forEach(project => {
      project.taskArray.forEach(task => {
         if (task.id == targetId) {
            getProject(project);
         }
      })
   })
}

export {FilterTask, homeIdentifier, getCurrentProject, FilterTaskMethods};