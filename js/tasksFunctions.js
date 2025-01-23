import { themeFunctions } from "./themeFunctions.js";

const functions = {
    /**
     * Add a new category to the list of categories displayed on the webpage. 
     * @param {*} categoryName 
     */
    addCategory : (categoryName) => {
        const categories = document.querySelector("#categories");
        const newCategory = document.createElement("article");
        const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
        let theme = JSON.parse(localStorage.getItem("theme"));

        // Set elements theme
        if(theme == "dark") newCategory.classList.add("darkMode");

        // Test if the category already exists
        if(categoriesList.includes(categoryName)) {
            alert(`Category "${categoryName}" already exists`);
            return;
        }

        newCategory.innerHTML = `
            <h3>${categoryName}</h3>
            <form action="#" method="POST" onsubmit="return false">
                <input type="text" class="newTask" name="newTask" value="" placeholder="New task">
                <input type="submit" class="addTask" value="Add Task">                
                <input type="submit" class="deleteCategory" value="Delete Category">
            </form>
            <section class="tasksList" id="${categoryName.trim().replaceAll(" ", "")}"></section>`;
                
        categories.appendChild(newCategory);

        // Trim category field
        document.querySelector("#categoryName").value = "";

        // Add event listener to delete category button of the new category
        newCategory.querySelector(".deleteCategory").addEventListener("click", functions.deleteCategory);

        // Add event listener to add task button of the new category
        newCategory.querySelector(".addTask").addEventListener("click", functions.addTask);

        // Save category to localStorage        
        categoriesList.push(categoryName);
        localStorage.setItem("categories", JSON.stringify(categoriesList));
    },

    /** Delete a category from the list of categories displayed on the webpage */
    deleteCategory : function () {
        const categoryElement = this.parentElement.parentElement;           
        let category = categoryElement.querySelector("h3").textContent;                    
                                
        // If the user doesn't want to delete the category, return
        let response = confirm(`Are you sure you want to delete "${category}" category?`);
        if(!response) return;            
        
        // Delete tasks
        let tasksList = JSON.parse(localStorage.getItem("tasks")) || []; 

        for(let i = 0; i < tasksList.length; i++) {
            if(tasksList[i].category == category) {
                tasksList.splice(i, 1);
                i--;
            }
        }                                               

        localStorage.setItem("tasks", JSON.stringify(tasksList));

        // Delete category                   
        const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];            
        categoriesList.splice(categoriesList.indexOf(category), 1);        
        localStorage.setItem("categories", JSON.stringify(categoriesList));                    
        categoryElement.remove();            
    },

    /** Show all categories on the webpage */
    showCategories : () => {
        const categories = document.querySelector("#categories");
        const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
        const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];             
                        
        categoriesList.forEach((category) => {            
            const newCategory = document.createElement("article");
            newCategory.innerHTML = `
                <h3>${category}</h3>
                <form action="#" method="POST" onsubmit="return false">
                    <input type="text" class="newTask" name="newTask" value="" placeholder="New task">
                    <input type="submit" class="addTask" value="Add Task">                
                    <input type="submit" class="deleteCategory" value="Delete Category">
                </form>
                <section class="tasksList" id="${category.trim().replaceAll(" ", "")}"></section>`;
            categories.appendChild(newCategory);

            // Show tasks
            tasksList.forEach((task) => {                
                if(task.category == category) {                                        
                    const newTaskElement = document.createElement("article");
                    newTaskElement.classList.add("tasksListArticle");
                    newTaskElement.id = task.id;
    
                    newTaskElement.innerHTML = `
                        <h4>${task.name}</h4>
                        <input type="text" class="taskName" name="taskName" value="${task.name}">
                        <form action="#" method="POST" onsubmit="return false">
                            <textarea class="taskTextArea" rows="2" name="task" disabled>${task.description}</textarea>
                            <input type="button" class="saveTask" value="Save Task">
                            <input type="button" class="editTask" value="Edit Task">
                            <input type="button" class="finishedTask" value="Finished Task">
                            <input type="button" class="deleteTask" value="Delete Task">
                        </form><hr>`;
                    
                    document.getElementById(task.category.trim().replaceAll(" ", "")).appendChild(newTaskElement);                            

                    // Shows the textarea element based on its current state.
                    const textArea = newTaskElement.querySelector(".taskTextArea");

                    if(textArea.style.display == "none" || textArea.value != "") {
                        textArea.style.display = "inherit";
                    }
                    else {
                        textArea.style.display = "none";
                    } 
                    
                    // Mark task as finished
                    if(task.finished) {
                        newTaskElement.querySelector("h4").classList.add("striked");
                    }
                }                            
            });
        });
    },

    /** Add a new task to the list of tasks displayed on the webpage */
    addTask : function () {
        const categoryElement = this.parentElement.parentElement;                                                                                           
        const newTaskElement = document.createElement("article");
        let taskName = categoryElement.querySelector(".newTask").value;
        let theme = JSON.parse(localStorage.getItem("theme"));

        newTaskElement.classList.add("tasksListArticle");
        newTaskElement.id = Date.now();
        
        // Set elements theme
        if(theme == "dark") newTaskElement.classList.add("darkMode");
                                        
        if(!taskName) return alert("Please, enter a task");
        
        newTaskElement.innerHTML = `
            <h4>${taskName}</h4>
            <input type="text" class="taskName" name="taskName" value="${taskName}">
            <form action="#" method="POST" onsubmit="return false">
                <textarea class="taskTextArea" rows="2" name="task" disabled></textarea>
                <input type="button" class="saveTask" value="Save Task">
                <input type="button" class="editTask" value="Edit Task">
                <input type="button" class="finishedTask" value="Finished Task">
                <input type="button" class="deleteTask" value="Delete Task">
            </form>`;

        categoryElement.querySelector(".tasksList").appendChild(newTaskElement);        
        categoryElement.querySelector(".newTask").value = "";
        
        // Add event listener to delete task button        
        newTaskElement.querySelector(".deleteTask").addEventListener("click", functions.deleteTask);
        
        // Add event listener to save task button
        newTaskElement.querySelector(".saveTask").addEventListener("click", functions.saveTaskDescription)
        
        // Add event listener to edit task button
        newTaskElement.querySelector(".editTask").addEventListener("click", functions.editTaskDescription);

        // Add event listener to finished task button
        newTaskElement.querySelector(".finishedTask").addEventListener("click", functions.markAsFinished);

        // Save task to localStorage
        const task = {
            id: newTaskElement.id,           
            category: categoryElement.querySelector("h3").innerHTML,
            name: taskName,
            description: "",
            finished: false
        };      
       
        const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
        tasksList.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasksList));                
    },

    /** Delete a task from the list of tasks displayed on the webpage */
    deleteTask : function () {
        let taskElement = this.parentElement.parentElement;        
        const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];               

        for(let i = 0; i < tasksList.length; i++) {
            if(tasksList[i].id == taskElement.id) {
                // If the user doesn't want to delete the task, return
                let response = confirm(`Are you sure you want to delete "${tasksList[i].name}" task?`);
                if(!response) return;

                tasksList.splice(i, 1);
                i--;
            }
        }

        localStorage.setItem("tasks", JSON.stringify(tasksList));        
        taskElement.remove();                         
    },
           
    /** Save the description of a task */
    saveTaskDescription : function() {
        let taskElement = this.parentElement.parentElement;
        let textArea = taskElement.querySelector("textarea");                                
        let taskDescription = textArea.value;        
        let currentTask = taskElement.id;
        let newTaskName = taskElement.querySelector(".taskName").value;                       

        let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

        tasksList.forEach((task) => {                           
            if(task.id == currentTask) {
                task.description = taskDescription;
                task.name = newTaskName;
            }
        });

        // Disable the textarea
        textArea.disabled = true;
        textArea.style.backgroundColor = "#ebe8e8"

        // Hide the edit task name field and shows the current task name
        taskElement.querySelector(".taskName").style.display = "none";
        taskElement.querySelector("h4").innerHTML = newTaskName;
        taskElement.querySelector("h4").style.display = "inherit";


        // Hide the textarea if it's empty
        if(taskDescription == "") this.previousElementSibling.style.display = "none";
        
        localStorage.setItem("tasks", JSON.stringify(tasksList));        
    },

    /** Edit the description of a task */
    editTaskDescription : function() {
        const taskElement = this.parentElement.parentElement;
        const taskTextArea = taskElement.querySelector(".taskTextArea");               
        const display = taskTextArea.style.display;
        const editTaskNameField = taskElement.querySelector(".taskName");
        const taskNameElement = taskElement.querySelector("h4");        

        // Shows the textarea element based on its current state.
        if(display == "" || display == "none" || taskTextArea.value != "") {
            taskTextArea.style.display = "inherit";            
        }
        else {
            taskTextArea.style.display = "none";            
        }

        // Shows the editTaskNameField element based on its current state.
        editTaskNameField.style.display == "inherit" ? editTaskNameField.style.display = "none" : editTaskNameField.style.display = "inherit";
        taskNameElement.style.display == "none" ? taskNameElement.style.display = "inherit" : taskNameElement.style.display = "none";
                

        taskTextArea.disabled ? taskTextArea.disabled = false : taskTextArea.disabled = true;
        taskTextArea.disabled ? taskTextArea.style.backgroundColor = "#ebe8e8" : taskTextArea.style.backgroundColor = "white";
        taskTextArea.focus();        
    },

    /** Mark a task as finished */
    markAsFinished : function() {
        let taskElement = this.parentElement.parentElement;
        let taskNameElement = taskElement.querySelector("h4");
                             
        const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

        taskNameElement.classList.contains("striked") ? taskNameElement.classList.remove("striked") : taskNameElement.classList.add("striked");
        
        tasksList.forEach((task) => {
            if(task.id == taskElement.id) {
                task.finished = !task.finished;
            }
        });
       
        localStorage.setItem("tasks", JSON.stringify(tasksList));                                        
    }    
}

export { functions };