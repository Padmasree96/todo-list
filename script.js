let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");

    li.innerHTML = `
      <div class="task-details">
        <strong>${task.title}</strong><br>
        Due: ${task.dueDate} | Priority: ${task.priority}
      </div>
      <div class="task-actions">
        <button class="complete" onclick="toggleComplete(${index})">✔</button>
        <button class="edit" onclick="editTask(${index})">✎</button>
        <button class="delete" onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  if (title === "") {
    alert("Task title cannot be empty.");
    return;
  }

  tasks.push({ title, dueDate, priority, completed: false });
  saveTasks();
  renderTasks();

  // Clear input fields
  document.getElementById("taskTitle").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("priority").value = "medium";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function editTask(index) {
  const newTitle = prompt("Edit task title:", tasks[index].title);
  if (newTitle !== null && newTitle.trim() !== "") {
    tasks[index].title = newTitle.trim();
    saveTasks();
    renderTasks();
  }
}

// Render tasks on initial load
renderTasks();
