class Book {
    private _id: number;
    name: string;
    author: string;
    year: number;

    constructor(_id: number, name: string, author: string, year: number) {
        this._id = _id;
        this.name = name;
        this.author = author;
        this.year = year;
    }

    getInfo(): void {
        console.log(`${this.name} ${this.author} ${this.year}`);
    }
}