const themeFunctions = {
    showTheme : function() {
        let theme = JSON.parse(localStorage.getItem("theme"));
        const body = document.body;
        const mainFormSection = document.querySelector("#category");
        const categories = document.querySelector("#categories").querySelectorAll("article");
        const darkModeIcon = document.querySelector(".darkModeIcon");               

        if(theme == "dark") {
            body.classList.add("darkMode");
            mainFormSection.classList.add("darkMode");
            darkModeIcon.classList.add("darkMode");

            mainFormSection.querySelector("form").classList.add("darkMode");

            categories.forEach((category) => {
                category.classList.add("darkMode");
            });
        }
        else {
            body.classList.remove("darkMode");
            mainFormSection.classList.remove("darkMode");
            darkModeIcon.classList.remove("darkMode");

            mainFormSection.querySelector("form").classList.remove("darkMode");

            categories.forEach((category) => {
                category.classList.remove("darkMode");
            });
        }

    },
    changeTheme : function() {        
        let theme = JSON.parse(localStorage.getItem("theme"));           
        
        if(theme == "light") {        
            this.parentElement.querySelector("h5").textContent = "Light Mode";
            localStorage.setItem("theme", JSON.stringify("dark"));            
        }
        else {
            localStorage.setItem("theme", JSON.stringify("light"));
            this.parentElement.querySelector("h5").textContent = "Dark Mode"; 
        }       
    }
}

export { themeFunctions };