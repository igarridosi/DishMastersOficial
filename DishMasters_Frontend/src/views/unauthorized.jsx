// src/views/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Unauthorized = () => {
  return (
    <div className="text-center mt-5">
      <h1>403 - Unauthorized</h1>
      <p>You are not authorized to access this page.</p>
      <button>
        <Link to="/" className="text-[#FFBD59] hover:text-[#ff9f3d]">Back to Home</Link>
      </button>
    </div>
  );
};

export default Unauthorized;
