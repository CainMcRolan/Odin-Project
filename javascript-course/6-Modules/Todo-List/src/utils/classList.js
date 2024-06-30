export default function(element, oldClass, newClass) {
   element.classList.remove(oldClass);
   element.classList.add(newClass);
   return element;
}