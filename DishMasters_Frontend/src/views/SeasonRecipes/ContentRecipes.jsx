import React, { useEffect, useState } from "react";

function ContentRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetch("./json/season.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          setRecipes(data.recipes);
          setIsLoading(false);
        }, 900);
      })
      .catch((error) => {
        console.error("Error reciving recipes:", error);
      });
  }, []);

  return (
    <div className="p-4">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="py-2.5 px-4 inline-flex justify-center items-center gap-2 bg-[#FFBD59] text-black rounded-lg cursor-pointer font-semibold text-base text-center shadow-xs transition-all duration-500"
          >
            <span
              className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
              role="status"
              aria-label="loading"
            ></span>{" "}
            Loading
          </button>
        </div>
      ) : selectedRecipe ? (
        <div className="p-6 border rounded-lg shadow-md bg-white max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src={`img/seasonRecipes/${selectedRecipe.img}`}
              alt={selectedRecipe.name}
              className="w-full h-80 object-cover rounded-md"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {selectedRecipe.name} - {selectedRecipe.season}
              </h2>
              <p><strong>Calories:</strong> {selectedRecipe.calories} kcal</p>
              <p><strong>Preparation Time:</strong> {selectedRecipe.preparation_time}</p><br />
              {selectedRecipe.showDetails && (
                <>
                  <h3 className="mt-6 text-lg font-semibold">Ingredients:</h3>
                  <ul className="list-disc list-inside mb-4">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </>
              )}
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="bg-DishColor hover:bg-orange-300 text-white p-3 rounded-md"
                >
                  Back to All Recipes
                </button>
                <button
                  onClick={() => setSelectedRecipe({ ...selectedRecipe, showDetails: !selectedRecipe.showDetails })}
                  className={`text-white p-3 rounded-md ${selectedRecipe.showDetails ? "bg-gray-700 hover:bg-gray-500" : "bg-blue-600 hover:bg-blue-500"}`}
                >
                  {selectedRecipe.showDetails ? "Hide Details" : "Show Details"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center cursor-pointer hover:shadow-xl transition"
              onClick={() => setSelectedRecipe({ ...recipe, showDetails: false })}
            >
              <img
                src={`img/seasonRecipes/${recipe.img}`}
                alt={recipe.name}
                className="w-full h-60 object-cover rounded-md mb-4"
              />
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">{recipe.name} - {recipe.season}</h2>
                <p>Preparation time: {recipe.preparation_time}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContentRecipes;