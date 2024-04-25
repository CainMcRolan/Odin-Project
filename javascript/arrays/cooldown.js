const people = ['Chris', 'Anne', 'Colin', 'Terri', 'Phil', 'Lola', 'Sam', 'Kay', 'Bruce'];

const admitted = document.querySelector('.admitted');
const refused = document.querySelector('.refused');
admitted.textContent = 'Admit: ';
refused.textContent = 'Refuse: ';


// refused.textContent += ;
// admitted.textContent += ;

for (let p of people) {
	if (p === 'Phil' || p === 'Lola') refused.textContent += `${p}, `;
	else admitted.textContent += `${p}, `;
}

refused.textContent = refused.textContent.slice(0, refused.textContent.length - 2) + '.';
admitted.textContent = admitted.textContent.slice(0, admitted.textContent.length -2) + '.';

