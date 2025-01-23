"use strict";

import { functions } from "./tasksFunctions.js";
import { themeFunctions } from "./themeFunctions.js";

const addCategory = document.querySelector("#addCategory");
const inputCategoryName = document.querySelector("#categoryName");
let theme = JSON.parse(localStorage.getItem("theme"));

if(!theme) localStorage.setItem("theme", JSON.stringify("light"));

window.addEventListener('DOMContentLoaded', () => {
	// Show categories
	functions.showCategories();
	
	// Show theme
	themeFunctions.showTheme();

	// Add Category
	if(addCategory) {
		addCategory.addEventListener('click', () => {
			if(inputCategoryName) {
				inputCategoryName.value != "" ? functions.addCategory(inputCategoryName.value) : alert("Please, enter a category name");
			}			
		});
	}

	// Delete Category
	const deleteCategory = document.querySelectorAll(".deleteCategory");

	if(deleteCategory) {
		deleteCategory.forEach((button) => {
			button.addEventListener('click', functions.deleteCategory);
		});
	}
	
	// Add Task
	const addTask = document.querySelectorAll(".addTask");

	if(addTask) {
		addTask.forEach((button) => {			
			button.addEventListener('click', functions.addTask);
		});
	}

	// Delete Task
	const deleteTask = document.querySelectorAll(".deleteTask");

	if(deleteTask) {		
		deleteTask.forEach((button) => {			
			button.addEventListener('click', functions.deleteTask)
		});
	}
	
	// Save task
	const saveTask = document.querySelectorAll(".saveTask");

	if(saveTask) {
		saveTask.forEach((button) => {			
			button.addEventListener('click', functions.saveTaskDescription);
		});
	}

	// Edit task
	const editTask = document.querySelectorAll(".editTask");

	if(editTask) {
		editTask.forEach((button) => {			
			button.addEventListener('click', functions.editTaskDescription);
		});
	}

	// Finished task
	const finishedTask = document.querySelectorAll(".finishedTask");

	if(finishedTask) {
		finishedTask.forEach((button) => {			
			button.addEventListener('click', functions.markAsFinished	);
		});
	}

	// Change theme
	const darkModeBotton = document.querySelector("#darkMode");

	if(darkModeBotton) {
		darkModeBotton.addEventListener('click', themeFunctions.changeTheme);
		darkModeBotton.addEventListener('click', themeFunctions.showTheme);
	}
});
