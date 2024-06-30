import 'remixicon/fonts/remixicon.css';
import './assets/styles/style.scss';
import insertImages from './utils/images.js';
import {ProjectManager, ProjectUI, ProjectEventHandler} from './modules/app.js';
import { FilterTask} from './modules/filter.js';
import Navbar from './components/navbar.js';
import {getAllFromStorage} from './modules/localStorage.js';

// Project Initialization
document.addEventListener('DOMContentLoaded', () => {
      //Inject Icons
      insertImages();
      //Inject navBar
      const navBar = new Navbar();
      //Initialize Default Project
      const projectManager = new ProjectManager();
      //Try
      const storedItems = getAllFromStorage();
      storedItems.forEach(item => {
            projectManager.addProject(item);
      })
      //
      if (storedItems.length == 0) {
            projectManager.addNewProject('DefaultProject');
      }
      //Filter Projects
      const filterTask = new FilterTask(projectManager);    
      
      //Display Default Project
      const projectUI = new ProjectUI();
            projectUI.displayProjects(projectManager.getProjects());
      //Initialize Event Listeners
      const projectEventHandler = new ProjectEventHandler(projectManager, projectUI);
});

