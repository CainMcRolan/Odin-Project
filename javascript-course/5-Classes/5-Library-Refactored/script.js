class Book {
   constructor(title, author, pages, readStatus) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.readStatus = readStatus;
   }

   changeReadStatus() {
      this.readStatus = this.readStatus === 'Read' ? 'Unread': 'Read';
   }
}

class Library {
   //Add Unique Id Property for Identification
   #bookId = 1;
   constructor() {
      this.library = [];
      this.container = document.querySelector('.container');
      this.addButton = document.querySelector('.add_book');
      this.dialog = document.querySelector('.dialog');

      //Add Event Listeners
      this.addEventListeners();
   }

   //Add and Remove Logic
   addBookToLibrary(title, author, pages, readStatus) {
      const newBook = new Book(title, author, pages, readStatus);
      newBook.bookId = this.#bookId;
      this.library.push(newBook);
      this.generateCardHTML(title, author, pages, readStatus, newBook.bookId);
      this.#bookId++;
   }

   removeBookFromLibrary(bookId) {
      this.library = this.library.filter((book) => book.bookId !== bookId);
   }

   changeBookReadStatus(bookId) {
      const book = this.library.find((book) => book.bookId === bookId);
      if (book) book.changeReadStatus();
   }

   //UI Logic
   displayBooks() {
      this.container.innerHTML = '';
      this.library.forEach(book => {
         this.generateCardHTML(book.title, book.author, book.pages, book.readStatus, book.bookId);
      })
   }   

   generateCardHTML(title, author, pages, readStatus, cardId) {
      const newCard = document.createElement('div');
      newCard.classList.add('card');
      newCard.setAttribute('data-id', cardId)
      
      const newTitle = document.createElement('h1');
      newTitle.classList.add('title');
      newTitle.textContent = `Title: ${title}`;

      const newAuthor = document.createElement('p');
      newAuthor.classList.add('author');
      newAuthor.textContent = `Author: ${author}`;

      const newPages = document.createElement('p');
      newPages.classList.add('pages');
      newPages.textContent = `Pages: ${pages}`;

      const newReadStatus = document.createElement('p');
      newReadStatus.classList.add('read_status');
      newReadStatus.textContent = `Read Status: ${readStatus}`;
      

      const changeStatus = document.createElement('button');
      changeStatus.classList.add('change_read_status');
      changeStatus.textContent = readStatus === 'Read' ? 'Unread': 'Read';

      const removeBook = document.createElement('button');
      removeBook.classList.add('remove_book');
      removeBook.textContent = `Remove`;
   
      newCard.append(newTitle, newAuthor, newPages, newReadStatus, changeStatus, removeBook);
      this.container.append(newCard);
   }


   //Dialog Logic for Adding Books Through Dialog Form
   addBook() {
      const addTitle = document.querySelector('.add_title').value;
      const addAuthor = document.querySelector('.add_author').value;
      const addPages = parseInt(document.querySelector('.add_pages').value);
      const addReadStatus = document.querySelector('.add_read_status').value;
      this.addBookToLibrary(addTitle, addAuthor, addPages, addReadStatus);
      console.log(this.library);
   }

   //Event Listeners
   addEventListeners() {
      this.container.addEventListener('click', (e) => {
         if (e.target.classList.contains('remove_book')) {
             const card = e.target.parentElement;
             const cardId = parseInt(card.getAttribute('data-id'));
             this.removeBookFromLibrary(cardId);
             card.remove();
         } else if (e.target.classList.contains('change_read_status')) {
            const card = e.target.parentElement;
            const cardId = parseInt(card.getAttribute('data-id'));
            this.changeBookReadStatus(cardId);
            this.displayBooks();
         }
         console.log(this.library);
      });

      this.addButton.addEventListener('click', () => {
         this.dialog.showModal();
      });

      document.addEventListener('submit', () => {
         this.addBook();
      })
   }
}

const library = new Library();

library.addBookToLibrary('Cant Hurt Me', 'David Goggins', 162, 'Read');
library.addBookToLibrary('Riding Waves', 'David Goggins', 162, 'Read');
library.addBookToLibrary('Silent Hill', 'David Goggins', 162, 'Read');
library.displayBooks();
