<!DOCTYPE html>
<html>
<head>
    <title>Todo List App</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }

        .container {
            background: white;
            width: 400px;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 0 10px gray;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        .input-section {
            display: flex;
            gap: 10px;
        }

        input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            padding: 10px 15px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        ul {
            padding: 0;
            list-style: none;
        }

        li {
            background: #eee;
            padding: 12px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
        }

        .task-name {
            cursor: pointer;
        }

        .completed {
            text-decoration: line-through;
            color: gray;
        }

        .delete {
            background-color: red;
        }
    </style>

</head>

<body>

    <div class="container">

        <h1>My Todo List</h1>

        <div class="input-section">

            <input type="text" id="taskInput"
                   placeholder="Enter your task">

            <button onclick="addTask()">Add</button>

        </div>

        <ul id="taskList"></ul>

    </div>

    <script>

        // Get tasks from LocalStorage
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Add Task
        function addTask() {

            let input = document.getElementById("taskInput");

            let taskName = input.value.trim();

            if (taskName === "") {
                alert("Please enter a task");
                return;
            }

            tasks.push({
                name: taskName,
                completed: false
            });

            input.value = "";

            saveTasks();
        }

        // Display Tasks
        function displayTasks() {

            let taskList = document.getElementById("taskList");

            taskList.innerHTML = "";

            tasks.forEach(function(task, index) {

                let li = document.createElement("li");

                let span = document.createElement("span");

                span.textContent = task.name;

                span.className = "task-name";

                // Mark completed
                if (task.completed) {
                    span.classList.add("completed");
                }

                span.addEventListener("click", function() {

                    tasks[index].completed = !tasks[index].completed;

                    saveTasks();

                });

                // Delete Task
                let deleteBtn = document.createElement("button");

                deleteBtn.textContent = "Delete";

                deleteBtn.className = "delete";

                deleteBtn.addEventListener("click", function() {

                    tasks.splice(index, 1);

                    saveTasks();

                });

                li.appendChild(span);

                li.appendChild(deleteBtn);

                taskList.appendChild(li);

            });
        }

        // Save Tasks
        function saveTasks() {

            localStorage.setItem("tasks", JSON.stringify(tasks));

            displayTasks();

        }

        // Load tasks when page opens
        displayTasks();

    </script>

</body>
</html>
