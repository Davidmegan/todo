function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        addTodosToDOM(todo.task, todo.isCompleted)
    });
}

function saveTodos() {
    const todos = []
    document.querySelectorAll('#todo-list li').forEach(todo => {
        todos.push({
            task: todo.querySelector('span').textContent,
            isCompleted: todo.querySelector('input[type="checkBox"]').checked
        })
    })
    localStorage.setItem('todos',JSON.stringify(todos));
}

function addTodosToDOM(newTask,isCompleted=false) {
    const newTodo = document.createElement('li');
    const task = document.createElement('span');
    task.textContent = newTask;
    
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = isCompleted;
    task.style.textDecoration = checkBox.checked ? 'line-through' : 'none'; 
    checkBox.addEventListener('click',function() {
        task.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
        saveTodos();
    })
    
    const updateBtn = document.createElement('button')
    updateBtn.innerHTML = '&#128393;';
    updateBtn.style.color = 'lightblue';
    updateBtn.style.fontSize = '1.25rem';
    updateBtn.addEventListener('click',function() {
        const currentTask = task.textContent;
        const updatedTask = prompt('Update task',currentTask);
        if(updatedTask.trim()!='' && updatedTask!=null) {
            task.textContent = updatedTask;
        }
        saveTodos();
    })
    
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '&#10060;';
    deleteBtn.style.fontSize = '1rem'
    deleteBtn.addEventListener('click',function() {
        newTodo.remove();
        saveTodos();
    })

    newTodo.appendChild(checkBox)
    newTodo.appendChild(task)
    newTodo.appendChild(updateBtn)
    newTodo.appendChild(deleteBtn)

    document.getElementById('todo-list').appendChild(newTodo)
}

document.getElementById('add-todo').addEventListener('click', function() {
    
    const newTask = document.getElementById('todo-input').value.trim();
    if (newTask=='') {
        alert("Enter a task");
        return;
    }
    addTodosToDOM(newTask);
    saveTodos();
    document.getElementById('todo-input').value='';
})

document.addEventListener('DOMContentLoaded',loadTodos)