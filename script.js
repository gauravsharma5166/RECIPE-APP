const searchBox = document.querySelector('.searchbox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipedetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipecloseBtn');

const fetchRecipe = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching recipes....</h2>";

    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
             <img src="${meal.strMealThumb}">
             <h3>${meal.strMeal}</h3>
             <p><span>${meal.strArea}</span> Dish</p>
             <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
            const button = document.createElement('button');
            button.textContent = "See Recipe";
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipe(meal);
            });

            recipeContainer.appendChild(recipeDiv);

        });
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching recipes....</h2>"

    }
}

const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientList;
}

const openRecipe = (meal) => {
    recipedetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients: </h3>
        <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
        <div  class="recipeinstructions">
             <h3>Instructions: </h3>
             <p>${meal.strInstructions}</p>
        </div> 
    `
    recipedetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener("click", () => {
    recipedetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipe(searchInput);

});
