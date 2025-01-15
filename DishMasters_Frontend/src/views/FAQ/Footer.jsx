import React from 'react';

const Footer = () => (
<footer className="bg-body-secondary text-center w-100 mt-8">
    <div className="container p-4 pb-0 col-8 d-flex justify-content-center">
        <section className="mb-4 d-flex justify-content-around w-50">
            <a className="btn text-white" style={{ backgroundColor: '#3b5998' }} href="#!">
                <i className="bi bi-facebook"></i>
            </a>
            <a className="btn text-white" style={{ backgroundColor: '#222222' }} href="#!">
                <i className="bi bi-twitter-x"></i>
            </a>
            <a className="btn text-white" style={{ backgroundColor: '#dd4b39' }} href="#!">
                <i className="bi bi-google"></i>
            </a>
            <a className="btn text-white" style={{ backgroundColor: '#ac2bac' }} href="#!">
                <i className="bi bi-instagram"></i>
            </a>
            <a className="btn text-white" style={{ backgroundColor: '#0082ca' }} href="#!">
                <i className="bi bi-linkedin"></i>
            </a>
            <a className="btn text-white" style={{ backgroundColor: '#444444' }} href="#!">
                <i className="bi bi-github"></i>
            </a>
        </section>
    </div>
    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
         © 2025 Copyright:
        <a className="text-body" href="/">DishMasters.com</a>
    </div>
</footer>
);

export default Footer;
