// import { getMultipleRandomMeals } from './mealApi.js';
// import { displayMeals, displayDetails } from './mealDisplay.js';
// import { displaySearchForm, searchAlpha } from './search.js';
// import { displayContactForm } from './contactForm.js';
// import { fetchCategories, displayCategory } from './category.js';
// import { fetchArea, displayArea } from './area.js';
// import { fetchIngredients, displayIngredients } from './ingredient.js';

// document.addEventListener('DOMContentLoaded', async () => {
//     const rowData = document.getElementById("rowData");

//     // Fetch categories when DOM is loaded
//     let categories;
//     try {
//         categories = await fetchCategories();
//         console.log('Fetched categories:', categories);
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         categories = []; // Assign empty array if fetching fails
//     }

//     getMultipleRandomMeals(20)
//         .then(meals => {
//             if (meals.length > 0) {
//                 displayMeals(meals, rowData);
//             } else {
//                 console.log("Failed to fetch meals.");
//             }
//         })
//         .catch(error => console.error("Error in fetching meals:", error));

//     $('a[href="#contact"]').on('click', function(e) {
//         e.preventDefault();
//         displayContactForm();
//         console.log('Clicked on contact link');
//     });

//     $('a[href="#search"]').on('click', function(e) {
//         e.preventDefault();
//         searchAlpha();
//         displaySearchForm();
//         console.log('Clicked on search link');
//     });

//     $('a[href="#detail"]').on('click', function(e) {
//         e.preventDefault();
//         displayDetails();
//         console.log('Clicked on detail link');
//     });

//     $('a[href="#category"]').on('click', function(e) {
//         e.preventDefault();
//         displayCategory(categories); // Pass fetched categories to displayCategory function
//         console.log('Clicked on category link');
//     });
    
//     $('a[href="#area"]').on('click', async function(e) {
//         e.preventDefault();
//         try {
//             const area = await fetchArea(); // Fetch categories and wait for the response
//             displayArea(area); // Pass fetched categories to displayArea function
//             console.log('Clicked on area link');
//         } catch (error) {
//             console.error('Error fetching or displaying area:', error);
//         }
//     });

//     $('a[href="#Ingredients"]').on('click', async function(e) {
//         e.preventDefault();
//         try {
//             const Ingredients = await fetchIngredients(); // Fetch categories and wait for the response
//             displayIngredients(Ingredients); // Pass fetched categories to displayArea function
//             console.log('Clicked on aingreadientrea link');
//         } catch (error) {
//             console.error('Error fetching or displaying area:', error);
//         }
//     });
    
// });


import { getMultipleRandomMeals } from './mealApi.js';
import { displayMeals, displayDetails } from './mealDisplay.js';
import { displaySearchForm, searchAlpha } from './search.js';
import { displayContactForm } from './contactForm.js';
import { fetchCategories, displayCategories } from './category.js';
import { fetchArea, displayArea } from './area.js';
import { fetchIngredients, displayIngredients } from './ingredient.js';

document.addEventListener('DOMContentLoaded', async () => {
    const rowData = document.getElementById("rowData");
    const spinner = document.getElementById('spinner');

    // Show spinner
    spinner.style.display = 'flex';
    rowData.style.display = 'none';

    // Fetch categories when DOM is loaded
    let categories;
    try {
        categories = await fetchCategories();
        console.log('Fetched categories:', categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        categories = []; // Assign empty array if fetching fails
    } finally {
        // Hide spinner and show categories
        spinner.style.display = 'none';
        rowData.style.display = 'grid';
    }

    getMultipleRandomMeals(20)
        .then(meals => {
            if (meals.length > 0) {
                displayMeals(meals, rowData);
            } else {
                console.log("Failed to fetch meals.");
            }
        })
        .catch(error => console.error("Error in fetching meals:", error));

    $('a[href="#contact"]').on('click', function(e) {
        e.preventDefault();
        displayContactForm();
        console.log('Clicked on contact link');
        $('#menu').toggleClass('-ms-44');
    });

    $('a[href="#search"]').on('click', function(e) {
        e.preventDefault();
        searchAlpha();
        displaySearchForm();
        $('#menu').toggleClass('-ms-44');
        console.log('Clicked on search link');
    });

    $('a[href="#detail"]').on('click', function(e) {
        e.preventDefault();
        displayDetails();
        $('#menu').toggleClass('-ms-44');
        console.log('Clicked on detail link');
    });

    $('a[href="#category"]').on('click', function(e) {
        e.preventDefault();
        
        displayCategories();
        $('#menu').toggleClass('-ms-44');
        console.log('Clicked on category link');
    });
    
    $('a[href="#area"]').on('click', async function(e) {
        e.preventDefault();
        try {
            const area = await fetchArea(); // Fetch categories and wait for the response
            displayArea(area);; // Pass fetched categories to displayArea function
            $('#menu').toggleClass('-ms-44');
            console.log('Clicked on area link');
        } catch (error) {
            console.error('Error fetching or displaying area:', error);
        }
    });

    $('a[href="#Ingredients"]').on('click', async function(e) {
        e.preventDefault();
        try {
            const ingredients = await fetchIngredients(); // Fetch categories and wait for the response
            displayIngredients(ingredients); // Pass fetched categories to displayArea function
            $('#menu').toggleClass('-ms-44');
            console.log('Clicked on ingredients link');
        } catch (error) {
            console.error('Error fetching or displaying ingredients:', error);
        }
    });
});
