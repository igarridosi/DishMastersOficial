import React, { useState, useEffect } from 'react';

function ContentWorld() {
    const [dishes, setDishes] = useState([]);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [countryFilter, setCountryFilter] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetch('./json/world.json')
            .then(response => response.json())
            .then(data => {
                setDishes(data.dishes);
                setFilteredDishes(data.dishes);

                const uniqueCountries = [...new Set(data.dishes.map(dish => dish.country))];
                setCountries(uniqueCountries);
            })
            .catch(error => console.error('Error al cargar los platos:', error));
    }, []);

    useEffect(() => {
        if (countryFilter === '') {
            setFilteredDishes(dishes);
        } else {
            const filtered = dishes.filter(dish =>
                dish.country.toLowerCase() === countryFilter.toLowerCase()
            );
            setFilteredDishes(filtered);
        }
    }, [countryFilter, dishes]);

    const toggleIngredientsVisibility = (index) => {
        const newDishes = [...filteredDishes];
        newDishes[index].showIngredients = !newDishes[index].showIngredients;
        setFilteredDishes(newDishes);
    };

    return (
        <div className="container mx-auto p-8">
            <div className="mb-6 flex justify-center">
                <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">Choose a country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="space-y-8">
                {filteredDishes.length === 0 ? (
                    <li className="text-center text-xl text-gray-700">No dishes found with that country</li>
                ) : (
                    filteredDishes.map((dish, index) => (
                        <li key={index} className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold text-gray-900">{dish.name} - {dish.country}</h2>
                            <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-96 object-cover rounded-lg mt-4 mb-6"
                            />
                            <p><strong>Description:</strong> {dish.description}</p>
                            <p><strong>Calories:</strong> {dish.calories} kcal</p>
                            <p><strong>Prep. time:</strong> {dish.preparation_time}</p>

                            <button
                                onClick={() => toggleIngredientsVisibility(index)}
                                className="bg-DishColor text-white p-3 rounded-md hover:bg-dishColor-700 mb-4 font-bold "
                            >
                                {dish.showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
                            </button>

                            {dish.showIngredients && (
                                <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-2 w-[20rem]">
                                    <ul className="list-disc pl-6 space-y-2">
                                        {dish.ingredients.map((ingredient, idx) => (
                                            <li key={idx} className="text-gray-700 text-xl font-light">{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ContentWorld;