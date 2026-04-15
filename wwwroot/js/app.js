const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const API = "/api/tasks";

async function loadTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${task.name}
            <button onclick="deleteTask(${task.id})">X</button>
        `;

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", async () => {
    const name = taskInput.value.trim();

    if (!name) return;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    taskInput.value = "";
    loadTasks();
});

async function deleteTask(id) {
    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();