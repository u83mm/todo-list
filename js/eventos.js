"use strict";

import { functions } from "./tasksFunctions.js";

const addCategory = document.querySelector("#addCategory");
const inputCategoryName = document.querySelector("#categoryName");

window.addEventListener('DOMContentLoaded', () => {
	// Show categories
	functions.showCategories();		

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
			button.addEventListener('click', () => {
				functions.deleteCategory(button.id);
			});
		});
	}
	
	// Add Task
	const addTask = document.querySelectorAll(".addTask");

	if(addTask) {
		addTask.forEach((button) => {			
			button.addEventListener('click', () => {
				functions.addTask(button.id);
			});
		});
	}

	// Delete Task
	const deleteTask = document.querySelectorAll(".deleteTask");

	if(deleteTask) {
		let taskName 	= null; 
		let category 	= null;
		let taskElement = null;

		deleteTask.forEach((button) => {			
			button.addEventListener('click', () => {
				functions.deleteTask(
					taskName 	= button.parentElement.previousElementSibling.textContent,
					category 	= button.parentElement.parentElement.parentElement.parentElement.firstElementChild.innerHTML,
					taskElement = button.parentElement.parentElement
				);
			})
		});
	}	
});
