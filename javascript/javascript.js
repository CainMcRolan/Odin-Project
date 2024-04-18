function add7(number) {
   return number + 7;
}

function multiply(num1, num2) {
   return num1 * num2;
}

function capitalize(string) {
   string = string.toLowerCase();
   const newString = string.charAt(0).toUpperCase() + string.slice(1);
   return newString;
}

function lastLetter(string) {
   return string.slice(-1);
}

console.log(lastLetter("abcd"));
