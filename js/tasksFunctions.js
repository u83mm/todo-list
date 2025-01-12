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
                <input type="submit" class="addTask" value="Add Task">                
                <input id="${categoryName.trim().replaceAll(" ", "")}" type="submit" class="deleteCategory" value="Delete Category">
            </form>`;
                
        categories.appendChild(newCategory);

        // Trim category field
        document.querySelector("#categoryName").value = "";

        // Add event listener to delete category button of the new category
        newCategory.querySelector(".deleteCategory").addEventListener("click", () => {
            functions.deleteCategory(categoryName.trim().replaceAll(" ", ""));
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
            // If the user doesn't want to delete the category, return
            let response = confirm("Are you sure you want to delete this category?");
            if(!response) return;

            const categoryElement = document.querySelector("#" + id).closest("article");            
            const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];

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
        categoriesList.forEach((category) => {
            const newCategory = document.createElement("article");
            newCategory.innerHTML = `
                <h3>${category}</h3>
                <form action="#" method="POST" onsubmit="return false">
                    <input type="text" name="newTask" value="" placeholder="New task">
                    <input type="submit" class="addTask" value="Add Task">                
                    <input id="${category.trim().replaceAll(" ", "")}" type="submit" class="deleteCategory" value="Delete Category">
                </form>`;
            categories.appendChild(newCategory);
        });
    }
}

export { functions };