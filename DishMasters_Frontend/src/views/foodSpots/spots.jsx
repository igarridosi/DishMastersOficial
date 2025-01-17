import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./style.css";

const Spots = () => {
  const [provinces, setProvinces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  useEffect(() => {
    fetch("/json/restaurants.json")
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
        setProvinces([...new Set(data.map((restaurant) => restaurant.province))]);
        setCategories([...new Set(data.map((restaurant) => restaurant.category))]);
        setPrices([...new Set(data.map((restaurant) => restaurant.estimated_price))]);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleProvinceChange = (event) => setSelectedProvince(event.target.value);
  const handleCategoryChange = (event) => setSelectedCategory(event.target.value);
  const handlePriceChange = (event) => setSelectedPrice(event.target.value);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesProvince = selectedProvince ? restaurant.province === selectedProvince : true;
    const matchesCategory = selectedCategory ? restaurant.category === selectedCategory : true;
    const matchesPrice = selectedPrice ? restaurant.estimated_price === selectedPrice : true;
    return matchesProvince && matchesCategory && matchesPrice;
  });

  const handleModalOpen = (restaurant) => {
    setCurrentRestaurant(restaurant);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentRestaurant(null);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Formulario de filtros */}
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
            Select Province
          </label>
          <select
            id="province"
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleProvinceChange}
          >
            <option value="" className="font-sans">All Provinces</option>
            {provinces.map((province, index) => (
              <option key={index} value={province} className="font-sans">
                {province}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Select Category
          </label>
          <select
            id="category"
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleCategoryChange}
          >
            <option value="" className="font-sans">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category} className="font-sans">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Select Price
          </label>
          <select
            id="price"
            className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handlePriceChange}
          >
            <option value="" className="font-sans">All Prices</option>
            <option value="€" className="font-sans">Cheap - €</option>
            <option value="€€" className="font-sans">Medium - €€</option>
            <option value="€€€" className="font-sans">Expensive - €€€</option>
          </select>
        </div>
      </form>

      {/* Tarjetas responsivas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg p-4 max-w-sm mx-auto"
            onClick={() => handleModalOpen(restaurant)}
          >
            <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
            <p className="text-sm text-gray-600">Province: {restaurant.location}</p>
            <p className="text-sm text-gray-600">Price: {restaurant.estimated_price}</p>
            <p className="text-sm text-gray-600 mt-2">{restaurant.description}</p>
          </div>
        ))}
      </div>

      {/* Modal responsivo */}
      {modalOpen && currentRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-150 max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{currentRestaurant.name}</h2>
            <h6 className="text-xl font-semibold text-gray-500 mb-4">{currentRestaurant.location} - {currentRestaurant.province}</h6>
            <h6 className="text-xl font-semibold text-gray-500 mb-4">{currentRestaurant.category}</h6>
            <p className="text-gray-700 mb-4">+34 {currentRestaurant.phone}</p>

            <p className="text-gray-700 mb-4">{currentRestaurant.description}</p>
            <div
              className="mt-4 rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: currentRestaurant.maps,
              }}
            />
            <button
              onClick={handleModalClose}
              className="bg-dishyColor text-white py-2 px-4 rounded-lg hover:bg-dishyColor mt-4 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spots;