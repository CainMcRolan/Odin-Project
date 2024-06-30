export default function(variable, name) {
   let variableLength = variable.length;
   if (variableLength <= 0) alert(`${name} length must not be below 0!`);
   if (variableLength >= 15) alert(`${name} length must not go beyond 15!`)
}  