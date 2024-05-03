const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";

const redP = document.createElement('p');
redP.textContent = 'Hey I\'m red!';
redP.style.color = 'red';

const blueH3 = document.createElement('h3');
blueH3.textContent = 'Hey I\'m blue!';
blueH3.style.color = 'blue';

const newDiv = document.createElement('div');
newDiv.style.backgroundColor = 'pink';
newDiv.style.border = `${1}px solid black`;

const divH1 = document.createElement('h1');
divH1.textContent = 'I\’m in a div';

const divP = document.createElement('p');
divP.textContent = 'ME TOO!';

newDiv.append(divH1, divP);

container.append(content, redP, blueH3, newDiv);

