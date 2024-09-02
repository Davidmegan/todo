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
    task.setAttribute('data-full-text', newTask);
    
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = isCompleted;
    task.style.textDecoration = checkBox.checked ? 'line-through' : 'none'; 
    checkBox.addEventListener('click',function() {
        task.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
        saveTodos();
    })
    
    const updateBtn = document.createElement('button')
    updateBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1.5rem" height="1.25rem" viewBox="0 0 40 40"><path fill="#E57373" d="M42.583,9.067l-3.651-3.65c-0.555-0.556-1.459-0.556-2.015,0l-1.718,1.72l5.664,5.664l1.72-1.718C43.139,10.526,43.139,9.625,42.583,9.067"></path><path fill="#FF9800" d="M4.465 21.524H40.471999999999994V29.535H4.465z" transform="rotate(134.999 22.469 25.53)"></path><path fill="#B0BEC5" d="M34.61 7.379H38.616V15.392H34.61z" transform="rotate(-45.02 36.61 11.385)"></path><path fill="#FFC107" d="M6.905 35.43L5 43 12.571 41.094z"></path><path fill="#37474F" d="M5.965 39.172L5 43 8.827 42.035z"></path></svg>';
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