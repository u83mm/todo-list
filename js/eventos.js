"use strict";

const addCategory = document.querySelector("#addCategory");

window.addEventListener('DOMContentLoaded', () => {
	if(addCategory) {
		addCategory.addEventListener('click', () => {
			console.log("click");
		});
	}
});
