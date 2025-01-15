const functions = {
    /**
     * Add a new category to the list of categories displayed on the webpage. 
     * @param {*} categoryName 
     */
    addCategory : (categoryName) => {
        const categories = document.querySelector("#categories");
        const newCategory = document.createElement("article");
        const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];

        // Test if the category already exists
        if(categoriesList.includes(categoryName)) {
            alert(`Category "${categoryName}" already exists`);
            return;
        }

        newCategory.innerHTML = `
            <h3>${categoryName}</h3>
            <form action="#" method="POST" onsubmit="return false">
                <input type="text" name="newTask" value="" placeholder="New task">
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
        let category = this.parentElement.previousElementSibling.textContent;              
                                
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
        const categoryElement = this.closest("article");           
        const categoriesList = JSON.parse(localStorage.getItem("categories")) || []            
        categoriesList.splice(categoriesList.indexOf(this.id), 1);
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
                    <input type="text" name="newTask" value="" placeholder="New task">
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
                        <form action="#" method="POST" onsubmit="return false">
                            <textarea class="taskTextArea" rows="2" name="task" disabled>${task.description}</textarea>
                            <input type="button" class="saveTask" value="Save Task">
                            <input type="button" class="editTask" value="Edit Task">
                            <input type="button" class="finishedTask" value="Finished Task">
                            <input type="button" class="deleteTask" value="Delete Task">
                        </form><hr>`;
                    
                    document.getElementById(task.category.trim().replaceAll(" ", "")).appendChild(newTaskElement);
                    
                    // Mark task as finished
                    if(task.finished) {
                        newTaskElement.firstElementChild.classList.add("striked");
                    }
                }                            
            });
        });
    },

    /** Add a new task to the list of tasks displayed on the webpage */
    addTask : function () {                                                                                      
        const newTaskElement = document.createElement("article");
        newTaskElement.classList.add("tasksListArticle");
        newTaskElement.id = Date.now();        
        let taskName = this.previousElementSibling.value;                 
        
        if(!taskName) return alert("Please, enter a task");
        
        newTaskElement.innerHTML = `
            <h4>${taskName}</h4>
            <form action="#" method="POST" onsubmit="return false">
                <textarea class="taskTextArea" rows="2" name="task" disabled></textarea>
                <input type="button" class="saveTask" value="Save Task">
                <input type="button" class="editTask" value="Edit Task">
                <input type="button" class="finishedTask" value="Finished Task">
                <input type="button" class="deleteTask" value="Delete Task">
            </form>`;

        this.parentElement.nextElementSibling.appendChild(newTaskElement);
        this.previousElementSibling.value = "";
        
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
            category: this.parentElement.previousElementSibling.innerHTML,
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
                tasksList.splice(i, 1);
                i--;
            }
        }

        localStorage.setItem("tasks", JSON.stringify(tasksList));        
        taskElement.remove();                         
    },
           
    /** Save the description of a task */
    saveTaskDescription : function() {                              
        let taskDescription = this.previousElementSibling.value;        
        let currentTask = this.parentElement.parentElement.id;                 

        let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

        tasksList.forEach((task) => {                           
            if(task.id == currentTask) {
                task.description = taskDescription;
            }
        });

        // Disable the textarea
        this.previousElementSibling.disabled = true;
        this.previousElementSibling.style.backgroundColor = "#ebe8e8"
        
        localStorage.setItem("tasks", JSON.stringify(tasksList));        
    },

    /** Edit the description of a task */
    editTaskDescription : function() {
        const disabled = this.parentElement.firstElementChild;        
        
        disabled.disabled ? disabled.disabled = false : disabled.disabled = true;
        disabled.disabled ? disabled.style.backgroundColor = "#ebe8e8" : disabled.style.backgroundColor = "white";
        this.parentElement.firstElementChild.focus();        
    },

    /** Mark a task as finished */
    markAsFinished : function() {
        let currentClass = this.parentElement.previousElementSibling.classList;        
        let currentElement = this.parentElement.previousElementSibling.parentElement;
        const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

        currentClass.contains("striked") ? currentClass.remove("striked") : currentClass.add("striked");
        
        tasksList.forEach((task) => {
            if(task.id == currentElement.id) {
                task.finished = !task.finished;
            }
        });
       
        localStorage.setItem("tasks", JSON.stringify(tasksList));                                        
    }
}

export { functions };