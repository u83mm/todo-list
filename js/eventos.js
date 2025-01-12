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
				inputCategoryName.value != "" ? functions.addCategory(inputCategoryName.value) : alert("No se ha introducido ninguna categoría");
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
});
