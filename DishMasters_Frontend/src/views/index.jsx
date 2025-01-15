import React, { useState, useEffect } from 'react';
import '../App.css';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Sidebar from './home/Sidebar';
import Sidebar_Desktop from './home/Sidebar_Desktop';
import Header from './home/Header';
import SearchBar from './home/SearchBar';
import FormComponent from './home/Form';
import Carousel from './home/Carousel';
import Explore from './home/Explore';
import Footer from './home/Footer';

import './i18n';

import axiosClient from '../axiosClient';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const response = await axiosClient.post('/logout');
      if (response.status === 200) {
        // Clear the `ACCESS_TOKEN` cookie
        document.cookie = "ACCESS_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log("Logged out successfully.");
        localStorage.removeItem('authToken');
        navigate('/login'); // Redirect to home or login page
      }
    } catch (error) {
      console.error("Error during logout:", error.response || error.message);
    }
  };

  useEffect(() => {
    const handleUnload = async () => {
      await onLogout(); // Trigger the logout function
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row flex-wrap">

        {/* Sidebar Section */}
        <div className="col-12 col-md-3 col-lg-2" id='canvasMenu'>
          <Sidebar_Desktop setShowForm={setShowForm} /> {/* Pass setShowForm as prop */}
          <Sidebar setShowForm={setShowForm} />
        </div>

        {/* Main Content Section */}
        <div className="col-12 col-md-9 col-lg-10 py-3 d-flex flex-column align-items-center" id="main">
          <Header />
          <SearchBar />
          <Carousel />
          <Explore />
          <Footer />
        </div>
      </div>

      {/* Display Form Overlay */}
      {showForm && <FormComponent setShowForm={setShowForm} />} {/* Show form conditionally */}
    </div>


  );
};

export default index;
