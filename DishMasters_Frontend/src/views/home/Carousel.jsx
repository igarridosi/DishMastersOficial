import React from 'react';

const Carousel = () => (
<div id="cuisineCarousel" className="carousel slide w-50 mt-5" data-bs-ride="carousel">
    <div className="carousel-inner">
        {/* First Item */}
        <div className="carousel-item active">
            <div className="d-flex justify-content-between">
                <img
                src="img/foods/italy/spageti.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="spageti"
                />
                <img
                src="img/flags/italy.svg"
                className="d-block w-100 rounded-pill shadow p-3 mb-5 bg-white"
                alt="italia"
                />
                <img
                src="img/foods/italy/macaroni.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="macaroni"
                />
            </div>
        </div>

        {/* Second Item */}
        <div className="carousel-item">
            <div className="d-flex justify-content-between">
                <img
                src="img/foods/japan/ramen.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="ramen"
                />
                <img
                src="img/flags/japan.png"
                className="d-block w-100 rounded-pill shadow p-3 mb-5 bg-white"
                alt="japan"
                />
                <img
                src="img/foods/japan/futomaki.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="futomaki"
                />
            </div>
        </div>

        {/* Third Item */}
        <div className="carousel-item">
            <div className="d-flex justify-content-between">
                <img
                src="img/foods/mexico/nachos.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="nachos"
                />
                <img
                src="img/flags/mexico.png"
                className="d-block w-100 rounded-pill shadow p-3 mb-5 bg-white"
                alt="mexico"
                />
                <img
                src="img/foods/mexico/tacos.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="tacos"
                />
            </div>
        </div>
        {/* Fourth Item */}
        <div className="carousel-item">
            <div className="d-flex justify-content-between">
                <img
                src="img/foods/basque/txuleta.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="paella"
                />
                <img
                src="img/flags/basque.png"
                className="d-block w-100 rounded-pill shadow p-3 mb-5 bg-white"
                alt="spain"
                />
                <img
                src="img/foods/basque/pastel-vasco.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="pastel-vasco"
                />
            </div>
        </div>

        {/* Fifth Item */}
        <div className="carousel-item">
            <div className="d-flex justify-content-between">
                <img
                src="img/foods/spain/paella.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="paella"
                />
                <img
                src="img/flags/spain.svg"
                className="d-block w-100 rounded-pill shadow p-3 mb-5 bg-white"
                alt="spain"
                />
                <img
                src="img/foods/spain/tortilla.jpg"
                className="d-none d-md-block w-100 rounded-pill"
                alt="tortilla"
                />
            </div>
        </div>
    </div>

    {/* Carousel Controls */}
    <button
        className="carousel-control-prev hidden lg:block"
        type="button"
        data-bs-target="#cuisineCarousel"
        data-bs-slide="prev"
    >
        <span
        className="carousel-control-prev-icon bg-black"
        aria-hidden="true"
        ></span>
    </button>
    <button
        className="carousel-control-next hidden lg:block"
        type="button"
        data-bs-target="#cuisineCarousel"
        data-bs-slide="next"
    >
        <span
        className="carousel-control-next-icon bg-black hidden lg:block"
        aria-hidden="true"
        ></span>
    </button>
</div>
);

export default Carousel;
