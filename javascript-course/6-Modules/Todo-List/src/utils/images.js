import allTask from '../assets/images/all-task.png';
import Today from '../assets/images/today.png';
import nextDay from '../assets/images/nextday.png';
import Important from '../assets/images/important.png';

export default function() {
   document.querySelector('#all-task-image').src = allTask;
   document.querySelector('#today-image').src = Today;
   document.querySelector('#next-day-image').src = nextDay;
   document.querySelector('#important-image').src = Important;
}