const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => editTask(index);

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Mark as Incomplete" : "Mark as Complete";
        completeBtn.className = "complete-btn";
        completeBtn.onclick = () => toggleTask(index);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete-btn";
        delBtn.onclick = (e) => {
          e.stopPropagation();
          deleteTask(index);
        };

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(completeBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
      });
    }

    function addTask() {
      const text = taskInput.value.trim();
      if (!text) return;
      tasks.push({ text, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }

    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }

    function editTask(index) {
      const task = tasks[index];
      const li = taskList.children[index];
      const taskSpan = li.querySelector(".task-text");

      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;
      input.className = "edit-input";

      input.onblur = () => {
        const updatedText = input.value.trim();
        if (updatedText && updatedText !== task.text) {
          tasks[index].text = updatedText;
          saveTasks();
          renderTasks();
        }
      };

      input.onkeydown = (e) => {
        if (e.key === "Enter") {
          const updatedText = input.value.trim();
          if (updatedText && updatedText !== task.text) {
            tasks[index].text = updatedText;
            saveTasks();
            renderTasks();
          }
        }
      };

      taskSpan.innerHTML = "";
      taskSpan.appendChild(input);
      input.focus();
    }

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") addTask();
    });

    renderTasks();