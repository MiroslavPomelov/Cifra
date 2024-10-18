const task = require('../classes/task');

exports.TaskReposit = class TaskReposit {
    listOfTasks = [];

    getTask(id) {
        this.listOfTasks.forEach(task => {
            if (task.id === id) {
                return task;
            }
            else {
                return null;
            }
        });
    };

    addTask(task) {
        this.listOfTasks.push(task);
    };

    updateTask(id) {
        for (let i = 0; i < listOfTasks.length; i++) {
            if (task.id === id) {
                // this.listOfTasks[id].
            }
        }
    };

    deleteTask(id) {
        for (let i = 0; i < listOfTasks.length; i++) {
            if (this.listOfTasks[id] === id) {
                this.listOfTasks.splice(id, 1);
            }
        }
        console.log('Задача удалена');
    };

    createTask(name, description) {
        const newTask = new task.Task('task1', 'my new Task');
        return newTask;
    }
}