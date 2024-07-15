// Exporting fetchIngredients function
export async function fetchIngredients() {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.meals || []; // Ensure to return an array, or an empty array if data.meals is undefined.
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return []; // Return an empty array in case of error
    }
}

// Filters meals by the specified ingredient and displays them
export async function filterByIngredient(ingredient) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // Display the filtered meals
        displayFilteredIngredients(data.meals);
        return data.meals || []; // Ensure to return an array, or an empty array if data.meals is undefined
    } catch (error) {
        console.error('Error fetching filtered ingredients:', error);
        return []; // Return an empty array in case of error
    }
}

// Displays filtered meal results
export async function displayFilteredIngredients(meals) {
    const rowData = document.getElementById('rowData'); // Reference to where meal cards will be inserted

    let cartoona = "";

    if (!Array.isArray(meals)) {
        console.error('Meals is not an array:', meals);
        return; // Exit function early if meals is not an array
    }

    // Limit the number of meals displayed to 20
    const limitedMeals = meals.slice(0, 20);

    limitedMeals.forEach((meal) => {
        cartoona += `
            <div class="relative overflow-hidden Ingredients w-full sm:w-60 h-50 p-2 m-2">
                <div class="relative group">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-full object-cover rounded">
                    <input type="hidden" class="meal-id" value="${meal.idMeal}">
                    <div class="layer rounded bg-gray-300 absolute inset-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <h2 class="text-3xl text-black p-5 w-full">${meal.strMeal}</h2>
                    </div>
                </div>
            </div>
        `;
    });

    rowData.innerHTML = cartoona;

    // Add event listener using event delegation on rowData
    rowData.addEventListener('click', function(event) {
        const mealIdInput = event.target.closest('.Ingredients')?.querySelector('.meal-id');
        if (mealIdInput) {
            const mealId = mealIdInput.value;
            console.log('Clicked on meal with ID:', mealId);
            displayDetails(mealId);
        }
    });
}

// Fetches meal details
export async function detailsFetch(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.meals);
        return data.meals[0]; // Return the first meal details
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Displays meal details
export async function displayDetails(mealId) {
    const meal = await detailsFetch(mealId);
    if (!meal) {
        console.error('No meal details found for ID:', mealId);
        return;
    }

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

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

// Utility function to generate the ingredients list
function getIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsList += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    return ingredientsList;
}

// Set up close button functionality
function setupCloseButton() {
    const closeButton = document.getElementById('close-x');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.getElementById('contact-form-container').remove();
            window.location.href = 'https://cosmasalor.github.io/Yummy/';
        });
    }
}

// Exporting displayIngredients function
export async function displayIngredients(ingredients) {
    const rowData = document.getElementById('rowData'); // Reference to where ingredient cards will be inserted

    if (!Array.isArray(ingredients)) {
        console.error('Ingredients is not an array:', ingredients);
        return; // Exit function early if ingredients is not an array
    }

    // Limit the number of ingredients displayed to 20
    const limitedIngredients = ingredients.slice(0, 20);

    let cartoona = limitedIngredients.map(ingredient => {
        const truncatedDescription = ingredient.strDescription ? ingredient.strDescription.split(' ').slice(0, 20).join(' ') + '...' : '';

        return `
            <div class="sm:w-60 h-full m-2 Ingredients bg-slate-100 text-center p-3">
                <input type="hidden" class="ingredient-id" value="${ingredient.strIngredient}">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredient.strIngredient}</h3>
                <p>${truncatedDescription}</p>
            </div>
        `;
    }).join('');

    rowData.innerHTML = cartoona;

    // Add event listener using event delegation on rowData
    rowData.addEventListener('click', function(event) {
        const ingredientIdInput = event.target.closest('.Ingredients')?.querySelector('.ingredient-id');
        if (ingredientIdInput) {
            const ingredientId = ingredientIdInput.value;
            console.log('Clicked on ingredient with ID:', ingredientId);
            filterByIngredient(ingredientId);
        }
    });
}
