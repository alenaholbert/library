let myLibrary = []; // Array of Book Objects
const popup = document.querySelector("#form-container");
const form = document.querySelector("#form");
const bookshelf = document.querySelector("#bookshelf");
const newBookButton = document.querySelector("#new-book");
const submitButton = document.querySelector("#submit");
index = 0;

// Book Object
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function toggleForm() {
    if(formOpen) {
        closeForm();
    }
    else {
        openForm();
    }
}

function closeForm() {
    formOpen = false;
    popup.style.transform = "scale(0)";
    newBookButton.style.transform = "rotate(0deg)";
}

function openForm() {
    formOpen = true;
    popup.style.transform = "scale(1)";
    newBookButton.style.transform = "rotate(45deg)";
}

function addBook(e) {
    e.preventDefault();

    // DELETE BUTTON
    const deleteButton = createDeleteButton();

    // TOGGLE READ BUTTON
    const toggleContainer = document.createElement("label");
    toggleContainer.classList.add("toggle");
    const toggle = document.createElement("input");
    toggle.setAttribute("type", "checkbox");
    toggle.classList.add("checkbox");
    toggleContainer.appendChild(toggle);
    const span = document.createElement("span");
    span.classList.add("slider");
    toggleContainer.appendChild(span);

    // Extract Book Information from Form:
    // Title:
    const titleVal = document.getElementById("title").value;
    let title = document.createElement("h2");
    title.setAttribute("id", "book-title");
    title.innerHTML = `${titleVal}`;

    // Author:
    const authorVal = document.getElementById("author").value;
    let author = document.createElement("h3");
    author.setAttribute("id", "book-author");
    author.innerHTML = `by: ${authorVal}`;

    // Number of Pages:
    const pagesVal = document.getElementById("pages").value;

    // Read?
    const readVal = document.getElementById("read").value;
    let read = document.createElement("h3");
    read.setAttribute("id", "book-read");
    read.value = readVal;
    read.innerHTML = `Read?: ${readVal}`;

    // update toggle switch
    if (readVal == 'yes') {
        toggle.click();
    }
    toggle.addEventListener("click", toggleRead);

    // DOM Book Element -- Add to bookshelf on page
    const book = document.createElement("li");
    book.classList.add("book");
    book.setAttribute("data-index", `${index}`);
    index++;

    book.appendChild(deleteButton);
    book.appendChild(toggleContainer);
    book.appendChild(title);
    book.appendChild(author);
    if (pagesVal != ""){
        let pages = document.createElement("h3");
        pages.setAttribute("id", "book-pages");
        pages.innerHTML = `# Pages: ${pagesVal}`;
        book.appendChild(pages);
    }
    book.appendChild(read);
    console.log(`${read}`);
    console.log(`${read.value}`);
    bookshelf.appendChild(book);

    // Book Object -- Add to Array
    const bookObj = new Book(title, author, pages, read);
    myLibrary.push(bookObj);

    form.reset();
    closeForm();
}

function createDeleteButton() {
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("trash");
    deleteButton.addEventListener("click", deleteBook);
    return deleteButton;
}

function toggleRead() {
    book = this.parentNode.parentNode;
    readNode = book.querySelector(`#book-read`);
    console.log("read node: " + readNode);
    read = readNode.value;
    console.log(readNode.value);
    if (read == 'yes') {
        readNode.value = 'no';
        readNode.innerHTML = `Read?: no`;
    }
    else {
        readNode.value = 'yes';
        readNode.innerHTML = `Read?: yes`;
    }
}

function deleteBook() {
    book = this.parentNode;
    console.log(book);
    removeIndex = book.dataset.index;
    bookshelf.removeChild(book);
    myLibrary.splice(book, 1);
    //index--;
    //myLibrary.forEach(b => b.dataset.index = b.dataset.index-1);
    displayAllBooks();
}

function displayAllBooks() {
    myLibrary.forEach(function(book) {
        console.log(`${book.title} written by ${book.author} has ${book.pages} pages. Has it been read? ${book.read}`);
    });
}

// let book1summary = "Matilda is a bright little girl who is very eager to learn. Eventually, her insensitive parents send her to a school run by Miss (The) Trunchbull. She is a cruel authoritarian that loathes children. Matilda befriends her school teacher, Miss Honey.";
// let book1 = new Book("Matilda", "Roald Dahl", 150, true, book1summary);
// let book2summary = "A man loses his identity while living under a repressive regime. In a story based on George Orwell's classic novel, Winston Smith (John Hurt) is a government employee whose job involves the rewriting of history in a manner that casts his fictional country's leaders in a charitable light. His trysts with Julia (Suzanna Hamilton) provide his only measure of enjoyment, but lawmakers frown on the relationship -- and in this closely monitored society, there is no escape from Big Brother.";
// let book2 = new Book("1984", "George Orwell", 300, true, book2summary);

// myLibrary.push(book1);
// myLibrary.push(book2);
// displayAllBooks();

closeForm();
newBookButton.addEventListener('mouseup', toggleForm);
form.addEventListener("submit", e => addBook(e));
//submitButton.addEventListener("click", addBook);