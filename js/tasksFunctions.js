const functions = {
    /**
     * Add a new category to the list of categories displayed on the webpage. 
     * @param {*} categoryName 
     */
    addCategory : (categoryName) => {
        const categories = document.querySelector("#categories");
        const newCategory = document.createElement("article");

        newCategory.innerHTML = `
            <h3>${categoryName}</h3>
            <form action="#" method="POST" onsubmit="return false">
                <input type="text" name="newTask" value="" placeholder="New task">
                <input id="${categoryName.trim().replaceAll(" ", "")}AddTask" type="submit" class="addTask" value="Add Task">                
                <input id="${categoryName.trim().replaceAll(" ", "")}" type="submit" class="deleteCategory" value="Delete Category">
            </form>
            <section class="tasksList" id="tasksList${categoryName.trim().replaceAll(" ", "")}AddTask"></section>`;
                
        categories.appendChild(newCategory);

        // Trim category field
        document.querySelector("#categoryName").value = "";

        // Add event listener to delete category button of the new category
        newCategory.querySelector(".deleteCategory").addEventListener("click", () => {
            functions.deleteCategory(categoryName.trim().replaceAll(" ", ""));
        });

        // Add event listener to add task button of the new category
        newCategory.querySelector(".addTask").addEventListener("click", () => {
            functions.addTask(categoryName.trim().replaceAll(" ", "") + "AddTask");
        });

        // Save category to localStorage
        const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
        categoriesList.push(categoryName);
        localStorage.setItem("categories", JSON.stringify(categoriesList));
    },

    /**
     * Delete a category from the list of categories displayed on the webpage
     * @param {*} id 
     */
    deleteCategory : (id) => {            
        if(id) {
            let category = document.querySelector("#" + id).parentElement.previousElementSibling.textContent;  
                                
            // If the user doesn't want to delete the category, return
            let response = confirm("Are you sure you want to delete this category?");
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
            const categoryElement = document.querySelector("#" + id).closest("article");            
            const categoriesList = JSON.parse(localStorage.getItem("categories")) || []            
            categoriesList.splice(categoriesList.indexOf(id), 1);
            localStorage.setItem("categories", JSON.stringify(categoriesList));            
            
            categoryElement.remove();
        }             
    },

    /**
     * Show all categories on the webpage
     */
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
                    <input id="${category.trim().replaceAll(" ", "")}AddTask" type="submit" class="addTask" value="Add Task">                
                    <input id="${category.trim().replaceAll(" ", "")}" type="submit" class="deleteCategory" value="Delete Category">
                </form>
                <section class="tasksList" id="tasksList${category.trim().replaceAll(" ", "")}AddTask"></section>`;
            categories.appendChild(newCategory);

            tasksList.forEach((task) => {                
                if(task.category == category) {                                        
                    const newTaskElement = document.createElement("article");
                    newTaskElement.classList.add("tasksListArticle");
    
                    newTaskElement.innerHTML = `
                        <h4>${task.name}</h4>
                        <form action="#" method="POST" onsubmit="return false">
                            <textarea id="taskTextArea" class="taskTextArea" rows="2" name="task"></textarea>
                            <input type="button" class="editTask" value="Edit Task">
                            <input type="button" class="deleteTask" value="Delete Task">
                        </form>`;
                    
                    document.getElementById("tasksList" + task.category.trim().replaceAll(" ", "") + "AddTask").appendChild(newTaskElement);                   
                }                            
            });
        });
    },

    addTask : (id) => {                                      
        //const addTasksButton = document.querySelector("#" + id);                   
        const addTasksButton = document.querySelector("#" + id);        
        const newTaskElement = document.createElement("article");
        newTaskElement.classList.add("tasksListArticle");        
        let taskName = addTasksButton.previousElementSibling.value;        
        
        if(!taskName) return alert("Please, enter a task");
        
        newTaskElement.innerHTML = `
            <h4>${taskName}</h4>
            <form action="#" method="POST" onsubmit="return false">
                <textarea id="taskTextArea" class="taskTextArea" rows="2" name="task"></textarea>
                <input type="button" class="editTask" value="Edit Task">
                <input type="button" class="deleteTask" value="Delete Task">
            </form>`;

        document.querySelector("#tasksList" + id).appendChild(newTaskElement);
        addTasksButton.previousElementSibling.value = "";
        
        // Add event listener to delete task button
        newTaskElement.querySelector(".deleteTask").addEventListener("click", () => {
            functions.deleteTask(
                newTaskElement.firstElementChild.innerHTML,
                addTasksButton.parentElement.previousElementSibling.textContent,
                newTaskElement
            );
        });        

        // Save task to localStorage
        const task = {            
            category: addTasksButton.parentElement.previousElementSibling.innerHTML,
            name: taskName
        };
       
        const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
        tasksList.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasksList));                
    },

    deleteTask : (taskName, category, taskElement) => {         
        const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

        for(let i = 0; i < tasksList.length; i++) {
            if(tasksList[i].name == taskName && tasksList[i].category == category) {
                tasksList.splice(i, 1);
                i--;
            }
        }

        localStorage.setItem("tasks", JSON.stringify(tasksList));
        
        taskElement.remove();                         
    },
    
    // Show tasks by category
    showTasks : () => {
        const tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
        tasksList.forEach((task) => {
            const taskElement = document.querySelector("#tasksList" + task.category + "AddTask");
            const newTaskElement = document.createElement("article");
            newTaskElement.classList.add("tasksListArticle");
            newTaskElement.innerHTML = `
                <h4>${task.name}</h4>
                <form action="#" method="POST" onsubmit="return false">
                    <textarea id="taskTextArea" class="taskTextArea" rows="2" name="task"></textarea>
                    <input type="button" class="editTask" value="Edit Task">
                    <input type="button" class="deleteTask" value="Delete Task">
                </form>`;
            taskElement.appendChild(newTaskElement);
        });
    }
}

export { functions };