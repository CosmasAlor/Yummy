// Exporting fetchArea function
export async function fetchArea() {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.meals || []; // Ensure to return an array, or an empty array if data.meals is undefined.
    } catch (error) {
        console.error('Error fetching area:', error);
        return []; // Return an empty array in case of error
    }
}

// Filters meals by the specified area and displays them
export async function filterArea(area) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.meals) {
            displayFilteredArea(data.meals);
        } else {
            console.error('No meals found for this area');
            displayFilteredArea([]); // Display empty content if no meals are found
        }
        return data.meals || []; // Ensure to return an array, or an empty array if data.meals is undefined
    } catch (error) {
        console.error('Error fetching filtered categories:', error);
        return []; // Return an empty array in case of error
    }
}

// Displays filtered meal results
export async function displayFilteredArea(meals) {
    displayContent(meals, 'meal');
}

// Displays meal areas
export async function displayArea(area) {
    displayContent(area, 'area');
}

// Common function to display content (meals or areas)
function displayContent(data, type) {
    const rowData = document.getElementById('rowData'); // Reference to where meal cards will be inserted
    if (!rowData) {
        console.error('rowData element not found!');
        return;
    }

    if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
        return; // Exit function early if data is not an array
    }

    let cartoona = data.slice(0, 20).map(item => {
        if (type === 'meal') {
            return `
                <div class="relative overflow-hidden Ingredients w-full sm:w-60 h-50 p-2 m-2">
                    <div class="relative group">
                        <img src="${item.strMealThumb}" alt="${item.strMeal}" class="w-full h-full object-cover rounded">
                        <input type="hidden" class="meal-id" value="${item.idMeal}">
                        <div class="layer rounded bg-gray-300 absolute inset-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <h2 class="text-3xl text-black p-5 w-full">${item.strMeal}</h2>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'area') {
            return `
                <div class="sm:w-60 h-full m-2 Ingredients bg-slate-100 text-center p-3">
                    <input type="hidden" class="meal-id" value="${item.strArea}">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 class="">${item.strArea}</h3>
                </div>
            `;
        }
    }).join('');

    rowData.innerHTML = cartoona;

    // Add event listener using event delegation on rowData
    rowData.addEventListener('click', async function(event) {
        const mealIdInput = event.target.closest('.Ingredients')?.querySelector('.meal-id');
        if (mealIdInput) {
            const mealId = mealIdInput.value;
            if (type === 'meal') {
                const mealDetails = await detailsFetch(mealId);
                displayDetails(mealDetails);
            } else if (type === 'area') {
                await filterArea(mealId);
            }
        }
    });
}

// Fetches meal details by ID
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

// Displays meal details
export function displayDetails(mealDetails) {
    if (!mealDetails || !mealDetails.meals || mealDetails.meals.length === 0) {
        console.log('Meal details not found.');
        return;
    }

    const meal = mealDetails.meals[0];
    const truncatedInstructions = truncateText(meal.strInstructions, 500);

    const container = `
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

    document.body.innerHTML = container;
    setupCloseButton();
}

// Get ingredients list for the meal
function getIngredientsList(meal) {
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
function truncateText(text, limit) {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
}

// Setup event listener for the close button
function setupCloseButton() {
    const closeButton = document.getElementById('close-x');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            console.log('Close button clicked');
            const formContainer = document.getElementById('contact-form-container');
            if (formContainer) {
                formContainer.style.display = 'none';
                // Optionally, redirect after closing the details
                window.location.href = 'http://127.0.0.1:5500/';
            }
        });
    }
}
