document.getElementById('add-todo').addEventListener('click', function() {
    
    const newTask = document.getElementById('todo-input').value.trim();
    if (newTask=='') {
        alert("Enter a task");
        return;
    }
    
    const newTodo = document.createElement('li');
    const task = document.createElement('span');
    task.textContent = newTask;
    
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox'; 
    checkBox.addEventListener('click',function() {
        task.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
    })
    
    const updateBtn = document.createElement('button')
    updateBtn.textContent = '&#128393';
    updateBtn.addEventListener('click',function() {
        const currentTask = task.textContent;
        const updatedTask = prompt('Update task',currentTask);
        if(updatedTask!='') {
            task.textContent = updatedTask;
        }
    })
    
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = '\u1F5D1';
    deleteBtn.addEventListener('click',function() {
        newTodo.remove();
    })

    newTodo.appendChild(checkBox)
    newTodo.appendChild(task)
    newTodo.appendChild(updateBtn)
    newTodo.appendChild(deleteBtn)

    document.getElementById('todo-list').appendChild(newTodo)

    document.getElementById('todo-input').value=''
})