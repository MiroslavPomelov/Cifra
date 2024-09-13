class Reader {
    private _id: number;
    name: string;
    books: Array<Book> = [];

    constructor(_id: number, name: string, books: Array<Book>) {
        this._id = _id;
        this.name = name;
        this.books = books;
    }

    // getBook(newBook: Book): void {
    //     this.books.push(newBook);
    // }

    // returnBook(book): void {
    //     this.books.;
    // }
}
