exports.Task = class Task {
    id;
    title;
    description;
    completed;

    constructor(title, description) {
        this.title = title;
        this.description = description;
    }


}