// mealDisplay.js

import { getMultipleRandomMeals } from './mealApi.js';

// Function to display meals in the targetElement
export async function displayMeals(meals, targetElement) {
    let cartoona = "";

    meals.forEach((meal) => {
        cartoona += `
                <div class="relative w-full sm:w-60 h-60 m-2">
                    <input type="hidden" class="meal-id" value="${meal.id}">
                    <div class="group">
                         <img src="${meal.image}" alt="${meal.name}" class="w-full h-full object-cover rounded">
                        <div class="layer rounded bg-gray-300 absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <h2 class="text-2xl text-black p-5">${meal.name}</h2>
                        </div>
                    </div>
                </div>





        `;
    });

    targetElement.innerHTML = cartoona;

    // Add event listener to each meal element
    targetElement.querySelectorAll('.relative').forEach((mealElement) => {
        mealElement.addEventListener('click', () => {
            const mealIdInput = mealElement.querySelector('.meal-id');
            if (mealIdInput) {
                const mealId = mealIdInput.value;
                console.log('Clicked on meal with ID:', mealId);
                displayDetails(mealId, targetElement);
            }
        });
    });
}

let body = document.getElementById('body');

// Function to display meal details
export async function displayDetails(id) {
    const mealDetails = await detailsFetch(id);
    console.log('Meal details:', mealDetails);

    if (!mealDetails || !mealDetails.meals || mealDetails.meals.length === 0) {
        console.log('Meal details not found.');
        return;
    }

    const meal = mealDetails.meals[0];
    const truncatedInstructions = truncateText(meal.strInstructions, 500);

    const Container = `
        <section id="contact-form-container" class="py-1 bg-blueGray-50">
            <div class="detail flex flex-col sm:flex-row justify-between m-7 z-40 relative">
                <div class="left w-full sm:w-1/3 bg-black z-40 mb-4 sm:mb-0">      
                    <div class="logo py-2 px-2 m-4">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-full object-cover rounded">
                    </div>
                </div>
                <div class="right w-full sm:w-2/3 bg-blue-700 p-10">
                    <article class="prose lg:prose-xl">
                        <h3>${meal.strMeal}</h3>
                        <p class="truncate-20">${truncatedInstructions}</p>
                    </article>
                    <h3 class="text-3xl font-bold">Ingredients:</h3>
                    <ul class="ing">
                        ${getIngredientsList(meal)}
                    </ul>
                    <div class="mt-8 button">
                        <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer" class="mt-8 bg-red-500 hover:bg-red-700 font-bold rounded p-3 px-5 my-5 text-center">Youtube</a>
                    </div>
                </div>
                <div class="close absolute top-10 right-10">
                    <button id="close-x" class="bg-yellow-600 rounded p-1 px-3 my-4 w-28">Close</button>
                </div>
            </div>
        </section>
    `;

    body.innerHTML = Container;
    setupCloseButton();
}

// Fetch meal details by ID
export async function detailsFetch(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Get ingredients list for the meal
export function getIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList += `<span class="bg px-3">${measure} ${ingredient}</span>`;
        }
    }
    return ingredientsList;
}

// Truncate text to a specified limit
export function truncateText(text, limit) {
    if (text.length > limit) {
        return text.substring(0, limit) + '...';
    }
    return text;
}

// Setup event listener for the close button
export function setupCloseButton() {
    const closeButton = document.getElementById('close-x');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log('Close button clicked');
            const formContainer = document.getElementById('contact-form-container');
            if (formContainer) {
                formContainer.style.display = 'none';
                // Optionally, redirect after closing the details
                window.location.href = 'https://cosmasalor.github.io/Yummy/';
            }
        });
    }
}
