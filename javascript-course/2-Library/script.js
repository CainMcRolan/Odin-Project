const myLibrary = [];
const dialog = document.querySelector('.dialog');
const addBook = document.querySelector('.myForm');
const library =  document.querySelector('.library');
const toggleButton = document.querySelector('.add_book');
let dialogToggle = false;

addBook.addEventListener('submit', (event)=> {
   event.preventDefault();
   addBookToLibrary();
   displayBooks();
   dialog.close();
   console.log(myLibrary);
})

toggleButton.addEventListener('click', () => {
   dialog.showModal();
})

function Book(title, author, pages, readstatus) {
   this.title = title;
   this.author = author;
   this.pages = pages;
   this.readstatus = readstatus;
}

function addBookToLibrary() {
   let title = document.querySelector('.add_title');
   let author = document.querySelector('.add_author');
   let pages = document.querySelector('.add_pages');
   let readStatus = document.querySelector('.read_status');

   myLibrary.push(new Book(title.value, author.value, pages.value, readStatus.value));
}

function displayBooks() {
   library.innerHTML = '';
   let id = 1;
   for (let myBook of myLibrary) {
      let book = document.createElement('div');
      book.classList.add('book');
      book.setAttribute('id', id);
 
      id++;
   
      let newTitle = document.createElement('h1');
      newTitle.classList.add('title');
      newTitle.textContent = `Title: ${myBook.title}`;

      let newAuthor = document.createElement('p');
      newAuthor.classList.add('author');
      newAuthor.textContent = `Author: ${myBook.author}`;

      let newPages = document.createElement('p');
      newPages.classList.add('pages');
      newPages.textContent = `Pages: ${myBook.pages}`;

      let newRead = document.createElement('p');
      newRead.classList.add('is_read');
      newRead.textContent = `Read Status: ${myBook.readstatus}`;

      let changeReadStatus = document.createElement('button');
      changeReadStatus.classList.add('changeReadStatus');
      changeReadStatus.textContent = myBook.readstatus === 'read' ? 'Unread' : 'Read';

      let removeCard = document.createElement('button');
      removeCard.classList.add('removeBook');
      removeCard.textContent = 'Remove Book';

      book.append(newTitle, newAuthor, newPages, newRead, changeReadStatus, removeCard);

      library.append(book);
   }

   changeReadStatus();
   removeBook();
}

function changeReadStatus() {
   document.querySelectorAll('.changeReadStatus').forEach((button) => {
      button.addEventListener('click', (e) => {
         let bookData = button.parentElement.getAttribute('id');
         let myBook = myLibrary[bookData - 1];
         let currentStatus = myBook.readstatus;
         let newStatus = currentStatus == 'read' ? 'not read': 'read';
         myBook.readstatus = newStatus;
         let newText = button.textContent == 'Read' ? 'Unread': 'Read';
         button.textContent = newText;
         console.log(button.textContent);
         displayBooks();
      })
   })
}

function removeBook() {
   document.querySelectorAll('.removeBook').forEach((button) => {
      button.addEventListener('click', (e) => {
         let bookData = button.parentElement.getAttribute('id');
         myLibrary.splice(bookData - 1, 1);
         button.parentElement.remove();
         console.log(myLibrary);
      })
   })
}