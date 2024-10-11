exports.Book = class Book {
    isCheckOut = false;

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    checkOut() {
        this.isCheckOut = true;
        return this;
    }

    returnBook() {
        this.isCheckOut = false;
        return this;
    }
}