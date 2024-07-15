// mealApi.js

export async function getMultipleRandomMeals(numMeals) {
    const url = `https://www.themealdb.com/api/json/v1/1/random.php`;
    const meals = [];

    try {
        const fetchRequests = Array.from({ length: numMeals }, () => fetch(url));
        const responses = await Promise.all(fetchRequests);

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

        return meals;
    } catch (error) {
        console.error("Error fetching meals:", error.message);
        return [];
    }
}

// mealApi.js
