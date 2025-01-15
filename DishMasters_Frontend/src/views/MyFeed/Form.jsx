import React from 'react';

const Form = ({ setShowForm }) => {
return (
<div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
    <div
        className="card p-4"
        style={{
        width: '400px',
        backgroundColor: '#333',
        color: '#fff',
        zIndex: 1060 // Ensure card is above the background
        }}
    >
        <h3 className="text-center mb-4">Registration Form</h3>
        <form>
        {/* Name Field */}
        <div className="mb-3">
            <label htmlFor="name" className="form-label">
            Name and Surname
            </label>
            <input required
            type="text"
            className="form-control bg-dark text-light border-secondary"
            id="name"
            placeholder="Enter your name"
            />
        </div>

        {/* Email Field */}
        <div className="mb-3">
            <label htmlFor="email" className="form-label">
            Email
            </label>
            <input required
            type="email"
            className="form-control bg-dark text-light border-secondary"
            id="email"
            placeholder="Enter your email"
            />
        </div>

        {/* Message Field */}
        <div className="mb-3">
            <label htmlFor="message" className="form-label">
            Recipe explanation
            </label>
            <textarea required
            className="form-control bg-dark text-light border-secondary"
            id="message"
            rows="3"
            placeholder="Your explanation"
            ></textarea>
        </div>

        {/* File Upload Field */}
        <div className="mb-3">
            <label htmlFor="fileUpload" className="form-label">
                Upload your Recipe (Image or PDF)
            </label>
            <input required
                type="file"
                className="form-control bg-dark text-light border-secondary"
                id="fileUpload"
                accept=".pdf,.jpg,.png,.jpeg"
            />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-light w-100">
            Submit
        </button>

        </form>

        <button className="btn btn-outline-danger mt-3 w-100" onClick={() => setShowForm(false)}>
            Close
        </button>
    </div>
</div>
);
};

export default Form;
