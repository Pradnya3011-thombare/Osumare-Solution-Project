document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  const taskNameInput = document.getElementById('task-name');

  // Fetch tasks from the server
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    taskList.innerHTML = '';
    tasks.forEach(task => addTaskToDOM(task));
  };

  // Add a task to the DOM
  const addTaskToDOM = (task) => {
    const li = document.createElement('li');
    li.textContent = task.name;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = async () => {
      await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
      });
      li.remove();
    };
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  };

  // Handle form submission
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskName = taskNameInput.value;
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: taskName }),
    });
    const newTask = await response.json();
    addTaskToDOM(newTask);
    taskNameInput.value = '';
  });

  // Initial fetch of tasks
  fetchTasks();
});
