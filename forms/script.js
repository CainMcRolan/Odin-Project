const password1 = document.querySelector('#user_password');
const password2 = document.querySelector('#user_password_2');
const form = document.querySelector('form');
const passwordDiv = document.querySelector('.password');

form.addEventListener('submit', (event) => {
  if (password1.value !== password2.value || password1.value === '' || password2.value === '')  {
    event.preventDefault(); 
    const errorMessage = document.createElement('span');
    errorMessage.classList.add('popUp');
    errorMessage.textContent = '*Password do not match!'
    passwordDiv.appendChild(errorMessage);
    setTimeout(()=> {
      errorMessage.style.display = 'none';
    }, 2000)
  }
});

