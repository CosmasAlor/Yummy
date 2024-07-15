let rowData = document.getElementById("rowData");

async function getMultipleRandomMeals(numMeals) {
    const url = `https://www.themealdb.com/api/json/v1/1/random.php`;
    const meals = [];

    try {
        // Perform multiple fetch requests in parallel
        const fetchRequests = Array.from({ length: numMeals }, () => fetch(url));

        // Wait for all fetch requests to complete
        const responses = await Promise.all(fetchRequests);

        // Iterate through each response
        for (const response of responses) {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            const meal = json.meals[0];
            meals.push({
                id: meal.idMeal,
                name: meal.strMeal,
                image: meal.strMealThumb
            });
        }

        return meals; // Return the array of meals
    } catch (error) {
        console.error("Error fetching meals:", error.message);
        return []; // Return an empty array in case of error
    }
}

getMultipleRandomMeals(20)
    .then(meals => {
        if (meals.length > 0) {
            // console.log("Random Meals:");
            // meals.forEach((meal, index) => {
            //     console.log(`${index + 1}. Meal ID: ${meal.id}, Name: ${meal.name}, Image: ${meal.image}`);
            // });
            displayMeals(meals);
        } else {
            console.log("Failed to fetch meals.");
        }
    })
    .catch(error => console.error("Error in fetching meals:", error));

function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
            <div class="relative overflow-hidden w-full sm:w-60 h-50 m-2">
                <input type="hidden" class="meal-id" value="${arr[i].id}">
                <div class="relative group"> <!-- Added cursor-pointer class -->
                    <img src="${arr[i].image}" alt="${arr[i].name}" class="w-full h-full object-cover rounded">
                    <div class="layer rounded bg-gray-300 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center "
                        style="transform: translateY(100%); transition: transform 0.3s ease-out;">
                        <h2 class="text-2xl text-black p-5">${arr[i].name}</h2>
                    </div>
                </div>
            </div>
        `;
    }

    rowData.innerHTML = cartoona;

    // Add event listeners after HTML is inserted
    const mealElements = document.querySelectorAll('.relative');

    mealElements.forEach((mealElement) => {
        mealElement.addEventListener('click', () => {
            // Find the hidden input inside the clicked meal element
            const mealIdInput = mealElement.querySelector('.meal-id');
            if (mealIdInput) {
                const mealId = mealIdInput.value;
                console.log('Clicked on meal with ID:', mealId);

           
displayDetails(mealId);
                // Perform further actions with mealId if needed
                displayDetails();
            }
        });
    });
}

function displayContactForm() {
    // Define the HTML content using template literals
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
                                        <input type="text" placeholder="Enter Your Full Name" name="fullName" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="email" placeholder="Enter Your Email" name="email" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="text" placeholder="Enter Your Phone Number" name="phone" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="text" placeholder="Enter Your Age" name="age" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="password" placeholder="Password" name="password" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <div class="w-full lg:w-6/12 px-4">
                                    <div class="relative w-full mb-3">
                                        <input type="password" placeholder="Re-enter Password" name="rePassword" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                    </div>
                                </div>
                                <button type="submit" class="bg-yellow-600 rounded p-1 px-3 my-4 w-28">Submit</button>
                            </div>
                            <hr class="mt-6 border-b-1 border-blueGray-300">
                        </form>
                    </div>
                </div>
            </div>
        </section>`;

    // Select the element with id "body" where you want to insert the form
    const bodyContainer = document.getElementById('body');

    // Insert the form HTML into the selected container
    if (bodyContainer) {
        bodyContainer.innerHTML = formHTML;

        // Now that the form is inserted, add event listener to handle form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent the default form submission
                // Handle form submission logic here, e.g., validate inputs and submit via AJAX
                console.log('Form submitted!');
            });
        }
    } else {
        console.error('Element with id "body" not found.');
    }
    setupCloseButton();
}

async function detailsFetch(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        return data; // Return the fetched data
    } catch (error) {
        console.log('Error fetching data:', error);
        return null; // Return null in case of an error
    }
}

async function displayDetails(id) {
    console.log('Fetching details for id:', id);

    // Fetch meal details for the provided id
    const mealDetails = await detailsFetch(id);

    console.log('Meal details:', mealDetails); // Log the fetched meal details

    if (!mealDetails || !mealDetails.meals || mealDetails.meals.length === 0) {
        console.log('Meal details not found.');
        return;
    }

    const meal = mealDetails.meals[0];

    // Truncate instructions to 70 characters (adjust as needed)
    const truncatedInstructions = truncateText(meal.strInstructions, 70);

    // Define the HTML content using template literals
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
                         <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer" class="mt-8 bg-red-500 hover:bg-red-700 font-bold rounded p-3 px-5 my-5 text-center">Source</a>
                    </div>
                </div>
                
                <div class="close absolute top-10 right-10">
                    <button id="close-x" class="bg-yellow-600 rounded p-1 px-3 my-4 w-28">Close</button>
                </div>
            </div>
        </section>
    `;

    // Select the element with id "body" where you want to insert the form
    const bodyContainer = document.getElementById('body');
    bodyContainer.innerHTML = Container;

    setupCloseButton();
}

function getIngredientsList(meal) {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) { // Assuming there are up to 20 ingredients
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient) {
            ingredientsList += `<span class="bg px-3">${measure} ${ingredient}</span>`;
        }
    }
    return ingredientsList;
}

function truncateText(text, limit) {
    if (text.length > limit) {
        // Trim the text to the maximum length and add ellipsis (...)
        return text.substring(0, limit) + '...';
    }
    return text; // Return the original text if it's within the limit
}

function setupCloseButton() {
    // Add click event listener to the close button
    const closeButton = document.getElementById('close-x');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            console.log('Close button clicked');

            // Hide or remove the form
            const formContainer = document.getElementById('contact-form-container');
            if (formContainer) {
                formContainer.style.display = 'none';  // Hide the form
                // Alternatively, you can remove the form from the DOM:
                // formContainer.parentNode.removeChild(formContainer);

                // Example redirection after closing the form
                window.location.href = 'http://127.0.0.1:5500/';
            }
        });
    }
}

$(document).ready(function() {
    $('a[href="#contact"]').on('click', function(e) {
      e.preventDefault(); // Prevent default action of anchor tag
        displayContactForm()
      console.log('happy'); // Log 'happy' to the console
    });
  });

$(document).ready(function() {
    $('a[href="#destail"]').on('click', function(e) {
      e.preventDefault(); // Prevent default action of anchor tag
        displayDetails()
      console.log('happy'); // Log 'happy' to the console
    });
  });
  


