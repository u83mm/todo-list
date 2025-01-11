const functions = {
    addCategory : (categoryName) => {
        const categories = document.querySelector("#categories");
        const newCategory = document.createElement("article");

        newCategory.innerHTML = `
            <h3>${categoryName}</h3>
            <form action="#" method="POST" onsubmit="return false">
                <input type="text" name="newTask" value="" placeholder="New task">
                <input type="submit" class="addTask" value="Add Task">                
                <input type="submit" class="deleteCategory" value="Delete Category">
            </form>`;
        
        newCategory.id = categoryName.trim().replaceAll(" ", "");
        categories.appendChild(newCategory);

        // Trim category field
        document.querySelector("#categoryName").value = "";

        // Add event listener to delete category button
        newCategory.querySelector(".deleteCategory").addEventListener("click", () => {
            functions.deleteCategory();
        });

        // Save category to localStorage
        const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
        categoriesList.push(categoryName);
        localStorage.setItem("categories", JSON.stringify(categoriesList));
    },

    deleteCategory : () => {
        //! Improve this function
        const categoryElement = event.target.closest("article");
        const categoryName = categoryElement.querySelector("h3").textContent;
        const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
        categoriesList.splice(categoriesList.indexOf(categoryName), 1);
        localStorage.setItem("categories", JSON.stringify(categoriesList));
        categoryElement.remove();

        
        /* const categories = document.querySelector("#categories");
        const categoryName = categories.querySelector("h3").textContent;        
        const categoriesList = JSON.parse(localStorage.getItem("categories")) || [];
        categoriesList.splice(categoriesList.indexOf(categoryName), 1);
        localStorage.setItem("categories", JSON.stringify(categoriesList));                
        categories.removeChild(categories.querySelector("#" + categoryName)); */
    },

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
                    <input type="submit" class="deleteCategory" value="Delete Category">
                </form>`;
            categories.appendChild(newCategory);
        });
    }
}

export { functions };