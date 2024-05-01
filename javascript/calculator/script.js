const display = document.querySelector('.display');
const inputs = document.querySelectorAll('.user_input');
let period = document.querySelector('.period');
let operators = ['+', '-', '*', '/', '%'];
let num1 = '';
let num2 = '';
let operator;
let decimalAdded = false;
let integers = ['0','1','2','3','4','5','6','7','8','9'];

inputs.forEach(input => {
      input.addEventListener('click', () => {
      displayContent(input);    
   })
})

function operate() {
   if (num2 == 0 && operator == '/') {
      display.textContent = 'YERRRRR';
      display.style.color = 'red';
      setTimeout(() => {
         display.style.color = 'black';
         clear();
      }, 3000)
      return;
   }
   let result = null;
   switch (operator) {
      case '+':
          result = add(+num1, +num2);
          break;
      case '-':
          result = subtract(+num1, +num2);
          break;
      case '*':
          result = multiply(+num1, +num2);
          break;
      case '/':
          result = divide(+num1, +num2);
          break;
      case '%':
          result = modulo(+num1, +num2);
          break;
   }

   result = result.toString().split('').includes('.') ? result.toFixed(1): result;
   display.textContent = result;
   num1 = result.toString();
   num2 = '',
   operator = undefined;
   decimalAdded = false;
}


document.body.addEventListener('keydown', (e)=> {
   let icon = e.key;
   console.log(icon);
   if (icon == 'Escape') {
      decimalAdded = false;
      clear();
      return;
   } else if (icon == 'Control') {
      toggleNegative();
      return;
   } else if (icon == 'Backspace') {
      deleteNumber();
      return;
   } else if (operators.includes(icon) && num2 && num1) {
      operate();
      operator = icon;
   } else if (icon == 'Enter') {
      try{
         operate();
      } catch(err) {
         decimalAdded = false;
         console.error('No Valid Input!!');
         alert('NO VALID INPUT!');
         clear();
         return;
      }
   } else if (icon === '.') {
      if (!decimalAdded) { 
         if (operator) {
            num2 += '.';
            display.textContent = num2;
         } else {
            num1 += '.';
            display.textContent = num1;
         }
         decimalAdded = true; 
      }
   } else if (operators.includes(icon)) {
      operator = icon;
      display.textContent = num1;
      decimalAdded = false;
   } else if (integers.includes(icon)){
      if (operator) {
         num2 += icon;
         display.textContent = num2;
     } else {
         num1 += icon;
         display.textContent = num1;
     }
   }
})

function displayContent(input) {
   let icon = input.textContent;
   if (icon == 'AC') {
      decimalAdded = false;
      clear();
      return;
   } else if (icon == '+/-') {
      toggleNegative();
      return;
   } else if (icon == 'Del') {
      deleteNumber();
      return;
   } else if (operators.includes(icon) && num2 && num1) {
      operate();
      operator = icon;
   } else if (icon === '=') {
      try{
         operate();
      } catch(err) {
         decimalAdded = false;
         console.error('No Valid Input!!');
         alert('NO VALID INPUT!');
         clear();
         return;
      }
   } else if (icon === '.') {
      if (!decimalAdded) { 
         if (operator) {
            num2 += '.';
            display.textContent = num2;
         } else {
            num1 += '.';
            display.textContent = num1;
         }
         decimalAdded = true; 
      }
   } else if (operators.includes(icon)) {
      operator = icon;
      display.textContent = num1;
      decimalAdded = false;
   } else {
      if (operator) {
         num2 += icon;
         display.textContent = num2;
     } else {
         num1 += icon;
         display.textContent = num1;
     }
   }
}

function add(num1, num2) {
   return num1 + num2;
}

function subtract(num1, num2) {
   return num1 - num2;
}

function multiply(num1, num2) {
   return num1 * num2;
}

function divide(num1, num2) {
   return num1 / num2;
}

function modulo(num1, num2) {
   return num1 % num2;
}

function toggleNegative() {
   if (!num2) {
      num1 = num1.startsWith('-') ? num1.slice(1) : '-' + num1;
      display.textContent = num1;
   } else if (num2 !== '') {
      num2 = num2.startsWith('-') ? num2.slice(1) : '-' + num2;
      display.textContent = num2;
   }
}

function deleteNumber() {
   if (!num2) {
      num1 = num1.slice(0, num1.length - 1);
      display.textContent = num1;
   } else if (num2 !== '') {
      num2 = num2.slice(0, num1.length - 1);
      display.textContent = num2;
   }
}

function clear() {
   display.textContent = '';
   num1 = '';
   num2 = '';
   operator = undefined;
}

