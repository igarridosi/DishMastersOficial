import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

function RecipeMoreInfo() {
    const { challengeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const json = '/json/weekly_challenge.json';

    useEffect(() => {
        fetch(json)
            .then((response) => {
                if (!response.ok) {
                    console.log('Error: file not loaded correctly: ' + response.statusText);
                } else {
                    console.log('JSON correctly loaded');
                    return response.text();
                }
            })
            .then((text) => {
                console.log('Response text:', text);
                try {
                    const data = JSON.parse(text);
                    const foundRecipe = data.find(r => r.id === challengeId);
                    if (foundRecipe) {
                        setRecipe(foundRecipe);
                    } else {
                        setError('Recipe not found');
                    }
                    setLoading(false);
                } catch (error) {
                    setError('Error parsing JSON data: ' + error.message);
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError('Error loading recipe data: ' + error.message);
                setLoading(false);
            });
    }, [challengeId]);

    if (loading) {
        return <div className="container mt-5 text-center"><p className="text-lg text-gray-600">Loading...</p></div>;
    }

    if (error) {
        return <div className="container mt-5 text-center"><p className="text-lg text-red-600">{error}</p></div>;
    }

    return (
        <div className="container mt-10 mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
            <button className={`btn btn-${recipe.color}`}>{recipe.status}</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center mt-8">
                    <img src={recipe.img} alt={recipe.title} className="w-full rounded-lg shadow-lg object-cover" />
                </div>
                <div className="flex flex-col mt-8">
                    <p className="text-lg text-gray-700 mb-4"><strong>Description:</strong> {recipe.description}</p>
                    <p className="text-lg text-gray-700"><strong>Start date:</strong> {recipe.start}</p>
                    <p className="text-lg text-gray-700 mb-6"><strong>Deadline:</strong> {recipe.deadline}</p>
                    {recipe.status === "ongoing" && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="self-start inline-flex items-end justify-center px-8 py-3 bg-DishColor text-white font-semibold rounded-md transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        >
                            Register
                        </button>
                    )}
                    {recipe.status === "finished" && (
                        <p className="text-lg text-gray-700 mt-4"><strong>Winner:</strong> {recipe.winner}</p>
                    )}
                </div>
            </div>
            {showForm && <Form setShowForm={setShowForm} />}
        </div>
    );
}

export default RecipeMoreInfo;