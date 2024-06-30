export default function(tag, classNames, text, attributes = {}) {
   const element = document.createElement(tag);
   if (classNames) element.classList.add(...classNames.split(' '));
   Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
   if (text) element.textContent = text;
   return element;
}