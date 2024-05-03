const password1 = document.querySelector('#user_password');
const password2 = document.querySelector('#user_password_2');
const form = document.querySelector('form');
const popUp = document.querySelector('.popUp');
let timeout = null;

form.addEventListener('submit', (event) => {
  if (password1.value !== password2.value || password1.value === '' || password2.value === '')  {
    event.preventDefault(); 
    popUp.style.display = 'inline';
  }
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(()=> {
    popUp.style.display = 'none';
  }, 2000)
});

