function displayMonth(year, month) {
   const currentMonth = new Date(year, month, 1); 
   //Gets the Starting day
   const getDay = currentMonth.getDay(); 
   // 30 days
   const numberOfDays = new Date(year, month + 1, 0).getDate();

   const total = 35 - (getDay + numberOfDays);

   const months = {
      'January': 0,
      'February': 1,
      'March': 2,
      'April': 3,
      'May': 4,
      'June': 5,
      'July': 6,
      'August': 7,
      'September': 8,
      'October': 9,
      'November': 10,
      'December': 11,
   };
      
   const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   
   let monthString = () => {
      for (let m in months) {
         if (month == months[m]) {
            return m;
         }
      }
   };

   let table = `<table class='calendar'><caption>${monthString()} ${year}</caption><tr>`;
   for (let days of daysOfTheWeek) {
      table += `<th>${days}</th>`;
   }
   table += `</tr><tr>`;

   let dayCount = 0;
   let displayDay = 0;

   for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
         if (dayCount >= getDay) displayDay++;
         if (dayCount < getDay) {
            table += `<td></td>`;
         } else if (displayDay < numberOfDays + 1) {
            table += `<td>${displayDay}</td>`;
         } else if (displayDay < numberOfDays + total) {
            for (let k = 0; k < total; k++) {
               table += `<td></td>`;
               displayDay++;
            }
         }
         dayCount++;
      }
      table += `</tr><tr>`;
   }

   table += `</tr></table>`;

   document.body.innerHTML += table;

   const tableRows = document.querySelectorAll('tr');
   for (let row of tableRows) {
      row.children[0].style.color = 'red';
      row.children[6].style.color = 'blue'
   }
}


console.log(displayMonth(2024, 3));