const container = document.querySelector('.container');
const gridButton = document.querySelector('.grid_number');
let opa = 0;

generateGrid(16);
addListener();

gridButton.addEventListener('click', ()=>{
   while (true) {
      let gridNum = prompt('Enter Grid Dimensions: ')
      if (gridNum < 5 || gridNum > 100) {
         continue;
      } else {
         container.innerHTML = '';
         generateGrid(gridNum);
         addListener();
         break;
      }
   }
})

function addListener() {
   document.querySelectorAll('.box').forEach(box => {
      box.addEventListener('mouseenter', (e) => {
         let hue = Math.floor(Math.random() * 360 + 1);
         box.style.backgroundColor = `hsla(${hue}, 100%, 50%, ${opa})`;
         opa += 0.1;
      })
   })
}

function generateGrid(value) {
   for (let i = 0; i < value; i++) {
      for (let j = 0; j < value; j++) {
         const box = document.createElement('div');
         box.classList.add('box');
         container.append(box);
      }
   }
   
   document.querySelectorAll('.box').forEach(box => {
      box.style.width = `${100 / value}%`;
      box.style.height = `${100 / value}%`;
   })
}