// src/views/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Unauthorized = () => {
  return (
    <div className="text-center mt-5">
      <div className='flex justify-center items-center flex-row gap-4'>
        <h1>403 - Unauthorized</h1>
        <img src="img/DishyMad.png" className='w-16 h-16 object-cover' alt="" />
      </div>

      <p>You are not authorized to access this page.</p>
      <button>
        <Link to="/" className="text-[#FFBD59] hover:text-[#ff9f3d]">Back to Home</Link>
      </button>
    </div>
  );
};

export default Unauthorized;
