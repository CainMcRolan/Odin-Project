import buildElement from '../utils/buildElement.js';
import {Project, TaskUI, TaskEventHandler} from './project.js';
import {homeIdentifier} from './filter.js';
import {saveToStorage} from './localStorage.js';

class ProjectManager {
   constructor() {
      this.projectsArray = [];
   }

   addNewProject(name) {
      const project = new Project(name, Date.now());
      this.projectsArray.push(project);
      saveToStorage(`${name}`, project);
   }

   addProject(project) {
      this.projectsArray.push(project);
   }

   removeProject(id) {
      let checkProject = this.projectsArray.find(project => project.id == id);
      checkProject = checkProject.name;
      this.projectsArray = this.projectsArray.filter(project => project.id != id);
      localStorage.removeItem(checkProject);
   }

   editProject(id, newName) {
      const projectIndex = this.projectsArray.findIndex(project => project.id == id);
      if (projectIndex !== -1) {
         this.projectsArray[projectIndex].name = newName;
      }
   }

   getProjects() {
      return this.projectsArray;
   }
}

class ProjectUI {
   constructor() {
      this.projectContainer = document.querySelector('.projects-container');
   }

   displayProjects(projects) {
      this.projectContainer.innerHTML = '';
      projects.forEach(project => {
         const projectDiv = buildElement('div', `projects-div project-${project.id}`, '', {id:project.id});
         const projectSubDiv = document.createElement('div');
         
         const projectP = document.createElement('p');
         const projectI = document.createElement('i');
         const projectTitle = buildElement('p', 'project-title', project.name);

         projectI.classList.add('ri-menu-line');
         projectP.append(projectI);

         projectSubDiv.append(projectP, projectTitle);

         const projectSpan = document.createElement('span');
         const projectSpanI = document.createElement('i');
               projectSpanI.classList.add('ri-more-2-line');
               projectSpanI.id = 'menu-i';
         projectSpan.appendChild(projectSpanI);

         projectDiv.append(projectSubDiv, projectSpan);
         this.projectContainer.append(projectDiv);
      });
   }
}

class ProjectEventHandler {
   constructor(projectManager, projectUI) {
      this.handleEventListeners();
      this.DOMMethods = new ProjectDOMMethods(projectManager, projectUI);
      this.DOMMethods.switchProject();
   }

   handleEventListeners() {
      const projectContainer = document.querySelector('.projects-container');
      projectContainer.addEventListener('click', (e) => {
         document.querySelectorAll('.projects-div, .home-div').forEach(div => {
            div.classList.remove('projects-div-selected');
         });
         this.DOMMethods.switchProject(e.target);
         this.DOMMethods.removeAndDeleteProject(e.target);
      })

      const projectForm = document.querySelector('.add-project-form');
      projectForm.addEventListener('submit', (e) => this.DOMMethods.addProject(e));
      document.querySelector('.add-project').addEventListener('click', () => projectForm.style.display = 'flex');
      
      const cancelButton = document.querySelector('.cancel-button');
      cancelButton.addEventListener('click', () => this.DOMMethods.cancelAddProject());
   }
}

class ProjectDOMMethods {
   constructor(projectManager, projectUI) {
      this.projectManager = projectManager;
      this.projectUI = projectUI;
      //Initialize TaskUI
      this.TaskUI = new TaskUI();
      //Initialize TaskEventHandler
      this.TaskEventHandler = new TaskEventHandler(this.projectManager);
      //Toggles When You Are In a Home Div
      this.inHomeDiv = homeIdentifier;
   }

   switchProject(target) {
      const getClosest = (target && target.closest('.projects-div')) || document.querySelector('.project-1');
      if (!getClosest) return;
      // Add Styling
      getClosest.classList.add('projects-div-selected');
      // Pinpoint Project
      const targetId = getClosest.getAttribute('id');
      const project = this.projectManager.getProjects().find((project) => project.id == targetId);
      if (!project) return;
      // Invoke TaskUI and TaskEventHandler
      this.TaskUI.displayTitle(project.name);
      this.TaskUI.displayTasks(project.taskArray);
      this.TaskEventHandler.getProject(project);
      this.inHomeDiv.falseHomeDiv();
   }

   addProject(e) {
      e.preventDefault();
      const projectForm = document.querySelector('.add-project-form');
      const projectFormInput = document.querySelector('.add-project-name');
      const newProjectName = projectFormInput.value;
      if (newProjectName.length <= 0 || newProjectName.length > 15) {
         alert('Enter a Valid Project Name!');
         return;
      }
      this.projectManager.addNewProject(newProjectName);
      projectFormInput.value = '';
      this.projectUI.displayProjects(this.projectManager.getProjects());
      projectForm.style.display = 'none';
      this.toggle = false;
      this.switchProject();
   }

   removeAndDeleteProject(target) {
      const infoSpan = document.querySelector('.info');
      if (infoSpan) infoSpan.remove();
      if (target.id == 'menu-i' && !this.toggle) {
         const infoSpan2 = buildElement('span', 'info');
         const infoEdit =  buildElement('button', 'edit', 'Edit');
               infoEdit.onclick = () => this.editProject(target);
         const infoDelete = buildElement('button', 'delete', 'Delete');
               infoDelete.onclick = () => this.deleteProject(target);
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

   editProject(target) {
      const getClosest = target.closest('.projects-div');
      const targetId = getClosest.getAttribute('id');
      const childDiv = getClosest.children[0];
      const closestP = childDiv.children[1];

      const editInput = document.createElement('input');
      editInput.value = closestP.textContent;

      const editAdd = document.createElement('button');
      editAdd.textContent = 'Replace';
      editAdd.onclick = () => {
         this.projectManager.editProject(targetId, editInput.value);
         childDiv.replaceChild(closestP, editInput);
         editAdd.remove();
         this.projectUI.displayProjects(this.projectManager.getProjects());
      };

      childDiv.replaceChild(editInput, closestP);
      childDiv.appendChild(editAdd);
   }

   deleteProject(target) {
      const getClosest = target.closest('.projects-div');
      const targetId = getClosest.getAttribute('id');
      getClosest.remove();
      this.projectManager.removeProject(targetId);
      this.projectUI.displayProjects(this.projectManager.getProjects());
      this.switchProject();
   }

   cancelAddProject() {
      const projectForm = document.querySelector('.add-project-form');
      const projectFormInput = document.querySelector('.add-project-name');
      projectForm.style.display = 'none';
      projectFormInput.value = '';
   }
}

export {ProjectManager, ProjectUI, ProjectEventHandler};