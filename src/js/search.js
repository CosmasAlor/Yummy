// Exporting searchAlpha function
export async function searchAlpha(targetElement) {
    const alphaInput = document.getElementById('alpha');
    const wordInput = document.getElementById('word');

    let search, url;

    if (alphaInput && alphaInput.value.trim() !== '') {
        search = alphaInput.value.trim();
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    } else if (wordInput && wordInput.value.trim() !== '') {
        search = wordInput.value.trim();
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    } else {
        console.log('No valid input found.');
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();

        if (!data.meals) {
            throw new Error('No meals found.');
        }

        console.log(data);

        // Display data in the target element
        const rowDataContainer = document.getElementById('ArowData');
        if (rowDataContainer) {
            // Clear existing content
            rowDataContainer.innerHTML = '';

            // Append fetched data to the container
            data.meals.forEach(meal => {
                const mealHTML = `
                    <div class="relative overflow-hidden w-full sm:w-60 h-50 m-2">
                        <input type="hidden" class="meal-id" value="${meal.idMeal}">
                        <div class="relative group">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-full object-cover rounded">
                            <div class="layer rounded bg-gray-300 absolute inset-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <h2 class="text-3xl text-black p-5 w-full">${meal.strMeal}</h2>
                            </div>
                        </div>
                    </div>
                `;
                rowDataContainer.innerHTML += mealHTML;
            });

            // Attach click event listeners to each meal item
            rowDataContainer.querySelectorAll('.relative').forEach((mealElement) => {
                mealElement.addEventListener('click', () => {
                    const mealIdInput = mealElement.querySelector('.meal-id');
                    if (mealIdInput) {
                        const mealId = mealIdInput.value;
                        console.log('Clicked on meal with ID:', mealId);
                        displayDetails(mealId);
                    }
                });
            });
        } else {
            console.error(`Element with id "ArowData" not found.`);
        }

        return data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to fetch meal details
async function detailsFetch(mealId) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
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

// Function to display meal details
async function displayDetails(mealId) {
    const mealDetails = await detailsFetch(mealId);
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

    const body = document.getElementById('body');
    if (body) {
        body.innerHTML = Container;
        setupCloseButton();
    }
}

// Function to display the search form
export function displaySearchForm(targetElement) {
    const formHTML = `
        <div class="close absolute top-10 right-10 text-white">
            <button id="close-x" class="bg-yellow-600 rounded p-1 px-3 my-4 w-28">Close</button>
        </div>
        <section id="contact-form-container" class="py-1 bg-blueGray-50">
            <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form id="contact-form">
                            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                User Information
                            </h6>
                            <div class="flex flex-wrap">
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="text" id="word" placeholder="Search By Name" name="fullName" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="text" id="alpha" placeholder="Search By Alphabet" name="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 ms-50" id="ArowData"></div>
    `;

    const bodyContainer = document.getElementById('body');

    if (bodyContainer) {
        bodyContainer.innerHTML = formHTML;

        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                console.log('Form submitted!');
                // Handle form submission logic here (e.g., AJAX submission)
            });
        }

        // Call searchAlpha to fetch and display data in #ArowData initially
        searchAlpha(targetElement);

        // Event listener for keyup in #alpha input field using jQuery
        $(document).ready(function() {
            $('#alpha').on('keyup', function() {
                searchAlpha(targetElement); // Call searchAlpha whenever input changes
            });
        });

        // Event listener for keyup in #word input field using vanilla JavaScript
        const wordInput = document.getElementById('word');
        if (wordInput) {
            wordInput.addEventListener('keyup', function() {
                searchAlpha(targetElement); // Call searchAlpha whenever input changes
            });
        }

    } else {
        console.error('Element with id "body" not found.');
    }

    setupCloseButton();
}

function setupCloseButton() {
    const closeButton = document.getElementById('close-x');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('Close button clicked');
            const formContainer = document.getElementById('contact-form-container');
            if (formContainer) {
                formContainer.style.display = 'none';
                // Example redirection after closing the form
                window.location.href = 'http://127.0.0.1:5500/';
            }
        });
    }
}

// Helper function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Helper function to generate ingredients list
function getIngredientsList(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    return ingredients;
}
