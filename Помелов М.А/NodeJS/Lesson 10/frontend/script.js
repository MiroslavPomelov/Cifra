function getTasks() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => {
            const tasksList = document.getElementById('tasks');
            tasksList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.textContent = `ID: ${task.id}, Title: ${task.title}, Completed: ${task.completed}`;
                li.id = task.id;
                li.addEventListener('click', (event) => {
                    document.getElementById('task-id').value = event.target.id;

                    let list = document.querySelectorAll('li');
                    list.forEach(element => {
                        element.style = null;
                    });

                    event.target.style.backgroundColor = 'green';
                    event.target.style.color = 'white';
                });
                tasksList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

function submitTaskForm(event) {
    event.preventDefault();
    const title = document.getElementById('task-title').value;
    const completed = document.getElementById('task-completed').checked;
    const task = { title, completed };

    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
        .then(response => response.text())
        .then(() => {
            document.getElementById('task-form').reset();
            getTasks();
        })
        .catch(error => console.error('Error:', error));
}

function updateTask() {
    const id = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value;
    const completed = document.getElementById('task-completed').checked;
    const task = { title, completed };

    fetch(`http://localhost:3000/tasks?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })
        .then(response => response.text())
        .then(() => {
            document.getElementById('task-form').reset();
            getTasks();
        })
        .catch(error => console.error('Error:', error));
}

function deleteTask(event) {
    event.preventDefault();
    const id = document.getElementById('delete-id').value;

    fetch(`http://localhost:3000/tasks?id=${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            document.getElementById('delete-form').reset();
            getTasks();
        })
        .catch(error => console.error('Error:', error));
}