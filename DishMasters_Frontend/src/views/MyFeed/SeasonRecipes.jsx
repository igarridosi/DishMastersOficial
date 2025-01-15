import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SeasonRecipes() {
    const [recipes, setRecipes] = useState([]);
    const json = './json/season_recipes.json';

    useEffect(() => {
        // Load the JSON file
        fetch(json)
            .then((response) => {
                if (!response.ok) {
                    console.log('Error: file not loaded correctly: ' + response.statusText);
                } else {
                    console.log('JSON correctly loaded');
                    return response.json();
                }
            })
            .then((data) => {
                setRecipes(data); // Update the data
                console.log(data);
            })
    }, []);

    return (
        <div className="container mt-5 d-flex flex-column justify-content-center align-items-center" id="main-heading">
            <h1 className="h5 h1-md text-center uppercase">
                Season<i className="text-white font-sans"> Recipes </i> Challenges
            </h1>

            <div className="row pt-16 justify-content-center">
                {recipes.map((recipe, index) => (
                    <div className="col-md-6 col-lg-4 mb-4" key={index}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{recipe.title} <br />
                                    <button className={`btn btn-${recipe.color} mt-4`}>{recipe.status}</button>
                                </h5><hr />
                                <p className="card-text text-justify">{recipe.description}</p>
                                <div className="deadline"><br />
                                    <strong>Start date:</strong> {recipe.start}<br />
                                    <strong>End date:</strong> {recipe.deadline}
                                </div><br />

                                {/* Contenedor de la imagen con tamaño fijo y object-cover */}
                                <div className="w-full h-60 overflow-hidden rounded-lg">
                                    <img
                                        src={recipe.img}
                                        alt={recipe.title}
                                        className="w-full h-full object-cover mx-auto d-block" // Usando object-cover para cubrir el área del contenedor
                                    />
                                </div>

                                <Link to={`/season/${recipe.id}`}>
                                    <button type="button" className="mt-2 text-black bg-#FFBD59 bg-dishyColor focus:outline focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                                        More info
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SeasonRecipes;