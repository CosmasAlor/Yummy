
// Fetch categories from the API
export async function fetchCategories() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.categories; // Return categories array from the API response
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; // Return an empty array in case of error
    }
}

// Filter categories by a specific type
export async function filterCategories(category) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data.meals; // Return meals array from the API response
    } catch (error) {
        console.error('Error fetching filtered categories:', error);
        return []; // Return an empty array in case of error
    }
}

// Display categories on the webpage
export async function displayCategories() {
    const rowData = document.getElementById('rowData'); // Reference to where meal cards will be inserted

    if (!rowData) {
        console.error('rowData element not found!');
        return;
    }

    try {
        const categories = await fetchCategories();

        let cartoona = "";

        categories.forEach((category) => {
            // Truncate description to first 30 words
            const descriptionWords = category.strCategoryDescription.split(' ');
            const truncatedDescription = descriptionWords.slice(0, 30).join(' ');

            cartoona += `
                <div class="relative overflow-hidden w-full sm:w-60 h-50 p-2 m-2" data-category="${category.strCategory}">
                    <div class="relative group">
                        <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="w-full h-full object-cover rounded">
                        <div class="layer rounded bg-gray-300 absolute inset-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <h2 class="text-3xl text-black p-5 w-full">${category.strCategory}</h2>
                            <p class="text-sm text-gray-800 px-5 w-full">${truncatedDescription}...</p>
                        </div>
                    </div>
                </div>
            `;
        });

        rowData.innerHTML = cartoona;

        // Add event listener using event delegation on rowData
        rowData.addEventListener('click', async function(event) {
            const categoryElement = event.target.closest('[data-category]');

            if (categoryElement) {
                const category = categoryElement.getAttribute('data-category');
                console.log('Clicked category:', category);

                // Filter and display the selected category
                const meals = await filterCategories(category);
                displayMeals(meals); // Function to display filtered meals
                
            } else {
                console.log('Category element not found');
            }
        });

    } catch (error) {
        console.error('Error displaying categories:', error);
    }
}

// Display filtered meals
function displayMeals(meals) {
    const rowData = document.getElementById('rowData'); // Reference to where meal cards will be inserted

    if (!rowData) {
        console.error('rowData element not found!');
        return; // Exit if the rowData element is not found
    }

    // Limit the number of meals displayed to 20
    const limitedMeals = meals.slice(0, 20);

    // Generate HTML for meal cards
    let cartoona = limitedMeals.map(meal => `
        <div class="relative overflow-hidden w-full sm:w-60 h-50 p-2 m-2">
            <div class="relative group">
                <input type="hidden" class="meal-id" value="${meal.idMeal}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-full object-cover rounded">
                <div class="layer rounded bg-gray-300 absolute inset-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <h2 class="text-3xl text-black p-5 w-full">${meal.strMeal}</h2>
                </div>
            </div>
        </div>
    `).join('');

    // Insert the generated HTML into the rowData element
    rowData.innerHTML = cartoona;

    // Add event listener using event delegation on rowData
    rowData.addEventListener('click', function(event) {
        // Check if the clicked element is inside a meal card
        const mealCard = event.target.closest('.relative');
        if (mealCard) {
            const mealIdInput = mealCard.querySelector('.meal-id');
            if (mealIdInput) {
                const mealId = mealIdInput.value;
                console.log('Clicked on meal with ID:', mealId);
                
                displayDetails(mealId)
            }
        }
    });
}

export async function detailsFetch(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

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
    if (text.length > limit) {
        return text.substring(0, limit) + '...';
    }
    return text;
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
                window.location.href = 'https://cosmasalor.github.io/Yummy/';
            }
        });
    }
}
