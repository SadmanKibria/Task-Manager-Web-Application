document.addEventListener("DOMContentLoaded", function () {
    const taskTitleInput = document.getElementById("taskTitle");
    const taskDescriptionInput = document.getElementById("taskDescription");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const filterAllButton = document.getElementById("filterAll");
    const filterCompletedButton = document.getElementById("filterCompleted");
    const filterActiveButton = document.getElementById("filterActive");
    const filterDeletedButton = document.getElementById("filterDeleted");

    let tasks = [];

    addTaskButton.addEventListener("click", function () {
        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();

        if (title === "") return;

        const task = {
            id: Date.now(),
            title,
            description,
            completed: false,
            deleted: false, // Added deleted property
        };

        tasks.push(task);
        renderTasks();
        taskTitleInput.value = "";
        taskDescriptionInput.value = "";
    });

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("complete")) {
            const taskId = parseInt(e.target.getAttribute("data-id"));
            const task = tasks.find((t) => t.id === taskId);
            task.completed = !task.completed;
            renderTasks();
        } else if (e.target.classList.contains("delete")) {
            const taskId = parseInt(e.target.getAttribute("data-id"));
            const task = tasks.find((t) => t.id === taskId);
            task.deleted = true; // Mark task as deleted
            renderTasks();
        }
    });

    filterAllButton.addEventListener("click", function () {
        renderTasks();
    });

    filterCompletedButton.addEventListener("click", function () {
        const completedTasks = tasks.filter((task) => task.completed && !task.deleted);
        renderTasks(completedTasks);
    });

    filterActiveButton.addEventListener("click", function () {
        const activeTasks = tasks.filter((task) => !task.completed && !task.deleted);
        renderTasks(activeTasks);
    });

    filterDeletedButton.addEventListener("click", function () {
        const deletedTasks = tasks.filter((task) => task.deleted);
        renderTasks(deletedTasks);
    });

    function renderTasks(filteredTasks = tasks) {
        taskList.innerHTML = "";

        for (const task of filteredTasks) {
            const li = document.createElement("li");
            li.className = `list-group-item ${task.completed ? 'completed' : ''} ${task.deleted ? 'deleted' : ''}`;
            li.innerHTML = `
                <span>${task.title}</span>
                ${task.deleted ? `<button class="btn btn-warning restore" data-id="${task.id}">Restore</button>` :
                              `<button class="btn btn-success complete" data-id="${task.id}">${task.completed ? "Uncomplete" : "Complete"}</button>`}
                <button class="btn btn-danger delete" data-id="${task.id}">Delete</button>
            `;
            taskList.appendChild(li);

            if (task.deleted) {
                const restoreButton = li.querySelector(".restore");
                restoreButton.addEventListener("click", function () {
                    task.deleted = false;
                    renderTasks(filteredTasks);
                });
            }
        }
    }

    renderTasks();
});
