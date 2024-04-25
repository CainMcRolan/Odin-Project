const months = {
   'January': 31,
   'February': 29,
   'March': 31,
   'April': 30,
   'May': 31,
   'June': 30,
   'July': 31,
   'August': 31,
   'September': 30,
   'October': 31,
   'November': 30,
   'December': 31,
};

let days = document.querySelectorAll('.day');
const monthTitle = document.querySelector('.month_title');
const container =  document.querySelector('.container');
monthTitle.textContent = 'Calendar (2024)';


function getMonth() {
   let div = document.createElement('div');
   div.classList.add('day');
   container.append(div) ;

   for (let month in months) {
      let display = ``;
      for (let i = 1; i <= months[month]; ++i) {
         display += `<div class='day ${month}'>${i}</div>`;
      }
      container.innerHTML += display;
   }

   days = document.querySelectorAll('.day');
   for (let i = 0; i < days.length; i++) {
      if (i % 7 === 0) {
         days[i].classList.add('sundays');
      }
   }
   const divs = document.querySelectorAll('.container > div:nth-child(7n)');
   divs.forEach(div => {
      div.classList.add('saturdays');
  });

  document.querySelector('.sat').style.color = 'black';

  for (let day of days) {
      day.addEventListener('mouseover', ()=> {
         day.style.backgroundColor = 'green';
         monthTitle.textContent = `${day.classList.item(1)}`;
      });

      day.addEventListener('mouseout', ()=> {
         day.style.backgroundColor = 'white';
      });
      
  }
}
getMonth();
