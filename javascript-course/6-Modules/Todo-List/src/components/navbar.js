export default class {
   constructor() {
      this.navBar = document.querySelector('.ri-menu-line');
      this.main = document.querySelector('.main-container');
      this.nav = document.querySelector('.content nav');
      this.addEventListener();
   }

   addEventListener() {
      this.navBar.addEventListener('click', () => {
         this.nav.classList.toggle('nav-disappear');
         this.main.classList.toggle('main-big');
      });
   }
}
